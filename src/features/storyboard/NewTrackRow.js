import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';

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
      className={clsx(
        'flex items-center justify-center h-10',
        isOver && 'bg-blue-100'
      )}
      ref={setNodeRef}
    >
      {index}
    </div>
  );
}
