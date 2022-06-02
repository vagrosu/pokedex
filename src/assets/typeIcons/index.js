import bugImg from './bug.svg';
import darkImg from './dark.svg';
import dragonImg from './dragon.svg';
import electricImg from './electric.svg';
import fairyImg from './fairy.svg';
import fightingImg from './fighting.svg';
import fireImg from './fire.svg';
import flyingImg from './flying.svg';
import ghostImg from './ghost.svg';
import grassImg from './grass.svg';
import groundImg from './ground.svg';
import iceImg from './ice.svg';
import normalImg from './normal.svg';
import poisonImg from './poison.svg';
import psychicImg from './psychic.svg';
import rockImg from './rock.svg';
import steelImg from './steel.svg';
import waterImg from './water.svg';

const imagesMap = {
  bug: bugImg,
  dark: darkImg,
  dragon: dragonImg,
  electric: electricImg,
  fairy: fairyImg,
  fighting: fightingImg,
  fire: fireImg,
  flying: flyingImg,
  ghost: ghostImg,
  grass: grassImg,
  ground: groundImg,
  ice: iceImg,
  normal: normalImg,
  poison: poisonImg,
  psychic: psychicImg,
  rock: rockImg,
  steel: steelImg,
  water: waterImg,
};

export const getTypeIcon = (imgType) => {
  if (imagesMap[imgType]) {
    return imagesMap[imgType];
  }
  throw new Error('No image found');
};
