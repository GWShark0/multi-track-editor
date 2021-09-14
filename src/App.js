import { DndContext } from '@dnd-kit/core';
import { useDispatch } from 'react-redux';

import MediaControls from 'features/storyboard/MediaControls';
import Timeline from 'features/storyboard/Timeline';
import { createItem } from 'features/storyboard/media';
import { addItem, moveItem } from 'features/storyboard/storyboardSlice';

import styles from './App.module.css';

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
        }
      }
    }

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
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={styles.app}>
        <MediaControls />
        <Timeline />
      </div>
    </DndContext>
  );
}
