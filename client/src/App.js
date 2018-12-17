import React, { Component } from 'react';
import './App.css';

//IMPORTING COMPONENTS
import ImageColumns from './components/ImageColumns';
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Naughty or Nice</h1>
        <ImageColumns />
      </div>
    );
  }
}

export default App;
