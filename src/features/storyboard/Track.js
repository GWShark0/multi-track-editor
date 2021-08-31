import { useSelector } from 'react-redux';
import Item from './Item';
import { selectItemsByTrack } from './storyboardSlice';

export default function Track(props) {
  const { id } = props;
  const itemsForTrack = useSelector((state) => selectItemsByTrack(state, id));

  return (
    <div className="relative flex h-10 bg-gray-100 rounded">
      {itemsForTrack.map((item) => {
        return (
          <Item
            id={item.id}
            duration={item.duration}
            key={item.id}
            startTime={item.startTime}
            trackId={id}
            type={item.type}
          />
        );
      })}
    </div>
  );
}
