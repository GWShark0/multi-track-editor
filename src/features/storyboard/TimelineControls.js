import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { useHotkeys } from 'react-hotkeys-hook';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from 'components/IconButton';

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

  const deleteItem = () => {
    if (activeItemId && activeTrackId) {
      dispatch(removeItem({ itemId: activeItemId, trackId: activeTrackId }));
    }
  };

  const handleDeleteClick = () => deleteItem();
  useHotkeys('backspace', () => deleteItem(), {}, [
    activeItemId,
    activeTrackId,
  ]);

  const handleMoveUpClick = () => {
    dispatch(
      moveItem({
        itemId: activeItemId,
        fromTrackId: activeTrackId,
        toTrackId: previousTrackId,
      })
    );
  };

  const handleMoveDownClick = () => {
    dispatch(
      moveItem({
        itemId: activeItemId,
        fromTrackId: activeTrackId,
        toTrackId: nextTrackId,
      })
    );
  };

  const handleMoveRightClick = () => {
    dispatch(updateItem({ itemId: activeItemId, delta: 1 }));
  };

  const handleMoveLeftClick = () => {
    dispatch(updateItem({ itemId: activeItemId, delta: -1 }));
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
