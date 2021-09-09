import { useSelector } from 'react-redux';
import { selectAllTracks } from './storyboardSlice';

import TimelineControls from './TimelineControls';
import TimelineTrack from './TimelineTrack';

export default function Timeline() {
  const tracks = useSelector(selectAllTracks);

  return (
    <div className="h-1/2 fixed inset-x-0 bottom-0 flex flex-col bg-gray-300">
      <TimelineControls />
      <div className=" p-8 space-y-2 overflow-scroll">
        {tracks.map((track) => {
          return <TimelineTrack trackId={track.id} key={track.id} />;
        })}
      </div>
    </div>
  );
}
