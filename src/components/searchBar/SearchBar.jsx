import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../assets/searchIcon.svg';
import xmarkIcon from '../../assets/xmarkIcon.png';

import styles from './SearchBar.module.css';

function SearchBar({ pokemons, setPokemons, className }) {
  const [search, setSearch] = useState('');
  const [displayedSearch, setDisplayedSearch] = useState('');
  const [initialPokemons, setInitialPokemons] = useState([]);

  useEffect(() => {
    if (search !== '') {
      setPokemons(initialPokemons.filter((pokemon) => pokemon.name.includes(search.toLowerCase())));
    } else {
      setPokemons(initialPokemons);
    }
  }, [search]);

  useEffect(() => {
    if (!search && !initialPokemons.length) {
      setInitialPokemons(pokemons);
    }
  }, [pokemons]);

  useEffect(() => {
    if (displayedSearch) {
      const delay = setTimeout(() => {
        setSearch(displayedSearch);
      }, 500);

      return () => clearTimeout(delay);
    }
    setSearch(displayedSearch);
  }, [displayedSearch]);

  return (
    <div className={`${styles.searchBar} ${className}`}>
      <div className={styles.searchIconContainer}>
        <img src={searchIcon} alt="Search" />
      </div>
      <input
        className={styles.input}
        value={displayedSearch}
        onChange={(e) => setDisplayedSearch(e.target.value)}
      />
      {!!displayedSearch && (
        <img
          src={xmarkIcon}
          alt="Delete"
          className={styles.clearButton}
          onClick={() => setDisplayedSearch('')}
        />
      )}
    </div>
  );
}

SearchBar.propTypes = {
  className: PropTypes.string,
  pokemons: PropTypes.array,
  setPokemons: PropTypes.func,
};

SearchBar.defaultProps = {
  className: '',
  pokemons: [],
  setPokemons: () => {},
};

export default SearchBar;
