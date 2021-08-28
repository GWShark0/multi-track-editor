import { PlusIcon, MinusIcon } from '@heroicons/react/solid';
import IconButton from 'components/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTrack,
  removeTrack,
  selectAllTracks,
  selectCanRemoveTracks,
  selectLastTrackId,
} from './storyboardSlice';

import TimelineControls from './TimelineControls';
import Track from './Track';

export default function Timeline() {
  const dispatch = useDispatch();
  const tracks = useSelector(selectAllTracks);
  const lastTrackId = useSelector(selectLastTrackId);
  const canRemoveTracks = useSelector(selectCanRemoveTracks);

  const handleAddTrack = () => {
    dispatch(addTrack());
  };

  const handleRemoveTrack = () => {
    dispatch(removeTrack(lastTrackId));
  };

  return (
    <div className="h-1/2 fixed inset-x-0 bottom-0 flex flex-col bg-gray-300">
      <TimelineControls />
      <div className=" p-8 space-y-2 overflow-scroll">
        {tracks.map((track) => {
          const { id } = track;
          return <Track id={id} key={id} />;
        })}
        <div className="flex justify-end space-x-1">
          {canRemoveTracks && (
            <IconButton
              color="red"
              icon={MinusIcon}
              onClick={handleRemoveTrack}
              round
              size="small"
            />
          )}
          <IconButton
            color="blue"
            icon={PlusIcon}
            onClick={handleAddTrack}
            round
            size="small"
          />
        </div>
      </div>
    </div>
  );
}
