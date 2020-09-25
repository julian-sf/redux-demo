// eslint-disable-next-line no-restricted-imports
import NextRouter, { useRouter as useNextRouter, NextRouter as NextRouterI } from 'next/router';
import { ParsedUrlQuery as _ParsedUrlQuery } from 'querystring';
import React, { useContext, useMemo, useEffect, useState } from 'react';

import { parseStringParam, UrlQueryParams } from './urls';

export type ParsedUrlQuery = _ParsedUrlQuery;

export const routes = [
  '/',
  '/region',
  '/resort',
  '/room',
  '/reserve',
  '/pay',
  '/confirmation',
  '/additem',
  '/myvegas/redeem',
  '/myvegas/redeem/resolve',
] as const;
export type Route = typeof routes[number];

// List of all dynamic params that we support, like `/[property]/`.
// If we have more, add them here.
const dynamicParams = ['event'];

/**
 * For the given route path and query hash, build `url` and `as` objects.
 *
 * ```ts
 * buildUrlAndAs('/region', query: { property: 'abc', region: 'def' }) ===
 * {
 *   url: { pathname: '/region', query: { property: 'abc', region: 'def' } },
 *   as: { pathname: '/region', query: { property: 'abc', region: 'def' } }
 * }
 * ```
 */
export function buildUrlAndAs(route: string, query?: UrlQueryParams) {
  const url = { pathname: route, query };
  const as = { ...url };

  if (query) {
    dynamicParams.forEach(name => {
      if (query[name] !== undefined) {
        const v = parseStringParam(query[name]);

        if (v && as.pathname.includes(`[${name}]`)) {
          as.pathname = as.pathname.replace(`[${name}]`, encodeURIComponent(v));
          delete as.query![name];
        }
      }
    });
  }

  return { url, as };
}

function wrapNextRouter(router: NextRouterI) {
  /**
   * When navigating to a dynamic route,
   * you might find it easier to use this function instead of `Router.replace()`.
   *
   * Example usage:
   * ```ts
   * Router.replaceRoute('/[property]/book-room', {
   *   property: 'aria',
   *   region: regionId,
   * })
   * ```
   */
  const replaceRoute = (route: string, query?: UrlQueryParams, options?: { shallow?: boolean }) => {
    const { url, as } = buildUrlAndAs(route, query);
    router.replace(url, as, options);
  };

  /**
   * When navigating to a dynamic route,
   * you might find it easier to use this function instead of `Router.push()`.
   *
   * Example usage:
   * ```ts
   * Router.pushRoute('/[property]/book-room', {
   *   property: 'aria',
   *   region: regionId,
   * })
   * ```
   */
  const pushRoute = (route: string, query?: UrlQueryParams, options?: { shallow?: boolean }) => {
    const { url, as } = buildUrlAndAs(route, query);
    router.push(url, as, options);
  };

  return {
    ...router,
    replaceRoute,
    pushRoute,
    shallowUpdateQuery(query: UrlQueryParams, route?: string) {
      replaceRoute(route || router.route, query, { shallow: true });
    },
  };
}

type WrappedRouter = ReturnType<typeof wrapNextRouter> & { route: Route; ready: boolean };

const RouterContext = React.createContext<
  WrappedRouter & {
    /**
     * Rely on this value if you need to know
     * if the given `router.query` is the actual `query` of the current route.
     *
     * (Sometimes the `router.query` might be empty, because it comes from server-side render,
     *  and it will be populated with real query params only after the component gets mounted on the client.)
     *
     * See https://github.com/zeit/next.js/issues/8259 for more details.
     */
    ready: boolean;
  }
>(null as any);

export function RouterContextProvider({ children }: { children?: React.ReactNode }) {
  const router = useNextRouter();

  // Our custom workaround for getting the `ready` value
  // until next.js give us a proper solution for it.
  // (https://github.com/zeit/next.js/issues/8259)
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (router.route && !ready) {
        setReady(true);
      }
    });

    return () => clearTimeout(timeout);
  }, [ready, router.route]);

  const wrappedRouter = useMemo(
    () =>
      ({
        ...wrapNextRouter(router),
        ready,
        route: router.route,
      } as WrappedRouter),
    [router, ready],
  );

  return <RouterContext.Provider value={wrappedRouter}>{children}</RouterContext.Provider>;
}

export const Router = wrapNextRouter(NextRouter);

export function useRouter() {
  return useContext(RouterContext);
}
