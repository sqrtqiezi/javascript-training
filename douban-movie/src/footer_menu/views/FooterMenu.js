import React, {Component} from 'react';
import MenuItem from './MenuItem';
import {MenuTypes} from '../../constants'
import './style.css';

class FooterMenu extends Component {
  render() {
    return (
      <footer>
        <MenuItem menu={MenuTypes.PAIHANG}/>
        <MenuItem menu={MenuTypes.BEIMEI}/>
        <MenuItem menu={MenuTypes.SEARCH}/>
      </footer>
    )
  }
}

export default FooterMenu