import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import seedsColors from './seedColors';
import { generatePalette } from './ColorHelpers';

class App extends Component {
  findPalette(id) {
    return seedsColors.find(function (palette) {
      return palette.id === id
    })
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <PaletteList palettes={seedsColors} />} />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
      </Switch>
      // <div>
      //   <Palette palette={generatePalette(seedsColors[4])} />
      // </div>
    );
  }
}

export default App;
