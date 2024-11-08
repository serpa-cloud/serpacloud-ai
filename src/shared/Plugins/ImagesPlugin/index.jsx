/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
// @flow

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $wrapNodeInElement, mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
} from 'lexical';
import { useEffect, useRef, useState } from 'react';

import { $createImageNode, $isImageNode, ImageNode } from '../../nodes/ImageNode';
import Button from '../../Button';
import FileInput from '../../FileInput';
import Flexbox from '../../Flexbox';

export const INSERT_IMAGE_COMMAND: any = createCommand('INSERT_IMAGE_COMMAND');

const getDOMSelection = (targetWindow) => (targetWindow || window).getSelection();

export function InsertImageUploadedDialogBody({ onClick }: { onClick: (any) => void }): React$Node {
  const [src, setSrc] = useState('');

  const loadImage = (files: FileList | null) => {
    const reader = new FileReader();
    // eslint-disable-next-line func-names
    reader.onload = function() {
      if (typeof reader.result === 'string') {
        setSrc(reader.result);
      }
      return '';
    };
    if (files !== null) {
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <Flexbox flexDirection="column" rowGap={16}>
      <FileInput label="Select an image or drag" onChange={loadImage} accept="image/*" />
      <Flexbox>
        <Button onClick={() => onClick({ altText: '', src })}>Select Image</Button>
      </Flexbox>
    </Flexbox>
  );
}

export function InsertImageDialog({
  activeEditor,
  onClose,
}: {
  activeEditor: any,
  onClose: () => void,
}): React$Node {
  const hasModifier = useRef(false);

  useEffect(() => {
    hasModifier.current = false;
    const handler = (e: KeyboardEvent) => {
      hasModifier.current = e.altKey;
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [activeEditor]);

  const onClick = (payload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    onClose();
  };

  return <InsertImageUploadedDialogBody onClick={onClick} />;
}

export default function ImagesPlugin(): React$Node {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor');
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand<DragEvent>(
        DRAGSTART_COMMAND,
        (event) => {
          return $onDragStart(event);
        },
        COMMAND_PRIORITY_HIGH,
      ),
      editor.registerCommand<DragEvent>(
        DRAGOVER_COMMAND,
        (event) => {
          return $onDragover(event);
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand<DragEvent>(
        DROP_COMMAND,
        (event) => {
          return $onDrop(event, editor);
        },
        COMMAND_PRIORITY_HIGH,
      ),
    );
  }, [editor]);

  return null;
}

const TRANSPARENT_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const img = document.createElement('img');
img.src = TRANSPARENT_IMAGE;

function $onDragStart(event: DragEvent): boolean {
  // eslint-disable-next-line no-use-before-define
  const node = $getImageNodeInSelection();
  if (!node) {
    return false;
  }
  const { dataTransfer } = event;
  if (!dataTransfer) {
    return false;
  }
  dataTransfer.setData('text/plain', '_');
  dataTransfer.setDragImage(img, 0, 0);
  dataTransfer.setData(
    'application/x-lexical-drag',
    JSON.stringify({
      data: {
        altText: node.__altText,
        caption: node.__caption,
        height: node.__height,
        key: node.getKey(),
        maxWidth: node.__maxWidth,
        showCaption: node.__showCaption,
        src: node.__src,
        width: node.__width,
      },
      type: 'image',
    }),
  );

  return true;
}

function $onDragover(event: DragEvent): boolean {
  // eslint-disable-next-line no-use-before-define
  const node = $getImageNodeInSelection();
  if (!node) {
    return false;
  }
  // eslint-disable-next-line no-use-before-define
  if (!canDropImage(event)) {
    event.preventDefault();
  }
  return true;
}

function $onDrop(event: DragEvent, editor): boolean {
  // eslint-disable-next-line no-use-before-define
  const node = $getImageNodeInSelection();
  if (!node) {
    return false;
  }
  // eslint-disable-next-line no-use-before-define
  const data = getDragImageData(event);
  if (!data) {
    return false;
  }
  event.preventDefault();
  // eslint-disable-next-line no-use-before-define
  if (canDropImage(event)) {
    // eslint-disable-next-line no-use-before-define
    const range = getDragSelection(event);
    node.remove();
    const rangeSelection = $createRangeSelection();
    if (range !== null && range !== undefined) {
      rangeSelection.applyDOMRange(range);
    }
    $setSelection(rangeSelection);
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data);
  }
  return true;
}

function $getImageNodeInSelection() {
  const selection = $getSelection();
  if (!$isNodeSelection(selection)) {
    return null;
  }
  const nodes = selection.getNodes();
  const node = nodes[0];
  return $isImageNode(node) ? node : null;
}

function getDragImageData(event: DragEvent) {
  const dragData = event.dataTransfer?.getData('application/x-lexical-drag');
  if (!dragData) {
    return null;
  }
  const { type, data } = JSON.parse(dragData);
  if (type !== 'image') {
    return null;
  }

  return data;
}

function canDropImage(event: DragEvent): boolean {
  const { target } = event;
  return !!(
    target &&
    target instanceof HTMLElement &&
    !target.closest('code, span.editor-image') &&
    target.parentElement &&
    target.parentElement.closest('div.ContentEditable__root')
  );
}

function getDragSelection(event: DragEvent): ?Range {
  let range;
  const { target } = event;
  const targetWindow =
    target == null
      ? null
      : // $FlowFixMe
      target.nodeType === 9
      ? // $FlowFixMe
        target.defaultView
      : // $FlowFixMe
        target.ownerDocument.defaultView;
  const domSelection = getDOMSelection(targetWindow);
  // $FlowFixMe
  if (document.caretRangeFromPoint) {
    // $FlowFixMe
    range = document.caretRangeFromPoint(event.clientX, event.clientY);
    // $FlowFixMe
  } else if (event.rangeParent && domSelection !== null) {
    // $FlowFixMe
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0);
    range = domSelection.getRangeAt(0);
  } else {
    throw Error(`Cannot get the selection when dragging`);
  }

  return range;
}
