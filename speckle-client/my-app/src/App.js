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
  }
  render() {
    return (
      <div className="App">
        <h1>Speckle Imaging Database</h1>
        <SearchBar passResults={this.passResults} setDisplay={this.setDisplay}></SearchBar>
        <SearchRadio></SearchRadio>
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

  

  


}

export default App;