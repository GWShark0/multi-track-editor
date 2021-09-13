import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import TimelineItem from './TimelineItem';
import { TRACK_TYPES } from './media';
import { selectItemsByTrack, selectTrackById } from './storyboardSlice';

export default function TimelineTrack({ trackId }) {
  const [isCompatible, setIsCompatible] = useState(false);
  const track = useSelector((state) => selectTrackById(state, trackId));
  const itemsForTrack = useSelector((state) =>
    selectItemsByTrack(state, trackId)
  );
  const { type } = track;

  const onDragOver = (event) => {
    const { active, over } = event;
    if (!over) {
      return;
    }

    setIsCompatible(
      over.data.current.accepts.includes(active.data.current.type)
    );
  };

  const onDragEnd = () => {
    setIsCompatible(false);
  };

  useDndMonitor({ onDragOver, onDragEnd });

  const { isOver, setNodeRef } = useDroppable({
    id: `track-${trackId}`,
    data: {
      accepts: TRACK_TYPES[type].accepts,
    },
  });

  return (
    <div
      className={clsx(
        'relative flex h-10 bg-gray-100 rounded transition-colors',
        {
          'bg-green-100': isOver && isCompatible,
          'bg-red-100': isOver && !isCompatible,
        }
      )}
      ref={setNodeRef}
    >
      {itemsForTrack.map((item) => {
        return <TimelineItem itemId={item.id} key={item.id} />;
      })}
    </div>
  );
}
