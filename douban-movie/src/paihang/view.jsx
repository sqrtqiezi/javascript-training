import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Transition from 'react-transition-group/Transition';

import * as actions from './actions';
import { view as Movies } from '../movies';
import { view as Loading } from '../loading';
import { MenuTypes } from '../constants';
import { Section } from '../style';
import { movieValidator } from '../functions';

class Paihang extends React.Component {
  componentDidMount() {
    this.props.loadMovies();

    this.onScroll = this.onScroll.bind(this);
  }

  onScroll(event) {
    const { scrollHeight, scrollTop, clientHeight } = event.target;

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
      entered: { opacity: 1 },
    };

    const { status, subjects, active } = this.props;
    return (
      <Transition in={active} timeout={duration}>
        {state => (
          <Section
            active={active}
            onScroll={this.onScroll}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
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

Paihang.propTypes = {
  status: PropTypes.string.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape(movieValidator)).isRequired,
  loadMovies: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const paihangData = state.paihang;

  return {
    status: paihangData.status,
    subjects: paihangData.subjects,
    active: state.menu === MenuTypes.PAIHANG,
  };
};

const mapDispatchToProps = dispatch => ({
  loadMovies: (start = 0) => dispatch(actions.fetchPaihang(start)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Paihang);
