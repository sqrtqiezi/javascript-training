import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Movies from '../components/Movies';
import Loading from '../components/Loading';
import Fade from '../components/Fade';

import { MenuTypes } from '../constants';
import { Section, SearchBox, TextInput, Button } from './style';
import { movieValidator } from '../functions';
import { loadSearch } from '../actions';

class Search extends React.Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.shape(movieValidator)).isRequired,
    loadSearch: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
  }

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
    this.props.loadSearch(q);
  }

  render() {
    const { status, subjects, active } = this.props;
    return (
      <Fade in={active}>
        <Section active={active} >
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
      </Fade>
    );
  }
}

const mapStateToProps = (state) => {
  const searchData = state.search;

  return {
    status: searchData.status,
    subjects: searchData.subjects,
    active: state.menu === MenuTypes.SEARCH,
  };
};

export default connect(mapStateToProps, { loadSearch })(Search);
