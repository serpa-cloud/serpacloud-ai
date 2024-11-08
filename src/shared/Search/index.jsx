import { useEffect, useRef } from 'react';

import styles from './index.module.sass';

import Icon from '../Icon';
import InteractiveElement from '../InteractiveElement';

import useDevice from '../hooks/useDevice';

export default function Search(): React$Node {
  const { os } = useDevice();
  const isMacOS = os.includes('Mac OS ');
  const searchInput = useRef(null);
  useEffect(() => {
    const handleKeydown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'f') {
        event.preventDefault();
        searchInput.current.focus();
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        searchInput.current.blur();
      }

      if (event.key === 'Enter' && document.activeElement === searchInput.current) {
        event.preventDefault();
        console.log('searching');
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <div className={styles.searchContainer}>
      <InteractiveElement onClick={() => {}}>
        <div>
          <Icon
            icon="search"
            gradient="linear-gradient(225deg, rgb(255, 82, 207) 0%, rgb(255, 103, 82) 100%)"
          />
        </div>
      </InteractiveElement>
      <input
        type="text"
        placeholder={`${isMacOS ? '⌘' : 'CTRL'} + F / Search your project`}
        className={styles.searchInput}
        ref={searchInput}
      />
    </div>
  );
}
