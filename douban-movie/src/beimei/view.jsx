import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Transition from 'react-transition-group/Transition';

import * as actions from './actions';
import { view as Movies } from '../movies';
import { MenuTypes } from '../constants';
import { view as Loading } from '../loading';
import { Section } from '../style';
import { movieValidator } from '../functions';

class Beimei extends React.Component {
  componentDidMount() {
    this.props.loadMovies();
  }

  render() {
    const duration = 200;

    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0
    };

    const transitionStyles = {
      entering: { opacity: 0 },
      entered: { opacity: 1 }
    };

    const { status, subjects, active } = this.props;
    return (
      <Transition in={active} timeout={duration}>
        {state => (
          <Section
            active={active}
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            <Movies subjects={subjects} />
            <Loading status={status} />
          </Section>
        )}
      </Transition>
    );
  }
}

Beimei.propTypes = {
  status: PropTypes.string.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape(movieValidator)).isRequired,
  loadMovies: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  const beimeiData = state.beimei;

  return {
    status: beimeiData.status,
    subjects: beimeiData.subjects,
    active: state.menu === MenuTypes.BEIMEI
  };
};

const mapDispatchToProps = dispatch => ({
  loadMovies: (start = 0) => {
    dispatch(actions.fetchBeimei(start));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Beimei);
