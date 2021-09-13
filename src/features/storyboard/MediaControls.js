import { useDispatch } from 'react-redux';

import MediaItem from './MediaItem';
import {
  createAudioItem,
  createImageItem,
  createOverlayItem,
  createTextItem,
  createVideoItem,
  MEDIA_TYPES,
} from './media';
import { addItem } from './storyboardSlice';

// import Button from 'components/Button';

export default function MediaControls() {
  const dispatch = useDispatch();

  const handleAudioButtonClick = () => {
    dispatch(addItem(createAudioItem()));
  };

  const handleImageButtonClick = () => {
    dispatch(addItem(createImageItem()));
  };

  const handleOverlayButtonClick = () => {
    dispatch(addItem(createOverlayItem()));
  };

  const handleTextButtonClick = () => {
    dispatch(addItem(createTextItem()));
  };

  const handleVideoButtonClick = () => {
    dispatch(addItem(createVideoItem()));
  };

  return (
    <div className="flex max-w-5xl space-x-2 select-none">
      <MediaItem type={MEDIA_TYPES.text} label="Text" />
      <MediaItem type={MEDIA_TYPES.video} label="Video" />
      <MediaItem type={MEDIA_TYPES.image} label="Image" />
      <MediaItem type={MEDIA_TYPES.audio} label="Audio" />
      <MediaItem type={MEDIA_TYPES.overlay} label="Overlay" />
    </div>
  );
}
