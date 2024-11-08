// @flow
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createPortal } from 'react-dom';
import { useCallback, useEffect, useRef, useState } from 'react';

import { $isLinkNode } from '@lexical/link';
import { $setBlocksType } from '@lexical/selection';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode, $createQuoteNode, $isHeadingNode } from '@lexical/rich-text';
import { mergeRegister, $findMatchingParent, $getNearestNodeOfType } from '@lexical/utils';
import {
  $isCodeNode,
  $createCodeNode,
  CODE_LANGUAGE_MAP,
  $isCodeHighlightNode,
} from '@lexical/code';

import {
  ListNode,
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';

import {
  $isTextNode,
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  $isRootOrShadowRoot,
  $createParagraphNode,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';

import { getDOMRangeRect } from '../../utils/getDOMRangeRect';
import { getSelectedNode } from '../../utils/getSelectedNode';
import { setFloatingElemPosition } from '../../utils/setFloatingElemPosition';

import Icon from '../../Icon';
import Text from '../../Text';
import DropDown, { DropDownItem } from '../../Dropdown';

import './index.css';

const blockTypeToBlockName = {
  bullet: 'Bulleted List',
  check: 'Check List',
  code: 'Code Block',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  number: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote',
};

function TextFormatFloatingToolbar({
  editor,
  anchorElem,
  isLink,
  isBold,
  isItalic,
  isUnderline,
  isCode,
  isStrikethrough,
  isSubscript,
  isSuperscript,
}: {
  editor: any,
  anchorElem: HTMLElement,
  isBold: boolean,
  isCode: boolean,
  isItalic: boolean,
  isLink: boolean,
  isStrikethrough: boolean,
  isSubscript: boolean,
  isSuperscript: boolean,
  isUnderline: boolean,
}): React$Node {
  const [blockType, setBlockType] = useState('paragraph');
  const [, setCodeLanguage] = useState<string>('');
  const [, setSelectedElementKey] = useState(null);
  const [activeEditor /* , setActiveEditor */] = useState(editor);
  const popupCharStylesEditorRef = useRef<HTMLDivElement | null>(null);

  function mouseMoveListener(e: MouseEvent) {
    if (popupCharStylesEditorRef?.current && (e.buttons === 1 || e.buttons === 3)) {
      if (popupCharStylesEditorRef.current.style.pointerEvents !== 'none') {
        const x = e.clientX;
        const y = e.clientY;
        const elementUnderMouse = document.elementFromPoint(x, y);

        if (
          popupCharStylesEditorRef.current &&
          !popupCharStylesEditorRef.current.contains(elementUnderMouse)
        ) {
          // Mouse is not over the target element => not a normal click, but probably a drag
          popupCharStylesEditorRef.current.style.pointerEvents = 'none';
        }
      }
    }
  }
  function mouseUpListener() {
    if (popupCharStylesEditorRef?.current) {
      if (popupCharStylesEditorRef.current.style.pointerEvents !== 'auto') {
        popupCharStylesEditorRef.current.style.pointerEvents = 'auto';
      }
    }
  }

  useEffect(() => {
    if (popupCharStylesEditorRef?.current) {
      document.addEventListener('mousemove', mouseMoveListener);
      document.addEventListener('mouseup', mouseUpListener);

      return () => {
        document.removeEventListener('mousemove', mouseMoveListener);
        document.removeEventListener('mouseup', mouseUpListener);
      };
    }

    return () => {};
  }, [popupCharStylesEditorRef]);

  const $updateTextFormatFloatingToolbar = useCallback(() => {
    const selection = $getSelection();

    const popupCharStylesEditorElem = popupCharStylesEditorRef.current;
    const nativeSelection = window.getSelection();

    if (popupCharStylesEditorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement);

      setFloatingElemPosition(rangeRect, popupCharStylesEditorElem, anchorElem, isLink);
    }

    // Function to update the block styles

    if ($isRangeSelection(selection)) {
      /*
      if (activeEditor !== editor && $isEditorIsNestedEditor(activeEditor)) {
        const rootElement = activeEditor.getRootElement();
        setIsImageCaption(
          !!rootElement?.parentElement?.classList.contains('image-caption-container'),
        );
      } else {
        setIsImageCaption(false);
      } */

      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      /*
      const tableNode = $findMatchingParent(node, $isTableNode);
      if ($isTableNode(tableNode)) {
        setRootType('table');
      } else {
        setRootType('root');
      } */

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getListType() : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type);
          }
          if ($isCodeNode(element)) {
            const language = element.getLanguage();
            setCodeLanguage(language ? CODE_LANGUAGE_MAP[language] || language : '');
          }
        }
      }
      /*
      // Handle buttons
      setFontColor($getSelectionStyleValueForProperty(selection, 'color', '#000'));
      setBgColor($getSelectionStyleValueForProperty(selection, 'background-color', '#fff'));
      setFontFamily($getSelectionStyleValueForProperty(selection, 'font-family', 'Arial'));
      */
    }
  }, [editor, anchorElem, isLink, activeEditor]);

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement;

    const update = () => {
      editor.getEditorState().read(() => {
        $updateTextFormatFloatingToolbar();
      });
    };

    window.addEventListener('resize', update);
    if (scrollerElem) {
      scrollerElem.addEventListener('scroll', update);
    }

    return () => {
      window.removeEventListener('resize', update);
      if (scrollerElem) {
        scrollerElem.removeEventListener('scroll', update);
      }
    };
  }, [editor, $updateTextFormatFloatingToolbar, anchorElem]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      $updateTextFormatFloatingToolbar();
    });
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateTextFormatFloatingToolbar();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateTextFormatFloatingToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, $updateTextFormatFloatingToolbar]);

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };

  const formatCheckList = () => {
    if (blockType !== 'check') {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };

  const formatNumberedList = () => {
    if (blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createQuoteNode());
      });
    }
  };

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        let selection = $getSelection();

        if (selection !== null) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection = $getSelection();
            if ($isRangeSelection(selection)) {
              selection.insertRawText(textContent);
            }
          }
        }
      });
    }
  };

  return (
    <div ref={popupCharStylesEditorRef} className="floating-text-format-popup">
      {editor.isEditable() && (
        <>
          <div className="toolbar">
            <DropDown
              buttonClassName="toolbar-item block-controls"
              buttonLabel={blockTypeToBlockName[blockType]}
              buttonAriaLabel="Formatting options for text style"
            >
              <DropDownItem className="item" onClick={formatParagraph}>
                <Icon
                  size={20}
                  icon="view_headline"
                  color={blockType === 'paragraph' ? '--primary-color-1' : '--neutral-color-500'}
                />
                <span className="text">
                  <Text type="s0m" color="--neutral-color-800">
                    Normal
                  </Text>
                </span>
              </DropDownItem>
              <DropDownItem className="item" onClick={() => formatHeading('h1')}>
                <Icon
                  size={20}
                  icon="format_h1"
                  color={blockType === 'h1' ? '--primary-color-1' : '--neutral-color-500'}
                />
                <span className="text">
                  <Text type="s0m" color="--neutral-color-800">
                    Heading 1
                  </Text>
                </span>
              </DropDownItem>
              <DropDownItem className="item" onClick={() => formatHeading('h2')}>
                <Icon
                  size={20}
                  icon="format_h2"
                  color={blockType === 'h2' ? '--primary-color-1' : '--neutral-color-500'}
                />
                <span className="text">
                  <Text type="s0m" color="--neutral-color-800">
                    Heading 2
                  </Text>
                </span>
              </DropDownItem>
              <DropDownItem className="item" onClick={() => formatHeading('h3')}>
                <Icon
                  size={20}
                  icon="format_h3"
                  color={blockType === 'h3' ? '--primary-color-1' : '--neutral-color-500'}
                />
                <span className="text">
                  <Text type="s0m" color="--neutral-color-800">
                    Heading 3
                  </Text>
                </span>
              </DropDownItem>
              <DropDownItem className="item" onClick={formatBulletList}>
                <Icon
                  size={20}
                  icon="format_list_bulleted"
                  color={blockType === 'bullet' ? '--primary-color-1' : '--neutral-color-500'}
                />
                <span className="text">
                  <Text type="s0m" color="--neutral-color-800">
                    Bullet List
                  </Text>
                </span>
              </DropDownItem>
              <DropDownItem className="item" onClick={formatNumberedList}>
                <Icon
                  size={20}
                  icon="format_list_numbered"
                  color={blockType === 'number' ? '--primary-color-1' : '--neutral-color-500'}
                />
                <span className="text">
                  <Text type="s0m" color="--neutral-color-800">
                    Numbered List
                  </Text>
                </span>
              </DropDownItem>
              <DropDownItem className="item" onClick={formatCheckList}>
                <Icon
                  size={20}
                  icon="checklist"
                  color={blockType === 'check' ? '--primary-color-1' : '--neutral-color-500'}
                />
                <span className="text">
                  <Text type="s0m" color="--neutral-color-800">
                    Check List
                  </Text>
                </span>
              </DropDownItem>
              <DropDownItem className="item" onClick={formatQuote}>
                <Icon
                  size={20}
                  icon="format_quote"
                  color={blockType === 'quote' ? '--primary-color-1' : '--neutral-color-500'}
                />
                <span className="text">
                  <Text type="s0m" color="--neutral-color-800">
                    Quote
                  </Text>
                </span>
              </DropDownItem>
              <DropDownItem className="item" onClick={formatCode}>
                <Icon
                  size={20}
                  icon="code"
                  color={blockType === 'code' ? '--primary-color-1' : '--neutral-color-500'}
                />
                <span className="text">
                  <Text type="s0m" color="--neutral-color-800">
                    Code Block
                  </Text>
                </span>
              </DropDownItem>
            </DropDown>
          </div>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
            }}
            className={`popup-item spaced ${isBold ? 'active' : ''}`}
            aria-label="Format text as bold"
          >
            <Icon
              size={16}
              icon="format_bold"
              weight={400}
              color={isBold ? '--primary-color-1' : '--neutral-color-800'}
            />
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
            }}
            className={`popup-item spaced ${isItalic ? 'active' : ''}`}
            aria-label="Format text as italics"
          >
            <Icon
              size={16}
              icon="format_italic"
              color={isItalic ? '--primary-color-1' : '--neutral-color-800'}
            />
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
            }}
            className={`popup-item spaced ${isUnderline ? 'active' : ''}`}
            aria-label="Format text to underlined"
          >
            <Icon
              size={16}
              icon="format_underlined"
              color={isUnderline ? '--primary-color-1' : '--neutral-color-800'}
            />
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
            }}
            className={`popup-item spaced ${isStrikethrough ? 'active' : ''}`}
            aria-label="Format text with a strikethrough"
          >
            <Icon
              size={16}
              icon="format_strikethrough"
              color={isStrikethrough ? '--primary-color-1' : '--neutral-color-800'}
            />
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
            }}
            className={`popup-item spaced ${isSubscript ? 'active' : ''}`}
            title="Subscript"
            aria-label="Format Subscript"
          >
            <Icon
              size={16}
              icon="subscript"
              color={isSubscript ? '--primary-color-1' : '--neutral-color-800'}
            />
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
            }}
            className={`popup-item spaced ${isSuperscript ? 'active' : ''}`}
            title="Superscript"
            aria-label="Format Superscript"
          >
            <Icon
              size={16}
              icon="superscript"
              color={isSuperscript ? '--primary-color-1' : '--neutral-color-800'}
            />
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
            }}
            className={`popup-item spaced ${isCode ? 'active' : ''}`}
            aria-label="Insert code block"
          >
            <Icon
              size={16}
              icon="code"
              color={isCode ? '--primary-color-1' : '--neutral-color-800'}
            />
          </button>
        </>
      )}
    </div>
  );
}

