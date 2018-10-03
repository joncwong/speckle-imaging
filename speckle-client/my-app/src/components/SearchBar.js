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
          onKeyPress={ (e) => {
            if (e.key === 'Enter') {
              console.log(this.value);
            }
          }
        }
        />

      </div>
      
    );
  }
}

export default SearchBar;