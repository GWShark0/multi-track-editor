import { DndContext } from '@dnd-kit/core';
import { startsWith } from 'lodash';
import { useDispatch } from 'react-redux';

import MediaControls from 'features/storyboard/MediaControls';
import Timeline from 'features/storyboard/Timeline';

export default function App() {
  const dispatch = useDispatch();

  const handleDragEnd = (event) => {
    if (event.over && startsWith(event.over.id, 'track')) {
      const mediaType = event.active.id.replace('media-item-', '');
      const trackId = event.over.id.replace('track-', '');

      console.log('mediaType:', mediaType);
      console.log('trackId:', trackId);
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
