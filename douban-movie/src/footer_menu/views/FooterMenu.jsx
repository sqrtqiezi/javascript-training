import React from 'react';
import MenuItem from './MenuItem';
import { MenuTypes } from '../../constants';
import './style.css';

function FooterMenu() {
  return (
    <footer>
      <MenuItem menu={MenuTypes.PAIHANG} />
      <MenuItem menu={MenuTypes.BEIMEI} />
      <MenuItem menu={MenuTypes.SEARCH} />
    </footer>
  );
}

export default FooterMenu;
