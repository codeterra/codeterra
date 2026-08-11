const { execFileSync } = require('node:child_process');
const { readFileSync } = require('node:fs');
const path = require('node:path');

function git(args) {
  return execFileSync('git', args, {
    cwd: path.join(__dirname, '..'),
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  }).trim();
}

function fail(message) {
  console.error(`Release preflight failed: ${message}`);
  process.exit(1);
}

const root = path.join(__dirname, '..');
const packageJson = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
const version = packageJson.version;
const tag = `v${version}`;

try {
  git(['rev-parse', '--is-inside-work-tree']);
} catch {
  fail('this folder is not a git repository.');
}

const status = git(['status', '--porcelain']);
if (status) {
  fail('working tree has uncommitted changes. Commit or stash them before publishing a release.');
}

let head;
try {
  head = git(['rev-parse', 'HEAD']);
} catch {
  fail('could not read the current git commit.');
}

let tagCommit;
try {
  tagCommit = git(['rev-list', '-n', '1', tag]);
} catch {
  fail(`local tag ${tag} does not exist. Run: git fetch --tags origin`);
}

if (tagCommit !== head) {
  fail(`local tag ${tag} points at ${tagCommit.slice(0, 7)}, but HEAD is ${head.slice(0, 7)}.`);
}

let remoteTag;
try {
  remoteTag = git(['ls-remote', '--tags', 'origin', `refs/tags/${tag}`, `refs/tags/${tag}^{}`]);
} catch {
  fail(`could not verify ${tag} on origin. Check network/auth, then try again.`);
}

if (!remoteTag) {
  fail(`remote tag ${tag} does not exist. Run: git push origin ${tag}`);
}

const remoteLines = remoteTag.split(/\r?\n/).filter(Boolean);
const peeledRemoteTag = remoteLines.find((line) => line.endsWith(`refs/tags/${tag}^{}`));
const remoteCommit = (peeledRemoteTag || remoteLines[0]).split(/\s+/)[0];
if (remoteCommit !== tagCommit) {
  fail(`origin ${tag} points at ${remoteCommit.slice(0, 7)}, but local ${tag} points at ${tagCommit.slice(0, 7)}.`);
}

console.log(`Release preflight passed for ${tag} (${head.slice(0, 7)}).`);
