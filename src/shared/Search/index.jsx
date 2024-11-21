import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './index.module.sass';

import Icon from '../Icon';
import InteractiveElement from '../InteractiveElement';
import Flexbox from '../Flexbox';
import FilterTag from '../FilterTag';

import useDevice from '../hooks/useDevice';

export default function Search(): React$Node {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
  const [filter, setFilter] = useState([]);

  const { os } = useDevice();
  const isMacOS = os.includes('Mac OS ');
  const searchInput = useRef(null);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    setSearchParams({ q: event.target.value });
  };

  const handleNavigate = useCallback(() => {
    navigate(`/app/search?q=${searchValue}`);
  }, [navigate, searchValue]);

  const handleFilter = (tag, actionType) => {
    setFilter((prevFilter) => {
      if (actionType === 'add') {
        if (!prevFilter.includes(tag)) {
          return [...filter, tag];
        }
        return prevFilter;
      }

      return prevFilter.filter((item) => item !== tag);
    });
  };

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
        handleNavigate();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleNavigate]);

  useEffect(() => {
    if (searchParams.get('q')) searchInput.current.focus();
  }, [searchParams]);

  return (
    <Flexbox className={styles.searchContainer} flexDirection="column">
      <Flexbox alignItems="center">
        <InteractiveElement onClick={handleNavigate}>
          <div>
            <Icon
              icon="search"
              gradient="linear-gradient(225deg, rgb(255, 82, 207) 0%, rgb(255, 103, 82) 100%)"
            />
          </div>
        </InteractiveElement>
        <input
          value={searchValue}
          type="text"
          placeholder={`${isMacOS ? '⌘' : 'CTRL'} + F / Search your project`}
          className={styles.searchInput}
          ref={searchInput}
          onChange={handleChange}
        />
      </Flexbox>
      <Flexbox alignItems="center" columnGap={8}>
        <FilterTag text="Filter" icon="filter_list" handleFilter={handleFilter} filter={filter} />
        {filter.map((tag) => {
          return (
            <FilterTag text={tag} key={tag} icon="close" isFilter handleFilter={handleFilter} />
          );
        })}
      </Flexbox>
    </Flexbox>
  );
}
