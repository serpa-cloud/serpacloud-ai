// @flow
import stylex from '@serpa-cloud/stylex';
import { useState, useCallback } from 'react';
import { useLazyLoadQuery, graphql } from 'react-relay';

import Projects from './Projects';

import {
  Icon,
  Text,
  Flexbox,
  InteractiveElement,
  ContextualMenu,
  Avatar,
  ScrolledList,
  Margin,
} from '../shared';

import ChatResume from './ChatResume';

const styles = stylex.create({
  navbar: {
    width: 250,
    height: '100vh',
    borderRight: '1px solid var(--border-color)',
    paddingTop: 36,
    boxSizing: 'border-box',
  },
  namespaceSelectorContainer: {
    position: 'relative',
    paddingLeft: 8,
    paddingRight: 8,
  },
  horizontalMenu: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '8px 0',
    borderBottom: '1px solid var(--border-color)',
    marginTop: 24, // Added margin to separate from NamespaceSelector
  },
  menuItem: {
    cursor: 'pointer',
    paddingBottom: 12, // Added padding between labels and bottom border
    flex: 1, // Ensure each menu item takes up half of the horizontal menu
    textAlign: 'center', // Center the text within each menu item
  },
  menuItemSelected: {
    color: 'var(--primary-color-1)',
    borderBottom: '1px solid var(--primary-color-1)',
  },
  chatsContainer: {
    height: 'calc(100vh - 124px)', // Adjusted height to account for the new horizontal menu
    overflow: 'auto',
    paddingLeft: 8,
    paddingRight: 8,
  },
});

type Props = {|
  +conversation: ?string,
  +setConversation: (string) => void,
  +setConversationRef: (any) => void,
|};

export default function Menu({
  conversation,
  setConversation,
  setConversationRef,
}: Props): React$Node {
  const [orgMenuIsOpen, setOrgMenuIsOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string>('chats'); // State for selected menu

  const handleOnToggleOrgMenu = useCallback(
    (e) => {
      e.stopPropagation();

      setTimeout(() => {
        setOrgMenuIsOpen((x) => !x);
      }, 1);
    },
    [setOrgMenuIsOpen],
  );

  const data = useLazyLoadQuery(
    graphql`
      query MenuQuery {
        getCurrentNameSpace {
          id
          ... on User {
            id
            username
            media(width: 48, height: 48) {
              ...Avatar
            }
          }
          ... on Org {
            id
            key
            media(width: 48, height: 48) {
              ...Avatar
            }
          }
        }
      }
    `,
    {},
    {
      fetchPolicy: 'store-and-network',
    },
  );

  const renderElement = useCallback(
    (node, key) => (
      <ChatResume
        node={node}
        key={key}
        conversation={conversation}
        setConversation={setConversation}
        setConversationRef={setConversationRef}
      />
    ),
    [conversation, setConversation, setConversationRef],
  );

  const namespace = data?.getCurrentNameSpace;

  return (
    <nav className={stylex(styles.navbar)}>
      <div className={stylex(styles.namespaceSelectorContainer)}>
        <InteractiveElement onClick={handleOnToggleOrgMenu}>
          <div className={stylex(styles.namespaceSelector)}>
            <Flexbox alignItems="center" columnGap={8}>
              <Flexbox alignItems="center" columnGap={8}>
                <Avatar node={namespace?.media} />
                <Text type="s0b" color="--neutral-color-800">
                  {`@${namespace?.username ?? namespace?.key ?? ''}`}
                </Text>
              </Flexbox>
              <div className={stylex(styles.arrowContainer)}>
                <Icon
                  icon="unfold_more"
                  size={16}
                  weight={400}
                  opticalSize={20}
                  color="--neutral-color-800"
                />
              </div>
            </Flexbox>
          </div>
        </InteractiveElement>
        <ContextualMenu
          open={orgMenuIsOpen}
          containerHeight={32}
          anchor="LEFT"
          onClose={() => {
            setOrgMenuIsOpen(false);
          }}
          className={stylex(styles.contextualMenu)}
        >
          Hola mundo
        </ContextualMenu>
      </div>
      <div className={stylex(styles.horizontalMenu)}>
        <InteractiveElement
          className={stylex(
            styles.menuItem,
            selectedMenu === 'projects' && styles.menuItemSelected,
          )}
          onClick={() => setSelectedMenu('projects')}
        >
          <Text
            type="s0b"
            id="menu.projects"
            textAlign="center"
            color={selectedMenu === 'projects' ? '--primary-color-1' : '--neutral-color-800'}
          >
            Projects
          </Text>
        </InteractiveElement>
        <InteractiveElement
          className={stylex(styles.menuItem, selectedMenu === 'chats' && styles.menuItemSelected)}
          onClick={() => setSelectedMenu('chats')}
        >
          <Text
            type="s0b"
            id="menu.chats"
            textAlign="center"
            color={selectedMenu === 'chats' ? '--primary-color-1' : '--neutral-color-800'}
          >
            Chats
          </Text>
        </InteractiveElement>
      </div>
      <Margin top={8}>
        {selectedMenu === 'projects' ? (
          <Projects namespace={namespace?.key ?? ''} />
        ) : (
          <ScrolledList
            first={99}
            index="CHATS"
            renderElement={renderElement}
            container={
              <Flexbox
                flexDirection="column"
                rowGap={8}
                className={stylex(styles.chatsContainer)}
              />
            }
            sort={{
              property: 'createdAt',
              value: 'desc',
            }}
          />
        )}
      </Margin>
    </nav>
  );
}
