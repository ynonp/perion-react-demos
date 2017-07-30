import React from 'react';
import ReactDOM from 'react-dom';

class LockableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lock: false };
    this.toggleLock = this.toggleLock.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextState.lock;
  }

  toggleLock() {
    this.setState({ lock: !this.state.lock });
  }
}


class DoubleClicker extends LockableComponent {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.inc = this.inc.bind(this);
  }

  inc() {
    this.setState({ count: this.state.count + 2 });
  }

  render() {
    return <p>
      <button onClick={this.toggleLock}>Lock/Unlock</button>
      <button onClick={this.inc}>{this.state.count}</button>
    </p>
  }
}

class Clicker extends LockableComponent {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.inc = this.inc.bind(this);
  }

  inc() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return <p>
      <label>Lock
        <input type='checkbox' value={this.state.lock} onChange={this.toggleLock} />
      </label>
      <button onClick={this.inc}>{this.state.count}</button>
    </p>
  }
}


const App = function (props) {
  return (
    <p>
      <Clicker />
      <DoubleClicker />
      <Clicker />
      Hello World
    </p>
  );
};

ReactDOM.render(<App />, document.querySelector('main'));

