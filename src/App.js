import React, { Component } from 'react';
import Palette from './Palette';
import seedsColors from './seedColors';
import { generatePalette } from './ColorHelpers';

class App extends Component {
    render() {
      console.log(generatePalette(seedsColors[4]));
      return (
        <div>
          <Palette {...seedsColors[4]} />
        </div>
      );
    }
  }

export default App;
