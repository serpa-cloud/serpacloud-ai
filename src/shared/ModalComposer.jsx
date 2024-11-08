// @flow
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import './ModalComposer.css';

import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

import Text from './Text';
import Icon from './Icon';
import Flexbox from './Flexbox';

function PortalImpl({
  onClose,
  children,
  title,
  closeOnClickOutside,
}: {
  children: React$Node,
  closeOnClickOutside: boolean,
  onClose: () => void,
  title: string,
}) {
  const modalRef = useRef<?HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current !== null) {
      // $FlowFixMe
      modalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    let modalOverlayElement: HTMLElement | null = null;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const clickOutsideHandler = (event: MouseEvent) => {
      const { target } = event;
      // $FlowFixMe
      if (modalRef.current !== null && !modalRef.current.contains(target) && closeOnClickOutside) {
        onClose();
      }
    };
    const modelElement = modalRef.current;
    if (modelElement !== null) {
      // $FlowFixMe
      modalOverlayElement = modelElement.parentElement;
      if (modalOverlayElement !== null) {
        // $FlowFixMe
        modalOverlayElement.addEventListener('click', clickOutsideHandler);
      }
    }

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener('click', clickOutsideHandler);
      }
    };
  }, [closeOnClickOutside, onClose]);

  return (
    <div className="Modal__overlay" role="dialog">
      <div className="Modal__modal" tabIndex={-1} ref={modalRef}>
        <Flexbox alignItems="center" justifyContent="space-between">
          <Flexbox flexDirection="column">
            <Text type="h5">{title}</Text>
          </Flexbox>
          <button
            className="Modal__closeButton"
            aria-label="Close modal"
            type="button"
            onClick={onClose}
          >
            <Icon icon="close" size={20} />
          </button>
        </Flexbox>
        <div className="Modal__content">{children}</div>
      </div>
    </div>
  );
}

export default function ModalComposer({
  onClose,
  children,
  title,
  closeOnClickOutside = false,
}: {
  children: React$Node,
  closeOnClickOutside?: boolean,
  onClose: () => void,
  title: string,
}): React$Node {
  return createPortal(
    <PortalImpl onClose={onClose} title={title} closeOnClickOutside={closeOnClickOutside}>
      {children}
    </PortalImpl>,
    document.body,
  );
}
