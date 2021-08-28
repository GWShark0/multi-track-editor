import IconButton from 'components/IconButton';
import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, selectActiveId } from './storyboardSlice';

export default function TimelineControls() {
  const dispatch = useDispatch();
  const activeId = useSelector(selectActiveId);

  const canDelete = !!activeId;

  const handleDeleteClick = () => {
    dispatch(removeItem(activeId));
  };

  const handleMoveUpClick = () => {
    console.log('move up!');
  };

  const handleMoveDownClick = () => {
    console.log('move down!');
  };

  return (
    <div className="flex p-2 space-x-2 bg-gray-400">
      <IconButton
        icon={TrashIcon}
        disabled={!canDelete}
        onClick={handleDeleteClick}
      />
      <IconButton icon={ArrowUpIcon} disabled onClick={handleMoveUpClick} />
      <IconButton icon={ArrowDownIcon} disabled onClick={handleMoveDownClick} />
    </div>
  );
}
