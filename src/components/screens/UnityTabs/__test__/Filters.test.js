import React from 'react';
import { Provider } from 'react-redux';
import { screen } from '@testing-library/react';
import Filters from '../Filters';
import { store } from "../../../../store";

describe('CustomTab Section Component', () => {
  it('should component render', async () => {
    expect(wrapper).toBeDefined();
    await expect(screen.findByText(/ Filters/i)).toBeTruthy();
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
