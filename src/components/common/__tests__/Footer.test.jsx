/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Sinon from 'sinon';

import { store } from '../../../store';
import UnityFooter from '../Footer';
import { REDUX_TYPES } from '../../../constants';
import * as ProposalApi from '../../../api/proposal';
import { updateSwitchInProgress } from '../../../redux/actions/proposal-actions';
import { PROPOSAL } from '../../../constants/app';

const oppTypeList = {
  data: {
    'Opportunity Type': [
      'Core Opportunity Launch Call (AMR/EMEA)',
      'Core Opportunity Launch Call (APAC)',
      'Non-Core Clinical Studies',
      'Ballpark',
      'IQB Template',
      'PILOT - DO NOT USE: PROGRAMS',
      'Default Type'
    ],
    'Publish Version': 'v2023.423'
  }
};

const FooterWithRedux = props => (
  <Provider store={store}>
    <Router>
      <UnityFooter {...props} />
    </Router>
  </Provider>
);

describe('Test Footer Component', () => {
  let sinonSandbox;

  beforeAll(() => {
    sinonSandbox = Sinon.createSandbox();
  });

  beforeEach(() => {
    sinonSandbox.restore();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('Load footer component', async () => {
    jest.spyOn(ProposalApi, 'getOTListData').mockRejectedValue({
      data: { message: 'rejected' },
      status: 400
    });
    const { container } = render(
      <FooterWithRedux
        questionTemplateVersionNumber="version-0.29"
        opportunityType="Core Clinical"
      />
    );

    expect(container).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByText('Update Template')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Question Template Version: version-0.29 - Core Clinical'
      )
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Alert')).toBeInTheDocument();
    });
  });

  test('Refresh button disable and able to change the opportunity type', async () => {
    jest.spyOn(ProposalApi, 'getOTListData').mockResolvedValue(oppTypeList);
    const { queryByTestId } = render(
      <FooterWithRedux
        questionTemplateVersionNumber="version-0.29"
        opportunityType="Default Type"
      />
    );
    expect(queryByTestId('sync-icon')).toBeInTheDocument();
    await waitFor(() => {
      expect(queryByTestId('update-triangle')).not.toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(queryByTestId('sync-icon'));
    });
    expect(screen.getByText('Opportunity Type Override')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Default Type')).toBeInTheDocument();
    });
  });

  it('test for update template in progess and got error', async () => {
    store.dispatch(updateSwitchInProgress(true));
    render(<FooterWithRedux />);
    expect(screen.getByText('Opportunity Type Update')).toBeInTheDocument();

    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SWITCH_TEMP_STATUS,
      payload: 'error'
    });
    // expect(
    //   await screen
    //     .findByText('Operation failed due to error'))
    // .toBeInTheDocument();
  });

  it('should call getOpportunity on switch template success', async () => {
    const getAllProposalsStub = sinonSandbox
      .stub(ProposalApi, 'getAllProposals')
      .resolves([
        {
          isCurrent: true
        }
      ]);
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SWITCH_TEMP_STATUS,
      payload: 'success'
    });
    const { container } = render(<FooterWithRedux />);
    await waitFor(() => {
      expect(
        screen.getByText('Opportunity type has been updated successfully')
      ).toBeInTheDocument();
    });
  });

  it('should close the alert modal when the banner message is clicked', async () => {
    const getAllProposalsStub = sinonSandbox
      .stub(ProposalApi, 'getAllProposals')
      .resolves([
        {
          isCurrent: true
        }
      ]);
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SWITCH_TEMP_STATUS,
      payload: 'success'
    });
    render(<FooterWithRedux />);
    await waitFor(() => {
      expect(
        screen.getByText('Opportunity type has been updated successfully')
      ).toBeInTheDocument();
    });

    // Simulate a click event on the banner message
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    // Check that the alert modal is not rendered after the click event
    await waitFor(() => {
      expect(
        screen.queryByText('Opportunity type has been updated successfully')
      ).not.toBeInTheDocument();
    });
  });
});
