import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loading from '../components/Loading';
import Movies from '../components/Movies';
import { Status, MenuTypes } from '../constants';
import { movieValidator } from '../functions';
import { Section } from './style';
import { loadPaihang } from '../actions';
import Fade from '../components/Fade';

class Paihang extends React.Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.shape(movieValidator)).isRequired,
    loadPaihang: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.props.loadPaihang();

    this.onScroll = this.onScroll.bind(this);
  }

  onScroll(event) {
    const { scrollHeight, scrollTop, clientHeight } = event.target;

    if (scrollHeight - scrollTop === clientHeight && this.props.status !== Status.LOADING) {
      this.props.loadPaihang();
    }
  }

  render() {
    const { status, subjects, active } = this.props;
    return (
      <Fade in={active}>
        <Section
          active={active}
          onScroll={this.onScroll}
        >
          <Movies subjects={subjects} />
          <Loading status={status} />
        </Section>
      </Fade>
    );
  }
}

const mapStateToProps = (state) => {
  const paihangData = state.paihang;

  return {
    status: paihangData.status,
    subjects: paihangData.subjects,
    active: state.menu === MenuTypes.PAIHANG,
  };
};

export default connect(mapStateToProps, { loadPaihang })(Paihang);
