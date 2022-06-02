import React from 'react';
import PropTypes from 'prop-types';

import styles from './PokedexCard.module.css';
import { getTypeIcon } from '../../../assets/typeIcons/index';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function PokedexCard(props) {
  const {
    name, height, weight, types,
  } = props.pokemonData;
  const image = props.pokemonData.sprites.other.dream_world.front_default;

  const getBackgroundColor = () => {
    switch (types[0].type.name) {
      case 'bug':
        return 'linear-gradient(270deg, #A6B91A 0.15%, #c9df20 100%)';
      case 'dark':
        return 'linear-gradient(270deg, #705746 0.15%, #4e3d31 100%)';
      case 'dragon':
        return 'linear-gradient(270deg, #3b03c9 0.15%, #6F35FC 100%)';
      case 'electric':
        return 'linear-gradient(270deg, #F2CB07 0.15%, #F2B807 100%)';
      case 'fairy':
        return 'linear-gradient(270deg, #F89EAE 0.15%, #F4B5C1 100%)';
      case 'fighting':
        return 'linear-gradient(270deg, #dc5a56 0.15%, #C22E28 100%)';
      case 'fire':
        return 'linear-gradient(270deg, #B33327 0.15%, #D93E30 100%)';
      case 'flying':
        return 'linear-gradient(270deg, #9675f0 0.15%, #90a9f3 100%)';
      case 'ghost':
        return 'linear-gradient(270deg, #735797 0.15%, #564171 100%)';
      case 'grass':
        return 'linear-gradient(270deg, #64D368 0.15%, #64D368 70.88%)';
      case 'ground':
        return 'linear-gradient(270deg, #E2BF65 0.15%, #d6a529 100%)';
      case 'ice':
        return 'linear-gradient(270deg, #96D9D6 0.15%, #44bbb5 100%)';
      case 'normal':
        return 'linear-gradient(270deg, #a8a77a 0.15%, #9c9c86 100%)';
      case 'poison':
        return 'linear-gradient(270deg, #A33EA1 0.15%, #813180 100%)';
      case 'psychic':
        return 'linear-gradient(270deg, #f60950 0.15%, #F95587 100%)';
      case 'rock':
        return 'linear-gradient(270deg, #9d8b2f 0.15%, #B6A136 100%)';
      case 'steel':
        return 'linear-gradient(270deg, #B7B7CE 0.15%, #b6c2cd 100%)';
      case 'water':
        return 'linear-gradient(270deg, #5BC7FA 0.15%, #35BAFF 100%)';
      default:
        return 'white';
    }
  };

  const typeIcons = () => types.map((type) => {
    const typeName = type.type.name;
    const key = type.slot;
    return (
      <img
        src={getTypeIcon(typeName)}
        alt={typeName}
        className={styles.typeIcon}
        key={key}
      />
    );
  });

  return (
    <div className={`${styles.pokedexCard} ${props.className}`}>
      <div className={styles.infoContainer}>
        <h3 className={styles.name}>{capitalizeFirstLetter(name)}</h3>
        <div className={styles.statsContainer}>
          <div className={styles.statContainer}>
            <div className={styles.statValueContainer}>
              <h4 className={styles.statValue}>{height}</h4>
            </div>
            <h4 className={styles.statName}>Height</h4>
          </div>
          <div className={styles.statContainer}>
            <div className={styles.statValueContainer}>
              <h4 className={styles.statValue}>{weight}</h4>
            </div>
            <h4 className={styles.statName}>Weight</h4>
          </div>
        </div>
      </div>
      <div className={styles.imageContainer} style={{ background: getBackgroundColor() }}>
        <img src={image} alt="Pokemon" width="140px" height="140px" />
      </div>
      <div className={styles.typesContainer}>
        {typeIcons()}
      </div>
    </div>
  );
}

PokedexCard.propTypes = {
  pokemonData: PropTypes.object.isRequired,
  className: PropTypes.string,
};

PokedexCard.defaultProps = {
  className: '',
};

export default PokedexCard;
