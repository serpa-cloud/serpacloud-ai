// flow

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useCallback, useMemo, useState } from 'react';

import ModalComposer from '../ModalComposer';

export default function useModal(): [
  React$Node | null,
  (title: string, showModal: (onClose: () => void) => React$Node) => void,
] {
  const [modalContent, setModalContent] = useState(null);

  const onClose = useCallback(() => {
    setModalContent(null);
  }, []);

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null;
    }
    const { title, content, closeOnClickOutside } = modalContent;
    return (
      <ModalComposer onClose={onClose} title={title} closeOnClickOutside={closeOnClickOutside}>
        {content}
      </ModalComposer>
    );
  }, [modalContent, onClose]);

  const showModal = useCallback(
    (
      title: string,
      // eslint-disable-next-line no-shadow
      getContent: (onClose: () => void) => React$Node,
      closeOnClickOutside = false,
    ) => {
      setModalContent({
        closeOnClickOutside,
        content: getContent(onClose),
        title,
      });
    },
    [onClose],
  );

  return [modal, showModal];
}
