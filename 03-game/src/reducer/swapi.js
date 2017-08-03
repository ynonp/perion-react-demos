import Immutable from 'immutable';
import _ from 'lodash';

const initialData = Immutable.fromJS({
  characters: [],
});

export default function reducer(state = initialData, action) {
  if (!action) { return state; }

  const handler = _.get(handlers, action.type.substr(2));

  if (typeof handler === 'function') {
    return handler(state, action);
  }
  return state;
}

const handlers = {
  swapi: {
    gotCharacterDetails(state, { payload: { name, hair_color } }) {
      return state.update('characters', characters => characters.push(Immutable.fromJS({
        name,
        hair_color,
      })));
    },
  }
};



