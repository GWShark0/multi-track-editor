import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';
import styles from './NewTrackRow.module.css';

export default function NewTrackRow(props) {
  const { index } = props;

  const { isOver, setNodeRef } = useDroppable({
    id: `new-track-${index}`,
    data: {
      type: 'new-track',
      index,
    },
  });

  return (
    <div
      className={clsx(styles.newTrackRow, isOver && styles.over)}
      ref={setNodeRef}
    >
      {/* {index} */}
    </div>
  );
}
