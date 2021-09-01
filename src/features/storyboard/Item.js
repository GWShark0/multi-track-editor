import React from 'react';
import {
  LightningBoltIcon,
  MusicNoteIcon,
  PhotographIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { MEDIA_TYPES } from './media';
import {
  selectIsActive,
  selectItemById,
  setActiveItemId,
} from './storyboardSlice';
import { ReactComponent as TextIcon } from 'assets/text.svg';

const PX_PER_SEC = 80;

function Item({ itemId }) {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => selectIsActive(state, itemId));
  const item = useSelector((state) => selectItemById(state, itemId));
  const { duration = 1, startTime = 0, type } = item;

  const isAudio = type === MEDIA_TYPES.AUDIO;
  const isImage = type === MEDIA_TYPES.IMAGE;
  const isOverlay = type === MEDIA_TYPES.OVERLAY;
  const isText = type === MEDIA_TYPES.TEXT;
  const isVideo = type === MEDIA_TYPES.VIDEO;

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
          'bg-blue-500 border-blue-700 text-blue-700': isAudio,
          'bg-green-500 border-green-700 text-green-700': isImage,
          'bg-pink-500 border-pink-700 text-pink-700': isOverlay,
          'bg-cyan-500 border-cyan-700 text-cyan-700': isText,
          'bg-red-500 border-red-700 text-red-700': isVideo,
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

export default React.memo(Item);
