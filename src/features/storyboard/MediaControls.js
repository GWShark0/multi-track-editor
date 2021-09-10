import { useDispatch } from 'react-redux';

import Button from 'components/Button';

import Draggable from './Draggable';
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
    <div className="flex space-x-2 select-none">
      <MediaItem type={MEDIA_TYPES.TEXT} label="Text" />
      <MediaItem type={MEDIA_TYPES.VIDEO} label="Video" />
      <MediaItem type={MEDIA_TYPES.IMAGE} label="Image" />
      <MediaItem type={MEDIA_TYPES.AUDIO} label="Audio" />
      <MediaItem type={MEDIA_TYPES.OVERLAY} label="Overlay" />
    </div>
  );
}
