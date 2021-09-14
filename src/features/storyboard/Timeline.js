import TimelineControls from './TimelineControls';
import Tracks from './Tracks';

export default function Timeline() {
  return (
    <div className="h-1/2 fixed inset-x-0 bottom-0 flex flex-col bg-gray-300">
      <TimelineControls />
      <Tracks />
    </div>
  );
}
