import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import {
  HomePage,
  PokedexPage,
  PokeInfoPage,
  LegendariesPage,
  AboutPage,
  NotFoundPage,
} from './pages/index';
import Header from './components/header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokedex" element={<PokedexPage />} />
        <Route path="/pokemonInfo:id" element={<PokeInfoPage />} />
        <Route path="/legendaries" element={<LegendariesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" exact element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
