/* eslint-disable react/no-unknown-property */
// @flow
import stylex from '@serpa-cloud/stylex';
import { useEffect, useRef, useState } from 'react';
import { Icon, Flexbox, InteractiveElement } from '../shared';

const styles = stylex.create({
  toolbar: {
    height: 40,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    borderBottom: '1px solid var(--border-color)',
  },
  browser: {
    width: '100%',
    flex: 1,
    backgroundColor: '#010625',
  },
  webview: {
    height: '100%',
    boxSizing: 'border-box',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  mobile: {
    width: 375,
    paddingTop: 24,
    paddingBottom: 24,
  },
  desktop: {
    width: '100%',
    padding: 24,
  },
});

type Props = {|
  +url: string,
|};

export default function Webpreview({ url }: Props): React$Node {
  const ref = useRef(null);
  const [currentUrl, setCurrentUrl] = useState(url);

  const [viewMode, setViewMode] = useState('desktop');

  const handleReload = () => {
    ref?.current?.reloadIgnoringCache();
  };

  const handleOpenDevTools = () => {
    ref?.current?.openDevTools();
  };

  useEffect(() => {
    const webElement = ref?.current;

    function listener(e) {
      setCurrentUrl(e.url);
    }

    webElement?.addEventListener('will-navigate', listener);

    return () => webElement?.removeEventListener('will-navigate', listener);
  }, []);

  return (
    <>
      <Flexbox
        className={stylex(styles.toolbar)}
        alignItems="center"
        justifyContent="space-between"
      >
        <Flexbox alignItems="center" columnGap={16}>
          <InteractiveElement label="Reload" onClick={handleReload}>
            <Icon
              size={20}
              icon="refresh"
              color="--neutral-color-800"
              hoverColor="--primary-color-1"
            />
          </InteractiveElement>
        </Flexbox>

        <Flexbox alignItems="center" columnGap={16}>
          <InteractiveElement
            label="Desktop Preview Mode"
            onClick={() => {
              setViewMode('desktop');
            }}
          >
            <Icon
              size={20}
              icon="computer"
              color="--neutral-color-800"
              hoverColor="--primary-color-1"
            />
          </InteractiveElement>

          <InteractiveElement
            label="Mobile Preview Mode"
            onClick={() => {
              setViewMode('mobile');
            }}
          >
            <Icon
              size={20}
              icon="smartphone"
              color="--neutral-color-800"
              hoverColor="--primary-color-1"
            />
          </InteractiveElement>

          <InteractiveElement label="Dev Tools" onClick={handleOpenDevTools}>
            <Icon
              size={20}
              icon="code"
              color="--neutral-color-800"
              hoverColor="--primary-color-1"
            />
          </InteractiveElement>
        </Flexbox>
      </Flexbox>

      <div className={stylex(styles.browser)}>
        <webview
          /* $FlowIssue */
          ref={ref}
          id="webview"
          src={currentUrl}
          className={stylex(styles.webview, viewMode === 'mobile' ? styles.mobile : styles.desktop)}
        />
      </div>
    </>
  );
}
