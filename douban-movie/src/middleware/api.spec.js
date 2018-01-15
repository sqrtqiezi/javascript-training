jest.mock('fetch-jsonp');

import apiMiddleware, { CALL_API } from './api';
import { movie as expectMovie } from './__mocks__/fetch-jsonp';

describe('api middleware', () => {
  const MOCK_FETCH_REQUEST = 'MOCK/FETCH_REQUEST';
  const MOCK_FETCH_SUCCESS = 'MOCK/FETCH_SUCCESS';
  const MOCK_FETCH_FAILURE = 'MOCK/FETCH_FAILURE';

  const doDispatch = () => { };
  const doGetState = () => { };

  const nextHandler = apiMiddleware({ dispatch: doDispatch, getState: doGetState });

  it('must return a function to handle next', () => {
    expect(typeof nextHandler).toBe('function');
  });

  describe('handle next', () => {
    it('must return a function to handle action', () => {
      const actionHandler = nextHandler(() => { });

      expect(typeof actionHandler).toBe('function');
      expect(actionHandler.length).toBe(1);
    });

    describe('handle action', () => {
      it('must run the given action', () => {
        const actionHandler = nextHandler(action => {
          if(action.type === MOCK_FETCH_REQUEST) {
            expect(action).toMatchObject({
              type: MOCK_FETCH_REQUEST
            })
          } else if (action.type === MOCK_FETCH_SUCCESS) {
            expect(action).toMatchObject({
              response: {
                subjects: [expectMovie]
              },
              type: MOCK_FETCH_SUCCESS
            })
          }
        });

        actionHandler({
          [CALL_API]: {
            types: [MOCK_FETCH_REQUEST, MOCK_FETCH_SUCCESS, MOCK_FETCH_FAILURE],
            endpoint: '/movie/mock',
          },
        })
      });

      it('should handle invalidate request', () => {
        const actionHandler = nextHandler(action => {
          if(action.type === MOCK_FETCH_REQUEST) {
            expect(action).toMatchObject({
              type: MOCK_FETCH_REQUEST
            })
          } else if (action.type === MOCK_FETCH_FAILURE) {
            expect(action).toMatchObject({
              error: 'Request Error',
              type: MOCK_FETCH_FAILURE
            })
          }
        });

        actionHandler({
          [CALL_API]: {
            types: [MOCK_FETCH_REQUEST, MOCK_FETCH_SUCCESS, MOCK_FETCH_FAILURE],
            endpoint: '/movie/invalid_url',
          },
        })
      });

      it('should handel invaliate request whithout error.message', () => {
        const actionHandler = nextHandler(action => {
          if(action.type === MOCK_FETCH_REQUEST) {
            expect(action).toMatchObject({
              type: MOCK_FETCH_REQUEST
            })
          } else if (action.type === MOCK_FETCH_FAILURE) {
            expect(action).toMatchObject({
              error: 'Something bad happened',
              type: MOCK_FETCH_FAILURE
            })
          }
        });

        actionHandler({
          [CALL_API]: {
            types: [MOCK_FETCH_REQUEST, MOCK_FETCH_SUCCESS, MOCK_FETCH_FAILURE],
            endpoint: '/movie/invalid_url/no_error_message',
          },
        })
      });

      it('should handle endpoint with params', () => {
        const actionHandler = nextHandler(action => {
          if (action.type === MOCK_FETCH_SUCCESS) {
            expect(action.response.endpoint).toBe('//api.douban.com/v2/movie/mock?q=搜索&start=20')
          }
        });

        actionHandler({
          [CALL_API]: {
            types: [MOCK_FETCH_REQUEST, MOCK_FETCH_SUCCESS, MOCK_FETCH_FAILURE],
            endpoint: '/movie/mock',
            data: {
              q: '搜索',
              start: '20',
            }
          },
        });
      });

      it('should handle fullurl endpoint', () => {
        const actionHandler = nextHandler(action => {
          if (action.type === MOCK_FETCH_SUCCESS) {
            expect(action.response.endpoint).toBe('//api.douban.com/v2/test/full/url')
          }
        });

        actionHandler({
          [CALL_API]: {
            types: [MOCK_FETCH_REQUEST, MOCK_FETCH_SUCCESS, MOCK_FETCH_FAILURE],
            endpoint: '//api.douban.com/v2/test/full/url'
          },
        });
      });

      it('should handle invalidate endpoint', () => {
        const actionHandler = nextHandler(() => {});

        expect(() => actionHandler({
          [CALL_API]: {
            types: [MOCK_FETCH_REQUEST, MOCK_FETCH_SUCCESS, MOCK_FETCH_FAILURE],
            endpoint: 42,
          },
        })).toThrow('Specify a string endpoint URL.');
      });

      it('should handle invalidate types', () => {
        const actionHandler = nextHandler(() => {});

        expect(() => actionHandler({
          [CALL_API]: {
            types: [],
            endpoint: '/movie/mock',
          },
        })).toThrow('Expected an array of three action types.');
      });

      it('should handle invalidate type', () => {
        const actionHandler = nextHandler(() => {});

        expect(() => actionHandler({
          [CALL_API]: {
            types: [MOCK_FETCH_REQUEST, MOCK_FETCH_SUCCESS, 42],
            endpoint: '/movie/mock',
          },
        })).toThrow('Expected action types to be strings.');
      });

      it('should handle action which whitout CALL_API', () => {
        const expectAction = { type: '@@INIT' };

        const actionHandler = nextHandler(action => {
          expect(action).toEqual(expectAction);
        });

        actionHandler(expectAction);
      });
    });
  });

})
