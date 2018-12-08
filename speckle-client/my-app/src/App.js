import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <h1>Speckle Imaging Database</h1>
        <SearchBar></SearchBar>
        <p>Right ascension "space" declination </p>
        <SearchResults></SearchResults>
      </div>
    );
  }

}

export default App;
