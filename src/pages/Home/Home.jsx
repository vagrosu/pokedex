import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/button/Button';
import Footer from '../../components/footer/Footer';
// import pikachuCut from '../../assets/pikachuCut.svg';
import pikachuFull from '../../assets/pikachuFull.svg';

import styles from './Home.module.css';

function Home() {
  const navigate = useNavigate();

  const toPokedexHandler = () => {
    navigate('/pokedex', { state: true });
  };

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            Find all your favorite Pokémon
          </h1>
          <h3 className={styles.subtitle}>
            You can know the type of Pokémon, its strengths, disadvantages and abilities
          </h3>
          <Button type="primary" onClick={toPokedexHandler} className={styles.button}>See Pokémons</Button>
        </div>
        <div className={styles.imageContainer}>
          <img src={pikachuFull} alt="Pikachu" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
