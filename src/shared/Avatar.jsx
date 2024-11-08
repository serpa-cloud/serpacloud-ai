// @flow
import { Suspense } from 'react';
import stylex from '@serpa-cloud/stylex';
import { graphql, useFragment } from 'react-relay';

import SuspenseImage from './SuspensableImage';

import type { Avatar$key } from './__generated__/Avatar.graphql';

export type { Avatar$key };

const styles = stylex.create({
  avatar: {
    objectFit: 'cover',
    backgroundColor: 'var(--neutral-color-400)',
  },
  avatarFallback: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    borderRadius: '100%',
  },
  rounded: {
    borderRadius: 0,
  },
  shadow: {
    boxShadow: 'var(--shadow-1-color)',
    transitionDuration: 'var(--fds-duration-medium-in)',
    transitionTimingFunction: 'var(--fds-animation-fade-in)',
    ':hover': {
      boxShadow: 'var(--shadow-2-color)',
      transitionDuration: 'var(--fds-duration-medium-out)',
      transitionTimingFunction: 'var(--fds-animation-fade-out)',
    },
  },
});

type Props = {|
  +circle?: ?boolean,
  +shadow?: ?boolean,
  +className?: ?string,
  +fixedWidth?: ?number,
  +fixedHeight?: ?number,
  +node: null | Avatar$key,
  +fallbackIcon?: ?React$Node,
|};

export default function Avatar({
  node,
  circle,
  shadow,
  className,
  fixedWidth,
  fixedHeight,
  fallbackIcon,
}: Props): React$Node {
  const data = useFragment(
    graphql`
      fragment Avatar on Image {
        id
        url
        alt
        width
        height
      }
    `,
    node,
  );

  if (!data)
    return (
      <div
        style={{
          width: `${fixedWidth ?? 40}px`,
          height: fixedHeight ? `${fixedHeight}px` : `${fixedWidth ?? 40}px`,
        }}
        className={stylex(
          className,
          styles.avatar,
          styles.avatarFallback,
          circle ? styles.circle : styles.rounded,
          shadow ? styles.shadow : '',
        )}
      >
        {fallbackIcon && fallbackIcon}
      </div>
    );

  const { alt, width, height, url } = data;

  return (
    <Suspense
      fallback={
        <div
          style={{
            width: `${fixedWidth || width / 2}px`,
            height: height ? `${fixedHeight || height / 2}px` : `${fixedWidth || width / 2}px`,
          }}
          className={stylex(
            className,
            styles.avatar,
            circle ? styles.circle : styles.rounded,
            shadow ? styles.shadow : '',
          )}
        />
      }
    >
      <SuspenseImage
        alt={alt}
        src={url}
        width={`${fixedWidth || width / 2}px`}
        height={height ? `${fixedHeight || height / 2}px` : 'auto'}
        className={stylex(
          className,
          styles.avatar,
          circle ? styles.circle : styles.rounded,
          shadow ? styles.shadow : '',
        )}
      />
    </Suspense>
  );
}

Avatar.defaultProps = {
  shadow: false,
  circle: true,
  className: '',
  fixedWidth: null,
  fixedHeight: null,
  fallbackIcon: null,
};
