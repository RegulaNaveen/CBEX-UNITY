/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { configure, mount, render, screen, shallow } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup, fireEvent } from '@testing-library/react';
import { useDispatch, Provider } from 'react-redux';
import createStore from '../../../../store';
import { logout } from '../../../../redux/actions/auth-actions';
import 'regenerator-runtime/runtime';
import SideNav from '../ProfileLayout/SideNav';

configure({ adapter: new Adapter() });
afterEach(() => {
  cleanup();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  })
}));

jest.mock('react-redux', () => {
  const { Provider, useSelector } = jest.requireActual('react-redux');
  return {
    useDispatch: jest.fn(),
    // useHistory: jest.fn(),
    useSelector,
    Provider
  };
});

describe.skip('Side Navbar Component is rendered in Dom', () => {
  const dispatchMock = jest.fn();
  const props = {
    handleLogout: jest.fn(),
    history: jest.fn()
  };

  test('Render Side Navbar', () => {
    // const func = jest.fn();
    const wrapper = mount(
      <Provider store={createStore}>
        <SideNav {...props} />
      </Provider>
    );
    const globalStore = wrapper.find(Provider).prop('store');
    dispatchMock.mockImplementation(action => globalStore.dispatch(action));
    useDispatch.mockReturnValue(dispatchMock);
    expect(wrapper.exists()).toBe(true);
  });

  test('Check for total button', () => {
    // const func = jest.fn();
    const wrapper = mount(
      <Provider store={createStore}>
        <SideNav {...props} />
      </Provider>
    );
    const globalStore = wrapper.find(Provider).prop('store');
    dispatchMock.mockImplementation(action => globalStore.dispatch(action));
    useDispatch.mockReturnValue(dispatchMock);

    expect(wrapper.exists()).toBe(true);
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
  });

  test('Check for  button click', () => {
    const wrapper = mount(
      <Provider store={createStore}>
        <SideNav {...props} />
      </Provider>
    );
    const globalStore = wrapper.find(Provider).prop('store');
    dispatchMock.mockImplementation(action => globalStore.dispatch(action));
    useDispatch.mockReturnValue(dispatchMock);
    expect(wrapper.exists()).toBe(true);

    const button = wrapper.find('button').simulate('click');
    expect(button).toEqual({});
  });
});
