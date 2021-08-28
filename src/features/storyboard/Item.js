import {
  MusicNoteIcon,
  PhotographIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsActive, setActiveId } from './storyboardSlice';

const TYPES = {
  AUDIO: 'audio',
  IMAGE: 'image',
  VIDEO: 'video',
};

export default function Item(props) {
  const { id, type } = props;
  const dispatch = useDispatch();
  const isActive = useSelector((state) => selectIsActive(state, id));
  const isAudio = type === TYPES.AUDIO;
  const isImage = type === TYPES.IMAGE;
  const isVideo = type === TYPES.VIDEO;

  const handleClick = () => {
    dispatch(setActiveId(id));
  };

  return (
    <div
      className={clsx(
        'relative w-20 h-full border-2 rounded bg-gray-500 border-gray-700 text-white flex items-center pl-2 cursor-pointer',
        {
          'bg-blue-500 border-blue-700 text-blue-700': isAudio,
          'bg-green-500 border-green-700 text-green-700': isImage,
          'bg-red-500 border-red-700 text-red-700': isVideo,
        }
      )}
      onClick={handleClick}
    >
      <div className={clsx({ 'text-yellow-100': isActive })}>
        {isAudio && <MusicNoteIcon className="w-6 h-6" />}
        {isImage && <PhotographIcon className="w-6 h-6" />}
        {isVideo && <VideoCameraIcon className="w-6 h-6" />}
      </div>
      {isActive && (
        <div className="absolute inset-0 border-2 border-yellow-100 rounded" />
      )}
    </div>
  );
}
