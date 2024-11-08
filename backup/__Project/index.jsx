// @flow
import stylex from '@serpa-cloud/stylex';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

import {
  Grid,
  Icon,
  Text,
  Input,
  Button,
  Flexbox,
  Padding,
  Spinner,
  InteractiveElement,
  useInput,
  validateData,
} from '../shared';

import Chat from '../Chat';
import Loader from '../Chat/Loader';
import Webpreview from './Webpreview';

import useCreateChat from '../shared/hooks/useCreateChat';
import useSendAIMessage from '../shared/hooks/useSendAIMessage';

const styles = stylex.create({
  header: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
    '-webkit-app-region': 'no-drag',
  },
  loaderContainer: {
    width: '100dvw',
    height: '100dvh',
  },
  preview: {
    border: '1px solid var(--neutral-color-300)',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
  },
  grid: {},
  dialog: {
    borderRadius: 8,
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-1)',
    outline: 'none',
    width: 480,
    boxSizing: 'border-box',
    padding: 0,
  },
  previewOn: {
    paddingTop: 12,
    paddingBottom: 12,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  previewOff: {
    paddingTop: 12,
    paddingBottom: 12,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  previewTabActive: {
    backgroundColor: 'var(--primary-color-1)',
    border: '1px solid var(--primary-color-1)',
  },
  previewTabInactive: {
    border: '1px solid var(--neutral-color-300)',
  },
});

