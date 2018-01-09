import React, { Component } from 'react';
import {view as FooterMenu} from './footer_menu';
import {view as Paihang} from './paihang';
import {view as Beimei} from './beimei';
import {view as Search} from './search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Paihang />
          <Beimei />
          <Search />
        </main>
        <FooterMenu />
      </div>
    );
  }
}

export default App;
