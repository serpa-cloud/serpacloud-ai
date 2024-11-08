/* eslint-disable react/jsx-filename-extension */

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RelayEnvironmentProvider } from 'react-relay';

import App from './App';

import RelayEnvironment from './RelayEnvironment';

import ResizerProvider from './shared/hooks/useDevice/ResizerProvider';

import './shared/styles.css';

const isEnglish = window.location.hostname.includes('en.');

createRoot(document.getElementById('root')).render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <BrowserRouter>
      <ResizerProvider>
        <App locale={isEnglish ? 'en' : 'es'} />
      </ResizerProvider>
    </BrowserRouter>
  </RelayEnvironmentProvider>,
);
