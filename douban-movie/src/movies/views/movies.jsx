import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Movies = ({ subjects }) => (
  <div className="container">
    {subjects.map(item => (
      <div className="item" key={item.id}>
        <a href={item.href}>
          <div className="cover">
            <img src={item.cover} alt="" />
          </div>
          <div className="detail">
            <h2>{item.title}</h2>
            <div className="extra">
              <span className="score">{item.score}</span> 分
              <span className="collect">{item.collect}</span> 收藏
            </div>
            <div className="extra">
              <span className="year">{item.year}</span> /{' '}
              <span className="type">{item.type}</span>
            </div>
            <div className="extra">
              导演: <span className="director">{item.director}</span>
            </div>
            <div className="extra">
              演员: <span className="casts">{item.casts}</span>
            </div>
          </div>
        </a>
      </div>
    ))}
  </div>
);

Movies.propTypes = {
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      collect: PropTypes.number.isRequired,
      year: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      casts: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Movies;
