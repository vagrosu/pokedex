import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './PokedexInfoCard.module.css';
import closeIcon from '../../../assets/closeIcon.svg';
import { getPokemonGradient } from '../../../colors/getPokemonColor';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function PokedexInfoCard(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const {
    name, types, stats, abilities, id,
  } = props.pokemonData;

  const image = props.pokemonData.sprites.other.dream_world.front_default;

  const statCard = (statValue, statName, key) => (
    <div className={styles.statContainer} key={key}>
      <div className={styles.statValueContainer}>
        <h4 className={styles.statValue}>{statValue}</h4>
      </div>
      <h4 className={styles.statName}>{statName}</h4>
    </div>
  );

  const showStatCards = () => {
    const cards = [
      statCard(stats[1].base_stat, 'Attack', 1),
      statCard(stats[2].base_stat, 'Defense', 2),
      statCard(stats[3].base_stat, 'Sp Attack', 3),
      statCard(stats[4].base_stat, 'Sp Defense', 4),
    ];
    return cards;
  };

  const showAbilities = () => abilities.map((ability, index) => {
    const abilityName = ability.ability.name;
    const { slot } = ability;
    if (index >= 1) {
      return (
        <React.Fragment key={slot}>
          <h2 className={styles.abilityName}> {' and '} </h2>
          <h2 className={styles.abilityName}>
            {capitalizeFirstLetter(abilityName)}
          </h2>
        </React.Fragment>
      );
    }
    return (
      <h2 className={styles.abilityName} key={slot}>
        {capitalizeFirstLetter(abilityName)}
      </h2>
    );
  });

  useEffect(() => { setIsLoaded(true); }, []);

  const showBasicStats = () => {
    const hp = stats[0].base_stat;
    const hpPercent = Math.floor((hp / 255) * 100);
    const baseXP = props.pokemonData.base_experience;
    const xpPercent = Math.floor((baseXP / 635) * 100);
    return (
      <>
        <div className={styles.basicStatContainer}>
          <h2 className={styles.basicStatTitle}>Health Points</h2>
          <h2 className={styles.basicStat}>{hp}</h2>
          <div className={styles.emptyBar}>
            <div
              className={styles.filledBar}
              style={isLoaded ? {
                width: `${hpPercent}%`,
                background: 'linear-gradient(270deg, #64D368 0.15%, #64D368 70.88%)',
              } : {}}
            />
          </div>
        </div>
        <div className={styles.basicStatContainer}>
          <h2 className={styles.basicStatTitle}>Base Experience</h2>
          <h2 className={styles.basicStat}>{baseXP}</h2>
          <div className={styles.emptyBar}>
            <div
              className={styles.filledBar}
              style={isLoaded ? {
                width: `${xpPercent}%`,
                background: 'linear-gradient(180deg, #F5DB13 0%, #F2B807 100%)',
              } : {}}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={styles.pokedexInfoCard}>
      <div className={styles.closeButtonContainer}>
        <img
          src={closeIcon}
          alt="Close"
          className={styles.closeButton}
          onClick={props.closeCardHandler}
        />
      </div>
      <div
        className={styles.container}
        style={{ background: getPokemonGradient(types[0].type.name) }}
      >
        <div className={styles.shadow} />
        <div
          className={styles.imageContainer}
          style={{ background: getPokemonGradient(types[0].type.name) }}
        >
          <img src={image} alt={name} className={styles.image} />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.mainInfoContainer}>
            <h1 className={styles.name}>{capitalizeFirstLetter(name)}</h1>
            <div className={styles.idContainer}>
              <h3 className={styles.id}>{id}</h3>
            </div>
          </div>
          <div className={styles.abilitiesCard}>
            <h2 className={styles.abilities}>Abilities:</h2>
            <div className={styles.abilitiesContainer}>
              {showAbilities()}
            </div>
          </div>
          <div className={styles.basicStatsContainer}>
            {showBasicStats()}
          </div>
          <div className={styles.statCardsContainer}>
            {showStatCards()}
          </div>
        </div>
      </div>
    </div>
  );
}

PokedexInfoCard.propTypes = {
  pokemonData: PropTypes.object.isRequired,
  closeCardHandler: PropTypes.func.isRequired,
};

export default PokedexInfoCard;
