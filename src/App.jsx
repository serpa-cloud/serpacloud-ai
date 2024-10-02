/* eslint-disable import/no-extraneous-dependencies */
// @flow
import stylex from '@serpa-cloud/stylex';
import { memo, Suspense, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Routes, Route, Navigate } from 'react-router-dom';

import spanishTranslations from './translations/spanish.json';
import englishTranslations from './translations/english.json';

import Dashboard from './Dashboard';
import Login from './Session/Login';
import Signup from './Session/Signup';
import SessionController from './SessionController';
import Loader from './Chat/Loader'; // Asegúrate de tener un componente Loader

import { Flexbox, Text } from './shared';

type Props = {
  locale: 'es' | 'en',
};

const styles = stylex.create({
  loaderContainer: {
    width: '100vw',
    height: '100vh',
  },
});

function App({ locale }: Props): React$Node {
  const [isReindexing, setIsReindexing] = useState(true);

  useEffect(() => {
    const reindexSelectedDirectories = async () => {
      try {
        await window.codegen.reindexDirectories();
      } catch (error) {
        console.error('Error al reindexar los directorios:', error);
      } finally {
        setIsReindexing(false);
      }
    };

    reindexSelectedDirectories();
  }, []);

  let translations = spanishTranslations;

  if (locale === 'en') {
    translations = englishTranslations;
  }

  if (isReindexing) {
    return (
      <IntlProvider messages={translations} locale={locale}>
        <Flexbox
          flexDirection="column"
          rowGap={32}
          alignItems="center"
          justifyContent="center"
          className={stylex(styles.loaderContainer)}
        >
          <Loader />
          <Flexbox flexDirection="column" rowGap={12}>
            <Text type="s2b" color="--primary-color-1" textAlign="center">
              Indexando Proyectos
            </Text>
            <Text type="s1m" color="--neutral-color-600" textAlign="center">
              Por favor no cierres la aplicación
            </Text>
          </Flexbox>
        </Flexbox>
      </IntlProvider>
    );
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
          path="/app"
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
