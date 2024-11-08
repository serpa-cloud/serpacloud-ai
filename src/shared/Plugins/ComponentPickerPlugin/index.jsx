/* eslint-disable jsx-a11y/click-events-have-key-events */
// @flow
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useCallback, useMemo, useState } from 'react';

import * as ReactDOM from 'react-dom';
import { $createCodeNode } from '@lexical/code';
import { $setBlocksType } from '@lexical/selection';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin';

import useModal from '../../hooks/useModal';
import { InsertImageDialog } from '../ImagesPlugin';
// import { InsertTableDialog } from '../TablePlugin';

import Text from '../../Text';
import Icon from '../../Icon';
import Flexbox from '../../Flexbox';

class ComponentPickerOption extends MenuOption {
  // What shows up in the editor
  title: string;

  // Icon for display
  icon: React$Node;

  // For extra searching.
  keywords: Array<string>;

  // TBD
  keyboardShortcut: string;

  // What happens when you select this option?
  onSelect: (queryString: string) => void;

  constructor(
    title: string,
    options: {
      icon?: React$Node,
      keywords?: Array<string>,
      keyboardShortcut?: string,
      onSelect: (queryString: string) => void,
    },
  ) {
    super(title);
    this.title = title;
    this.keywords = options.keywords || [];
    this.icon = options.icon || null;
    this.keyboardShortcut = options.keyboardShortcut || '';
    this.onSelect = options.onSelect.bind(this);
  }
}

function ComponentPickerMenuItem({
  index,
  onClick,
  option,
}: {
  index: number,
  onClick: () => void,
  option: ComponentPickerOption,
}) {
  return (
    <li
      tabIndex={-1}
      role="option"
      key={option.key}
      className="item"
      onClick={onClick}
      aria-selected={false}
      // $FlowFixMe
      ref={option.setRefElement}
      id={`typeahead-item-${index}`}
    >
      <Flexbox alignItems="center" columnGap={8}>
        {option.icon}
        <Text type="s0m" color="--neutral-color-800">
          {option.title}
        </Text>
      </Flexbox>
    </li>
  );
}

function getDynamicOptions(editor, queryString: string) {
  const options: Array<ComponentPickerOption> = [];

  if (queryString == null) {
    return options;
  }

  const tableMatch = queryString.match(/^([1-9]\d?)(?:x([1-9]\d?)?)?$/);

  if (tableMatch !== null) {
    const rows = tableMatch[1];
    const colOptions = tableMatch[2]
      ? [tableMatch[2]]
      : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(String);

    options.push(
      ...colOptions.map(
        (columns) =>
          new ComponentPickerOption(`${rows}x${columns} Table`, {
            icon: <i className="icon table" />,
            keywords: ['table'],
            onSelect: () => editor.dispatchCommand(INSERT_TABLE_COMMAND, { columns, rows }),
          }),
      ),
    );
  }

  return options;
}

function getBaseOptions(editor, showModal) {
  return [
    /* new ComponentPickerOption('Table', {
      icon: <i className="icon table" />,
      keywords: ['table', 'grid', 'spreadsheet', 'rows', 'columns'],
      onSelect: () =>
        showModal('Insert Table', (onClose) => (
          <InsertTableDialog activeEditor={editor} onClose={onClose} />
        )),
    }), */
    new ComponentPickerOption('Code', {
      icon: <Icon icon="code" size={20} color="--neutral-color-500" />,
      keywords: ['javascript', 'python', 'js', 'codeblock'],
      onSelect: () =>
        editor.update(() => {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            if (selection.isCollapsed()) {
              $setBlocksType(selection, () => $createCodeNode());
            } else {
              // Will this ever happen?
              const textContent = selection.getTextContent();
              const codeNode = $createCodeNode();
              selection.insertNodes([codeNode]);
              selection.insertRawText(textContent);
            }
          }
        }),
    }),
    new ComponentPickerOption('Image', {
      icon: <Icon icon="image" size={20} color="--neutral-color-500" />,
      keywords: ['image', 'photo', 'picture', 'file'],
      onSelect: () =>
        showModal('Insert an Image', (onClose) => (
          <InsertImageDialog activeEditor={editor} onClose={onClose} />
        )),
    }),
  ];
}

export default function ComponentPickerMenuPlugin(): React$Node {
  const [editor] = useLexicalComposerContext();
  const [modal, showModal] = useModal();
  const [queryString, setQueryString] = useState<string | null>(null);

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch('/', {
    minLength: 0,
  });

  const options = useMemo(() => {
    const baseOptions = getBaseOptions(editor, showModal);

    if (!queryString) {
      return baseOptions;
    }

    const regex = new RegExp(queryString, 'i');

    return [
      ...getDynamicOptions(editor, queryString),
      ...baseOptions.filter(
        (option) =>
          regex.test(option.title) || option.keywords.some((keyword) => regex.test(keyword)),
      ),
    ];
  }, [editor, queryString, showModal]);

  const onSelectOption = useCallback(
    (selectedOption, nodeToRemove, closeMenu: () => void, matchingString: string) => {
      editor.update(() => {
        nodeToRemove?.remove();
        selectedOption.onSelect(matchingString);
        closeMenu();
      });
    },
    [editor],
  );

  return (
    <>
      {modal}
      <LexicalTypeaheadMenuPlugin
        onQueryChange={setQueryString}
        onSelectOption={onSelectOption}
        triggerFn={checkForTriggerMatch}
        options={options}
        menuRenderFn={
          (anchorElementRef, { selectOptionAndCleanUp, setHighlightedIndex }) =>
            anchorElementRef.current && options.length
              ? ReactDOM.createPortal(
                  // eslint-disable-next-line react/jsx-indent
                  <div className="typeahead-popover component-picker-menu">
                    <ul>
                      {options.map((option, i: number) => (
                        <ComponentPickerMenuItem
                          index={i}
                          onClick={() => {
                            setHighlightedIndex(i);
                            selectOptionAndCleanUp(option);
                          }}
                          key={option.key}
                          option={option}
                        />
                      ))}
                    </ul>
                  </div>,
                  anchorElementRef.current,
                )
              : null
          // eslint-disable-next-line react/jsx-curly-newline
        }
      />
    </>
  );
}
