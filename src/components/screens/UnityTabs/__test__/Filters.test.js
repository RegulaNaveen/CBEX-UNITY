import React from 'react';
import { Provider } from 'react-redux';
import { screen, render, fireEvent } from '@testing-library/react';
import Filters from '../Filters';
import { store } from '../../../../store';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

describe('CustomTab Section Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Filters />
      </Provider>
    );
  });
  it('should component render', async () => {
    expect(wrapper).toBeDefined();
    await expect(screen.findByText(/ Filters/i)).toBeTruthy();
  });
  it('should check filter ', async () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists('.filter-horizontal')).toEqual(true);
  });
  it('on click of checkbox,it shoud be checked', async () => {
    expect(wrapper).toBeDefined();
    await expect(screen.findAllByTestId('filter-checkbox')).toBeTruthy();
  });

  test('render the component without crashing with props', async () => {
    const { container, getByTestId } = await render(
      <BrowserRouter>
        <Provider store={store}>
          <Filters />
        </Provider>
      </BrowserRouter>
    );
    const iconButton = screen.getByTestId('clear-all-btn');
    expect(iconButton).toBeInTheDocument();
    fireEvent.click(iconButton);
  });
});
