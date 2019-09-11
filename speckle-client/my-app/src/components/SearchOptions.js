import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

class SearchOptions extends Component {

  constructor(props) {
    super(props)
    this.state = {
        selectedOption: 'coordinate',
        batchDisabled: true
    }
  }

  handleChange = event => {
    console.log(event.target.value)
    this.props.setSearch(event.target.value);
    this.setState({ 
        selectedOption: event.target.value
    });
  };

  render() {
    
    return (
        <FormControl component="fieldset">
          <RadioGroup
                aria-label="position"
                value={this.state.value}
                onChange={this.handleChange}
                row>
            <FormControlLabel
                value="coordinate"
                control={<Radio color="primary" checked={this.state.selectedOption === 'coordinate'}/>}
                label="Coordinate Search"
                labelPlacement="start"
                />
            <FormControlLabel
                value="identifier"
                control={<Radio color="primary" checked={this.state.selectedOption === 'identifier'}/>}
                label="Identifier Search"
                labelPlacement="start"
                />
            <FormControlLabel
                value="batch"
                control={<Radio color="primary" checked={this.state.selectedOption === 'batch'}/>}
                label="Batch File Search"
                labelPlacement="start"
                />
          </RadioGroup>
          <div 
            style={{display:'inline-block'}}>
            <input
              disabled={this.state['batchDisabled']}
              accept="image/*"
              id="outlined-button-file"
              type="file"
            />
            <label htmlFor="">
              <Button 
                disabled={this.state['batchDisabled']}
                variant="outlined" 
                component="span">
                  Batch Upload
              </Button>
            </label>
          </div>
        </FormControl>
    )
  }

}

export default SearchOptions;