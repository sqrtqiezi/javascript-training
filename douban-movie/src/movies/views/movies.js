import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Loading from './loading';
import './style.css';

class Movies  extends React.Component {
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
    const {status, subjects} = this.props;

    return (
      <section onScroll={this.listenScrollEvent.bind(this)}>
        <div className="container">
        {
          subjects.map((item) => (
            <div className="item" key={item.id}>
              <a href={item.alt}>
                <div className="cover">
                  <img src={item.images.small} alt=""/>
                </div>
                <div className="detail">
                  <h2>{item.title}</h2>
                  <div className="extra">
                    <span className="score">{item.rating.average}</span> 分
                    <span className="collect">{item.collect_count}</span> 收藏
                  </div>
                  <div className="extra">
                    <span className="year">{item.year}</span> / <span className="type">{item.genres.join(' / ')}</span>
                  </div>
                  <div className="extra">
                    导演: <span className="director">{item.directors.map((director) => director.name).join(' / ')}</span>
                  </div>
                  <div className="extra">
                    演员: <span className="director">{item.casts.map((cast) => cast.name).join(' / ')}</span>
                  </div>
                </div>
              </a>
            </div>
          ))
        }
        </div>
        <Loading status={status} />
      </section>
    )
  }
}

Movies.propTypes = {
  status: PropTypes.string.isRequired,
  subjects: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  const movieData = state.movies;

  return {
    status: movieData.status,
    subjects: movieData.subjects
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMovies: (start = 0) => {
      dispatch(actions.fetchMovies(start))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
