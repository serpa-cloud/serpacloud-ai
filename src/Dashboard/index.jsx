// @flow
import stylex from '@serpa-cloud/stylex';

import { Grid, Text } from '../shared';

import Chat from '../Chat';
import Menu from '../Menu';

const styles = stylex.create({
  header: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    borderBottom: '1px solid var(--border-color)',
  },
});

export default function Dashboard(): React$Node {
  return (
    <Grid columns="250px 1fr" columnGap={0}>
      <Menu />
      <div>
        <header className={`app-header ${stylex(styles.header)}`}>
          <Text type="s0b" color="--primary-color-1">
            Serpa CodeGen AI
          </Text>
        </header>
        <Chat />
      </div>
    </Grid>
  );
}
