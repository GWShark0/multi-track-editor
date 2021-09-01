import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button';
import {
  createAudioItem,
  createImageItem,
  createOverlayItem,
  createTextItem,
  createVideoItem,
} from './media';
import {
  addItem,
  selectFirstTrackId,
  selectTrackEndTime,
} from './storyboardSlice';

export default function MediaControls() {
  const dispatch = useDispatch();
  const trackId = useSelector(selectFirstTrackId);
  const endTime = useSelector((state) => selectTrackEndTime(state, trackId));
  const item = { startTime: endTime, trackId };

  const handleAudioButtonClick = () => {
    dispatch(addItem(createAudioItem(item)));
  };

  const handleImageButtonClick = () => {
    dispatch(addItem(createImageItem(item)));
  };

  const handleOverlayButtonClick = () => {
    dispatch(addItem(createOverlayItem(item)));
  };

  const handleTextButtonClick = () => {
    dispatch(addItem(createTextItem(item)));
  };

  const handleVideoButtonClick = () => {
    dispatch(addItem(createVideoItem(item)));
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
