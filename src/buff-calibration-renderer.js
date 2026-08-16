const title = document.querySelector('#calibration-title');
const help = document.querySelector('#calibration-help');
const selectionBox = document.querySelector('#selection-box');
const pointMarker = document.querySelector('#point-marker');

let mode = 'template';
let dragging = false;
let start = { x: 0, y: 0 };

function setMode(nextMode) {
  mode = nextMode === 'scan' || nextMode === 'mirror' || nextMode === 'match' ? nextMode : 'template';
  selectionBox.hidden = true;
  pointMarker.hidden = true;
  dragging = false;

  if (mode === 'scan') {
    title.textContent = 'Select Scan Area';
    help.textContent = 'Drag around the part of the buff bar to search. Keep it tight for better performance. Press Esc to cancel.';
    return;
  }

  if (mode === 'mirror') {
    title.textContent = 'Pick Mirror Position';
    help.textContent = 'Click where the mirrored buff should appear. Press Esc to cancel.';
    return;
  }

  if (mode === 'match') {
    title.textContent = 'Select Detection Area';
    help.textContent = 'Drag around the stable inner part of the buff icon, avoiding stack numbers or changing overlays. Press Esc to cancel.';
    return;
  }

  title.textContent = 'Select Buff Icon';
  help.textContent = 'Drag around the visible buff icon to capture as a template. Press Esc to cancel.';
}

function getRect(current) {
  const left = Math.min(start.x, current.x);
  const top = Math.min(start.y, current.y);
  const right = Math.max(start.x, current.x);
  const bottom = Math.max(start.y, current.y);
  return {
    x: left,
    y: top,
    width: Math.max(1, right - left),
    height: Math.max(1, bottom - top)
  };
}

function drawRect(rect) {
  selectionBox.hidden = false;
  selectionBox.style.left = `${rect.x}px`;
  selectionBox.style.top = `${rect.y}px`;
  selectionBox.style.width = `${rect.width}px`;
  selectionBox.style.height = `${rect.height}px`;
}

function finish(payload) {
  window.poehelper.completeBuffCalibration(payload).catch(() => {});
}

window.poehelper.onBuffCalibrationStart((payload = {}) => {
  setMode(payload.mode);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    finish({ cancelled: true });
  }
});

window.addEventListener('mousedown', (event) => {
  if (event.button !== 0) {
    return;
  }

  start = { x: event.clientX, y: event.clientY };
  if (mode === 'mirror') {
    pointMarker.hidden = false;
    pointMarker.style.left = `${start.x}px`;
    pointMarker.style.top = `${start.y}px`;
    return;
  }

  dragging = true;
  drawRect({ x: start.x, y: start.y, width: 1, height: 1 });
});

window.addEventListener('mousemove', (event) => {
  if (mode === 'mirror') {
    pointMarker.hidden = false;
    pointMarker.style.left = `${event.clientX}px`;
    pointMarker.style.top = `${event.clientY}px`;
    return;
  }

  if (!dragging) {
    return;
  }

  drawRect(getRect({ x: event.clientX, y: event.clientY }));
});

window.addEventListener('mouseup', (event) => {
  if (event.button !== 0) {
    return;
  }

  if (mode === 'mirror') {
    finish({
      mode,
      point: { x: event.clientX, y: event.clientY }
    });
    return;
  }

  if (!dragging) {
    return;
  }

  dragging = false;
  const rect = getRect({ x: event.clientX, y: event.clientY });
  if (rect.width < 4 || rect.height < 4) {
    selectionBox.hidden = true;
    return;
  }

  finish({ mode, rect });
});
