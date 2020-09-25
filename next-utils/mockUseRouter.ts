// Reset any default implementations when imported

import { ParsedUrlQuery, useRouter } from './router';
import * as router from './router';

jest.clearAllMocks();

// setup useRouter mock RELATIVE to this file (which means we don't need to figure out the relative import in the tests)
const mockedUseRouter = jest.spyOn(router, 'useRouter');

type Router = ReturnType<typeof useRouter>;

/**
 * mockNextUseRouter
 * Mocks the useRouter React hook from Next.js on a test-case by test-case basis
 */
export function mockUseRouter(
  props: {
    route?: Router['route'];
    pathname?: Router['pathname'];
    query?: ParsedUrlQuery;
    asPath?: Router['asPath'];
    ready?: Router['ready'];
    replaceRoute?: Router['replaceRoute'];
    shallowUpdateQuery?: Router['shallowUpdateQuery'];
    pushRoute?: Router['pushRoute'];
    prefetch?: Router['prefetch'];
  } = {},
) {
  mockedUseRouter.mockImplementation(() => ({
    back: jest.fn(),
    basePath: '/',
    beforePopState: jest.fn(),
    isFallback: false,
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    route: props.route ?? '/',
    pathname: props.pathname ?? '/',
    query: props.query ?? {},
    asPath: props.asPath ?? '/',
    ready: props.ready ?? true,
    replaceRoute: props.replaceRoute ?? jest.fn(),
    shallowUpdateQuery: props.shallowUpdateQuery ?? jest.fn(),
    pushRoute: props.pushRoute ?? jest.fn(),
    prefetch: props.prefetch ?? jest.fn(),
    events: undefined as any,
  }));
}
