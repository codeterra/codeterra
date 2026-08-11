const { execFileSync } = require('node:child_process');
const { readFileSync } = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const packageJson = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
const build = packageJson.build || {};
const publish = build.publish || {};
const owner = publish.owner;
const repo = publish.repo;
const version = packageJson.version;
const tag = `v${version}`;
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;

function git(args) {
  return execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  }).trim();
}

function fail(message) {
  console.error(`Release setup failed: ${message}`);
  process.exit(1);
}

function github(pathname, options = {}) {
  if (!token) {
    fail('GH_TOKEN or GITHUB_TOKEN is required to create or verify the GitHub release.');
  }

  return fetch(`https://api.github.com/repos/${owner}/${repo}${pathname}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'poehelper-release-setup',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {})
    }
  });
}

async function main() {
  if (!owner || !repo) {
    fail('package.json build.publish.owner and build.publish.repo are required.');
  }

  const head = git(['rev-parse', 'HEAD']);
  const tagCommit = git(['rev-list', '-n', '1', tag]);
  if (head !== tagCommit) {
    fail(`${tag} must point at HEAD before release creation.`);
  }

  const releasesResponse = await github(`/releases?per_page=100`);
  if (!releasesResponse.ok) {
    fail(`could not list releases: ${releasesResponse.status} ${await releasesResponse.text()}`);
  }

  const releases = await releasesResponse.json();
  const matching = releases.filter((release) => release.tag_name === tag);
  if (matching.length > 1) {
    fail(`${matching.length} GitHub releases already exist for ${tag}. Delete the duplicates before retrying.`);
  }

  if (matching.length === 1) {
    console.log(`GitHub release already exists for ${tag}: ${matching[0].html_url}`);
    return;
  }

  const createResponse = await github('/releases', {
    method: 'POST',
    body: JSON.stringify({
      tag_name: tag,
      target_commitish: head,
      name: version,
      draft: false,
      prerelease: false
    })
  });

  if (!createResponse.ok) {
    fail(`could not create release ${tag}: ${createResponse.status} ${await createResponse.text()}`);
  }

  const release = await createResponse.json();
  console.log(`Created GitHub release for ${tag}: ${release.html_url}`);
}

main().catch((error) => fail(error.message || String(error)));
