export const symbols = {
  gotCharacterDetails: '@@swapi.gotCharacterDetails',
  startLoad: '@@general.startLoad',
  endLoad: '@@general.endLoad',
  selectCharacter: '@@swapi.selectCharacter',
};

const actions = {
  gotCharacterDetails(id, characterJson) {
    return { type: symbols.gotCharacterDetails, payload: { id, characterJson } };
  },  

  selectCharacter(id) {
    return { type: symbols.selectCharacter, payload: { id } };
  },

  loadCharacterDetails(id) {
    return async function(dispatch, getstate) {
      dispatch({ type: symbols.startLoad });
      const res = await fetch(`http://swapi.co/api/people/${id}/?format=json`);
      const data = await res.json();
      dispatch({ type: symbols.endLoad });
      dispatch({ type: symbols.gotCharacterDetails, payload: { id, characterJson: data } });      
    }
  }
};

export default actions;

