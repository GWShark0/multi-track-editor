import { useSelector } from 'react-redux';

import { selectItemsByTrack } from './storyboardSlice';
import TimelineItem from './TimelineItem';

export default function TimelineTrack({ trackId }) {
  const itemsForTrack = useSelector((state) =>
    selectItemsByTrack(state, trackId)
  );

  return (
    <div className="relative flex h-10 bg-gray-100 rounded">
      {itemsForTrack.map((item) => {
        return <TimelineItem itemId={item.id} key={item.id} />;
      })}
    </div>
  );
}
