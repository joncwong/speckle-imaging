import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class SearchBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      input: '',
      file: '',
      searchType: 'coordinate',
      searchDisabled: false,
      searchLabel: 'Search via a Star\'s Coordinate',
      searchPlaceHolder: 'e.g 23:59:22.9 +55:49:27'
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.setResults = this.setResults.bind(this)
  }

  handleSearch(e) {
    console.log(e)
    if (e.key === 'Enter') {
      console.log(this.state['input']);
      let searchInput = this.state['input'];
      if (searchInput === '') {
        this.props.setDisplay(false)
        //console.log("Empty search query.. aborted");
        return
      }
      let response = fetch(`http://localhost:8080/${this.state['searchType']}/${searchInput}`)
      .then(function(response) {
          if (!response.ok) {
              throw Error(response.statusText);
          }
          return response
      }).then(function(response) {
        return response.json()
      }).catch(function(error) {
          console.log(error);
      });
      response.then( body => {
          this.props.setDisplay(body.valid)
          return body;
      })
      .then(results => this.setResults(results))
    }
  }

  setResults(data) {
    this.props.passResults(data)
  }
  
  render() {
    console.log("I RERENDERED");
    return (
      <div className="App">
        <TextField
          ref="myField"
          id="filled-full-width"
          label={this.state['searchLabel']}
          style={{ width: 600}}
          disabled={this.state['searchDisabled']}
          placeholder={this.state['searchPlaceHolder']}
          margin="normal"
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={e => this.setState({ input: e.target.value })}
          onKeyPress= {this.handleSearch}
        />
      </div>
    );
  }



}

export default SearchBar;
