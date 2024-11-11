// @flow
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { useLexicalEditable } from '@lexical/react/useLexicalEditable';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
  $setSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGSTART_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
// $FlowFixMe
import brokenImage from './image-broken.svg';

import Icon from '../Icon';
import Spinner from '../Spinner';

import './ImageNode.css';
import styles from './ImageComponent.module.sass';

const imageCache = new Map();

export const RIGHT_CLICK_IMAGE_COMMAND: any = createCommand('RIGHT_CLICK_IMAGE_COMMAND');

function useSuspenseImage(id) {
  if (!imageCache.has(id)) {
    throw new Promise((resolve) => {
      Promise.resolve(id).then((imageId) => {
        const src = `https://static.serpa.cloud/${imageId}/80/80/0/image?fit=cover`;
        const img = new Image();
        img.src = src;
        img.onload = () => {
          imageCache.set(id, { src, imageId });
          resolve({ src, imageId });
        };
        img.onerror = () => {
          imageCache.set(id, { src: '', imageId });
        };
      });
    });
  }

  return imageCache.get(id);
}

function LazyImage({
  id,
  onError,
  imageRef,
  className,
}: {
  onError: () => void,
  className: string | null,
  id: string | Promise<string>,
  imageRef: { current: null | HTMLImageElement },
}): React$Node {
  const metadata = useSuspenseImage(id);

  if (!metadata) return null;

  const { src, imageId } = metadata;

  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        <img
          alt=""
          src={src}
          ref={imageRef}
          onError={onError}
          draggable="false"
          className={`${className || ''} ${styles.image}`}
        />
        <a
          className={styles.openLink}
          href={`https://static.serpa.cloud/${imageId}/0/0/0/image?fit=cover`}
        >
          <Icon icon="open_in_new" weight={200} size={16} />
        </a>
      </div>
    </div>
  );
}

function BrokenImage(): React$Node {
  return (
    <img
      alt=""
      src={brokenImage}
      style={{
        height: 200,
        opacity: 0.2,
        width: 200,
      }}
      draggable="false"
    />
  );
}

export default function ImageComponent({
  id,
  previewUrl,
  nodeKey,
  $isImageNode,
}: {
  id: string | Promise<string>,
  previewUrl?: ?string,
  nodeKey: any,
  $isImageNode: (any) => boolean,
}): React$Node {
  const imageRef = useRef<null | HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);

  const [editor] = useLexicalComposerContext();
  const [selection, setSelection] = useState(null);
  const activeEditorRef = useRef(null);
  const [isLoadError, setIsLoadError] = useState<boolean>(false);
  const isEditable = useLexicalEditable();

  const $onDelete = useCallback(
    (payload: KeyboardEvent) => {
      const deleteSelection = $getSelection();
      if (isSelected && $isNodeSelection(deleteSelection)) {
        const event: KeyboardEvent = payload;
        event.preventDefault();
        editor.update(() => {
          deleteSelection.getNodes().forEach((node) => {
            if ($isImageNode(node)) {
              node.remove();
            }
          });
        });
      }
      return false;
    },
    [$isImageNode, editor, isSelected],
  );

  const $onEnter = useCallback(
    (event: KeyboardEvent) => {
      const latestSelection = $getSelection();
      const buttonElem = buttonRef.current;
      if (
        isSelected &&
        $isNodeSelection(latestSelection) &&
        latestSelection.getNodes().length === 1
      ) {
        if (buttonElem !== null && buttonElem !== document.activeElement) {
          event.preventDefault();
          buttonElem.focus();
          return true;
        }
      }
      return false;
    },
    [buttonRef, isSelected],
  );

  const $onEscape = useCallback(
    (event: KeyboardEvent) => {
      if (buttonRef.current === event.target) {
        $setSelection(null);
        editor.update(() => {
          setSelected(true);
          const parentRootElement = editor.getRootElement();
          if (parentRootElement !== null) {
            parentRootElement.focus();
          }
        });
        return true;
      }
      return false;
    },
    [buttonRef, editor, setSelected],
  );

  const onClick = useCallback(
    (payload: MouseEvent) => {
      const event = payload;

      if (event.target === imageRef.current) {
        if (event.shiftKey) {
          setSelected(!isSelected);
        } else {
          clearSelection();
          setSelected(true);
        }
        return true;
      }

      return false;
    },
    [imageRef, setSelected, isSelected, clearSelection],
  );

  const onRightClick = useCallback(
    (event: MouseEvent): void => {
      editor.getEditorState().read(() => {
        const latestSelection = $getSelection();
        // $FlowFixMe
        const domElement: HTMLElement = event.target;
        if (
          domElement.tagName === 'IMG' &&
          $isRangeSelection(latestSelection) &&
          latestSelection.getNodes().length === 1
        ) {
          editor.dispatchCommand(RIGHT_CLICK_IMAGE_COMMAND, event);
        }
      });
    },
    [editor],
  );

  useEffect(() => {
    let isMounted = true;
    const rootElement = editor.getRootElement();
    const unregister = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        if (isMounted) {
          setSelection(editorState.read(() => $getSelection()));
        }
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_, activeEditor) => {
          activeEditorRef.current = activeEditor;
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand<MouseEvent>(CLICK_COMMAND, onClick, COMMAND_PRIORITY_LOW),
      editor.registerCommand<MouseEvent>(RIGHT_CLICK_IMAGE_COMMAND, onClick, COMMAND_PRIORITY_LOW),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        (event) => {
          if (event.target === imageRef.current) {
            // TODO This is just a temporary workaround for FF to behave like other browsers.
            // Ideally, this handles drag & drop too (and all browsers).
            event.preventDefault();
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(KEY_DELETE_COMMAND, $onDelete, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_BACKSPACE_COMMAND, $onDelete, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ENTER_COMMAND, $onEnter, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ESCAPE_COMMAND, $onEscape, COMMAND_PRIORITY_LOW),
    );

    rootElement?.addEventListener('contextmenu', onRightClick);

    return () => {
      isMounted = false;
      unregister();
      rootElement?.removeEventListener('contextmenu', onRightClick);
    };
  }, [
    clearSelection,
    editor,
    isSelected,
    nodeKey,
    $onDelete,
    $onEnter,
    $onEscape,
    onClick,
    onRightClick,
    setSelected,
    setSelection,
    activeEditorRef,
    imageRef,
  ]);

  const draggable = isSelected && $isNodeSelection(selection);
  const isFocused = isSelected && isEditable;

  return (
    <Suspense
      fallback={
        <div className={styles.root}>
          <div className={styles.imageContainer}>
            <img alt="" src={previewUrl} className={`${styles.image} ${styles.imagePending}`} />
            <div className={styles.spinnerContainer}>
              <Spinner />
            </div>
          </div>
        </div>
      }
    >
      <>
        <div draggable={draggable}>
          {isLoadError ? (
            <BrokenImage />
          ) : (
            <LazyImage
              className={
                isFocused ? `focused ${$isNodeSelection(selection) ? 'draggable' : ''}` : null
              }
              id={id}
              imageRef={imageRef}
              previewUrl={previewUrl}
              onError={() => setIsLoadError(true)}
            />
          )}
        </div>
      </>
    </Suspense>
  );
}

ImageComponent.defaultProps = {
  previewUrl: null,
};
