import React from 'react';
import { Provider } from 'react-redux';
import { screen } from '@testing-library/react';
import { mount, render } from 'enzyme';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { allCustom, quesHashData, filters } from './data';
import Filters from '../Filters';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
const customData = { allCustom, quesHashData, filters };
const initialState = {
  updateFilters: jest.fn(),
  approvalFilters: jest.fn()
};
const store = mockStore({ customData, initialState });

describe('CustomTab Section Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Filters />
      </Provider>
    );
  });
  it('should check filter ', async () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists('.filter-horizontal')).toEqual(true);
  });

  it('on click of checkbox,it shoud be checked', async () => {
    render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );
    await expect(screen.findAllByTestId('filter-checkbox')).toBeTruthy();
  });
});
