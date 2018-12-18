import React, { Component } from 'react';
import './App.css';

//IMPORTING COMPONENTS
import ImageColumns from './components/ImageColumns';
import Registration from './components/Registration';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Registration />
        <h1>Naughty or Nice</h1>
        <ImageColumns />
      </div>
    );
  }
}

export default App;
