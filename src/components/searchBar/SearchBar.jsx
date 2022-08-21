import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './SearchBar.module.css';

function SearchBar(props) {
  return (
    <div className={`${styles.searchBar} ${props.className}`}>
      <input className={styles.input} />
    </div>
  );
}

SearchBar.propTypes = {
  className: PropTypes.string,
};

SearchBar.defaultProps = {
  className: '',
};

export default SearchBar;
