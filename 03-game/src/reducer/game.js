import Immutable from 'immutable';

const EMPTY_BOARD = ['', '', '', '', '', '', '', '', ''];

const initialData = Immutable.fromJS({
  currentPlayer: 'X',
  board: EMPTY_BOARD,
});

export default function reducer(state = initialData, action) {
  if (!action) { return state; }

  const actionType = action.type;
  const handler = handlers[actionType.substr(2)];
  if (typeof handler === 'function') {
    return handler(state, action);
  }
  return state;
}

const handlers = {
  play(state, { payload: { i, j } }) {
    const player = state.get('currentPlayer');
    const index = i * 3 + j;
    if (state.getIn(['board', index]) !== '') {
      return state;      
    }

    const s1 = state.setIn(['board', index], player);
    const s2 = s1.set('currentPlayer', player === 'X' ? 'O' : 'X');
    return s2;
  },

  restart(state, action) {
    return initialData;
  },
};

