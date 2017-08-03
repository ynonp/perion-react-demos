import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import store from './store';
import actions from './actions/game';

window.game = store;

@connect(state => { game: state.game })
class Game extends React.PureComponent {
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

ReactDOM.render(<Game />, document.querySelector('main'));


