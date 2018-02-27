import React, { Component } from 'react';
import './App.css';
import TopicsScreen from 'containers/Topics/TopicsScreen'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopicsScreen />
      </div>
    );
  }
}

export default App;
