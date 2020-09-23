import { ActionCreator } from '@reduxjs/toolkit';
import { useCallback } from 'react';
// eslint-disable-next-line no-restricted-imports
import { TypedUseSelectorHook, useSelector as useReduxSelector, useDispatch } from 'react-redux';

import { RootState } from './types';

export const simpleSelector = <T extends (state: RootState) => any>(selector: T) => selector;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const lazyDispatch = <T extends ActionCreator<any>>(action: T) => () => {
  const dispatch = useDispatch();

  return useCallback(
    (...params: Parameters<T>) => {
      dispatch(action(...params));
    },
    [dispatch],
  );
};

export const mockHookResult = <
  M extends { [arg: string]: (...args: any[]) => any },
  H extends jest.FunctionPropertyNames<Required<M>>
>(
  mod: M,
  hook: H,
) => {
  type Func = ReturnType<M[H]>;
  const func: jest.Mock<ReturnType<Func>, Parameters<Func>> = jest.fn();
  const spy = jest.spyOn(mod, hook);
  spy.mockImplementation(() => func as any);

  return func;
};
