import padStart from 'lodash/padStart';

const padZero = (n) => padStart(n, 2, 0);

// formats a raw duration (in seconds) to a hh:mm:ss timestamp string
export default function formatTimestamp(duration = 0, options = {}) {
  const {
    padHours = true,
    padMinutes = true,
    padSeconds = true,
    showMs = false,
  } = options;

  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor(duration / 60) % 60;
  const seconds = Math.floor(duration % 60);

  const hh = hours > 0 && padHours ? padZero(hours) : hours;
  const mm = padMinutes ? padZero(minutes) : minutes;
  const ss = padSeconds ? padZero(seconds) : seconds;
  const ms = showMs && duration.toFixed(2).substr(-2);

  return `${hh ? `${hh}:` : ''}${mm}:${ss}${ms ? `.${ms}` : ''}`;
}
