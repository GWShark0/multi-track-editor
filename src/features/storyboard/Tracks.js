import { useSelector } from 'react-redux';

import NewTrackRow from './NewTrackRow';
import TrackRow from './TrackRow';
import styles from './Tracks.module.css';
import { selectAllTracks } from './storyboardSlice';

export default function Tracks() {
  const tracks = useSelector(selectAllTracks);

  return (
    <div className={styles.tracks}>
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
