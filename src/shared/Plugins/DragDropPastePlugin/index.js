/* eslint-disable no-restricted-syntax */
// @flow

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect } from 'react';
import { COMMAND_PRIORITY_LOW } from 'lexical';
import { DRAG_DROP_PASTE } from '@lexical/rich-text';
import { isMimeType, mediaFileReader } from '@lexical/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { INSERT_IMAGE_COMMAND } from '../ImagesPlugin';

const ACCEPTABLE_IMAGE_TYPES = ['image/', 'image/heic', 'image/heif', 'image/gif', 'image/webp'];

function dec2hex(dec) {
  return dec.toString(16).padStart(2, '0');
}

function generateId(len) {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}

function getImageId(file) {
  const formData = new FormData();

  formData.append('image', file);
  formData.append('alt', '');

  const traceId = generateId(16);

  return fetch(`${process.env.REACT_APP_MEDIA_HOST ?? ''}/media/upload`, {
    mode: 'cors',
    method: 'POST',
    body: formData,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'x-request-id': traceId,
      'x-b3-traceid': traceId,
      'x-traceid': traceId,
      'x-b3-spanid': traceId,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const { _id } = res?.data;
      if (_id) {
        return _id;
      }

      return null;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.trace({ err });
      return null;
    });
}

export default function DragDropPaste(): null {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        (async () => {
          const filesResult = await mediaFileReader(
            files,
            [ACCEPTABLE_IMAGE_TYPES].flatMap((x) => x),
          );
          for (const { file, result } of filesResult) {
            if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
              editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                id: getImageId(file),
                previewUrl: result,
              });
            }
          }
        })();
        return true;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);
  return null;
}
