const crypto = require('node:crypto');
const http = require('node:http');

const { shell } = require('electron');

const GGG_AUTH_BASE_URL = 'https://www.pathofexile.com';
const GGG_API_BASE_URL = 'https://api.pathofexile.com';
const GGG_CDN_BASE_URL = 'https://web.poecdn.com';
const USER_AGENT = 'OAuth poehelper-local/0.0.1 (contact: local-dev) Phase2ElectronPrototype';

let pendingAuth;

function base64Url(buffer) {
  return Buffer.from(buffer)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function createPkcePair() {
  const verifier = base64Url(crypto.randomBytes(32));
  const challenge = base64Url(crypto.createHash('sha256').update(verifier).digest());
  return { verifier, challenge };
}

function parseRedirectPort(redirectUri) {
  const parsed = new URL(redirectUri);
  if (parsed.hostname !== '127.0.0.1' && parsed.hostname !== 'localhost') {
    throw new Error('Public desktop OAuth requires a local redirect URI such as http://127.0.0.1:8585/callback.');
  }

  return {
    port: Number(parsed.port || 80),
    path: parsed.pathname
  };
}

async function beginAuthorization({ clientId, redirectUri, scopes }) {
  if (!clientId) {
    throw new Error('Client ID is required.');
  }

  if (pendingAuth?.server) {
    pendingAuth.server.close();
    pendingAuth = undefined;
  }

  const { port, path } = parseRedirectPort(redirectUri);
  const state = base64Url(crypto.randomBytes(24));
  const pkce = createPkcePair();

  const authUrl = new URL('/oauth/authorize', GGG_AUTH_BASE_URL);
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', scopes);
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('code_challenge', pkce.challenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  const codePromise = new Promise((resolve, reject) => {
    const server = http.createServer((request, response) => {
      const requestUrl = new URL(request.url, redirectUri);
      if (requestUrl.pathname !== path) {
        response.writeHead(404);
        response.end('Not found');
        return;
      }

      const returnedState = requestUrl.searchParams.get('state');
      const code = requestUrl.searchParams.get('code');
      const error = requestUrl.searchParams.get('error');

      if (returnedState !== state) {
        response.writeHead(400);
        response.end('Invalid OAuth state. You can close this window.');
        reject(new Error('OAuth state mismatch.'));
        server.close();
        return;
      }

      if (error) {
        response.writeHead(400);
        response.end('Authorization failed. You can close this window.');
        reject(new Error(error));
        server.close();
        return;
      }

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end('<html><body><h1>POEHelper connected.</h1><p>You can close this window.</p></body></html>');
      resolve(code);
      server.close();
    });

    server.once('error', reject);
    server.listen(port, '127.0.0.1');
    pendingAuth = { server, state, pkce };
  });

  await shell.openExternal(authUrl.toString());
  const code = await codePromise;
  try {
    return await exchangeAuthorizationCode({
      clientId,
      redirectUri,
      scopes,
      code,
      codeVerifier: pkce.verifier
    });
  } finally {
    pendingAuth = undefined;
  }
}

async function exchangeAuthorizationCode({ clientId, redirectUri, scopes, code, codeVerifier }) {
  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    scope: scopes,
    code_verifier: codeVerifier
  });

  return requestToken(body);
}

async function refreshToken({ clientId, refreshToken }) {
  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  });

  return requestToken(body);
}

async function requestToken(body) {
  const response = await fetch(`${GGG_AUTH_BASE_URL}/oauth/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': USER_AGENT
    },
    body
  });

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`;
    try {
      const payload = await response.json();
      message = payload.error_description || payload.error || message;
    } catch {
      // Keep HTTP message.
    }
    throw new Error(message);
  }

  const token = await response.json();
  return {
    ...token,
    obtained_at: new Date().toISOString(),
    expires_at: token.expires_in
      ? new Date(Date.now() + token.expires_in * 1000).toISOString()
      : undefined
  };
}

async function gggApiFetch(path, token) {
  if (!token?.access_token) {
    throw new Error('No GGG access token is configured.');
  }

  const response = await fetch(`${GGG_API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token.access_token}`,
      'User-Agent': USER_AGENT
    }
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function fetchCurrencyExchange({ realm, id } = {}) {
  const parts = ['/api/currency-exchange'];
  if (realm) {
    parts.push(`/${encodeURIComponent(realm)}`);
  }
  if (id) {
    parts.push(`/${encodeURIComponent(id)}`);
  }

  const response = await fetch(`${GGG_CDN_BASE_URL}${parts.join('')}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': USER_AGENT
    }
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

module.exports = {
  beginAuthorization,
  refreshToken,
  gggApiFetch,
  fetchCurrencyExchange
};
