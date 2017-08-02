import { createStore } from 'redux';
import game from '../reducer/game';

const store = createStore(game);
export default store;

