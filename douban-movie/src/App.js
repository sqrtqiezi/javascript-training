import React from 'react';
import { view as FooterMenu } from './footer_menu';
import { view as Paihang } from './paihang';
import { view as Beimei } from './beimei';
import { view as Search } from './search';
import './App.css';

const App = () => (
  /* eslint-disable react/jsx-filename-extension */
  <div className="App">
    <main>
      <Paihang />
      <Beimei />
      <Search />
    </main>
    <FooterMenu />
  </div>
);

export default App;
