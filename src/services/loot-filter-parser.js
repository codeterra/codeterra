function parseLootFilter(text, options = {}) {
  const rawText = String(text || '');
  const newline = rawText.includes('\r\n') ? '\r\n' : '\n';
  const lines = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const nodes = [];
  let currentBlock;

  const pushBlock = () => {
    if (currentBlock) {
      nodes.push(currentBlock);
      currentBlock = undefined;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const lineNumber = index + 1;
    if (trimmed === 'Show' || trimmed === 'Hide') {
      pushBlock();
      currentBlock = {
        type: 'block',
        action: trimmed,
        lineNumber,
        rawLines: [line],
        directives: []
      };
      return;
    }

    if (currentBlock) {
      currentBlock.rawLines.push(line);
      if (trimmed && !trimmed.startsWith('#')) {
        currentBlock.directives.push(parseFilterDirective(line, lineNumber));
      }
      return;
    }

    nodes.push(parseTopLevelLine(line, lineNumber));
  });
  pushBlock();

  return {
    type: 'loot-filter',
    sourcePath: options.sourcePath,
    newline,
    rawText,
    nodes,
    summary: summarizeLootFilterAst({ rawText, nodes })
  };
}

function parseTopLevelLine(line, lineNumber) {
  const trimmed = line.trim();
  if (!trimmed) {
    return { type: 'blank', lineNumber, rawLines: [line] };
  }

  if (trimmed.startsWith('#')) {
    return { type: 'comment', lineNumber, rawLines: [line], text: trimmed.slice(1).trim() };
  }

  return {
    type: 'unknown',
    lineNumber,
    rawLines: [line],
    directive: parseFilterDirective(line, lineNumber)
  };
}

function parseFilterDirective(line, lineNumber) {
  const trimmed = line.trim();
  const match = trimmed.match(/^([A-Za-z][A-Za-z0-9_]*)\b\s*(.*)$/);
  if (!match) {
    return {
      key: 'Unknown',
      raw: trimmed,
      lineNumber
    };
  }

  return {
    key: match[1],
    rawValue: match[2] || '',
    raw: trimmed,
    lineNumber
  };
}

function serializeLootFilterAst(ast) {
  if (typeof ast?.rawText === 'string') {
    return ast.rawText;
  }

  const newline = ast?.newline || '\n';
  return (ast?.nodes || [])
    .flatMap((node) => node.rawLines || [])
    .join(newline);
}

function summarizeLootFilterAst(ast) {
  const nodes = ast?.nodes || [];
  const blocks = nodes.filter((node) => node.type === 'block');
  const directiveCounts = {};
  let commentLines = 0;
  let blankLines = 0;
  let unknownLines = 0;

  for (const node of nodes) {
    if (node.type === 'comment') {
      commentLines += 1;
    } else if (node.type === 'blank') {
      blankLines += 1;
    } else if (node.type === 'unknown') {
      unknownLines += 1;
      increment(directiveCounts, node.directive?.key || 'Unknown');
    } else if (node.type === 'block') {
      for (const directive of node.directives || []) {
        increment(directiveCounts, directive.key || 'Unknown');
      }
    }
  }

  const rawText = String(ast?.rawText || '');
  return {
    bytes: Buffer.byteLength(rawText, 'utf8'),
    lines: rawText ? rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').length : 0,
    blocks: blocks.length,
    showBlocks: blocks.filter((block) => block.action === 'Show').length,
    hideBlocks: blocks.filter((block) => block.action === 'Hide').length,
    commentLines,
    blankLines,
    unknownLines,
    directiveCounts
  };
}

function increment(map, key) {
  map[key] = (map[key] || 0) + 1;
}

module.exports = {
  parseLootFilter,
  serializeLootFilterAst,
  summarizeLootFilterAst
};