export default function Project(): React$Node {
  const dialogRef = useRef(null);
  const params = useParams();
  const [previewIsOn, setPreviewIsOn] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(localStorage.getItem('previewUrl'));
  const [showPreview, setShowPreview] = useState(!!previewUrl);
  const navigate = useNavigate();

  const data = useLazyLoadQuery(
    graphql`
      query ProjectQuery($id: ID!) {
        node(id: $id) {
          id
          ... on AIProject {
            id
            name
            summary
          }
        }
      }
    `,
    {
      id: params?.project ?? '',
    },
    { fetchPolicy: 'store-and-network' },
  );

  const node = data?.node;
  const [createChat, createChatPending] = useCreateChat();
  const [isReindexing, setIsReindexing] = useState(node?.mode === 'IMPROVE');

  useEffect(() => {
    if (isReindexing) {
      const reindexSelectedDirectories = async () => {
        try {
          await window.codegen.reindexDirectories(node?.name);
        } catch (error) {
          console.error('Error al reindexar los directorios:', error);
        } finally {
          setIsReindexing(false);
        }
      };

      reindexSelectedDirectories();
    }
  }, [node?.name, isReindexing]);

  useEffect(() => {
    if (!isReindexing && !showPreview) dialogRef?.current?.showModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReindexing]);

  const [sendMessage, sendMessagePending] = useSendAIMessage(
    node?.currentConversation?.id,
    node?.name,
  );

  const currentConversationIsFirst = node?.currentConversation?.id === node?.firstConversation?.id;

  useEffect(() => {
    if (
      !isReindexing &&
      !node?.firstConversation?.resume &&
      !sendMessagePending &&
      currentConversationIsFirst
    ) {
      sendMessage(node?.description ?? '');
    }
  }, [
    isReindexing,
    node?.description,
    node?.firstConversation?.resume,
    sendMessage,
    sendMessagePending,
    currentConversationIsFirst,
  ]);

  const host = useInput({
    name: 'host',
    label: `App's host (ej. http://localhost:3000)`,
    value: localStorage.getItem('previewUrl') || '',
    required: true,
    errors: {
      requiredError: 'To enable the preview, you must enter the app’s URL',
    },
  });

  const handlePreviewSetup = (e) => {
    e?.preventDefault();

    if (previewIsOn) {
      const { errors } = validateData([host]);
      if (!errors) {
        setShowPreview(true);
        dialogRef?.current?.close();

        localStorage.setItem('previewUrl', host.input.value);
        setPreviewUrl(host.input.value);
      }
    } else {
      setShowPreview(false);
      setPreviewUrl(null);
      dialogRef?.current?.close();
    }
  };

  const handleCreateChat = () => {
    if (!createChatPending) {
      createChat(node?.id);
    }
  };

  if (isReindexing) {
    return (
      <Flexbox
        flexDirection="column"
        rowGap={32}
        alignItems="center"
        justifyContent="center"
        className={stylex(styles.loaderContainer)}
      >
        <Loader />
        <Flexbox flexDirection="column" rowGap={12}>
          <Text type="s2b" color="--primary-color-1" textAlign="center">
            Indexing project
          </Text>
          <Text type="s1m" color="--neutral-color-600" textAlign="center">
            Please don&apos;t close the app
          </Text>
        </Flexbox>
      </Flexbox>
    );
  }

  const conversation = node?.currentConversation?.id;
  const renderWebview = showPreview && !!previewUrl;

  return (
    <>
      <header className={stylex(styles.header)}>
        <div />

        <Text type="s0b" color="--primary-color-1">
          {node?.name}
        </Text>

        <Flexbox alignItems="center" columnGap={16}>
          <InteractiveElement label="Home" onClick={() => navigate('/app')}>
            <Icon
              size={20}
              icon="home"
              color="--neutral-color-800"
              hoverColor="--primary-color-1"
            />
          </InteractiveElement>

          {createChatPending ? (
            <Spinner size={16} />
          ) : (
            <InteractiveElement label="New Chat" onClick={handleCreateChat}>
              <Icon
                size={20}
                icon="edit_square"
                color="--neutral-color-800"
                hoverColor="--primary-color-1"
              />
            </InteractiveElement>
          )}

          <InteractiveElement label="Setting" onClick={() => dialogRef?.current?.showModal()}>
            <Icon
              size={20}
              icon="settings"
              color="--neutral-color-800"
              hoverColor="--primary-color-1"
            />
          </InteractiveElement>
        </Flexbox>
      </header>
      <Grid
        columnGap={0}
        columns={renderWebview ? '1fr max(30dvw, 480px)' : '1fr'}
        className={stylex(styles.grid)}
      >
        {renderWebview && (
          <div className={stylex(styles.preview)}>
            <Webpreview url={previewUrl ?? ''} />
          </div>
        )}
        <Chat conversation={conversation} key={conversation} project={node?.name} />
      </Grid>

      {/* $FlowIssue */}
      <dialog ref={dialogRef} className={stylex(styles.dialog)}>
        <form onSubmit={handlePreviewSetup}>
          <input type="submit" style={{ display: 'none' }} />
          <Padding vertical={16} horizontal={16}>
            <Flexbox alignItems="center" columnGap={8}>
              <Icon icon="preview" />
              <Text type="h5">Set up a preview</Text>
            </Flexbox>
          </Padding>
          <Padding horizontal={16}>
            <Text type="bs">
              You can preview the application you are generating directly in the chat. Make sure to
              run your application and enter the app’s URL.
            </Text>
          </Padding>
          <Padding top={24} horizontal={16}>
            <Grid columns="1fr 1fr" columnGap={0}>
              <InteractiveElement
                className={stylex(
                  styles.previewOn,
                  previewIsOn ? styles.previewTabActive : styles.previewTabInactive,
                )}
                onClick={() => setPreviewIsOn(true)}
              >
                <Text
                  type="s0b"
                  textAlign="center"
                  color={previewIsOn ? '--neutral-color-100' : '--neutral-color-600'}
                >
                  Turn on preview
                </Text>
              </InteractiveElement>
              <InteractiveElement
                className={stylex(
                  styles.previewOff,
                  !previewIsOn ? styles.previewTabActive : styles.previewTabInactive,
                )}
                onClick={() => setPreviewIsOn(false)}
              >
                <Text
                  type="s0b"
                  textAlign="center"
                  color={!previewIsOn ? '--neutral-color-100' : '--neutral-color-600'}
                >
                  Turn off preview
                </Text>
              </InteractiveElement>
            </Grid>
          </Padding>
          {previewIsOn && (
            <Padding top={24} horizontal={16}>
              <Input input={host.input} />
            </Padding>
          )}
          <Padding vertical={24} horizontal={16}>
            <Button onClick={handlePreviewSetup}>Apply Changes</Button>
          </Padding>
        </form>
      </dialog>
    </>
  );
}
