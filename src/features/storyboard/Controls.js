import { useDispatch } from 'react-redux';
import Button from 'components/Button';
import { addItem } from './storyboardSlice';

export default function Controls() {
  const dispatch = useDispatch();

  const handleVideoButtonClick = () => {
    dispatch(addItem({ type: 'video' }));
  };

  const handleImageButtonClick = () => {
    dispatch(addItem({ type: 'image' }));
  };

  const handleAudioButtonClick = () => {
    dispatch(addItem({ type: 'audio' }));
  };

  return (
    <div className="space-x-2">
      <Button onClick={handleVideoButtonClick}>Add Video</Button>
      <Button onClick={handleImageButtonClick}>Add Image</Button>
      <Button onClick={handleAudioButtonClick}>Add Audio</Button>
    </div>
  );
}
