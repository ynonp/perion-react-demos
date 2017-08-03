export const symbols = {
  play: '@@game.play',
  restart: '@@game.restart',
};

const actions = {
  play(i, j) {
    return { type: symbols.play, payload: { i, j } };
  },

  restart() {
    return { type: symbols.restart }
  },

};

export default actions;

