import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import SearchRadio from './components/SearchRadio';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      displayResults: false
    }
    this.formattedResults = React.createRef();
    this.searchBar = React.createRef(); 
  }
  render() {
    return (
      <div className="App">
        <h1>Speckle Imaging Database</h1>
        <SearchBar ref={this.searchBar} passResults={this.passResults} setDisplay={this.setDisplay}></SearchBar>
        <SearchRadio setSearch={this.setSearch}></SearchRadio>
        <SearchResults ref={this.formattedResults}></SearchResults>
      </div>
    );
  }

  passResults = (data) => {
    this.formattedResults.current.updateResults(data)
  }

  setDisplay = (valid) => {
    this.setState({
      displayResults: valid
    });
    console.log(this.state['displayResults']);
    this.formattedResults.current.setState({
      display: valid
    });
  }

  setSearch = (option) => {
    this.searchBar.current.setState({
      searchType: option
    })
    if (option === 'coordinate') {
      this.searchBar.current.setState({
        searchLabel: 'Search via a Star\'s Coordinate',
        searchPlaceHolder: 'e.g 23:59:22.9 +55:49:27'
      });
    }
    else if (option === 'identifier') {
      this.searchBar.current.setState({
        searchLabel: 'Search via a Star\'s Identifier',
        searchPlaceHolder: 'e.g H615578'
      });
    }
  }

}

export default App;