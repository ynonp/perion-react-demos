import gameReducer from './game';
import chatReducer from './chat';

// const reducer = combineReducers({ game, chat });

export default function reducer(state, action) {
  return {
    game: gameReducer(state && state.game, action),
    chat: chatReducer(state && state.chat, action),
  }
}

