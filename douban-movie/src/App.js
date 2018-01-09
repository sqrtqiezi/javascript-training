import React, { Component } from 'react';
import {view as FooterMenu} from './footer_menu';
import {view as Movies} from './movies';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <main>
          <Movies />
        </main>
        <FooterMenu />
      </div>
    );
  }
}

export default App;
