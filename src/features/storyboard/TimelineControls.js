import IconButton from 'components/IconButton';
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import {
  moveItem,
  removeItem,
  selectActiveItemId,
  selectActiveTrackId,
  selectNextTrackId,
  selectPreviousTrackId,
  updateItem,
} from './storyboardSlice';

export default function TimelineControls() {
  const dispatch = useDispatch();
  const activeItemId = useSelector(selectActiveItemId);
  const activeTrackId = useSelector(selectActiveTrackId);
  const nextTrackId = useSelector((state) =>
    selectNextTrackId(state, activeTrackId)
  );
  const previousTrackId = useSelector((state) =>
    selectPreviousTrackId(state, activeTrackId)
  );
  const canDelete = !!activeItemId;

  const handleDeleteClick = () => {
    dispatch(removeItem(activeItemId));
  };

  const handleMoveUpClick = () => {
    dispatch(moveItem({ id: activeItemId, trackId: previousTrackId }));
  };

  const handleMoveDownClick = () => {
    dispatch(moveItem({ id: activeItemId, trackId: nextTrackId }));
  };

  const handleMoveRightClick = () => {
    dispatch(updateItem({ id: activeItemId, delta: 1 }));
  };

  const handleMoveLeftClick = () => {
    dispatch(updateItem({ id: activeItemId, delta: -1 }));
  };

  return (
    <div className="flex p-2 space-x-2 bg-gray-400">
      <IconButton
        icon={TrashIcon}
        disabled={!canDelete}
        onClick={handleDeleteClick}
      />
      <IconButton
        icon={ArrowUpIcon}
        disabled={!previousTrackId}
        onClick={handleMoveUpClick}
      />
      <IconButton
        icon={ArrowDownIcon}
        disabled={!nextTrackId}
        onClick={handleMoveDownClick}
      />
      <IconButton
        icon={ArrowLeftIcon}
        disabled={!activeItemId}
        onClick={handleMoveLeftClick}
      />
      <IconButton
        icon={ArrowRightIcon}
        disabled={!activeItemId}
        onClick={handleMoveRightClick}
      />
    </div>
  );
}
