import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class SearchBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      input: '',
      results: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.setResults = this.setResults.bind(this)
  }

  handleSearch(e) {
    if (e.key === 'Enter') {
      console.log(this.state['input']);
      let searchInput = this.state['input'];

      let response = fetch(`http://localhost:8080/coord/${searchInput}`)
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
      
      response.then(function(body) {
        return body.data
      })
      .then(results => this.setResults(results))

    }
  }

  setResults(data) {
    this.setState({
      results: data
    })
    console.log(this.state['results'])
  }
  render() {
    return (
      <div className="App">
        <TextField
          ref="myField"
          id="filled-full-width"
          label="Search a Star Coordinate"
          style={{ width: 600}}
          placeholder="e.g 23:59:22.9 +55:49:27"
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