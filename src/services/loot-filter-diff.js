const fs = require('node:fs');

function summarizeFilterFileDiff(outputPath, nextOutput) {
  const nextText = String(nextOutput || '');
  const nextBytes = Buffer.byteLength(nextText, 'utf8');
  const pathText = String(outputPath || '').trim();
  if (!pathText) {
    return {
      status: 'missing-path',
      exists: false,
      currentBytes: 0,
      nextBytes,
      addedLines: countLines(nextText),
      removedLines: 0,
      changedLines: 0,
      lineDelta: countLines(nextText)
    };
  }

  let currentText;
  try {
    currentText = fs.readFileSync(pathText, 'utf8');
  } catch (error) {
    return {
      status: error.code === 'ENOENT' ? 'missing' : 'unreadable',
      exists: false,
      currentBytes: 0,
      nextBytes,
      addedLines: countLines(nextText),
      removedLines: 0,
      changedLines: 0,
      lineDelta: countLines(nextText),
      error: error.code === 'ENOENT' ? undefined : error.message
    };
  }

  const currentBytes = Buffer.byteLength(currentText, 'utf8');
  if (currentText === nextText) {
    return {
      status: 'unchanged',
      exists: true,
      currentBytes,
      nextBytes,
      addedLines: 0,
      removedLines: 0,
      changedLines: 0,
      lineDelta: 0
    };
  }

  const currentLines = splitLines(currentText);
  const nextLines = splitLines(nextText);
  let prefix = 0;
  while (
    prefix < currentLines.length
    && prefix < nextLines.length
    && currentLines[prefix] === nextLines[prefix]
  ) {
    prefix += 1;
  }

  let suffix = 0;
  while (
    suffix + prefix < currentLines.length
    && suffix + prefix < nextLines.length
    && currentLines[currentLines.length - 1 - suffix] === nextLines[nextLines.length - 1 - suffix]
  ) {
    suffix += 1;
  }

  const removedSpan = Math.max(0, currentLines.length - prefix - suffix);
  const addedSpan = Math.max(0, nextLines.length - prefix - suffix);

  return {
    status: 'changed',
    exists: true,
    currentBytes,
    nextBytes,
    addedLines: Math.max(0, addedSpan - Math.min(removedSpan, addedSpan)),
    removedLines: Math.max(0, removedSpan - Math.min(removedSpan, addedSpan)),
    changedLines: Math.min(removedSpan, addedSpan),
    lineDelta: nextLines.length - currentLines.length
  };
}

function splitLines(text) {
  return String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
}

function countLines(text) {
  return text ? splitLines(text).length : 0;
}

module.exports = {
  summarizeFilterFileDiff
};
