// @flow
import stylex from '@serpa-cloud/stylex';

export type CardProps = {
  className?: string,
  children?: React$Node,
  hideBorder?: ?boolean,
  hideShadow?: ?boolean,
  backgroundColor?: ?string,
};

const styles = stylex.create({
  container: {
    zIndex: 0,
    borderRadius: 8,
    position: 'relative',
    boxShadow: 'var(--shadow-1-color)',
    backgroundColor: 'var(--card-background)',
  },
});

export default function Card({
  children,
  className = '',
  hideBorder,
  hideShadow,
  backgroundColor,
}: CardProps): React$Node {
  return (
    <div
      className={`${stylex(styles.container)} ${className}`}
      style={{
        borderWidth: hideBorder ? 0 : 1,
        boxShadow: hideShadow ? 'none' : 'var(--shadow-1-color)',
        backgroundColor: backgroundColor ? `var(${backgroundColor})` : 'var(--card-background)',
      }}
    >
      {children}
    </div>
  );
}

Card.defaultProps = {
  className: '',
  children: null,
  hideBorder: false,
  hideShadow: false,
  backgroundColor: '',
};
