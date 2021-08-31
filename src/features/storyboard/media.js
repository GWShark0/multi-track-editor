export const MEDIA_TYPES = {
  AUDIO: 'audio',
  IMAGE: 'image',
  VIDEO: 'video',
};

export function createAudioItem(props) {
  return { type: MEDIA_TYPES.AUDIO, ...props };
}

export function createImageItem(props) {
  return { type: MEDIA_TYPES.IMAGE, ...props };
}

export function createVideoItem(props) {
  return { type: MEDIA_TYPES.VIDEO, ...props };
}
