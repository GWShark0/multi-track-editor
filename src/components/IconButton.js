import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './IconButton.module.css';

const COLORS = {
  BLUE: 'blue',
  GREEN: 'green',
  RED: 'red',
};

const SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
};

export default function IconButton(props) {
  const {
    className,
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
        styles.iconButton,
        {
          [styles.blue]: color === COLORS.BLUE,
          [styles.green]: color === COLORS.GREEN,
          [styles.red]: color === COLORS.RED,
          [styles.small]: size === SIZES.SMALL,
          [styles.round]: round,
        },
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {Icon && <Icon className={styles.icon} />}
    </button>
  );
}

IconButton.propTypes = {
  color: PropTypes.oneOf([COLORS.BLUE, COLORS.GREEN, COLORS.RED]),
  icon: PropTypes.elementType,
  onClick: PropTypes.func,
  round: PropTypes.bool,
  size: PropTypes.oneOf([SIZES.SMALL, SIZES.MEDIUM]),
};
