import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store';

import * as data from './data.json';
import Bidhistory from '../Bidhistory';
import { REDUX_TYPES } from '../../../constants';

describe('Render Bidhistory component', () => {
  window.history.pushState(
    {},
    '',
    '/opportunities/LAB09095?bidNo=1&bidType=Clinical_Bid'
  );
  act(() => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: {
        earlyEngagementInBidHistory: true,
        postAwardInBidHistory: true,
        RFIInBidHistory: true
      }
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.OPPORTUNITY_INFO,
      payload: Object.values(data.proposal.opportunityData)
    });
  });
  it('Bidhistory component with isEditable true', () => {
    // Render the component
    act(() => {
      render(
        <Provider store={store}>
          <Bidhistory />
        </Provider>
      );
    });
    expect(screen.getAllByTestId('status-dotoutline')[0]).toBeInTheDocument();
  });
});
