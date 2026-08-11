const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const electronPath = require('electron');

const root = path.resolve(__dirname, '..');
const appArgs = process.argv.slice(2);
const restartDelayMs = 250;
const watchTargets = [
  'src',
  'scripts',
  'package.json'
];

let child;
let restartTimer;
let shuttingDown = false;

function log(message) {
  console.log(`[watch-dev] ${message}`);
}

function createEnv() {
  const env = { ...process.env };
  delete env.ELECTRON_RUN_AS_NODE;
  env.POEHELPER_WATCH_DEV = '1';
  return env;
}

function startElectron() {
  if (shuttingDown) {
    return;
  }

  child = spawn(electronPath, appArgs.length > 0 ? appArgs : ['.'], {
    cwd: root,
    stdio: 'inherit',
    windowsHide: false,
    env: createEnv()
  });

  log(`started Electron pid=${child.pid}`);

  child.on('exit', (code, signal) => {
    const exitedChild = child;
    if (child === exitedChild) {
      child = undefined;
    }

    if (!shuttingDown && code !== null) {
      log(`Electron exited with code ${code}. Waiting for changes...`);
    } else if (!shuttingDown && signal) {
      log(`Electron exited from signal ${signal}. Waiting for changes...`);
    }
  });
}

function stopElectron() {
  return new Promise((resolve) => {
    if (!child || child.killed) {
      resolve();
      return;
    }

    const pid = child.pid;
    const done = () => resolve();
    child.once('exit', done);

    if (process.platform === 'win32') {
      const killer = spawn('taskkill', ['/pid', String(pid), '/t', '/f'], {
        stdio: 'ignore',
        windowsHide: true
      });
      killer.once('exit', () => {
        setTimeout(done, 25);
      });
      return;
    }

    child.kill('SIGTERM');
    setTimeout(() => {
      if (child && !child.killed) {
        child.kill('SIGKILL');
      }
    }, 1500);
  });
}

function scheduleRestart(reason) {
  if (shuttingDown) {
    return;
  }

  clearTimeout(restartTimer);
  restartTimer = setTimeout(async () => {
    log(`restarting after ${reason}`);
    await stopElectron();
    startElectron();
  }, restartDelayMs);
}

function shouldIgnore(fileName = '') {
  const normalized = String(fileName).replace(/\\/g, '/');
  return normalized.includes('node_modules/')
    || normalized.includes('.git/')
    || normalized.endsWith('~')
    || normalized.endsWith('.tmp')
    || normalized.endsWith('.log');
}

function watchTarget(relativeTarget) {
  const absoluteTarget = path.join(root, relativeTarget);
  if (!fs.existsSync(absoluteTarget)) {
    return;
  }

  const stat = fs.statSync(absoluteTarget);
  const options = stat.isDirectory() ? { recursive: true } : {};
  const watcher = fs.watch(absoluteTarget, options, (eventType, fileName) => {
    if (shouldIgnore(fileName)) {
      return;
    }

    scheduleRestart(`${eventType} in ${relativeTarget}${fileName ? `/${fileName}` : ''}`);
  });

  watcher.on('error', (error) => {
    log(`watch error for ${relativeTarget}: ${error.message}`);
  });
}

async function shutdown() {
  shuttingDown = true;
  clearTimeout(restartTimer);
  await stopElectron();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

for (const target of watchTargets) {
  watchTarget(target);
}

log(`watching ${watchTargets.join(', ')}`);
startElectron();
