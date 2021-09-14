import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';
import { startsWith } from 'lodash';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import TrackItem from './TrackItem';
import { TRACK_TYPES } from './media';
import { selectItemsByTrack, selectTrackById } from './storyboardSlice';

export default function TrackRow({ trackId }) {
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

    if (over.data.current.type === 'track-row') {
      setIsCompatible(
        over.data.current.accepts.includes(active.data.current.mediaType)
      );
    }
  };

  const onDragEnd = () => {
    setIsCompatible(false);
  };

  useDndMonitor({ onDragOver, onDragEnd });

  const { isOver, setNodeRef } = useDroppable({
    id: `track-row-${trackId}`,
    data: {
      type: 'track-row',
      trackId,
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
      {trackId}
      {itemsForTrack.map((item) => {
        return <TrackItem itemId={item.id} trackId={trackId} key={item.id} />;
      })}
    </div>
  );
}
