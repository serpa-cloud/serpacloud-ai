// @flow
import { useCallback } from 'react';

import DocumentEditor from '../DocumentEditor';
import OnlyHeadingPlugin from './OnlyHeadingPlugin';

import $populateSummary from './$populateSummary';

import Margin from '../Margin';

import styles from './index.module.sass';

type Props = {|
  +title: string,
  +summary?: ?any,
  +summaryRef?: ?any,
  +onChangeTitle?: ?(string) => void,
  +onChangeSummary?: ?(any) => void | Promise<void>,
|};

export default function ComplexEditor({
  title,
  summary = null,
  summaryRef = null,
  onChangeTitle = null,
  onChangeSummary = null,
}: Props): React$Node {
  const handleTitleChange = useCallback(
    ({ plainText }) => {
      if (onChangeTitle) onChangeTitle(plainText);
    },
    [onChangeTitle],
  );

  return (
    <div>
      <DocumentEditor
        enableComplexPlugins={false}
        placeholder="Untitled Project"
        className={styles.titleEditor}
        placeholderClassName={styles.titlePlaceholder}
        onChange={handleTitleChange}
        defaultPlainText={title}
        theme={{
          heading: {
            h1: styles.titleEditor,
          },
        }}
      >
        <OnlyHeadingPlugin />
      </DocumentEditor>
      <Margin top={24}>
        <DocumentEditor
          ref={summaryRef}
          enableComplexPlugins
          onChange={onChangeSummary}
          placeholder="Write a summary or select a template.."
          className={styles.summaryEditor}
          $customPopulate={$populateSummary(summary)}
          placeholderClassName={styles.summaryPlaceholder}
          contentClassName={styles.summaryContentClassName}
        />
      </Margin>
    </div>
  );
}