function useFloatingTextFormatToolbar(editor: any, anchorElem: HTMLElement): React$Node | null {
  const [isText, setIsText] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      // Should not to pop up the floating toolbar when using IME input
      if (editor.isComposing()) {
        return;
      }
      const selection = $getSelection();
      const nativeSelection = window.getSelection();
      const rootElement = editor.getRootElement();

      if (
        nativeSelection !== null &&
        (!$isRangeSelection(selection) ||
          rootElement === null ||
          !rootElement.contains(nativeSelection.anchorNode))
      ) {
        setIsText(false);
        return;
      }

      if (!$isRangeSelection(selection)) {
        return;
      }

      const node = getSelectedNode(selection);

      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsSubscript(selection.hasFormat('subscript'));
      setIsSuperscript(selection.hasFormat('superscript'));
      setIsCode(selection.hasFormat('code'));

      // Update links
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (!$isCodeHighlightNode(selection.anchor.getNode()) && selection.getTextContent() !== '') {
        setIsText($isTextNode(node) || $isParagraphNode(node));
      } else {
        setIsText(false);
      }

      const rawTextContent = selection.getTextContent().replace(/\n/g, '');
      if (!selection.isCollapsed() && rawTextContent === '') {
        setIsText(false);
      }
    });
  }, [editor]);

  useEffect(() => {
    document.addEventListener('selectionchange', updatePopup);
    return () => {
      document.removeEventListener('selectionchange', updatePopup);
    };
  }, [updatePopup]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        updatePopup();
      }),
      editor.registerRootListener(() => {
        if (editor.getRootElement() === null) {
          setIsText(false);
        }
      }),
    );
  }, [editor, updatePopup]);

  if (!isText) {
    return null;
  }

  return createPortal(
    <TextFormatFloatingToolbar
      editor={editor}
      anchorElem={anchorElem}
      isLink={isLink}
      isBold={isBold}
      isItalic={isItalic}
      isStrikethrough={isStrikethrough}
      isSubscript={isSubscript}
      isSuperscript={isSuperscript}
      isUnderline={isUnderline}
      isCode={isCode}
    />,
    anchorElem,
  );
}

export default function FloatingTextFormatToolbarPlugin({
  // $FlowIssue
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement,
}): React$Node | null {
  const [editor] = useLexicalComposerContext();
  return useFloatingTextFormatToolbar(editor, anchorElem);
}
