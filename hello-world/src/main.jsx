import React from 'react';
import ReactDOM from 'react-dom';

function withAPIData(url) {
  return function decorator(Component) {
    return class ThingWithAPIData extends React.Component {
      constructor(props) {
        super(props);
        this.state = { data: null };
      }

      async componentDidMount() {
        const res = await fetch(url);
        const data = await res.json();
        this.setState({ data });
      }

      render() {
        return <Component {...this.props} data={this.state.data} />;
      }
    };
  };
}

@withAPIData('https://swapi.co/api/people/1/?format=json')
class App extends React.Component {
  render() {
    return (
      <div>
        <p>Data: {JSON.stringify(this.props.data)}</p>
      </div>
    );
  }
}






ReactDOM.render(<App />, document.querySelector('main'));

