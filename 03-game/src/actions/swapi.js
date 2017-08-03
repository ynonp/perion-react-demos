export const symbols = {
  gotCharacterDetails: '@@swapi.gotCharacterDetails',
  startLoad: '@@general.startLoad',
  endLoad: '@@general.endLoad',
};

const actions = {
  gotCharacterDetails(characterJson) {
    return { type: symbols.gotCharacterDetails, payload: characterJson };
  },

  loadCharacterDetails(id) {
    return async function(dispatch, getstate) {
      dispatch({ type: symbols.startLoad });
      const res = await fetch(`http://swapi.co/api/people/${id}/?format=json`);
      const data = await res.json();
      dispatch({ type: symbols.endLoad });
      dispatch({ type: symbols.gotCharacterDetails, payload: data });      
    }
  }
};

export default actions;

