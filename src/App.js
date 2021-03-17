import React, { Component } from 'react';
import Palette from './Palette';
import seedsColors from './seedColors';
import { generatePalette } from './ColorHelpers';

class App extends Component {
    render() {
      return (
        <div>
          <Palette palette={generatePalette(seedsColors[4])} />
        </div>
      );
    }
  }

export default App;
