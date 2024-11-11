/* eslint-disable no-underscore-dangle */
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical';

import { $applyNodeReplacement, DecoratorNode } from 'lexical';
import { Suspense } from 'react';

// eslint-disable-next-line import/no-cycle
import ImageComponent from './ImageComponent';

export interface ImagePayload {
  id: string | Promise<string>;
  previewUrl?: ?string;
  key?: NodeKey;
}

function $convertImageElement(domNode: Node): null | DOMConversionOutput {
  const img: HTMLImageElement = domNode;
  if (img.src.startsWith('file:///')) {
    return null;
  }
  const { alt: altText, src, width, height } = img;
  // eslint-disable-next-line no-use-before-define
  const node = $createImageNode({ altText, height, src, width });
  return { node };
}

export type SerializedImageNode = Spread<
  {
    id: string | Promise<string>,
    previewUrl: ?string,
  },
  SerializedLexicalNode,
>;

export class ImageNode extends DecoratorNode<JSX.Element> {
  __id: string | Promise<string>;

  __metadata: { id: string, src: string };

  __previewUrl: ?string;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__id, node.__previewUrl, node.__key);
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { id, previewUrl } = serializedNode;
    // eslint-disable-next-line no-use-before-define
    const node = $createImageNode({
      id,
      previewUrl,
    });

    return node;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('img');
    element.setAttribute('src', this.__src);
    element.setAttribute('alt', this.__altText);
    element.setAttribute('width', this.__width.toString());
    element.setAttribute('height', this.__height.toString());
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({
        conversion: $convertImageElement,
        priority: 0,
      }),
    };
  }

  constructor(id: string | Promise<string>, previewUrl?: ?string, key?: NodeKey) {
    super(key);

    this.__id = id;
    this.__previewUrl = previewUrl;
    this.__metadata = {
      id,
      src: '',
    };

    if (id instanceof Promise) {
      Promise.resolve(id).then((imageId) => {
        this.__metadata.src = imageId;
      });
    } else {
      this.__metadata.src = id;
    }
  }

  exportJSON(): SerializedImageNode {
    return {
      id: this.__metadata.src || this.getId(),
      type: 'image',
      version: 1,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    const { theme } = config;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  // eslint-disable-next-line class-methods-use-this
  updateDOM(): false {
    return false;
  }

  getId(): string {
    return this.__metadata.id;
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <ImageComponent
          id={this.getId()}
          nodeKey={this.getKey()}
          previewUrl={this.__previewUrl}
          // eslint-disable-next-line no-use-before-define
          $isImageNode={$isImageNode}
          resizable
        />
      </Suspense>
    );
  }
}

export function $createImageNode({ id, previewUrl, key }: ImagePayload): ImageNode {
  return $applyNodeReplacement(new ImageNode(id, previewUrl, key));
}

export function $isImageNode(node: LexicalNode | null | undefined): ImageNode {
  return node instanceof ImageNode;
}
