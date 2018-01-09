import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from './actions';
import {view as Movies} from '../movies';
import {MenuTypes} from '../constants'

import {view as Loading} from '../loading';
import './style.css';

class Search extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      q: ''
    }
  }

  onInputChange(event) {
    this.setState({
      q: event.target.value
    });
  }

  onSearch(event) {
    event.preventDefault()

    const q = this.state.q.trim()
    if (!q) {
      return;
    }
    console.log(`search: ${q}`);
    this.props.loadMovies(q);
  }

  render() {
    const {status, subjects, active} = this.props;
    return (
      <section className={active ? "active" : ''}>
        <div className="search-area">
          <input type="text" placeholder="搜索电影" onChange={this.onInputChange.bind(this)} />
          <button className="btn" onClick={this.onSearch.bind(this)}>搜索</button>
        </div>
        <Movies subjects={subjects} />
        <Loading status={status} />
      </section>
    )
  }
}

Search.propTypes = {
  status: PropTypes.string.isRequired,
  subjects: PropTypes.array.isRequired,
  active: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const searchData = state.search;

  return {
    status: searchData.status,
    subjects: searchData.subjects,
    active: state.menu === MenuTypes.SEARCH
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMovies: (q) => {
      dispatch(actions.fetchSearch(q))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
