import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sinon from 'sinon';
import { BrowserRouter as Router } from 'react-router-dom';
import SocketContextProvider from '../../../context/SocketContext';
import ProposalCard from '../ProposalCard';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { REDUX_TYPES } from '../../../constants';
import { act } from 'react-dom/test-utils';
import * as SSOApis from '../../../api/sso-auth';

afterEach(cleanup);

const props = {
  title: 'Proposal 1',
  opportunityName: 'Opportunity 1',
  daysRemain: 10,
  dueDate: '2023-02-16',
  customer: 'Acme Inc.',
  protocolNumber: 'P-12345',
  phase: 'Phase III',
  therapeuticArea: 'Oncology',
  verbatimIndication: 'Cancer treatment',
  proposalId: '12345',
  approvalsCount: 3,
  isApprovalCountPresent: true
};

const ProposalCardWithRedux = ({ updateFavouriteWrapper, ...props }) => (
  <Provider store={store}>
    <Router>
      <SocketContextProvider value={{ updateFavouriteWrapper }}>
        <ProposalCard {...props} />
      </SocketContextProvider>
    </Router>
  </Provider>
);

describe.skip('ProposalCard component', () => {
  let sinonSandbox;
  beforeAll(() => {
    sinonSandbox = Sinon.createSandbox();
  });

  beforeEach(() => {
    sinonSandbox.restore();
  });

  afterAll(() => {
    sinonSandbox.restore();
  });

  it('renders with correct content', async () => {
    const { getByText } = render(<ProposalCardWithRedux {...props} />);

    expect(getByText(props.title)).toBeInTheDocument();
    expect(getByText(props.opportunityName)).toBeInTheDocument();
    expect(getByText(props.customer)).toBeInTheDocument();
    expect(getByText(props.protocolNumber)).toBeInTheDocument();
    expect(getByText(props.phase)).toBeInTheDocument();
    expect(getByText(props.therapeuticArea)).toBeInTheDocument();
    expect(getByText(props.verbatimIndication)).toBeInTheDocument();
    expect(getByText(props.dueDate)).toBeInTheDocument();
  });

  it('renders the strategy development button', () => {
    const { getByText } = render(<ProposalCardWithRedux {...props} />);

    expect(getByText('Strategy Development')).toBeInTheDocument();
  });

  it('does not render the approvals count if it is not present', () => {
    const newProps = { ...props, isApprovalCountPresent: false };
    const { queryByText, debug } = render(
      <ProposalCardWithRedux {...newProps} />
    );
    debug();

    expect(queryByText('3')).not.toBeInTheDocument();
  });

  it('show favourite icon when flag is turned on', async () => {
    const updateFavWrapperStub = sinonSandbox.stub();
    const { container } = render(
      <ProposalCardWithRedux
        updateFavouriteWrapper={updateFavWrapperStub}
        {...props}
      />
    );
    act(() => {
      store.dispatch({
        type: REDUX_TYPES.PROPOSAL.SET_FLAG,
        payload: {
          favouriteFlag: true
        }
      });
    });
    expect(container.querySelector('.fav-icon-button')).toBeInTheDocument();
  });

  it('hide favourite icon when flag is turned off', async () => {
    const updateFavWrapperStub = sinonSandbox.stub();
    const { container } = render(
      <ProposalCardWithRedux
        updateFavouriteWrapper={updateFavWrapperStub}
        {...props}
      />
    );
    act(() => {
      store.dispatch({
        type: REDUX_TYPES.PROPOSAL.SET_FLAG,
        payload: {
          favouriteFlag: true
        }
      });
    });
    expect(container.querySelector('.fav-icon-button')).toBeInTheDocument();
    act(() => {
      store.dispatch({
        type: REDUX_TYPES.PROPOSAL.SET_FLAG,
        payload: {
          favouriteFlag: false
        }
      });
    });
    expect(container.querySelector('.fav-icon-button')).toBe(null);
  });

  it('on click fav icon should change state', async () => {
    const updateFavWrapperStub = sinonSandbox.stub();
    const toggleFavStub = sinonSandbox
      .stub(SSOApis, 'toggleFavourite')
      .resolves({
        data: {
          favourties: []
        }
      });
    const { container, debug } = render(
      <ProposalCardWithRedux
        updateFavouriteWrapper={updateFavWrapperStub}
        {...props}
      />
    );
    act(() => {
      store.dispatch({
        type: REDUX_TYPES.PROPOSAL.SET_FLAG,
        payload: {
          favouriteFlag: true
        }
      });
    });
    expect(
      container.querySelector('.fav-icon-button .MuiSvgIcon-root')
    ).toHaveStyle({ color: '#999999' });
    fireEvent.click(container.querySelector('.fav-icon-button'));
    await waitFor(() => {
      expect(
        container.querySelector('.MuiCircularProgress-root')
      ).toBeInTheDocument();
    });

    await waitForElementToBeRemoved(
      container.querySelector('.MuiCircularProgress-root')
    );
    expect(toggleFavStub.callCount).toBe(1);
  });
});
