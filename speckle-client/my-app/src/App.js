import React, { Component } from 'react';
import logo from './logo.svg';
import TextField from '@material-ui/core/TextField';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Speckle Imaging</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <TextField
          id="filled-full-width"
          label="Label"
          style={{ margin: 8}}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
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
