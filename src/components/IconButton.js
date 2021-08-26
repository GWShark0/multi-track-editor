import clsx from 'clsx';

const COLORS = {
  BLUE: 'blue',
  RED: 'red',
};

export default function IconButton(props) {
  const { color = COLORS.BLUE, icon: Icon, onClick, ...rest } = props;

  return (
    <button
      className={clsx('flex p-1 text-white rounded-full', {
        'hover:bg-blue-600 bg-blue-500': color === COLORS.BLUE,
        'hover:bg-red-600 bg-red-500': color === COLORS.RED,
      })}
      onClick={onClick}
      {...rest}
    >
      {Icon && <Icon className="w-4 h-4" />}
    </button>
  );
}
