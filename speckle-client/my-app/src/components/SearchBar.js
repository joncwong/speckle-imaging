import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class SearchBar extends Component {
  render() {
    return (
      <div className="App">
        <TextField
          ref="myField"
          id="filled-full-width"
          label="Search for a Star ID"
          style={{ width: 600}}
          placeholder="e.g H602009"
          margin="normal"
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={e => this.setState({ input: e.target.value })}
          onKeyPress={ (e) => {
            if (e.key === 'Enter') {
              console.log(this.state['input']);
              let searchInput = this.state['input'];

              fetch(`http://localhost:8080/olist/${searchInput}`)
              .then(function(response) {
                  if (!response.ok) {
                      throw Error(response.statusText);
                  }
                  return response;
              }).then(function(response) {
                response.json().then(body => console.log(body));
              }).catch(function(error) {
                  console.log(error);
              });
      
            }
          }
        }
        />

      </div>
      
    );
  }
}

export default SearchBar;