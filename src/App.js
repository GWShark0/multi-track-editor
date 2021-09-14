import { DndContext } from '@dnd-kit/core';
import { useDispatch } from 'react-redux';

import MediaControls from 'features/storyboard/MediaControls';
import Timeline from 'features/storyboard/Timeline';
import { createItem } from 'features/storyboard/media';
import { addItem, moveItem } from 'features/storyboard/storyboardSlice';

export default function App() {
  const dispatch = useDispatch();

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (over.data.current.type === 'track-row') {
      const mediaType = active.data.current.mediaType;

      if (over.data.current.accepts.includes(mediaType)) {
        if (active.data.current.type === 'media-item') {
          const trackId = over.data.current.trackId;
          dispatch(addItem(createItem(mediaType, { trackId })));
        } else if (active.data.current.type === 'track-item') {
          const itemId = active.data.current.itemId;
          const fromTrackId = active.data.current.trackId;
          const toTrackId = over.data.current.trackId;

          if (fromTrackId !== toTrackId) {
            dispatch(moveItem({ itemId, fromTrackId, mediaType, toTrackId }));
          }

          console.log('from:', fromTrackId);
          console.log('to:', toTrackId);
        }
      }
    }

    // if (startsWith(over.id, 'track')) {
    //   console.log(active);
    //   // const mediaType = active.id.replace('media-item-', '');
    //   // const trackId = over.id.replace('track-', '');
    //   // if (over.data.current.accepts.includes(active.data.current.type)) {
    //   //   dispatch(addItem(createItem(mediaType, { trackId })));
    //   // }
    // }

    if (over.data.current.type === 'new-track') {
      const mediaType = active.data.current.mediaType;
      const trackIndex = over.data.current.index;

      if (active.data.current.type === 'media-item') {
        dispatch(addItem(createItem(mediaType, { trackIndex })));
      } else if (active.data.current.type === 'track-item') {
        const itemId = active.data.current.itemId;
        const fromTrackId = active.data.current.trackId;
        const toTrackIndex = trackIndex;
        dispatch(moveItem({ itemId, fromTrackId, mediaType, toTrackIndex }));
      }

      // console.log(mediaType, trackIndex);
      // const mediaType = active.id.replace('media-item-', '');
      // const trackIndex = parseInt(over.id.replace('new-track-', ''));
      // dispatch(addItem(createItem(mediaType, { trackIndex })));
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-4">
        <MediaControls />
        <Timeline />
      </div>
    </DndContext>
  );
}
