import React from 'react';
import { view as FooterMenu } from './FooterMenu';
import Paihang from './Paihang';
import Beimei from './Beimei';
import Search from './Search';

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
