import { useSelector } from 'react-redux';
import Item from './Item';
import { selectItemsByTrack } from './storyboardSlice';

export default function Track(props) {
  const { id } = props;
  const itemsForTrack = useSelector((state) => selectItemsByTrack(state, id));

  return (
    <div className="flex h-10 bg-gray-100 rounded">
      {itemsForTrack.map((item) => {
        const { id, type } = item;
        return <Item id={id} key={id} type={type} />;
      })}
    </div>
  );
}
