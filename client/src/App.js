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
        <ImageColumns />
      </div>
    );
  }
}

export default App;
