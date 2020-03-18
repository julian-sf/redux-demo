export type CallResult<T extends (...args: any) => any, R = ReturnType<T>> = R extends Promise<infer U> ? U : R
