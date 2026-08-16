const bar = document.querySelector('#buff-mirror-bar');
const list = document.querySelector('#buff-mirror-list');

const BAR_INSET = 6;

let placementMode = false;
let iconSize = 34;
let orientation = 'horizontal';
let activeBuffs = [];

function renderBuffMirrorSettings(payload = {}) {
  const settings = payload.settings || payload;
  const buffMirror = settings?.buffMirror || {};
  placementMode = buffMirror.placementMode === true;
  iconSize = Math.max(16, Math.min(96, Number(buffMirror.mirrorSize) || 34));
  orientation = buffMirror.barOrientation === 'vertical' ? 'vertical' : 'horizontal';
  render();
}

function renderBuffMirrorFrame(payload = {}) {
  if (!payload.visible) {
    activeBuffs = [];
    render();
    return;
  }

  if (Array.isArray(payload.buffs)) {
    activeBuffs = payload.buffs.filter((buff) => buff?.dataUrl);
  } else if (payload.dataUrl) {
    activeBuffs = [{
      id: payload.name || 'buff',
      name: payload.name,
      dataUrl: payload.dataUrl,
      score: payload.score
    }];
  }

  iconSize = Math.max(16, Math.min(96, Number(payload.size) || iconSize));
  if (typeof payload.placementMode === 'boolean') {
    placementMode = payload.placementMode;
  }
  orientation = payload.orientation === 'vertical' ? 'vertical' : orientation;
  render();
}

function render() {
  document.body.classList.toggle('is-placement-mode', placementMode);
  document.body.classList.toggle('is-vertical', orientation === 'vertical');
  bar.hidden = !placementMode && activeBuffs.length === 0;
  bar.style.left = `${BAR_INSET}px`;
  bar.style.top = `${BAR_INSET}px`;
  bar.style.setProperty('--buff-size', `${iconSize}px`);
  list.innerHTML = '';

  for (const buff of activeBuffs) {
    const item = document.createElement('div');
    item.className = 'buff-mirror-icon';
    item.title = buff.name ? `${buff.name} (${Math.round((buff.score || 0) * 100)}%)` : '';
    const image = document.createElement('img');
    image.src = buff.dataUrl;
    image.alt = '';
    item.appendChild(image);
    list.appendChild(item);
  }
}

window.poehelper.onSettingsUpdated(renderBuffMirrorSettings);
window.poehelper.onBuffMirrorFrame(renderBuffMirrorFrame);
