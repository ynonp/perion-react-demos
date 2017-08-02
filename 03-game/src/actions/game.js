
export const symbols = {
  play: '@@play',
  restart: '@@restart',
};

const actions = {
  play(i, j) {
    return { type: symbols.play, payload: { i, j } };
  },

  restart() {
    return { type: symbols.restart }
  }
};

export default actions;

