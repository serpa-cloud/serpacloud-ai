// @flow
import stylex from '@serpa-cloud/stylex';
import { useState, useCallback, memo } from 'react';

import Text from './Text';
import Flexbox from './Flexbox';
import Spinner from './Spinner';

import Icon from './Icon';
import InteractiveElement from './InteractiveElement';

import type { InteractiveElementEvent } from './InteractiveElement';

const styles = stylex.create({
  container: {
    height: 40,
    position: 'relative',
    '-webkit-tap-highlight-color': 'transparent',
    '-webkit-user-select': 'none',
    transitionTimingFunction: 'var(--fds-animation-fade-out)',
    transitionDuration: 'var(--fds-duration-extra-extra-short-out)',
    transitionProperty: 'opacity, transform',
    borderRadius: 20,
    boxShadow: 'var(--shadow-1-color)',
    ':hover': {
      boxShadow: 'var(--shadow-2-color)',
      transform: 'scale(1.02)',
    },
  },
  heroContainer: {
    height: 56,
  },
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    outline: 'none',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
    touchAction: 'manipulation',
  },
  textContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    boxSizing: 'border-box',
    flexShrink: 0,
    flexWrap: 'nowrap',
  },
  main: {
    color: 'var(--neutral-color-100)',
    fill: 'var(--neutral-color-100)',
    background:
      'linear-gradient(265.7deg, var(--pink-solid-color) -2.24%, var(--orange-solid-color) 102.98%)',
  },
  primary: {
    color: 'var(--neutral-color-100)',
    fill: 'var(--neutral-color-100)',
    backgroundColor: 'var(--primary-color-1)',
  },
  secondary: {
    color: 'var(--primary-color-1)',
    fill: 'var(--primary-color-1)',
    backgroundColor: 'var(--neutral-color-100)',
  },
  danger: {
    color: 'var(--neutral-color-100)',
    fill: 'var(--neutral-color-100)',
    backgroundColor: 'var(--red-300)',
  },
  enable: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.4,
    pointerEvents: 'none',
  },
  overlay: {
    backgroundColor: 'var(--button-primary-color-hoverlay)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    borderRadius: 20,
    width: '100%',
    height: '100%',
    transitionDuration: 'var(--fds-duration-extra-short-in)',
    transitionTimingFunction: 'var(--fds-animation-fade-in)',
    transitionProperty: 'opacity',
    ':hover': {
      transitionDuration: 'var(--fds-duration-extra-short-out)',
      transitionTimingFunction: 'var(--fds-animation-fade-out)',
    },
  },
  secondaryOverlay: {
    backgroundColor: 'var(--button-secondary-color-hoverlay)',
  },
  mainOverlay: {
    background:
      'linear-gradient(265.7deg, var(--orange-solid-color) -2.24%, var(--pink-solid-color) 102.98%)',
  },
  dangerOverlay: {
    backgroundColor: 'var(--red-400)',
  },
  unhover: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
  },
  tertiary: {
    backgroundColor: 'var(--neutral-color-100)',
    boxShadow: 'var(--shadow-2)',
    border: '1px solid var(--neutral-color-200)',
  },
});

export type ButtonType = 'primary' | 'secondary' | 'danger' | 'main';
export type ButtonSize = 'default' | 'hero';

type Props = {|
  +children?: ?string,
  +icon?: ?string,
  +iconRight?: ?string,
  +disabled?: boolean,
  +buttonType?: ButtonType,
  +onClick: InteractiveElementEvent,
  +size?: ?ButtonSize,
  +loading?: ?boolean,
  +autoFocus?: ?boolean,
|};

function Button({
  icon = null,
  children = null,
  size = 'default',
  iconRight = null,
  disabled = false,
  onClick,
  buttonType = 'main',
  autoFocus = false,
  loading = false,
}: Props): React$Node {
  const [hover, setHover] = useState<boolean>(false);
  const isHero = size === 'hero';

  const handleOnClick = useCallback(
    (e) => {
      if (onClick) onClick(e);
    },
    [onClick],
  );

  return (
    <div
      className={stylex(
        styles.container,
        styles[buttonType],
        disabled ? styles.disabled : styles.enable,
        isHero ? styles.heroContainer : null,
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <InteractiveElement
        onClick={onClick}
        disabled={disabled}
        autoFocus={autoFocus}
        onKeyPress={handleOnClick}
        className={stylex(styles.content)}
        label={children ?? ''}
      >
        <Flexbox
          className={stylex(styles.textContainer)}
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          columnGap={isHero ? 24 : 12}
        >
          {loading && <Spinner size={16} color="var(--always-white)" />}
          {icon && (
            <Icon
              icon={icon}
              size={20}
              color={
                buttonType === 'secondary' ? '--primary-color-1' : '--button-primary-text-color'
              }
            />
          )}
          <Text
            type={isHero ? 's2m' : 's0b'}
            color={buttonType === 'secondary' ? '--primary-color-1' : '--button-primary-text-color'}
          >
            {children}
          </Text>
          {iconRight && (
            <Icon
              icon={iconRight}
              size={20}
              color={
                buttonType === 'secondary' ? '--primary-color-1' : '--button-primary-text-color'
              }
            />
          )}
        </Flexbox>
      </InteractiveElement>
      <div
        className={stylex(
          styles.overlay,
          buttonType === 'secondary' ? styles.secondaryOverlay : null,
          buttonType === 'danger' ? styles.dangerOverlay : null,
          buttonType === 'main' ? styles.mainOverlay : null,
          hover ? styles.hover : styles.unhover,
        )}
      />
    </div>
  );
}

export default (memo<Props>(Button): React$AbstractComponent<Props, mixed>);
