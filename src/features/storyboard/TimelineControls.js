import IconButton from 'components/IconButton';
import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import {
  moveItem,
  removeItem,
  selectActiveItemId,
  selectLastTrackId,
} from './storyboardSlice';

export default function TimelineControls() {
  const dispatch = useDispatch();
  const activeItemId = useSelector(selectActiveItemId);
  const lastTrackId = useSelector(selectLastTrackId);

  const canDelete = !!activeItemId;

  const handleDeleteClick = () => {
    dispatch(removeItem(activeItemId));
  };

  const handleMoveUpClick = () => {
    console.log('move up!');
  };

  const handleMoveDownClick = () => {
    dispatch(moveItem({ id: activeItemId, trackId: lastTrackId }));
  };

  return (
    <div className="flex p-2 space-x-2 bg-gray-400">
      <IconButton
        icon={TrashIcon}
        disabled={!canDelete}
        onClick={handleDeleteClick}
      />
      <IconButton icon={ArrowUpIcon} disabled onClick={handleMoveUpClick} />
      <IconButton icon={ArrowDownIcon} onClick={handleMoveDownClick} />
    </div>
  );
}
