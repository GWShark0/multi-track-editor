import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button';
import {
  createAudioItem,
  createImageItem,
  createOverlayItem,
  createTextItem,
  createVideoItem,
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
    <div className="space-x-2">
      <Button onClick={handleTextButtonClick}>Add Text</Button>
      <Button onClick={handleVideoButtonClick}>Add Video</Button>
      <Button onClick={handleImageButtonClick}>Add Image</Button>
      <Button onClick={handleAudioButtonClick}>Add Audio</Button>
      <Button onClick={handleOverlayButtonClick}>Add Overlay</Button>
    </div>
  );
}
