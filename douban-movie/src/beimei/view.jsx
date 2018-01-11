import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from './actions';
import { view as Movies } from '../movies';
import { MenuTypes } from '../constants';
import { view as Loading } from '../loading';
import { movieValidator } from '../functions';
import { Section } from '../style';
import Fade from '../fade';

class Beimei extends React.Component {
  componentDidMount() {
    this.props.loadMovies();
  }

  render() {
    const { status, subjects, active } = this.props;
    return (
      <Fade in={active}>
        <Section active={active} >
          <Movies subjects={subjects} />
          <Loading status={status} />
        </Section>
      </Fade>
    );
  }
}

Beimei.propTypes = {
  status: PropTypes.string.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape(movieValidator)).isRequired,
  loadMovies: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const beimeiData = state.beimei;

  return {
    status: beimeiData.status,
    subjects: beimeiData.subjects,
    active: state.menu === MenuTypes.BEIMEI,
  };
};

const mapDispatchToProps = dispatch => ({
  loadMovies: (start = 0) => {
    dispatch(actions.fetchBeimei(start));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Beimei);
