import React from 'react';
import MenuItem from './MenuItem';
import { MenuTypes } from '../../../constants';
import { FooterMenu as StyledFooterMenu } from '../../style';

function FooterMenu() {
  return (
    <StyledFooterMenu>
      <MenuItem menu={MenuTypes.PAIHANG} />
      <MenuItem menu={MenuTypes.BEIMEI} />
      <MenuItem menu={MenuTypes.SEARCH} />
    </StyledFooterMenu>
  );
}

export default FooterMenu;
