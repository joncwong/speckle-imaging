import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//import PropTypes from 'prop-types';
import { Tab, Tabs} from '@material-ui/core';
//import Typography from '@material-ui/core/Typography';

const divStyle = {
    marginTop: '20px',
    marginRight: '30px',
    marginLeft: '30px',
    marginBottom: '30px'
  };

class SearchResults extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchResults: [],
            display: false,
            currentTab: 'searchResults',
            olistFile: '',
            transformedOlist: []
        }
        this.updateResults = this.updateResults.bind(this)
        this.formatResults = this.formatResults.bind(this)
    }

    render() {
        return (
            <div align="middle" margin="100px">
                {this.formatResults()}
            </div>
        )
    }

    transformOlist() {
            let olistList = this.state['olistFile'].split('\n')
            let tempList = []
            olistList.forEach(function(item) {
                tempList.push(item)
            });
            this.setState({
                transformedOlist: tempList
            });
    }

    updateResults(data) {
        if (data.data.length !== undefined) {
            this.setState({
                searchResults: data.data,
                olistFile: data.olistFile
            })
        }
        this.transformOlist()
    }

    changeTab = (event, value) => {
        this.setState({ currentTab: value });
      };

    formatResults() {
        // console.log('searchResults: ' + this.state['searchResults'])
        if (this.state['display']) {
            return (
                <div style={divStyle}>
                <Tabs
                    value={this.state.currentTab}
                    onChange={this.changeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    centered>
                    <Tab value="searchResults" label="Search Results" />
                    <Tab value="olistFile" label="Original Olist File" />
                </Tabs>

                {this.state.currentTab==='searchResults' && 
                <Paper style={{maxHeight: 570, overflow:'auto'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Star ID</TableCell>
                                <TableCell align="right">Fits File</TableCell>
                                <TableCell align="right">Time</TableCell>
                                <TableCell align="right">Blue Gain</TableCell>
                                <TableCell align="right">Red Gain</TableCell>
                                <TableCell align="right">Right Ascension</TableCell>
                                <TableCell align="right">Declination</TableCell>
                                <TableCell align="right">Epoch</TableCell>
                                <TableCell align="right">Magnitude</TableCell>
                                <TableCell align="right">Program ID</TableCell>
                                <TableCell align="right">Objects</TableCell>
                                <TableCell align="right">Radius</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state['searchResults'].map(row => {
                            return (
                            <TableRow key={row.id}>
                                <TableCell align="right">{row.star_id}</TableCell>
                                <TableCell align="right">{row.fits_file}</TableCell>
                                <TableCell align="right">{row.time}</TableCell>
                                <TableCell align="right">{row.blue_gain}</TableCell>
                                <TableCell align="right">{row.red_gain}</TableCell>
                                <TableCell align="right">{row.right_asc}</TableCell>
                                <TableCell align="right">{row.dec}</TableCell>
                                <TableCell align="right">{row.epoch}</TableCell>
                                <TableCell align="right">{row.mag}</TableCell>
                                <TableCell align="right">{row.program_id}</TableCell>
                                <TableCell align="right">{row.objects}</TableCell>
                                <TableCell align="right">{row.search_radius}</TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </Paper>}

                {this.state.currentTab==='olistFile' && 
                <Paper style={{maxHeight: 570, overflow:'auto'}}>
                    {this.state.transformedOlist.map(line => {
                        return (
                            <p>{line}</p>
                        );
                    })}
                </Paper>}

                </div>
            )
        }
        else {
            return <p>No results</p>
        }
    }

  }
  
  export default SearchResults;