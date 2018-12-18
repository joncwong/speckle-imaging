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
        <SearchBar formatResults={this.formatResults}></SearchBar>
        <p>Right ascension "space" declination </p>
        <SearchResults ref={this.formattedResults} updateResults={this.update}></SearchResults>
      </div>
    );
  }

  formatResults = (data) => {
    this.formattedResults.current.update(data)
  }

}

export default App;