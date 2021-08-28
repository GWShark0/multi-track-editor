import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button';
import { addItem, selectLastTrackId } from './storyboardSlice';

export default function MediaControls() {
  const dispatch = useDispatch();
  const lastTrackId = useSelector(selectLastTrackId);

  const handleVideoButtonClick = () => {
    dispatch(addItem({ type: 'video', trackId: lastTrackId }));
  };

  const handleImageButtonClick = () => {
    dispatch(addItem({ type: 'image', trackId: lastTrackId }));
  };

  const handleAudioButtonClick = () => {
    dispatch(addItem({ type: 'audio', trackId: lastTrackId }));
  };

  return (
    <div className="space-x-2">
      <Button onClick={handleVideoButtonClick}>Add Video</Button>
      <Button onClick={handleImageButtonClick}>Add Image</Button>
      <Button onClick={handleAudioButtonClick}>Add Audio</Button>
    </div>
  );
}
