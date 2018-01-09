import React, { Component } from 'react';
import {view as FooterMenu} from './footer_menu'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main></main>
        <FooterMenu></FooterMenu>
      </div>
    );
  }
}

export default App;
