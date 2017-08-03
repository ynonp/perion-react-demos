import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer';

function logger({ dispatch, getState }){
  return function(next){
    return function(action){
      // code to run BEFORE action is dispatched
      console.log('DISPATCH: ');
      console.dir(action);
      console.log('state before: ');
      console.dir(getState().game.toJS());

      const res = next(action);

      console.log('--- Done');
      console.dir(getState().game.toJS());
      // code to run AFTER action is dispatched
      // or alter return value
      return res;
    }
  }
}


const store = createStore(reducer, applyMiddleware(logger, thunk));
export default store;

