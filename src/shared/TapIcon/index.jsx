// @flow

import { useTransition, animated } from 'react-spring';
import { useLayoutEffect, useState, useRef, useCallback, useEffect } from 'react';

import Text from '../Text';
import Icon from '../Icon';
import InteractiveElement from '../InteractiveElement';

import styles from './index.module.sass';

type Props = {|
  +icon: string,
  +label: string,
  +keymap: string,
  +onTap: () => void,
  +modifier?: ?('metaKey' | 'ctrlKey'),
|};

const SAFE_SPACE = 16;
const HALF_WIDTH_OF_CONTAINER = 20;

export default function TapIcon({
  icon,
  label,
  onTap,
  keymap,
  modifier = null,
}: Props): React$Node {
  const containerRef = useRef();
  const labelRef = useRef();
  const [anchor, setAnchor] = useState('Bottom');
  const [isHovered, setIsHovered] = useState(false);

  const calculateAnchor = useCallback(() => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const labelRect = labelRef.current?.getBoundingClientRect();

    const halfWidthOfLabel = (labelRect?.width ?? 0) / 2;

    const spaceToTheLeft = halfWidthOfLabel + SAFE_SPACE;
    const positionFromBottomAnchor = (containerRect?.left ?? 0) + HALF_WIDTH_OF_CONTAINER;

    if (spaceToTheLeft > positionFromBottomAnchor) setAnchor('Right');
    else setAnchor('Bottom');
  }, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      if ((!modifier || event[modifier]) && event.key === keymap) {
        event.preventDefault();
        onTap();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [keymap, modifier, onTap]);

  useLayoutEffect(calculateAnchor);

  const transitions = useTransition(isHovered, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        onMouseEnter={() => {
          setIsHovered(true);
          calculateAnchor();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <InteractiveElement className={styles.tap} onClick={onTap}>
          <Icon
            grade={0}
            icon={icon}
            weight={200}
            gradient="linear-gradient(225deg, rgb(255, 82, 207) 0%, rgb(255, 103, 82) 100%)"
          />
        </InteractiveElement>
      </div>

      {transitions((style, item) =>
        item ? (
          <animated.div
            style={style}
            className={`${styles.labelContainer} ${styles[`anchor${anchor}`]}`}
            ref={labelRef}
          >
            <Text type="s1m" color="--neutral-color-100">
              {label}
            </Text>
          </animated.div>
        ) : null,
      )}
    </div>
  );
}
