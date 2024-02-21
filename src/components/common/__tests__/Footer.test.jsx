/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
  getByText
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Sinon from 'sinon';
import { createStore, applyMiddleware } from 'redux';
import { store } from '../../../store';
import UnityFooter from '../Footer';
import { REDUX_TYPES } from '../../../constants';
import * as ProposalApi from '../../../api/proposal';
import {
  updateSwitchInProgress,
  updateSwitchTempStatusFromWebSocket
} from '../../../redux/actions/proposal-actions';

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
    screen.debug(undefined, Infinity);
    await waitFor(() => {
      expect(queryByTestId('update-triangle')).not.toBeInTheDocument();
    });
    act(() => {
      fireEvent.click(queryByTestId('sync-icon'));
    });
    expect(screen.getByText('Opportunity Type Override')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Default Type')).toBeInTheDocument();
      screen.debug(undefined, Infinity);
      expect(
        screen.getByRole('button', { name: /cancel/i })
      ).toBeInTheDocument();
      expect;
      expect(screen.getByRole('button', { name: /change/i })).toBeDisabled();
    });
  });

  test('test for update template in progess and got error', async () => {
    store.dispatch(updateSwitchInProgress(true));
    render(<FooterWithRedux />);
    expect(screen.getByText('Opportunity Type Update')).toBeInTheDocument();

    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SWITCH_TEMP_STATUS,
      payload: {
        data: 'error',
        proposalId: 'ed090ac8-3902-46cc-9530-73797cc78308'
      }
    });
    // expect(
    //   await screen.findByText('Operation failed due to error')
    // ).toBeInTheDocument();
  });
});
