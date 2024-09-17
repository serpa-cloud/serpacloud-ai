/* eslint-disable import/no-extraneous-dependencies */
// @flow
import { memo } from 'react';
import { IntlProvider } from 'react-intl';

import spanishTranslations from './translations/spanish.json';
import englishTranslations from './translations/english.json';

import Chat from './Chat';

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
      <Chat />
    </IntlProvider>
  );
}

export default (memo<Props>(App): React$AbstractComponent<Props, mixed>);
