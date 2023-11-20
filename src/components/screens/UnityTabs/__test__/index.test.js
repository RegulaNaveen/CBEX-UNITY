import React from 'react';
import { Provider } from 'react-redux';
import { screen, render, fireEvent } from '@testing-library/react';
import { mount } from 'enzyme';
import { BrowserRouter, Router } from 'react-router-dom';
import { store } from '../../../../store';
import UnityTabIndex from '../index';

describe('Unity Section Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <UnityTabIndex />
      </Provider>
    );
  });

  test('render index component', () => {
    expect(wrapper.length).toBe(1);
  });
  it('should check add new questions ', async () => {
    expect(wrapper).toBeDefined();
    await expect(screen.findByText(/Add New Question/i)).toBeTruthy();
  });
  it('should check add new question on click event ', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <UnityTabIndex />
        </Provider>
      </BrowserRouter>
    );
    const iconButton = screen.getByTestId('selectedbid-testid');
    expect(iconButton).toBeInTheDocument();
    fireEvent.click(iconButton);
  });
});
