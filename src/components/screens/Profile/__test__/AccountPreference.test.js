/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { configure, mount, render, screen, shallow } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup } from '@testing-library/react';
import { useDispatch, Provider } from 'react-redux';
import createStore from '../../../../store';
import 'regenerator-runtime/runtime';
import Dropdown from '../../../common/atoms/inputs/Dropdown';

// import localStorageMock from '../../../../setupTest';

import AccountPreference from '../AccountPreference';

configure({ adapter: new Adapter() });
afterEach(() => {
  cleanup();
});

jest.mock('react-redux', () => {
  const { Provider, useSelector } = jest.requireActual('react-redux');

  return {
    useDispatch: jest.fn(),
    useSelector,
    Provider,
  };
});

describe('Account Preference  Component is rendered in Dom', () => {
  const dispatchMock = jest.fn();
  test('Render Account preference', () => {
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
  test('check for text on screen', () => {
    const wrapper = mount(
      <Provider store={createStore}>
        <AccountPreference />
      </Provider>
    );
    const chkText = 'Account Preference';
    expect(wrapper.text().includes(chkText)).toBe(true);
  });

  test('check for Dropdown component', () => {
    const wrapper = mount(
      <Provider store={createStore}>
        <Dropdown />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });

  test('check for text on screen', () => {
    const wrapper = mount(
      <Provider store={createStore}>
        <AccountPreference />
      </Provider>
    );
    const chkTextrole =
      'Your role will determine the visible questions in an opportunity';
    expect(wrapper.text().includes(chkTextrole)).toBe(true);
  });
});
