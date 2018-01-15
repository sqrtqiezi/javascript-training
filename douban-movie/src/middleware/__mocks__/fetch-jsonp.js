export const movie = {
  id: '1',
  alt: 'http://movie.douban.com/123',
  images: {
    small: 'http://image.douban.com/123',
  },
  title: '电影1',
  rating: {
    average: 10,
  },
  collect_count: 20,
  year: '1985',
  genres: ['type1', 'type2'],
  directors: [{ name: '导演' }],
  casts: [{ name: '演员1' }, { name: '演员2' }],
};

const wrapper = jsonResponse => ({ json: () => jsonResponse });

export default function callApi(endpoint) {
  return new Promise((resolve, reject) => {
    process.nextTick(
      () => 
        endpoint.indexOf('mock?') !== -1
        ? resolve(wrapper({ subjects: [movie], endpoint }))
        : endpoint.indexOf('no_error_message') !== -1
          ? reject({})
          : reject({ message: 'Request Error' }),
    );
  });
}
