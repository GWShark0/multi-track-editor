import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export default function Draggable(props) {
  const { children, id } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = { transform: CSS.Translate.toString(transform) };
  return (
    <div
      className="flex-1 w-full"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}
