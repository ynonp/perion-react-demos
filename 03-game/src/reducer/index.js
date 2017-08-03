import gameReducer from './game';
import chatReducer from './chat';
import swapiReducer from './swapi';

// const reducer = combineReducers({ game, chat });

export default function reducer(state, action) {
  /*
  if ( action.type === '@@setstate') {
    return action.payload;
  }
  */
  return {
    game: gameReducer(state && state.game, action),
    chat: chatReducer(state && state.chat, action),
    swapi: swapiReducer(state && state.swapi, action),
  }
}

