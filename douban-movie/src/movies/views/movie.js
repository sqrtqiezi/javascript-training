import React from 'react';

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


export default Movie;