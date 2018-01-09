import React from 'react';
import PropTypes from 'prop-types';
import Movie from './movie';
import './style.css';

class Movies extends React.Component {
  render() {
    const {subjects} = this.props;
    
    return (
      <div className="container">
        {
          subjects.map((item) => (
            <Movie key={item.id}
              href={item.alt}
              cover={item.images.small}
              title={item.title}
              score={item.rating.average}
              collect={item.collect_count}
              year={item.year}
              type={item.genres.join(' / ')}
              director={item.directors.map((director) => director.name).join(' / ')}
              casts={item.casts.map((cast) => cast.name).join(' / ')} />
          ))
        }
      </div>
    )
  }
}

Movies.propTypes = {
  subjects: PropTypes.array.isRequired
};

export default Movies;
