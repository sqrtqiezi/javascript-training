import React from 'react';
import PropTypes from 'prop-types';

const Movie = ({href, cover, title, score, collect, year, type, director, casts}) => {
  return (
    <div className="item">
      <a href={href}>
        <div className="cover">
          <img src={cover} alt=""/>
        </div>
        <div className="detail">
          <h2>{title}</h2>
          <div className="extra">
            <span className="score">{score}</span> 分
            <span className="collect">{collect}</span> 收藏
          </div>
          <div className="extra">
            <span className="year">{year}</span> / <span className="type">{type}</span>
          </div>
          <div className="extra">
            导演: <span className="director">{director}</span>
          </div>
          <div className="extra">
            演员: <span className="casts">{casts}</span>
          </div>
        </div>
      </a>
    </div>
  )
};

Movie.propTypes = {
  href: PropTypes.string.isRequired, 
  cover: PropTypes.string.isRequired, 
  title: PropTypes.string.isRequired, 
  score: PropTypes.number.isRequired, 
  collect: PropTypes.number.isRequired, 
  year: PropTypes.string.isRequired, 
  type: PropTypes.string.isRequired, 
  director: PropTypes.string.isRequired, 
  casts: PropTypes.string.isRequired
}

export default Movie;