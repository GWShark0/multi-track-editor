import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';

export default function MediaItem(props) {
  const { label, type } = props;
  const id = `media-item-${type}`;
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({ id, data: { type } });

  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div
      className={clsx(
        'hover:bg-gray-50 relative flex-1 bg-white border border-gray-300 rounded shadow-sm cursor-grab z-50',
        { 'cursor-grabbing': isDragging }
      )}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="aspect-w-16 aspect-h-9">
        <div className="flex items-center justify-center w-full h-full text-xs font-medium text-gray-700">
          {label}
        </div>
      </div>
    </div>
  );
}
