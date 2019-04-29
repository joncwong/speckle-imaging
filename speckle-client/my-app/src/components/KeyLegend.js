import React, { Component } from 'react';

class KeyLegend extends Component {

  render() {
      
      const footerStyle = {
        height: '60px',
        position: "static",
        "textAlign": "center"
      }

      return (
        <footer style={footerStyle}>
            <p> Please refer to the following <a href="http://simbad.u-strasbg.fr/simbad/sim-display?data=otypes" target="_blank">Key Legend</a> to decipher the Object Keys.</p>
        </footer>
      )
  }

}

export default KeyLegend;