import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Transition from 'react-transition-group/Transition';

import * as actions from './actions';
import { view as Movies } from '../movies';
import { MenuTypes } from '../constants';

import { Section, SearchBox, TextInput, Button } from '../style';
import { view as Loading } from '../loading';
import { movieValidator } from '../functions';

class Search extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { q: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onInputChange(event) {
    this.setState({ q: event.target.value });
  }

  onSearch(event) {
    event.preventDefault();

    const q = this.state.q.trim();
    if (!q) {
      return;
    }
    this.props.loadMovies(q);
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
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <SearchBox>
              <TextInput
                placeholder="搜索电影"
                onChange={this.onInputChange}
              />
              <Button onClick={this.onSearch}>搜索</Button>
            </SearchBox>
            <Movies subjects={subjects} />
            <Loading status={status} />
          </Section>
        )}
      </Transition>
    );
  }
}

Search.propTypes = {
  status: PropTypes.string.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.shape(movieValidator)).isRequired,
  loadMovies: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const searchData = state.search;

  return {
    status: searchData.status,
    subjects: searchData.subjects,
    active: state.menu === MenuTypes.SEARCH,
  };
};

const mapDispatchToProps = dispatch => ({
  loadMovies: q => dispatch(actions.fetchSearch(q)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
