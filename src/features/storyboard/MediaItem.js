import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';

import styles from './MediaItem.module.css';

export default function MediaItem(props) {
  const { label, type } = props;
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
      id: `media-item-${type}`,
      data: {
        type: 'media-item',
        mediaType: type,
      },
    });
  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div
      className={clsx(styles.mediaItem, isDragging && styles.dragging)}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {label}
    </div>
  );
}
