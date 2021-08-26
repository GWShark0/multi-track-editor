import { PlusIcon, MinusIcon } from '@heroicons/react/solid';
import IconButton from 'components/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTrack,
  removeTrack,
  selectCanRemoveTrack,
  selectTracks,
} from './storyboardSlice';
import Track from './Track';

export default function Timeline() {
  const dispatch = useDispatch();
  const tracks = useSelector(selectTracks);
  const canRemoveTrack = useSelector(selectCanRemoveTrack);

  const handleAddTrack = () => {
    dispatch(addTrack());
  };

  const handleRemoveTrack = () => {
    dispatch(removeTrack());
  };

  return (
    <div className="space-y-2">
      {tracks.map((track) => {
        const { id } = track;
        return <Track key={id} />;
      })}
      <div className="flex justify-end space-x-1">
        {canRemoveTrack && (
          <IconButton
            color="red"
            icon={MinusIcon}
            onClick={handleRemoveTrack}
          />
        )}
        <IconButton icon={PlusIcon} onClick={handleAddTrack} />
      </div>
    </div>
  );
}
