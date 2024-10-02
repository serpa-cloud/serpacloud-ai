// @flow
import { useState } from 'react';
import stylex from '@serpa-cloud/stylex';

import { Grid, Spinner, Text } from '../shared';

import Chat from '../Chat';
import Menu from '../Menu';
import Icon from '../shared/Icon';
import InteractiveElement from '../shared/InteractiveElement';
import useCreateChat from '../shared/hooks/useCreateChat';

const styles = stylex.create({
  header: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    borderBottom: '1px solid var(--border-color)',
    justifyContent: 'space-between', // Añadido para alinear el icono a la derecha
  },
  toolBar: {
    '-webkit-app-region': 'no-drag',
  },
  spinnerContainer: {
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Dashboard(): React$Node {
  const [conversation, setConversation] = useState<?string>(null);
  const [conversationRef, setConversationRef] = useState(null);
  const [createChat, createChatPending] = useCreateChat({ setConversation, setConversationRef });

  const handleIconClick = () => {
    createChat();
  };

  return (
    <Grid columns="250px 1fr" columnGap={0}>
      <Menu
        conversation={conversation}
        setConversation={setConversation}
        setConversationRef={setConversationRef}
      />
      <div>
        <header className={`app-header ${stylex(styles.header)}`}>
          <Text type="s0b" color="--primary-color-1">
            Serpa CodeGen AI
          </Text>
          <div className={stylex(styles.toolBar)}>
            {createChatPending ? (
              <div className={stylex(styles.spinnerContainer)}>
                <Spinner size={20} />
              </div>
            ) : (
              <InteractiveElement onClick={handleIconClick}>
                <Icon icon="edit_square" size={24} color="--primary-color-1" />
              </InteractiveElement>
            )}
          </div>
        </header>
        {conversation && conversationRef ? (
          <Chat conversation={conversation} queryReference={conversationRef} key={conversation} />
        ) : null}
      </div>
    </Grid>
  );
}
