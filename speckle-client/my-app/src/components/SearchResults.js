import React, { Component } from 'react';

class SearchResults extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchResults: ''
        }
        this.update = this.update.bind(this)
    }

    render() {
        return `HERE ARE THE RESULTS: \n ${this.state.searchResults}`
    }
    
    update(data) {
        this.setState({
            searchResults: data
        })
        console.log("hello?")
        console.log(this.state['searchResults'])
    }

  }
  
  export default SearchResults;