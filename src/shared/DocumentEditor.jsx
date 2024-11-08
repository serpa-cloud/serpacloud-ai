// @flow
import stylex from '@serpa-cloud/stylex';
import { useState, forwardRef } from 'react';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';

import {
  $getRoot,
  $createTextNode,
  $createParagraphNode,
  LineBreakNode,
  ParagraphNode,
} from 'lexical';

import { ImageNode } from './nodes/ImageNode';

import SubmitPlugin from './Plugins/SubmitPlugin';
import ImagesPlugin from './Plugins/ImagesPlugin';
import AutoLinkPlugin from './Plugins/AutoLinkPlugin';
import AutoFocusPlugin from './Plugins/AutoFocusPlugin';
import DragDropPastePlugin from './Plugins/DragDropPastePlugin';
import CodeHighlightPlugin from './Plugins/CodeHighlightPlugin';
import ComponentPickerMenuPlugin from './Plugins/ComponentPickerPlugin';
import FloatingTextFormatToolbarPlugin from './Plugins/FloatingTextFormatToolbarPlugin';

import './DocumentEditor.css';

const styles = stylex.create({
  editorContainer: {
    position: 'relative',
    // fontFamily:
    // 'SF Pro Text, SF Pro Display, SF Pro Icons, system-ui, -apple-system, Helvetica, Arial, sans-serif', // Aplicar la fuente al placeholder
  },
  placeholder: {
    position: 'absolute',
    top: 0, // Alineado al inicio del texto
    left: 0,
    // color: 'var(--neutral-color-500)',
    pointerEvents: 'none',
    // fontFamily:
    // 'SF Pro Text, SF Pro Display, SF Pro Icons, system-ui, -apple-system, Helvetica, Arial, sans-serif', // Aplicar la fuente al placeholder
  },
});

type Props = {|
  +className?: ?string,
  +autofocus?: ?boolean,
  +placeholder?: ?string,
  +children?: ?React$Node,
  +onSubmit?: ?(any) => void,
  +defaultPlainText?: ?string,
  +placeholderClassName?: ?string,
  +$customPopulate?: ?(any) => void,
  +theme?: ?{
    [string]: string,
    heading?: ?{
      [string]: string,
    },
  },
|};

