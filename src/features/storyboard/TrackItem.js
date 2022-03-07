import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
  LightningBoltIcon,
  MusicNoteIcon,
  PhotographIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as TextIcon } from 'assets/text.svg';
import { PX_PER_SEC } from 'utils/constants';
import styles from './TrackItem.module.css';
import { MEDIA_TYPES } from './media';
import {
  selectIsActive,
  selectItemById,
  setActiveItemId,
} from './storyboardSlice';

function TrackItem({ itemId, trackId }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => selectIsActive(state, itemId));
  const item = useSelector((state) => selectItemById(state, itemId));
  const { duration = 1, mediaType } = item;

  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
      id: `track-item-${itemId}`,
      data: {
        type: 'track-item',
        itemId,
        trackId,
        mediaType,
      },
    });

  const isAudio = mediaType === MEDIA_TYPES.audio;
  const isImage = mediaType === MEDIA_TYPES.image;
  const isOverlay = mediaType === MEDIA_TYPES.overlay;
  const isText = mediaType === MEDIA_TYPES.text;
  const isVideo = mediaType === MEDIA_TYPES.video;

  const handleClick = () => {
    dispatch(setActiveItemId(itemId));
  };

  const style = {
    width: duration * PX_PER_SEC,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      className={clsx(styles.trackItem, {
        [styles.active]: isActive,
        [styles.dragging]: isDragging,
        [styles.blue]: isAudio,
        [styles.pink]: isText || isOverlay,
        [styles.green]: isVideo || isImage,
      })}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
    >
      {isAudio && <MusicNoteIcon className={styles.icon} />}
      {isImage && <PhotographIcon className={styles.icon} />}
      {isOverlay && <LightningBoltIcon className={styles.icon} />}
      {isText && <TextIcon className={styles.icon} />}
      {isVideo && <VideoCameraIcon className={styles.icon} />}
      {isActive && <div className={styles.activeBorder} />}
    </div>
  );
}

export default memo(TrackItem);
