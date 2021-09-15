import { TrashIcon } from '@heroicons/react/solid';
import { useHotkeys } from 'react-hotkeys-hook';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from 'components/IconButton';
import styles from './TimelineControls.module.css';
import {
  removeItem,
  selectActiveItemId,
  selectActiveTrackId,
} from './storyboardSlice';

export default function TimelineControls() {
  const dispatch = useDispatch();
  const activeItemId = useSelector(selectActiveItemId);
  const activeTrackId = useSelector(selectActiveTrackId);
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

  return (
    <div className={styles.timelineControls}>
      <IconButton
        icon={TrashIcon}
        disabled={!canDelete}
        onClick={handleDeleteClick}
      />
    </div>
  );
}
