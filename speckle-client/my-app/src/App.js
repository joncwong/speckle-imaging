import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.formattedResults = React.createRef();
  }
  render() {
    return (
      <div className="App">
        <h1>Speckle Imaging Database</h1>
        <SearchBar passResults={this.passResults}></SearchBar>
        <p>Right ascension "space" declination </p>
        <SearchResults ref={this.formattedResults}></SearchResults>
      </div>
    );
  }

  passResults = (data) => {
    this.formattedResults.current.updateResults(data)
  }

}

export default App;