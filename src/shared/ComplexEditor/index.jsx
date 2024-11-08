// @flow
import DocumentEditor from '../DocumentEditor';
import OnlyHeadingPlugin from './OnlyHeadingPlugin';

import Margin from '../Margin';

import styles from './index.module.sass';

export default function ComplexEditor(): React$Node {
  return (
    <div>
      <DocumentEditor
        placeholder="Untitled Project"
        className={styles.titleEditor}
        placeholderClassName={styles.titlePlaceholder}
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
          placeholder="Write a summary.."
          className={styles.summaryEditor}
          placeholderClassName={styles.summaryPlaceholder}
        />
      </Margin>
    </div>
  );
}
