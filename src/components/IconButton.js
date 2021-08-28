import clsx from 'clsx';

const COLORS = {
  BLUE: 'blue',
  RED: 'red',
};

const SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
};

export default function IconButton(props) {
  const {
    color,
    icon: Icon,
    onClick,
    round,
    size = SIZES.MEDIUM,
    ...rest
  } = props;

  return (
    <button
      className={clsx(
        'flex text-white rounded hover:bg-gray-600 bg-gray-500 disabled:opacity-50 disabled:pointer-events-none',
        {
          'hover:bg-blue-600 bg-blue-500': color === COLORS.BLUE,
          'hover:bg-red-600 bg-red-500': color === COLORS.RED,
          'p-1': size === SIZES.SMALL,
          'p-2': size === SIZES.MEDIUM,
          'rounded-full': round,
        }
      )}
      onClick={onClick}
      {...rest}
    >
      {Icon && (
        <Icon
          className={clsx({
            'w-4 h-4': size === SIZES.SMALL,
            'w-5 h-5': size === SIZES.MEDIUM,
          })}
        />
      )}
    </button>
  );
}
