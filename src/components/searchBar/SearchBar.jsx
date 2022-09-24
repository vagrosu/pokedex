import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

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

  // useEffect(() => console.log('Prev: ', initialPokemons), [initialPokemons]);
  // console.log(search);

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearch(displayedSearch);
    }, 500);

    return () => clearTimeout(delay);
  }, [displayedSearch]);

  return (
    <div className={`${styles.searchBar} ${className}`}>
      <input
        className={styles.input}
        value={displayedSearch}
        onChange={(e) => setDisplayedSearch(e.target.value)}
      />
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
