import { useMeasure } from 'react-use';
import { PX_PER_SEC } from 'utils/constants';
import formatTimestamp from 'utils/formatTimestamp';
import { isEven } from 'utils/math';
import styles from './TimelineRuler.module.css';

export default function TimelineRuler() {
  const [ref, { width }] = useMeasure();

  const numMarks = Math.floor(width / PX_PER_SEC);
  const marks = Array.from(Array(numMarks).keys());

  return (
    <div className={styles.timelineRuler}>
      <div className={styles.container} ref={ref}>
        {marks.map((i) => {
          const style = {
            width: PX_PER_SEC,
            transform: `translateX(${i * PX_PER_SEC}px)`,
          };
          return (
            <span
              className={isEven(i) ? styles.evenMark : styles.oddMark}
              style={style}
              key={i}
            >
              {isEven(i) && formatTimestamp(i, { padMinutes: false })}
            </span>
          );
        })}
      </div>
    </div>
  );
}
