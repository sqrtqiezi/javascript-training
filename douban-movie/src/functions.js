import PropTypes from 'prop-types';

export const movieFormat = item => ({
  id: item.id,
  href: item.alt,
  cover: item.images.small,
  title: item.title,
  score: item.rating.average,
  collect: item.collect_count,
  year: item.year,
  type: item.genres.join(' / '),
  director: item.directors.map(director => director.name).join(' / '),
  casts: item.casts.map(cast => cast.name).join(' / ')
});

export const movieValidator = {
  id: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  collect: PropTypes.number.isRequired,
  year: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  casts: PropTypes.string.isRequired
};
