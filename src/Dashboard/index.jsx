// @flow
import { Routes, Route } from 'react-router-dom';

import Home from '../Home';
import Header from '../Header';
import Project from '../Project';
import SearchView from '../SearchView';

import styles from './index.module.sass';

export default function Dashboard(): React$Node {
  return (
    <div>
      <Header />
      <section className={styles.section}>
        <Routes>
          <Route path="/projects/:project" element={<Project />} />
          <Route path="/search" element={<SearchView />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </section>
    </div>
  );
}
