import { useDispatch } from 'react-redux';
import styles from './MediaControls.module.css';
import MediaItem from './MediaItem';
import { createItem, MEDIA_TYPES } from './media';
import { addItem } from './storyboardSlice';

export default function MediaControls() {
  const dispatch = useDispatch();

  return (
    <div className={styles.mediaControls}>
      <MediaItem
        type={MEDIA_TYPES.text}
        label="Text"
        onDoubleClick={() => dispatch(addItem(createItem(MEDIA_TYPES.text)))}
      />
      <MediaItem
        type={MEDIA_TYPES.video}
        label="Video"
        onDoubleClick={() => dispatch(addItem(createItem(MEDIA_TYPES.video)))}
      />
      <MediaItem
        type={MEDIA_TYPES.image}
        label="Image"
        onDoubleClick={() => dispatch(addItem(createItem(MEDIA_TYPES.image)))}
      />
      <MediaItem
        type={MEDIA_TYPES.audio}
        label="Audio"
        onDoubleClick={() => dispatch(addItem(createItem(MEDIA_TYPES.audio)))}
      />
      <MediaItem
        type={MEDIA_TYPES.overlay}
        label="Overlay"
        onDoubleClick={() => dispatch(addItem(createItem(MEDIA_TYPES.overlay)))}
      />
    </div>
  );
}
