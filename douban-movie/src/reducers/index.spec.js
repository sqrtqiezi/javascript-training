import { paihang, beimei } from './index';
import { Status } from '../constants';
import {
  PAIHANG_FETCH_REQUEST, PAIHANG_FETCH_SUCCESS, PAIHANG_FETCH_FAILURE,
  BEIMEI_FETCH_REQUEST, BEIMEI_FETCH_SUCCESS, BEIMEI_FETCH_FAILURE,
  SEARCH_FETCH_REQUEST, SEARCH_FETCH_SUCCESS, SEARCH_FETCH_FAILURE } from '../actions';

function setUp() {
  const expectMovie = {
    id: '1',
    href: 'http://movie.douban.com/123',
    cover: 'http://image.douban.com/123',
    title: '电影1',
    score: 10,
    collect: 20,
    year: '1985',
    type: 'type1 / type2',
    director: '导演',
    casts: '演员1 / 演员2',
  };

  const movie = {
    id: '1',
    alt: 'http://movie.douban.com/123',
    images: {
      small: 'http://image.douban.com/123',
    },
    title: '电影1',
    rating: {
      average: 10
    },
    collect_count: 20,
    year: '1985',
    genres: ['type1', 'type2'],
    directors: [{ name: '导演' }],
    casts: [{ name: '演员1' }, { name: '演员2' }],
  };

  return { movie, expectMovie };
}

describe('Paihang reducer', () => {
  it('should handle initial state', () => {
    expect(paihang(undefined, { type: '@@INIT' })).toEqual({ status: Status.LOADING, subjects: [] });
  })

  it('should handle request', () => {
    expect(paihang(undefined, { type: PAIHANG_FETCH_REQUEST })).toEqual({ status: Status.LOADING, subjects: [] })
  })

  it('should handle success', () => {
    const { movie, expectMovie } = setUp();

    expect(paihang(undefined, { 
      type: PAIHANG_FETCH_SUCCESS,
      response: { subjects: [movie] }
    })).toEqual({ status: Status.SUCCESS, subjects: [expectMovie] })
  })

  it('should handle failure', () => {
    expect(paihang(undefined, { type: PAIHANG_FETCH_FAILURE })).toEqual({ status: Status.FAILURE, subjects: [] })
  })
})

describe('Beimei reducer', () => {
  it('should handle success', () => {
    const { movie, expectMovie } = setUp();

    expect(beimei(undefined, { 
      type: BEIMEI_FETCH_SUCCESS,
      response: { subjects: [{ subject: movie }] }
    })).toEqual({ status: Status.SUCCESS, subjects: [expectMovie] })
  })
})
