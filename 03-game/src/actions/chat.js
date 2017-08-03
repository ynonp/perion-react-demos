export const symbols = {
  join: '@@chat.join',
  say: '@@chat.say',
};

const actions = {
  join(userId, userName) {
    return { type: symbols.join, payload: { userId, userName } };
  },

  say(userId, text) {
    return { type: symbols.say, payload: { userId, text } };
  },
};

export default actions;

