export const MEDIA_TYPES = {
  AUDIO: 'audio',
  IMAGE: 'image',
  OVERLAY: 'overlay',
  TEXT: 'text',
  VIDEO: 'video',
};

function item(type, props) {
  return { type, ...props };
}

export function createAudioItem(props) {
  return item(MEDIA_TYPES.AUDIO, props);
}

export function createImageItem(props) {
  return item(MEDIA_TYPES.IMAGE, props);
}

export function createOverlayItem(props) {
  return item(MEDIA_TYPES.OVERLAY, props);
}

export function createTextItem(props) {
  return item(MEDIA_TYPES.TEXT, props);
}

export function createVideoItem(props) {
  return item(MEDIA_TYPES.VIDEO, props);
}
