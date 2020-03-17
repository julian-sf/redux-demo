export type UrlQueryParam = string | string[] | undefined

export interface UrlQueryParams {
  [key: string]: UrlQueryParam
}

export type OnRoutePush = (route: string, params?: UrlQueryParams, options?: { shallow?: boolean }) => void

export type OnRouteReplace = (route: string, params?: UrlQueryParams, options?: { shallow?: boolean }) => void

// Using conditional type here
// ( https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/ )
// so it returns `undefined` for `param: undefined`
export function parseStringParam<T extends string[] | string | undefined>(
  param: T,
): T extends string[] | string ? string : undefined {
  if (typeof param === 'undefined') {
    return param as any
  }

  return (Array.isArray(param) ? param[0] : param) as any
}

export function removeQueryParam<T>(queryParams: T, ...parameters: Array<keyof T>) {
  const nextQueryParams = { ...queryParams }
  parameters.forEach(param => delete nextQueryParams[param])

  return nextQueryParams
}
