import { useSelector } from 'react-redux';
import Item from './Item';
import { selectItemsByTrack } from './storyboardSlice';

export default function Track({ trackId }) {
  const itemsForTrack = useSelector((state) =>
    selectItemsByTrack(state, trackId)
  );

  return (
    <div className="relative flex h-10 bg-gray-100 rounded">
      {itemsForTrack.map((item) => {
        return <Item itemId={item.id} key={item.id} />;
      })}
    </div>
  );
}
