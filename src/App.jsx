/* eslint-disable import/no-extraneous-dependencies */
// @flow
import { memo, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './Dashboard';
import Login from './Session/Login';
import Signup from './Session/Signup';
import SessionController from './SessionController';

import { SocketProvider } from './shared';

function App(): React$Node {
  return (
    <Routes>
      <Route
        path="/session/signin"
        element={
          <Suspense fallback={<div />}>
            <SessionController publicRoute redirectTo="/app" fallback={<div />}>
              <Login />
            </SessionController>
          </Suspense>
        }
      />
      <Route
        path="/session/signup"
        element={
          <Suspense fallback={<div />}>
            <SessionController publicRoute redirectTo="/app" fallback={<div />}>
              <Signup />
            </SessionController>
          </Suspense>
        }
      />
      <Route
        path="/app/*"
        element={
          <Suspense fallback={<div />}>
            <SessionController redirectTo="/session/signin" fallback={<div />}>
              <SocketProvider>
                <Dashboard />
              </SocketProvider>
            </SessionController>
          </Suspense>
        }
      />
      <Route path="/" element={<Navigate to="/app" />} />
    </Routes>
  );
}

export default (memo<{}>(App): React$AbstractComponent<{}, mixed>);
