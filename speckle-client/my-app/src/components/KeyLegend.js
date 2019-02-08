import React, { Component } from 'react';

class KeyLegend extends Component {

  render() {
      
      const footerStyle = {
        "position": "static",
        "text-align": "center"
      }

      return (
        <footer style={footerStyle}>
            <p> Please refer to the following <a href="http://cds.u-strasbg.fr/cgi-bin/Otype?X">Key Legend</a> to decipher the Object Keys.</p>
        </footer>
      )
  }

}

export default KeyLegend;