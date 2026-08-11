function classifyError(error) {
  const status = Number(error?.status);
  const message = String(error?.message || 'Unknown error');
  const retryAfter = Number(error?.retryAfter);

  if (Number.isFinite(retryAfter) && retryAfter > 0) {
    return {
      kind: 'rate-limit',
      severity: 'warn',
      message: `Rate limited. Retry after ${retryAfter}s.`
    };
  }

  if (status === 429) {
    return {
      kind: 'rate-limit',
      severity: 'warn',
      message: 'Rate limited. Wait a moment, then try again.'
    };
  }

  if (status === 404) {
    return {
      kind: 'not-found',
      severity: 'warn',
      message: 'No matching market data was found.'
    };
  }

  if (status >= 500) {
    return {
      kind: 'server',
      severity: 'warn',
      message: 'The pricing service is having trouble. Try again shortly.'
    };
  }

  if (/fetch failed|enotfound|econnreset|econnrefused|network|timed out|timeout/i.test(message)) {
    return {
      kind: 'network',
      severity: 'warn',
      message: 'Network request failed. Check your connection and try again.'
    };
  }

  return {
    kind: 'unknown',
    severity: 'error',
    message
  };
}

function formatErrorMessage(prefix, error) {
  const classified = classifyError(error);
  return prefix ? `${prefix}: ${classified.message}` : classified.message;
}

module.exports = {
  classifyError,
  formatErrorMessage
};
