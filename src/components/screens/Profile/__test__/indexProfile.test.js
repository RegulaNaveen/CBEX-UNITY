/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { BrowserRouter } from 'react-router-dom';

import mockData from './mockData/AccountPreference.json';
import AccountPreferences from '../AccountPreferences';

const defaultProps = {
  isFetchingTimezone: false,
  isUpdatingTimezone: false,
  timezoneList: mockData.timezoneList,
  timezoneID: mockData.timezoneID,
  errorUpdatingTimezone: "",
  userPreference: mockData.userPreference,
  name: mockData.name,
  email: mockData.email,
  role: mockData.role,
  isUpdatingUserPreference: false,
  errorFetchingUserPreference: "",
  handleClose: jest.fn(),
  updateUserPreference: jest.fn(),
  handleUpdateTimezone: jest.fn(),
  handleUserPreferenceChange: jest.fn()
};

describe('testing for accountpreference component', () => {

  test('render the component without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AccountPreferences {...defaultProps} />
        </BrowserRouter>
      </Provider>
    );

    expect(container).toBeTruthy();
  })

});
