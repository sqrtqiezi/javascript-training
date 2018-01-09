import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setMenu} from '../actions';

const MenuItem = ({active, icon, caption, onClick}) => {
  return (
    <div onClick={(ev) => {
        ev.preventDefault();
        onClick();
      }} className={active ? 'active' : ''}>
      <span className={`iconfont icon-${icon}`}></span>
      <span>{caption}</span>
    </div>
  )
}

MenuItem.propTypes = {
  caption: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    active: state.menu === ownProps.menu,
    icon: ownProps.menu.icon,
    caption: ownProps.menu.caption
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setMenu(ownProps.menu))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);