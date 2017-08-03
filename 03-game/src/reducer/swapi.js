import Immutable from 'immutable';
import _ from 'lodash';

const initialData = Immutable.fromJS({
  characters: {},
  selectedCharacter: null,
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
    gotCharacterDetails(state, { payload: { id, characterJson } }) {
      return state.update('characters', characters => characters.set(id, Immutable.fromJS(characterJson)));
    },
    selectCharacter(state, { payload: { id } }) {
      return state.set('selectedCharacter', state.getIn(['characters', id]));
    }
  }
};



