import { nanoid } from 'nanoid';

export const MEDIA_TYPES = {
  AUDIO: 'audio',
  IMAGE: 'image',
  OVERLAY: 'overlay',
  TEXT: 'text',
  VIDEO: 'video',
};

export const TRACK_TYPES = {
  AUDIO: 'audio',
  TEXT: 'text',
  VIDEO: 'video',
};

function item(mediaType, props = {}) {
  return { id: nanoid(), mediaType, duration: 1, startTime: 0, ...props };
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

export function mapMediaToTrack(mediaType) {
  switch (mediaType) {
    case MEDIA_TYPES.AUDIO:
      return TRACK_TYPES.AUDIO;
    case MEDIA_TYPES.VIDEO:
    case MEDIA_TYPES.IMAGE:
      return TRACK_TYPES.VIDEO;
    case MEDIA_TYPES.TEXT:
    case MEDIA_TYPES.OVERLAY:
      return TRACK_TYPES.TEXT;
    default:
      return undefined;
  }
}
