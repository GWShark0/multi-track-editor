import { DndContext } from '@dnd-kit/core';
import { startsWith } from 'lodash';
import { useDispatch } from 'react-redux';

import MediaControls from 'features/storyboard/MediaControls';
import Timeline from 'features/storyboard/Timeline';
import { createItem } from 'features/storyboard/media';
import { addItem } from 'features/storyboard/storyboardSlice';

export default function App() {
  const dispatch = useDispatch();

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (startsWith(over.id, 'track')) {
      const mediaType = active.id.replace('media-item-', '');
      const trackId = over.id.replace('track-', '');

      if (over.data.current.accepts.includes(active.data.current.type)) {
        dispatch(addItem(createItem(mediaType, { trackId })));
      }
    }

    if (startsWith(over.id, 'new-track')) {
      const mediaType = active.id.replace('media-item-', '');
      const trackIndex = parseInt(over.id.replace('new-track-', ''));
      dispatch(addItem(createItem(mediaType, { trackIndex })));
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
