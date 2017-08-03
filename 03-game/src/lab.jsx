import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Provider, connect } from 'react-redux';
import store from './store';
import actions from './actions/game';
import swactions from './actions/swapi';

window.store = store;
window.swactions = swactions;

@connect(state => ({ characters: state.swapi.get('characters') }))
class SWInfo extends React.Component {
  render() {
    return (
      <div>
        <h2>SWInfo</h2>        
        <label>Character ID
          <input type='text' />
        </label>
        <button>Get data for character</button>
        <select>
          {this.props.characters.map(character => (
            <option>{character.get('name')}</option>
          ))}
        </select>
        <p>Selected Character hair color is: {this.props.selectedCharacter && this.props.selectedCharacter.get('hair_color')}</p>
      </div>
      );
  }
}


/*
function connect(mapStateToProps) {  
  return function(Component) {   
    return class extends React.PureComponent {
      constructor(props) {
        super(props)
        this.state = mapStateToProps(window.store.getState());
        window.store.subscribe(() => {
          this.setState(mapStateToProps(window.store.getState()));
        });
      }

      render() {
        return <Component {...this.props} {...this.state} dispatch={window.store.dispatch} />
      }
    }
  }
}
*/

@connect(state => ({ game: state.game }))
class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  play(i, j) {
    this.props.dispatch(actions.play(i, j));
  }

  render() {
    console.count('render!');
    const cellStyle = {
      border: '1px solid gray',
      margin: '5px',
      width: '150px',
      height: '150px',
      verticalAlign: 'top',
      display: 'inline-block',
      fontSize: '36px',
      textAlign: 'center',
      lineHeight: '150px',
    };

    return (
      <div className='game'>
      {_.range(3).map(i => (
        <div className='row' key={i}>
          {_.range(3).map(j => (
            <div
              style={cellStyle}
              className='cell'
              key={3 * i + j}
              onClick={this.play.bind(this, i, j)}
            >
              {this.props.game.getIn(['board', i*3 + j])}
            </div>
          ))}
        </div>
      ))}
    </div>
    )
  }
}

ReactDOM.render(
  <Provider store={window.store}>
    <div>
      <SWInfo />
      <Game />
    </div>
  </Provider>, document.querySelector('main'));


