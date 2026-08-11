const { spawn } = require('node:child_process');

const electronPath = require('electron');
const args = process.argv.slice(2);
const env = { ...process.env };

delete env.ELECTRON_RUN_AS_NODE;

const child = spawn(electronPath, args.length > 0 ? args : ['.'], {
  stdio: 'inherit',
  windowsHide: false,
  env
});

child.on('close', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
