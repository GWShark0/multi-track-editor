import { nanoid } from 'nanoid';

export const MEDIA_TYPES = {
  audio: 'audio',
  image: 'image',
  overlay: 'overlay',
  text: 'text',
  video: 'video',
};

export const TRACK_TYPES = {
  audio: {
    id: 'audio',
    accepts: [MEDIA_TYPES.audio],
  },
  text: {
    id: 'text',
    accepts: [MEDIA_TYPES.text, MEDIA_TYPES.overlay],
  },
  video: {
    id: 'video',
    accepts: [MEDIA_TYPES.video, MEDIA_TYPES.image],
  },
};

export function createItem(mediaType, props = {}) {
  return { id: nanoid(), mediaType, duration: 1, startTime: 0, ...props };
}

export function createAudioItem(props) {
  return createItem(MEDIA_TYPES.audio, props);
}

export function createImageItem(props) {
  return createItem(MEDIA_TYPES.image, props);
}

export function createOverlayItem(props) {
  return createItem(MEDIA_TYPES.overlay, props);
}

export function createTextItem(props) {
  return createItem(MEDIA_TYPES.text, props);
}

export function createVideoItem(props) {
  return createItem(MEDIA_TYPES.video, props);
}

export function mapMediaToTrack(mediaType) {
  switch (mediaType) {
    case MEDIA_TYPES.audio:
      return TRACK_TYPES.audio.id;
    case MEDIA_TYPES.video:
    case MEDIA_TYPES.image:
      return TRACK_TYPES.video.id;
    case MEDIA_TYPES.text:
    case MEDIA_TYPES.overlay:
      return TRACK_TYPES.text.id;
    default:
      return undefined;
  }
}