function DocumentEditorInterface(
  {
    theme,
    children,
    onSubmit,
    autofocus,
    className,
    placeholder,
    $customPopulate,
    defaultPlainText,
    placeholderClassName,
  }: Props,
  ref,
): React$Node {
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement | null) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  function $prepopulatedRichText() {
    if (defaultPlainText) {
      const root = $getRoot();
      if (root.getFirstChild() === null) {
        const paragraph = $createParagraphNode();
        paragraph.append($createTextNode(defaultPlainText));
        root.append(paragraph);
      }
    }
  }

  return (
    <div className={`${stylex(styles.editorContainer)} ${className ?? ''}`}>
      <LexicalComposer
        initialConfig={{
          namespace: 'DocumentEditor',
          editorState: $customPopulate || $prepopulatedRichText,
          onError: (error) => console.error(error),
          nodes: [
            LinkNode,
            ListNode,
            CodeNode,
            ImageNode,
            QuoteNode,
            HeadingNode,
            ListItemNode,
            AutoLinkNode,
            ParagraphNode,
            LineBreakNode,
            CodeHighlightNode,
            HorizontalRuleNode,
          ],
          theme: {
            autocomplete: 'PlaygroundEditorTheme__autocomplete',
            blockCursor: 'PlaygroundEditorTheme__blockCursor',
            characterLimit: 'PlaygroundEditorTheme__characterLimit',
            code: 'PlaygroundEditorTheme__code',
            hashtag: 'PlaygroundEditorTheme__hashtag',
            hr: 'PlaygroundEditorTheme__hr',
            image: 'editor-image',
            indent: 'PlaygroundEditorTheme__indent',
            inlineImage: 'inline-editor-image',
            layoutContainer: 'PlaygroundEditorTheme__layoutContainer',
            layoutItem: 'PlaygroundEditorTheme__layoutItem',
            link: 'PlaygroundEditorTheme__link',
            ltr: 'PlaygroundEditorTheme__ltr',
            mark: 'PlaygroundEditorTheme__mark',
            markOverlap: 'PlaygroundEditorTheme__markOverlap',
            paragraph: 'PlaygroundEditorTheme__paragraph',
            quote: 'PlaygroundEditorTheme__quote',
            rtl: 'PlaygroundEditorTheme__rtl',
            table: 'PlaygroundEditorTheme__table',
            tableCell: 'PlaygroundEditorTheme__tableCell',
            tableCellActionButton: 'PlaygroundEditorTheme__tableCellActionButton',
            tableCellActionButtonContainer: 'PlaygroundEditorTheme__tableCellActionButtonContainer',
            tableCellEditing: 'PlaygroundEditorTheme__tableCellEditing',
            tableCellHeader: 'PlaygroundEditorTheme__tableCellHeader',
            tableCellPrimarySelected: 'PlaygroundEditorTheme__tableCellPrimarySelected',
            tableCellResizer: 'PlaygroundEditorTheme__tableCellResizer',
            tableCellSelected: 'PlaygroundEditorTheme__tableCellSelected',
            tableCellSortedIndicator: 'PlaygroundEditorTheme__tableCellSortedIndicator',
            tableResizeRuler: 'PlaygroundEditorTheme__tableCellResizeRuler',
            tableRowStriping: 'PlaygroundEditorTheme__tableRowStriping',
            tableSelected: 'PlaygroundEditorTheme__tableSelected',
            tableSelection: 'PlaygroundEditorTheme__tableSelection',
            codeHighlight: {
              atrule: 'PlaygroundEditorTheme__tokenAttr',
              attr: 'PlaygroundEditorTheme__tokenAttr',
              boolean: 'PlaygroundEditorTheme__tokenProperty',
              builtin: 'PlaygroundEditorTheme__tokenSelector',
              cdata: 'PlaygroundEditorTheme__tokenComment',
              char: 'PlaygroundEditorTheme__tokenSelector',
              class: 'PlaygroundEditorTheme__tokenFunction',
              'class-name': 'PlaygroundEditorTheme__tokenFunction',
              comment: 'PlaygroundEditorTheme__tokenComment',
              constant: 'PlaygroundEditorTheme__tokenProperty',
              deleted: 'PlaygroundEditorTheme__tokenProperty',
              doctype: 'PlaygroundEditorTheme__tokenComment',
              entity: 'PlaygroundEditorTheme__tokenOperator',
              function: 'PlaygroundEditorTheme__tokenFunction',
              important: 'PlaygroundEditorTheme__tokenVariable',
              inserted: 'PlaygroundEditorTheme__tokenSelector',
              keyword: 'PlaygroundEditorTheme__tokenAttr',
              namespace: 'PlaygroundEditorTheme__tokenVariable',
              number: 'PlaygroundEditorTheme__tokenProperty',
              operator: 'PlaygroundEditorTheme__tokenOperator',
              prolog: 'PlaygroundEditorTheme__tokenComment',
              property: 'PlaygroundEditorTheme__tokenProperty',
              punctuation: 'PlaygroundEditorTheme__tokenPunctuation',
              regex: 'PlaygroundEditorTheme__tokenVariable',
              selector: 'PlaygroundEditorTheme__tokenSelector',
              string: 'PlaygroundEditorTheme__tokenSelector',
              symbol: 'PlaygroundEditorTheme__tokenProperty',
              tag: 'PlaygroundEditorTheme__tokenProperty',
              url: 'PlaygroundEditorTheme__tokenOperator',
              variable: 'PlaygroundEditorTheme__tokenVariable',
            },
            embedBlock: {
              base: 'PlaygroundEditorTheme__embedBlock',
              focus: 'PlaygroundEditorTheme__embedBlockFocus',
            },
            // $FlowIgnore
            heading: {
              h1: 'PlaygroundEditorTheme__h1',
              h2: 'PlaygroundEditorTheme__h2',
              h3: 'PlaygroundEditorTheme__h3',
              h4: 'PlaygroundEditorTheme__h4',
              h5: 'PlaygroundEditorTheme__h5',
              h6: 'PlaygroundEditorTheme__h6',
              ...(theme?.heading ?? {}),
            },
            list: {
              checklist: 'PlaygroundEditorTheme__checklist',
              listitem: 'PlaygroundEditorTheme__listItem',
              listitemChecked: 'PlaygroundEditorTheme__listItemChecked',
              listitemUnchecked: 'PlaygroundEditorTheme__listItemUnchecked',
              nested: {
                listitem: 'PlaygroundEditorTheme__nestedListItem',
              },
              olDepth: [
                'PlaygroundEditorTheme__ol1',
                'PlaygroundEditorTheme__ol2',
                'PlaygroundEditorTheme__ol3',
                'PlaygroundEditorTheme__ol4',
                'PlaygroundEditorTheme__ol5',
              ],
              ul: 'PlaygroundEditorTheme__ul',
            },
            text: {
              bold: 'PlaygroundEditorTheme__textBold',
              code: 'PlaygroundEditorTheme__textCode',
              italic: 'PlaygroundEditorTheme__textItalic',
              strikethrough: 'PlaygroundEditorTheme__textStrikethrough',
              subscript: 'PlaygroundEditorTheme__textSubscript',
              superscript: 'PlaygroundEditorTheme__textSuperscript',
              underline: 'PlaygroundEditorTheme__textUnderline',
              underlineStrikethrough: 'PlaygroundEditorTheme__textUnderlineStrikethrough',
            },
          },
        }}
      >
        <RichTextPlugin
          contentEditable={
            <div className="editor" ref={onRef}>
              <ContentEditable />
            </div>
          }
          placeholder={
            <div className={`${stylex(styles.placeholder)} ${placeholderClassName ?? ''}`}>
              {placeholder || 'Write your project summary...'}
            </div>
          }
          // $FlowFixMe
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ListPlugin />
        <ImagesPlugin />
        <AutoLinkPlugin />
        <CheckListPlugin />
        <DragDropPastePlugin />
        <CodeHighlightPlugin />
        <ClickableLinkPlugin />
        <HorizontalRulePlugin />
        <TabIndentationPlugin />
        <MarkdownShortcutPlugin />
        <ComponentPickerMenuPlugin />
        <SubmitPlugin onSubmit={onSubmit} ref={ref} />
        <AutoFocusPlugin focus={autofocus} />
        {floatingAnchorElem && <FloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />}
        {children}
      </LexicalComposer>
    </div>
  );
}

const DocumentEditor: React$AbstractComponent<Props, mixed> = forwardRef(DocumentEditorInterface);

DocumentEditorInterface.defaultProps = {
  theme: {},
  className: '',
  children: null,
  onSubmit: null,
  placeholder: '',
  autofocus: false,
  $customPopulate: null,
  defaultPlainText: null,
  placeholderClassName: '',
};

export default DocumentEditor;
