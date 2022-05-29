import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './PokeInfo.module.css';

function PokemonInfo() {
  const getPokemonId = () => {
    const { id } = useParams();
    return parseInt(id.slice(1), 10);
  };

  return (
    <div>
      PokemonInfo: {getPokemonId()}
    </div>
  );
}

export default PokemonInfo;
