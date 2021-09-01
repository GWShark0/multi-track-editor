import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button';
import {
  createAudioItem,
  createImageItem,
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

  const handleVideoButtonClick = () => {
    dispatch(addItem(createVideoItem(item)));
  };

  const handleImageButtonClick = () => {
    dispatch(addItem(createImageItem(item)));
  };

  const handleAudioButtonClick = () => {
    dispatch(addItem(createAudioItem(item)));
  };

  const handleTextButtonClick = () => {
    dispatch(addItem(createTextItem(item)));
  };

  return (
    <div className="space-x-2">
      <Button onClick={handleTextButtonClick}>Add Text</Button>
      <Button onClick={handleVideoButtonClick}>Add Video</Button>
      <Button onClick={handleImageButtonClick}>Add Image</Button>
      <Button onClick={handleAudioButtonClick}>Add Audio</Button>
    </div>
  );
}
