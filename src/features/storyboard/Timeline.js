import styles from './Timeline.module.css';
import TimelineControls from './TimelineControls';
import Tracks from './Tracks';

export default function Timeline() {
  return (
    <div className={styles.timeline}>
      <TimelineControls />
      <Tracks />
    </div>
  );
}
