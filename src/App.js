import React, { Component } from 'react';
import './App.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import 'normalize.css';


class App extends Component {
  render() {
  const version = React.version

    return (
      <div className="App">
          <h2>Welcome to React {version}</h2>
      </div>
    );
  }
}

export default App;
