import React, { useState, useEffect } from 'react';

import styles from './Pokedex.module.css';

import PokedexCard from '../../components/cards/pokedexCard/PokedexCard';
import PokedexInfoCard from '../../components/cards/pokedexInfoCard/PokedexInfoCard';
import SlideShowDots from '../../components/slideShowDots/SlideShowDots';
import Footer from '../../components/footer/Footer';

const fetchData = async (link) => {
  const response = await fetch(link);
  if (!response.ok) {
    throw new Error('Pokemons could not be fetched');
  } else {
    return response.json();
  }
};

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [pokemonCardIndex, setPokemonCardIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(67);
  const [isLoading, setIsLoading] = useState(false);
  const pokemonsOnPage = 9;

  useEffect(() => {
    setIsLoading(true);
    fetchData(`https://pokeapi.co/api/v2/pokemon/?offset=${(page - 1) * pokemonsOnPage}&limit=${pokemonsOnPage}`)
      .then((res) => setPokemons(res))
      .catch((err) => console.log(err.message))
      .then(setIsLoading(false));
  }, [page]);

  useEffect(() => {
    setPokemonsData([]);
    const pokemonsArray = pokemons.results;
    if (pokemonsArray) {
      pokemonsArray.forEach((pokemon) => {
        const pokemonLink = pokemon.url;
        fetchData(pokemonLink)
          .then((res) => setPokemonsData((prevData) => [...prevData, res]))
          .catch((err) => console.log(err.message));
      });
    }
  }, [pokemons]);

  useEffect(() => { console.log(page, pokemons); }, [pokemons]);
  useEffect(() => { console.log(pokemonsData); }, [pokemonsData]);

  const closeCardHandler = () => {
    setPokemonCardIndex(null);
  };

  const displayCards = () => {
    if (pokemonsData && pokemonsData.length === pokemonsOnPage) {
      return pokemonsData.map((pokemon, index) => (
        <PokedexCard
          onClick={() => setPokemonCardIndex(index)}
          pokemonData={pokemon}
          key={pokemon.id}
        />
      ));
    }
    if (pokemonsData && pokemonsData.length > pokemonsOnPage) {
      setPokemonsData((prevData) => prevData.slice(pokemonsData.length - pokemonsOnPage));
    }
    // return (<div style={{ height: '500px' }} />);
    return (null);
  };

  return (
    <div className={styles.pokedex}>
      <div className={styles.container}>
        <h1 className={styles.title}>Over 600 Pokemons for you to choose your favorite</h1>
        <div className={styles.cardsContainer}>
          {displayCards()}
        </div>
        <SlideShowDots
          page={page}
          setPage={setPage}
          lastPage={lastPage}
          isKeyboardEnabled={pokemonCardIndex === null}
          className={styles.dots}
        />
      </div>
      <Footer />
      {pokemonCardIndex != null && (
        <PokedexInfoCard
          pokemonData={pokemonsData[pokemonCardIndex]}
          closeCardHandler={closeCardHandler}
        />
      )}
    </div>
  );
}

export default Pokedex;
