/* eslint-disable no-useless-escape */
/* eslint-disable react/no-array-index-key */
// @flow
import stylex from '@serpa-cloud/stylex';
import { graphql, useFragment } from 'react-relay';

import { Flexbox } from '../shared';

import MarkdownToJsx from './MarkdownToJSX';

import type { ChatMessage$key } from './__generated__/ChatMessage.graphql';

type Props = {|
  node: ChatMessage$key,
|};

const styles = stylex.create({
  userContainer: {
    maxWidth: '60%',
    borderRadius: 7.5,
    paddingLeft: 9,
    paddingRight: 12,
    paddingTop: 7,
    paddingBottom: 8,
    boxSizing: 'border-box',
    background: 'var(--primary-color-1)',
    boxShadow: '0 1px .5px rgba(11, 20, 26, .13)',
  },
  assistantContainer: {
    maxWidth: 'calc(100% - 40px)',
  },
  text: {
    margin: 0,
    minWidth: 0,
    fontSize: '14.2px',
    display: 'block',
    maxWidth: '100%',
    lineHeight: '19px',
    fontWeight: '400',
    textAlign: 'left',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    fontFamily: 'var(--font-family-default)',
    textRendering: 'optimizelegibility',
    whiteSpaceCollapse: 'preserve',
  },
  textUser: {
    color: 'var(--neutral-color-100)',
  },
  textAssitant: {
    color: 'var(--neutral-color-800)',
  },
});

export default function ChatMessage({ node }: Props): React$Node {
  const data = useFragment(
    graphql`
      fragment ChatMessage on AIMessage {
        id
        role
        content
        createdAt
      }
    `,
    node,
  );

  const isUser = data.role === 'user';
  const isAssistant = !isUser;

  return (
    <Flexbox justifyContent={isUser ? 'flex-end' : 'flex-start'}>
      <div
        className={stylex(
          styles.container,
          isUser ? styles.userContainer : styles.assistantContainer,
        )}
      >
        <Flexbox columnGap={16}>
          <div className={stylex(styles.text, isUser ? styles.textUser : styles.textAssitant)}>
            {isAssistant && <MarkdownToJsx markdownText={data.content} />}
            {isUser && <div>{data.content}</div>}
          </div>
        </Flexbox>
      </div>
    </Flexbox>
  );
}
