import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
            display: false
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
    
    updateResults(data) {
        this.setState({
            searchResults: data
        })
        console.log(this.state['searchResults'])
    }

    formatResults() {
        if (this.state['display']) {
            return (
                <div style={divStyle}>
                <Paper style={{maxHeight: 700, overflow:'auto'}}>
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
                                <TableCell align="right">Comment</TableCell>
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
                                <TableCell align="right">{row.comment}</TableCell>
                                <TableCell align="right">{row.objects}</TableCell>
                                <TableCell align="right">{row.search_radius}</TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </Paper>
                </div>
            )
        }
        else {
            return <p>No results</p>
        }
    }

  }
  
  export default SearchResults;