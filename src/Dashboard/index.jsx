// @flow
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../Home';
import Header from '../Header';
import Project from '../Project';

import styles from './index.module.sass';

export default function Dashboard(): React$Node {
  return (
    <div>
      <Header />
      <section className={styles.section}>
        <Routes>
          <Route
            path="/projects/:project"
            element={
              <Suspense fallback={<div />}>
                <Project />
              </Suspense>
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </section>
    </div>
  );
}
