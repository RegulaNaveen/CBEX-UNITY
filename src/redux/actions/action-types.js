// @flow
export type State = {};

export type ApiAction<A, T> = {
  type: A,
  payload: T,
};

export type GetState = () => State;

export type ThunkAction<A, T> = (
  // eslint-disable-next-line no-use-before-define
  dispatch: Dispatch<A, T>,
  getState: GetState
) => any;

export type Dispatch<A, T> = (
  action: ThunkAction<A, T> | ApiAction<A, T>
) => any;
