import React, { Component } from 'react';
import Searchbar from './components/SearchBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Speckle Imaging Database</h1>
        <Searchbar></Searchbar>
      </div>
    );
  }
}

export default App;
