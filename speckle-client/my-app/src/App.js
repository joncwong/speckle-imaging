import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import SearchOptions from './components/SearchOptions';
import KeyLegend from './components/KeyLegend';
import './App.css';

const bodyStyle = {
  // KEEP TWEEKING THIS
  height: "90vh"
}
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      displayResults: false
    }
    this.formattedResults = React.createRef();
    this.searchBar = React.createRef(); 
    this.searchOptions = React.createRef();
  }

  componentDidMount() {
    document.title = 'Speckle Imaging Database'
  }

  render() {
    return (
      <div className="App">
        <div style = { bodyStyle }>
          <h1>Speckle Imaging Database</h1>
          <SearchBar ref={this.searchBar} passResults={this.passResults} setDisplay={this.setDisplay}></SearchBar>
          <SearchOptions ref={this.searchOptions} setSearch={this.setSearch}></SearchOptions>
          <SearchResults ref={this.formattedResults}></SearchResults>
        </div>
        <KeyLegend></KeyLegend>
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
        searchPlaceHolder: 'e.g 23:59:22.9 +55:49:27',
        searchDisabled: false
      });
      this.searchOptions.current.setState({
        batchDisabled: true
      });
    }
    else if (option === 'identifier') {
      this.searchBar.current.setState({
        searchLabel: 'Search via a Star\'s Identifier',
        searchPlaceHolder: 'e.g H615578',
        searchDisabled: false
      });
      this.searchOptions.current.setState({
        batchDisabled: true
      });
    }
    else if (option === 'batch') {
      this.searchBar.current.setState({
        searchDisabled: true,
      });
      this.searchOptions.current.setState({
        batchDisabled: false
      });
    }
  }

}

export default App;