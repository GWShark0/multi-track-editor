import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button';
import { createAudioItem, createImageItem, createVideoItem } from './media';
import {
  addItem,
  selectLastTrackId,
  selectTrackEndTime,
} from './storyboardSlice';

export default function MediaControls() {
  const dispatch = useDispatch();
  const lastTrackId = useSelector(selectLastTrackId);
  const endTime = useSelector((state) =>
    selectTrackEndTime(state, lastTrackId)
  );

  const handleVideoButtonClick = () => {
    dispatch(
      addItem(createVideoItem({ startTime: endTime, trackId: lastTrackId }))
    );
  };

  const handleImageButtonClick = () => {
    dispatch(
      addItem(createImageItem({ startTime: endTime, trackId: lastTrackId }))
    );
  };

  const handleAudioButtonClick = () => {
    dispatch(
      addItem(createAudioItem({ startTime: endTime, trackId: lastTrackId }))
    );
  };

  return (
    <div className="space-x-2">
      <Button onClick={handleVideoButtonClick}>Add Video</Button>
      <Button onClick={handleImageButtonClick}>Add Image</Button>
      <Button onClick={handleAudioButtonClick}>Add Audio</Button>
    </div>
  );
}
