import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import PropTypes from 'prop-types';

import './style.css';

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={200}
    classNames="fade"
  >
    {children}
  </CSSTransition>
);

Fade.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Fade;
