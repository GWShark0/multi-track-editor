import { useSelector } from 'react-redux';

import NewTrackRow from './NewTrackRow';
import TrackRow from './TrackRow';
import { selectAllTracks } from './storyboardSlice';

export default function Tracks() {
  const tracks = useSelector(selectAllTracks);

  return (
    <div className="p-8 overflow-scroll">
      <NewTrackRow index={0} />
      {tracks.reduce((acc, track, index) => {
        acc.push(
          <TrackRow trackId={track.id} key={track.id} />,
          <NewTrackRow index={index + 1} key={index + 1} />
        );
        return acc;
      }, [])}
    </div>
  );
}
