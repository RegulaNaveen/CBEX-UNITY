/**
 * @jest-environment jsdom
 */

import React from 'react';
import { useHistory } from 'react-router-dom';
import '@testing-library/jest-dom';
import { configure, mount, render, screen, shallow } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup, fireEvent } from '@testing-library/react';
import { useDispatch, Provider } from 'react-redux';
import createStore from '../../../../store';

import 'regenerator-runtime/runtime';

import AccountPreference from '../AccountPreference';
import NotificationPreference from '../NotificationPreference';
import SideNav from '../SideNav';

configure({ adapter: new Adapter() });
afterEach(() => {
  cleanup();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('react-redux', () => {
  const { Provider, useSelector } = jest.requireActual('react-redux');

  return {
    useDispatch: jest.fn(),
    useSelector,
    Provider,
  };
});

describe('Account preference, Notification preference SidNav  Component is rendered in Dom', () => {
  const dispatchMock = jest.fn();

  test('Render Account Preference', () => {
    // const func = jest.fn();
    const wrapper = mount(
      <Provider store={createStore}>
        <AccountPreference />
      </Provider>
    );
    const globalStore = wrapper.find(Provider).prop('store');
    dispatchMock.mockImplementation((action) => globalStore.dispatch(action));
    useDispatch.mockReturnValue(dispatchMock);

    expect(wrapper.exists()).toBe(true);
  });

  test('Render Notification Preference', () => {
    const wrapper = mount(
      <Provider store={createStore}>
        <NotificationPreference />
      </Provider>
    );
    const globalStore = wrapper.find(Provider).prop('store');
    dispatchMock.mockImplementation((action) => globalStore.dispatch(action));
    useDispatch.mockReturnValue(dispatchMock);

    expect(wrapper.exists()).toBe(true);
  });

  test('Render SideNav', () => {
    // const func = jest.fn();
    const wrapper = mount(
      <Provider store={createStore}>
        <SideNav />
      </Provider>
    );
    const globalStore = wrapper.find(Provider).prop('store');
    dispatchMock.mockImplementation((action) => globalStore.dispatch(action));
    useDispatch.mockReturnValue(dispatchMock);

    expect(wrapper.exists()).toBe(true);
  });
});
