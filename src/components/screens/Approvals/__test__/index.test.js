import React from 'react';
import { Provider } from 'react-redux';
import { screen, render, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { store } from '../../../../store';
import ApprovalIndex from '../index';
import { REDUX_TYPES } from '../../../../constants';

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
    window.history.pushState(
      {},
      '',
      '/opportunities/UZA89257?bidNo=1&bidType=Clinical_Bid&viewType=questions'
    );
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.OPPORTUNITY_INFO,
      payload: [
        {
          id: 1,
          isCurrent: true,
          proposal: {
            bidType: 'Clinical_Bid',
            proposalDetails: { bidNo: 1 },
            opportunityOverview: {},
            proposalDate: '',
            typeOfWidget: '',
            nextMilestone: ''
          }
        }
      ]
    });
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
