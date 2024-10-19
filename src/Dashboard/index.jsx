// @flow

import { Routes, Route } from 'react-router-dom';

import Project from '../Project';
import Projects from '../Projects';

export default function Dashboard(): React$Node {
  return (
    <Routes>
      <Route path="/projects/:project" element={<Project />} />
      <Route path="/" element={<Projects />} />
    </Routes>
  );
}
