import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';

window.game = store;

const App = function(props) {
  return <p>Hello World</p>;
}

ReactDOM.render(<App />, document.querySelector('main'));

