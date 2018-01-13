import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loading from '../components/Loading';
import Fade from '../components/Fade';

import Movies from '../components/Movies';
import { MenuTypes } from '../constants';
import { movieValidator } from '../functions';
import { Section } from './style';
import { loadBeimei } from '../actions';

class Beimei extends React.Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.shape(movieValidator)).isRequired,
    loadBeimei: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.props.loadBeimei();
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

const mapStateToProps = (state) => {
  const beimeiData = state.beimei;

  return {
    status: beimeiData.status,
    subjects: beimeiData.subjects,
    active: state.menu === MenuTypes.BEIMEI,
  };
};

export default connect(mapStateToProps, { loadBeimei })(Beimei);
