// @flow
import { Map } from 'immutable';

export type State = {
  auth: Map,
  dinningPref: Map,
  profile: Map,
  contacts: Map
};

export type ApiAction<A, T> = {
  type: A,
  payload: T
};

export type GetState = () => State;

export type ThunkAction<A, T> = (
  dispatch: Dispatch<A, T>,
  getState: GetState
) => any;

export type Dispatch<A, T> = (
  action: ThunkAction<A, T> | ApiAction<A, T>
) => any;
