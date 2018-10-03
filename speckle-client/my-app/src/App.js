import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1> Speckle Imaging Database</h1>
        <TextField
          id="filled-full-width"
          label="Search for a Star ID"
          style={{ width: 600}}
          placeholder="e.g H602009"
          margin="normal"
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
        />

      </div>
      
    );
  }
}

export default App;
