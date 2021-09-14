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

import { MEDIA_TYPES } from './media';
import {
  selectIsActive,
  selectItemById,
  setActiveItemId,
} from './storyboardSlice';

const PX_PER_SEC = 80;

function TrackItem({ itemId }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => selectIsActive(state, itemId));
  const item = useSelector((state) => selectItemById(state, itemId));
  const { duration = 1, startTime = 0, mediaType } = item;

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
    transform: `translateX(${startTime * PX_PER_SEC}px)`,
  };

  return (
    <div
      className={clsx(
        'absolute left-0 top-0 h-full border-2 rounded bg-gray-500 border-gray-700 text-white flex items-center pl-2 cursor-pointer',
        {
          'z-10': isActive,
          'bg-indigo-500 border-indigo-700 text-indigo-700': isAudio,
          'bg-pink-500 border-pink-700 text-pink-700': isText || isOverlay,
          'bg-emerald-500 border-emerald-700 text-emerald-700':
            isVideo || isImage,
        }
      )}
      style={style}
      onClick={handleClick}
    >
      <div className={clsx({ 'text-yellow-100': isActive })}>
        {isAudio && <MusicNoteIcon className="w-6 h-6" />}
        {isImage && <PhotographIcon className="w-6 h-6" />}
        {isOverlay && <LightningBoltIcon className="w-6 h-6" />}
        {isText && <TextIcon className="w-6 h-6 fill-current" />}
        {isVideo && <VideoCameraIcon className="w-6 h-6" />}
      </div>
      {isActive && (
        <div className="absolute inset-0 border-2 border-yellow-100 rounded" />
      )}
    </div>
  );
}

export default memo(TrackItem);
