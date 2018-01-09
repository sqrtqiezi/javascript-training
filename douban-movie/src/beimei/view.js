import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from './actions';
import {view as Movies} from '../movies';
import {MenuTypes} from '../constants'

import {view as Loading} from '../loading';

class Beimei extends React.Component {
  componentDidMount() {
    this.props.loadMovies();
  }

  render() {
    const {status, subjects, active} = this.props;
    return (
      <section className={active ? "active" : ''}>
        <Movies subjects={subjects} />
        <Loading status={status} />
      </section>
    )
  }
}

Beimei.propTypes = {
  status: PropTypes.string.isRequired,
  subjects: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const beimeiData = state.beimei;

  return {
    status: beimeiData.status,
    subjects: beimeiData.subjects,
    active: state.menu === MenuTypes.BEIMEI
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMovies: (start = 0) => {
      dispatch(actions.fetchBeimei(start))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Beimei);
