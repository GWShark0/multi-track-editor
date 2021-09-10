import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import TimelineItem from './TimelineItem';
import { TRACK_TYPES } from './media';
import { selectItemsByTrack, selectTrackById } from './storyboardSlice';

export default function TimelineTrack({ trackId }) {
  const track = useSelector((state) => selectTrackById(state, trackId));
  const itemsForTrack = useSelector((state) =>
    selectItemsByTrack(state, trackId)
  );
  const { type } = track;

  const { setNodeRef } = useDroppable({
    id: `track-${trackId}`,
  });

  const isAudioTrack = type === TRACK_TYPES.AUDIO;
  const isTextTrack = type === TRACK_TYPES.TEXT;
  const isVideoTrack = type === TRACK_TYPES.VIDEO;

  return (
    <div
      className={clsx('relative flex h-10 bg-gray-100 rounded', {
        'bg-indigo-100': isAudioTrack,
        'bg-pink-100': isTextTrack,
        'bg-emerald-100': isVideoTrack,
      })}
      ref={setNodeRef}
    >
      {itemsForTrack.map((item) => {
        return <TimelineItem itemId={item.id} key={item.id} />;
      })}
    </div>
  );
}
