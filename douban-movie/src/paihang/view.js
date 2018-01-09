import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from './actions';
import {view as Movies} from '../movies';
import {MenuTypes} from '../constants'

import {view as Loading} from '../loading';

class Paihang extends React.Component {
  componentDidMount() {
    this.props.loadMovies();
  }

  listenScrollEvent(event) {
    const {scrollHeight, scrollTop, clientHeight} = event.target;

    if (scrollHeight - scrollTop === clientHeight) {
      this.props.loadMovies(this.props.subjects.length);
    }
  }

  render() {
    const {status, subjects, active} = this.props;
    return (
      <section onScroll={this.listenScrollEvent.bind(this)} className={active ? "active" : ''}>
        <Movies subjects={subjects} />
        <Loading status={status} />
      </section>
    )
  }
}

Paihang.propTypes = {
  status: PropTypes.string.isRequired,
  subjects: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const paihangData = state.paihang;

  return {
    status: paihangData.status,
    subjects: paihangData.subjects,
    active: state.menu === MenuTypes.PAIHANG
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMovies: (start = 0) => {
      dispatch(actions.fetchPaihang(start))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paihang);
