import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from './actions';
import {view as Movies} from '../movies';
import {MenuTypes} from '../constants';
import Transition from 'react-transition-group/Transition';

import {view as Loading} from '../loading';

class Paihang extends React.Component {
  componentDidMount() {
    this.props.loadMovies();
  }

  onScroll(event) {
    const {scrollHeight, scrollTop, clientHeight} = event.target;

    if (scrollHeight - scrollTop === clientHeight) {
      this.props.loadMovies(this.props.subjects.length);
    }
  }

  render() {
    const duration = 200;

    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0,
    };

    const transitionStyles = {
      entering: { opacity: 0 },
      entered:  { opacity: 1 },
    };

    const {status, subjects, active} = this.props;
    return (
      <Transition in={active} timeout={duration}>
        {(state) => (
          <section onScroll={this.onScroll.bind(this)} className={active ? "active" : ''}
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }} >
            <Movies subjects={subjects} />
            <Loading status={status} />
          </section>
        )}
      </Transition>
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
