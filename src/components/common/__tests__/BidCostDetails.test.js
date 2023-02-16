import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../../store'
import BidCostDetails from '../BidCostDetails';
import * as data from '../../screens/Opportunity/__tests__/mockdata/document.json'
import { Map } from 'immutable';

describe('BidCostDetails component', () => {
  const initialState = {
    proposal: Map(data.proposal),
    selectedBid: data.proposal.selectedBid,
    proposalQuestion: data.proposal.proposalQuestions
  };

  afterEach(() => {
    cleanup();
  })

  it('renders the component title', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BidCostDetails {...initialState} />
      </Provider>
    );

    expect(getByText('Bid Cost Details')).toBeInTheDocument();
  });

  it('displays the bid cost details', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BidCostDetails {...initialState} />
      </Provider>
    );

    expect(getByText('Total Bid Value:')).toBeInTheDocument();
    expect(getByText('Bottom Line Labor Discount:')).toBeInTheDocument();
    expect(getByText('Budget Tools:')).toBeInTheDocument();
  });

});