import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button';
import { createAudioItem, createImageItem, createVideoItem } from './media';
import {
  addItem,
  selectFirstTrackId,
  selectTrackEndTime,
} from './storyboardSlice';

export default function MediaControls() {
  const dispatch = useDispatch();
  const trackId = useSelector(selectFirstTrackId);
  const endTime = useSelector((state) => selectTrackEndTime(state, trackId));

  const handleVideoButtonClick = () => {
    dispatch(addItem(createVideoItem({ startTime: endTime, trackId })));
  };

  const handleImageButtonClick = () => {
    dispatch(addItem(createImageItem({ startTime: endTime, trackId })));
  };

  const handleAudioButtonClick = () => {
    dispatch(addItem(createAudioItem({ startTime: endTime, trackId })));
  };

  return (
    <div className="space-x-2">
      <Button onClick={handleVideoButtonClick}>Add Video</Button>
      <Button onClick={handleImageButtonClick}>Add Image</Button>
      <Button onClick={handleAudioButtonClick}>Add Audio</Button>
    </div>
  );
}
