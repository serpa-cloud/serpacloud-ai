/* eslint-disable import/no-extraneous-dependencies */
// @flow

import { memo, Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import { Routes, Route, Navigate } from 'react-router-dom';

import spanishTranslations from './translations/spanish.json';
import englishTranslations from './translations/english.json';

import Dashboard from './Dashboard';
import Login from './Session/Login';
import Signup from './Session/Signup';
import SessionController from './SessionController';

type Props = {
  locale: 'es' | 'en',
};

function App({ locale }: Props): React$Node {
  let translations = spanishTranslations;

  if (locale === 'en') {
    translations = englishTranslations;
  }

  return (
    <IntlProvider messages={translations} locale={locale}>
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
                <Dashboard />
              </SessionController>
            </Suspense>
          }
        />
        <Route path="/" element={<Navigate to="/app" />} />
      </Routes>
    </IntlProvider>
  );
}

export default (memo<Props>(App): React$AbstractComponent<Props, mixed>);
