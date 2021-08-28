export const MEDIA_TYPES = {
  AUDIO: 'audio',
  IMAGE: 'image',
  VIDEO: 'video',
};

export function createAudioItem(trackId) {
  return { type: MEDIA_TYPES.AUDIO, trackId };
}

export function createImageItem(trackId) {
  return { type: MEDIA_TYPES.IMAGE, trackId };
}

export function createVideoItem(trackId) {
  return { type: MEDIA_TYPES.VIDEO, trackId };
}
