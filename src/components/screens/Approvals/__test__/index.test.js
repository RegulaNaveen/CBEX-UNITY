import React from 'react';
import { Provider } from 'react-redux';
import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { store } from '../../../../store';
import ApprovalIndex from '../index';
describe('Approval Section Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <ApprovalIndex />
      </Provider>
    );
  });

  test('render index component', () => {
    expect(wrapper.length).toBe(1);
  });
  it('should check add new question icon', async () => {
    expect(wrapper).toBeDefined();
    await expect(screen.findByText(/ Add New Question/i)).toBeTruthy();
  });

  it('should check add new question on click event ', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ApprovalIndex />
        </Provider>
      </BrowserRouter>
    );
    const iconButton = screen.getByTestId('selectedbid-testid');
    expect(iconButton).toBeInTheDocument();
    fireEvent.click(iconButton);
  });
});
