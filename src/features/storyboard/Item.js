import {
  MusicNoteIcon,
  PhotographIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';

const TYPES = {
  AUDIO: 'audio',
  IMAGE: 'image',
  VIDEO: 'video',
};

export default function Item(props) {
  const { type } = props;
  const isAudio = type === TYPES.AUDIO;
  const isImage = type === TYPES.IMAGE;
  const isVideo = type === TYPES.VIDEO;

  return (
    <div
      className={clsx(
        'w-20 h-full border-2 rounded bg-gray-500 border-gray-700 text-white flex items-center pl-2',
        {
          'bg-blue-500 border-blue-700 text-blue-700': isAudio,
          'bg-green-500 border-green-700 text-green-700': isImage,
          'bg-red-500 border-red-700 text-red-700': isVideo,
        }
      )}
    >
      {isAudio && <MusicNoteIcon className="w-6 h-6" />}
      {isImage && <PhotographIcon className="w-6 h-6" />}
      {isVideo && <VideoCameraIcon className="w-6 h-6" />}
    </div>
  );
}
