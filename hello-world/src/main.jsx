import React from 'react';
import ReactDOM from 'react-dom';

function withAPIData(url) {
  return function decorator(Component) {
    return class ThingWithAPIData extends React.Component {
    }
  }
}

function lockableThing(Component) {
  return class LockableThing extends React.Component {
    constructor(props) {
      super(props);
      this.state = { lock: false };
      this.toggleLock = this.toggleLock.bind(this);
    }

    toggleLock() {
      this.setState({ lock: !this.state.lock });
    }

    render() {
      return (
        <Component {...this.props} toggleLock={this.toggleLock} lock={this.state.lock} />
      );
    }
  };
}

@lockableThing
class DoubleClicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.inc = this.inc.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.lock;
  }

  inc = () => {
    this.setState({ count: this.state.count + 2 });
  }

  render() {
    return <p>
      <button onClick={this.props.toggleLock}>Lock/Unlock</button>
      <button onClick={this.inc}>{this.state.count}</button>
    </p>
  }
}

// Same as Clicker = lockableThing(Clicker);
@lockableThing
class Clicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.inc = this.inc.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.lock;
  }


  inc() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return <p>
      <label>Lock
        <input type='checkbox' value={this.props.lock} onChange={this.props.toggleLock} />
      </label>
      <button onClick={this.inc}>{this.state.count}</button>
    </p>
  }
}

const App = function (props) {
  return (
    <p>
      <Clicker initialValue={4} />
      <DoubleClicker />
      <Clicker />
      Hello World
    </p>
  );
};

ReactDOM.render(<App />, document.querySelector('main'));

