import React from 'react';
import PropTypes from 'prop-types';

import styles from './PokedexCard.module.css';
import { getTypeIcon } from '../../../assets/typeIcons/index';
import { getPokemonGradient } from '../../../colors/getPokemonColor';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function PokedexCard(props) {
  const {
    name, height, weight, types,
  } = props.pokemonData;
  const image = props.pokemonData.sprites.other.dream_world.front_default;

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
    <div className={`${styles.pokedexCard} ${props.className}`} onClick={props.onClick}>
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
      <div
        className={styles.imageContainer}
        style={{ background: getPokemonGradient(types[0].type.name) }}
      >
        <img src={image} alt="Pokemon" width="140px" height="140px" />
      </div>
      <div className={styles.typesContainer}>
        {typeIcons()}
      </div>
    </div>
  );
}

PokedexCard.propTypes = {
  pokemonData: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

PokedexCard.defaultProps = {
  className: '',
};

export default PokedexCard;
