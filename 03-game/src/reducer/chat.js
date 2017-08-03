import Immutable from 'immutable';
import _ from 'lodash';

const initialData = Immutable.fromJS({
  messages: [],
  users: [
    { id: -1, name: 'SYSTEM' },
  ],
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
  chat: {
    join(state, { payload: { userId, userName } }) {
      return state.update('users', users => users.push(Immutable.fromJS({
        id: userId,
        name: userName,
      })));
    },

    say(state, { payload: { userId, text } }) {
      return state.update('messages', msgs => msgs.push(Immutable.fromJS({
        from: userId,
        text,
      })));
    },
  },
  game: {
    restart(state, action) {
      return handlers.chat.say(state, {
        payload: { userId: -1, text: 'RESTART GAME' }
      });
    }
  }
};



