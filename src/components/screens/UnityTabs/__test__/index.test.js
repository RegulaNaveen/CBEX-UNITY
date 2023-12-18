import React from 'react';
import { Provider } from 'react-redux';
import { screen, render, fireEvent } from '@testing-library/react';
import { mount } from 'enzyme';
import { BrowserRouter, Router } from 'react-router-dom';
import { store } from '../../../../store';
import UnityTabIndex from '../index';
import { REDUX_TYPES } from '../../../../constants';

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
          <UnityTabIndex />
        </Provider>
      </BrowserRouter>
    );
    const iconButton = screen.getByTestId('selectedbid-testid');
    expect(iconButton).toBeInTheDocument();
    fireEvent.click(iconButton);
  });

  it('check filter on when isShowFilter is true ', async () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <UnityTabIndex isShowFilters={true} />
        </Provider>
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
    await expect(screen.findByText(/ Filters/i)).toBeTruthy();
  });
});
