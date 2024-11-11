// @flow
import { Search, Padding, Flexbox } from '../shared';

import testList from './testData';
import ProjectsList from '../ProjectsList';

import styles from './index.module.sass';

export default function SearchView(): React$Node {
  return (
    <section className={styles.section}>
      <Padding vertical={24}>
        <Flexbox flexDirection="column" rowGap={24}>
          <Search />
          <ProjectsList projects={testList} />
        </Flexbox>
      </Padding>
    </section>
  );
}
