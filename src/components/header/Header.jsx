import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Header.module.css';

import logo from '../../assets/logo.svg';

const pageNameToLink = (pageName) => {
  switch (pageName) {
    case 'Home':
      return '/';
    case 'Pokédex':
      return '/pokedex';
    case 'Legendaries':
      return '/legendaries';
    case 'About':
      return '/about';
    default:
      return '*';
  }
};

const pageLinkToName = (pageLink) => {
  switch (pageLink) {
    case '/':
      return 'Home';
    case '/pokedex':
      return 'Pokédex';
    case '/legendaries':
      return 'Legendaries';
    case '/about':
      return 'About';
    case pageLink.match(/^\/pokemonInfo.+/) && pageLink:
      return 'PokemonInfo';
    default:
      return false;
  }
};

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [link, setLink] = useState(location.pathname);

  const isSelected = (pageName) => {
    if (pageNameToLink(pageName) === link) {
      return true;
    }
    if (pageName === 'Legendaries' && pageLinkToName(link) === 'PokemonInfo') {
      return true;
    }
    return false;
  };

  const onPageClickHandler = (e) => {
    const pageName = e.target.innerHTML ? e.target.innerHTML : 'Home';
    setLink(pageNameToLink(pageName));
  };

  useEffect(() => {
    if (link !== location.pathname) {
      navigate(link, { state: true });
    }
  }, [link]);

  useEffect(() => {
    if (link !== location.pathname) {
      setLink(location.pathname);
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <img src={logo} alt="Pokemon" className={styles.logo} onClick={onPageClickHandler} />
      <div className={styles.linksContainer}>
        <h3 className={isSelected('Home') ? styles.selected : ''} onClick={onPageClickHandler}>Home</h3>
        <h3 className={isSelected('Pokédex') ? styles.selected : ''} onClick={onPageClickHandler}>Pokédex</h3>
        <h3 className={isSelected('Legendaries') ? styles.selected : ''} onClick={onPageClickHandler}>Legendaries</h3>
        <h3 className={isSelected('About') ? styles.selected : ''} onClick={onPageClickHandler}>About</h3>
      </div>
    </header>
  );
}

export default Header;
