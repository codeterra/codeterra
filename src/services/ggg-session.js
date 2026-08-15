const { safeStorage } = require('electron');

const GGG_WEB_BASE_URL = 'https://www.pathofexile.com';
const USER_AGENT = 'POEHelper/0.0.14 (contact: local-dev) session-auth';

function normalizePoeSessionToken(value) {
  const raw = String(value || '').trim();
  const cookieMatch = raw.match(/(?:^|;\s*)POESESSID=([^;\s]+)/i);
  const token = (cookieMatch ? cookieMatch[1] : raw)
    .replace(/^["']|["']$/g, '')
    .trim();

  if (!token || token.length < 16 || /[\s;]/.test(token)) {
    throw new Error('Enter a valid POESESSID token or cookie value.');
  }

  return token;
}

function maskSessionToken(token) {
  const normalized = String(token || '');
  if (normalized.length <= 10) {
    return 'saved token';
  }

  return `${normalized.slice(0, 4)}...${normalized.slice(-4)}`;
}

function assertSecureStorageAvailable() {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error('Secure OS-backed storage is not available on this machine yet.');
  }
}

function protectSessionToken(value) {
  const token = normalizePoeSessionToken(value);
  assertSecureStorageAvailable();
  return {
    encryptedToken: safeStorage.encryptString(token).toString('base64'),
    tokenHint: maskSessionToken(token),
    tokenSetAt: new Date().toISOString(),
    validatedAt: undefined,
    accountName: undefined,
    status: 'saved',
    lastError: undefined
  };
}

function unprotectSessionToken(session) {
  if (!session?.encryptedToken) {
    throw new Error('No POESESSID token is saved.');
  }

  assertSecureStorageAvailable();
  return safeStorage.decryptString(Buffer.from(session.encryptedToken, 'base64'));
}

function getPublicSessionSummary(session) {
  const configured = Boolean(session?.encryptedToken);
  return {
    configured,
    tokenHint: configured ? session.tokenHint : undefined,
    tokenSetAt: configured ? session.tokenSetAt : undefined,
    validatedAt: configured ? session.validatedAt : undefined,
    accountName: configured ? session.accountName : undefined,
    manualAccountName: session?.manualAccountName,
    status: configured ? session.status || 'saved' : 'not-configured',
    lastError: configured ? session.lastError : undefined,
    secureStorageAvailable: safeStorage.isEncryptionAvailable()
  };
}

async function validateSessionToken(token, fetchImpl = fetch) {
  const normalized = normalizePoeSessionToken(token);
  const response = await fetchImpl(`${GGG_WEB_BASE_URL}/my-account`, {
    headers: {
      Accept: 'text/html,application/xhtml+xml',
      Cookie: `POESESSID=${normalized}`,
      'User-Agent': USER_AGENT
    },
    redirect: 'follow'
  });

  const text = await response.text();
  const finalUrl = response.url || '';

  if (!response.ok || /\/login(?:\?|$)/i.test(finalUrl) || /name=["']login_email["']/i.test(text)) {
    throw new Error('POESESSID validation failed. The token may be expired or copied from the wrong account.');
  }

  const accountName = extractAccountName(text, finalUrl);
  return {
    status: 'connected',
    accountName,
    validatedAt: new Date().toISOString()
  };
}

function normalizeAccountName(value) {
  return String(value || '').trim();
}

function extractAccountName(html, finalUrl) {
  const profileMatch = String(html || '').match(/\/account\/view-profile\/([^"'?#<\s]+)/i);
  if (profileMatch) {
    return decodeURIComponent(profileMatch[1].replace(/\+/g, ' '));
  }

  const urlMatch = String(finalUrl || '').match(/\/account\/view-profile\/([^/?#]+)/i);
  if (urlMatch) {
    return decodeURIComponent(urlMatch[1].replace(/\+/g, ' '));
  }

  return 'Connected account';
}

module.exports = {
  getPublicSessionSummary,
  normalizeAccountName,
  protectSessionToken,
  unprotectSessionToken,
  validateSessionToken
};
