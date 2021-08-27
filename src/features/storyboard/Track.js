import { useSelector } from 'react-redux';
import Item from './Item';
import { selectAllItems } from './storyboardSlice';

export default function Track() {
  const items = useSelector(selectAllItems);
  return (
    <div className="flex h-10 bg-gray-100">
      {items.map((item) => {
        const { id, type } = item;
        return <Item key={id} type={type} />;
      })}
    </div>
  );
}
