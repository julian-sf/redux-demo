// For docs about how routing works or to add a new route,
// see "Routing" section in our README.md.

// eslint-disable-next-line no-restricted-imports
import NextRouter, { useRouter as useNextRouter, NextRouter as NextRouterI } from 'next/router'
import { ParsedUrlQuery as _ParsedUrlQuery } from 'querystring'
import React, { useContext, useMemo, useEffect, useState } from 'react'

export type ParsedUrlQuery = _ParsedUrlQuery

/**
 * For the given route path and query hash, build `url` and `as` objects.
 *
 * For example, when BASE_PATH === '/book-room':
 * ```ts
 * buildUrlAndAs('/region', query: { property: 'abc', region: 'def' }) ===
 * {
 *   url: { pathname: '/region', query: { property: 'abc', region: 'def' } },
 *   as: { pathname: '/book-room/region', query: { property: 'abc', region: 'def' } }
 * }
 * ```
 */
export function buildUrlAndAs(route: string, query?: ParsedUrlQuery) {
  return {
    url: {
      pathname: route,
      query,
    },
    as: {
      pathname: route,
      query,
    },
  }
}

function wrapNextRouter(router: NextRouterI) {
  return {
    ...router,

    pushRoute(route: string, query?: ParsedUrlQuery, options?: { shallow?: boolean }) {
      const { url, as } = buildUrlAndAs(route, query)
      router.push(url, as, options)
    },

    replaceRoute(route: string, query?: ParsedUrlQuery, options?: { shallow?: boolean }) {
      const { url, as } = buildUrlAndAs(route, query)
      router.replace(url, as, options)
    },
  }
}

type WrappedRouter = ReturnType<typeof wrapNextRouter>

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
    ready: boolean
  }
>(null as any)

export function RouterContextProvider({ children }: { children?: React.ReactNode }) {
  const router = useNextRouter()

  // Our custom workaround for getting the `ready` value
  // until next.js give us a proper solution for it.
  // (https://github.com/zeit/next.js/issues/8259)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true)
    })

    return () => clearTimeout(timeout)
  }, [])

  const wrappedRouter = useMemo(
    () => ({
      ...wrapNextRouter(router),
      ready,
    }),
    [router, ready],
  )

  return <RouterContext.Provider value={wrappedRouter}>{children}</RouterContext.Provider>
}

export const Router = wrapNextRouter(NextRouter)

export function useRouter() {
  return useContext(RouterContext)
}
