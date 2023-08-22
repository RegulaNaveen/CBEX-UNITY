/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import expect from 'expect';
import thunk from 'redux-thunk';
import { Map } from 'immutable';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import StateData from './mockData/AccountPreference.json';
import AccountPreference from '../AccountPreferences/AccountPreference';

const proposal = Map(StateData.proposal);
const initialData = {
  proposal,
  setRoleName: jest.fn(),
  handleUpdateTimezone: jest.fn(),
  setCurrentTimezoneID: jest.fn(),
  handleUserPreferenceChange: jest.fn(),
  role: StateData.role,
  email: StateData.email,
  roleName: StateData.roleName,
  timezoneID: StateData.timezoneID,
  timezoneList: StateData.timezoneList,
  userPreference: StateData.userPreference,
  currentTimezoneID: StateData.currentTimezoneID,
  isFetchingTimezone: StateData.isFetchingTimezone,
  errorUpdatingTimezone: StateData.errorUpdatingTimezone
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialData);
describe('Account Preference  Component is rendered in Dom', () => {
  test('Render Account preference', async () => {
    const { container } = await render(
      // eslint-disable-next-line react/jsx-filename-extension
      <Provider store={store}>
        <AccountPreference {...initialData} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId('account-pref')).toBeInTheDocument();
  });
});
