import React, { useState, useEffect } from 'react';

import styles from './Pokedex.module.css';

import SearchBar from '../../components/searchBar/SearchBar';
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

const pokemonsOnPage = 9;
const maxPokemons = 630;

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [totalPokemons, setTotalPokemons] = useState(maxPokemons);
  const [pokemonCardIndex, setPokemonCardIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(Math.ceil(totalPokemons / pokemonsOnPage));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLastPage(Math.ceil(totalPokemons / pokemonsOnPage));
  }, [totalPokemons]);

  useEffect(() => {
    setIsLoading(true);
    fetchData(`https://pokeapi.co/api/v2/pokemon/?limit=${totalPokemons}`)
      .then((res) => setPokemons(res.results))
      .catch((err) => console.log(err.message))
      .then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setPokemonsData([]);
    const firstPokemon = (page - 1) * pokemonsOnPage;
    const lastPokemon = (firstPokemon + pokemonsOnPage - 1) < totalPokemons
      ? firstPokemon + pokemonsOnPage - 1
      : totalPokemons - 1;
    if (pokemons.length > 0) {
      for (let i = firstPokemon; i <= lastPokemon; i++) {
        const pokemonLink = pokemons[i].url;
        fetchData(pokemonLink)
          .then((res) => setPokemonsData((prevData) => [...prevData, res]))
          .catch((err) => console.log(err.message));
      }
    }
  }, [page, pokemons]);

  useEffect(() => { console.log(page, pokemons); }, [pokemons]);
  useEffect(() => { console.log(pokemonsData); }, [pokemonsData]);

  const closeCardHandler = () => {
    setPokemonCardIndex(null);
  };

  const displayCards = () => {
    if (pokemonsData) {
      return pokemonsData.map((pokemon, index) => (
        <PokedexCard
          onClick={() => setPokemonCardIndex(index)}
          pokemonData={pokemon}
          key={pokemon.id}
        />
      ));
    }
    // return (<div style={{ height: '500px' }} />);
    return null;
  };

  return (
    <div className={styles.pokedex}>
      <div className={styles.container}>
        <h1 className={styles.title}>Over 600 Pokemons for you to choose your favorite</h1>
        <SearchBar
          className={styles.searchBar}
          setPokemonsData={setPokemonsData}
        />
        <div
          className={styles.cardsContainer}
          style={{ gridTemplateColumns: `repeat(${pokemonsData.length > 2 ? 3 : pokemonsData.length}, 1fr)` }}
        >
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
