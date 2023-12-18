import React from 'react';
import {
  render,
  cleanup,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import TableView from '../TableView';
import { Provider } from 'react-redux';
import Sinon from 'sinon';
import { store } from '../../../store';
import SocketContextProvider from '../../../context/SocketContext';
import { REDUX_TYPES } from '../../../constants';
import * as SSOApis from '../../../api/sso-auth';
import * as ProposalsApi from '../../../api/proposals';
import App from '../../../App';

jest.mock('../../../components/screens/Dashboard', () => () => (
  <p>Dashboard</p>
));
jest.mock('../../../components/screens/Opportunity', () => () => (
  <p>Opportunity</p>
));
jest.mock('../../../utils/launchDarkly', () => ({
  __esModule: true,
  default: () =>
    Promise.resolve({ favouriteFlag: true, customOpportunityNameFlag: true })
}));

const data = [
  {
    'opportunity number': 'OPP123',
    'opportunity name': 'Test Opportunity',
    'bid due date': '2022-01-01',
    'opportunity status': 'Active',
    bidNo: 1,
    bidType: 'Clinical_Bid',
    isFavourite: false,
    nextMilestone: 'Milestone 1',
    unknown: '',
    proposalId: 'id1'
  },
  {
    'opportunity number': 'OPP456',
    'opportunity name': 'Test Opportunity 2',
    'bid due date': '2022-02-01',
    'opportunity status': 'Inactive',
    isFavourite: false,
    nextMilestone: 'Milestone 2',
    bidNo: 2,
    bidType: 'Early_Engagement_Bid',
    proposalId: 'id2'
  }
];

const hideStatusData = [
  {
    'opportunity number': 'OPP123',
    'opportunity name': 'Test Opportunity',
    'bid due date': '2022-01-01'
  },
  {
    'opportunity number': 'OPP456',
    'opportunity name': 'Test Opportunity 2',
    'bid due date': '2022-02-01'
  }
];

const TableViewWithRedux = ({ updateFavouriteWrapper, ...props }) => {
  return (
    <Provider store={store}>
      <Router>
        <SocketContextProvider value={{ updateFavouriteWrapper }}>
          <TableView {...props} />
          <App />
        </SocketContextProvider>
      </Router>
    </Provider>
  );
};

describe('TableView component', () => {
  let sinonSandbox;
  beforeAll(() => {
    sinonSandbox = Sinon.createSandbox();
  });
  beforeEach(() => sinonSandbox.restore());
  afterEach(cleanup);

  test('hides the opportunity status header and data correctly', () => {
    const { queryByText } = render(
      <TableViewWithRedux data={hideStatusData} hideStatus />
    );

    const headerOpportunityStatus = queryByText('opportunity stage');
    const firstRowOpportunityStatus = queryByText('Active');

    expect(headerOpportunityStatus).not.toBeInTheDocument();
    expect(firstRowOpportunityStatus).not.toBeInTheDocument();
  });

  it('should show nextMilestone column', async () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: {
        customOpportunityNameFlag: true,
        favouriteFlag: true
      }
    });
    const { getByText } = render(<TableViewWithRedux data={data} />);
    expect(getByText('Next Milestone')).toBeInTheDocument();
  });

  it('should show favourite column', async () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: {
        customOpportunityNameFlag: true,
        favouriteFlag: true
      }
    });
    const { container, debug } = render(
      <TableViewWithRedux data={data} updateFavouriteWrapper={jest.fn()} />
    );
    expect(
      container.querySelector('.fav-icon-button .MuiSvgIcon-root')
    ).toHaveStyle({ color: '#999999' });
  });

  it('should be able to toggle favourite', async () => {
    const toggleFavStub = sinonSandbox
      .stub(SSOApis, 'toggleFavourite')
      .resolves({
        data: {
          favourties: []
        }
      });
    const saveRecentOppPrefStub = sinonSandbox
      .stub(ProposalsApi, 'saveRecentOppActivity')
      .resolves();
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: {
        customOpportunityNameFlag: true,
        favouriteFlag: true
      }
    });
    const { container, debug } = render(
      <TableViewWithRedux data={data} updateFavouriteWrapper={jest.fn()} />
    );
    expect(
      container.querySelector('.fav-icon-button .MuiSvgIcon-root')
    ).toBeInTheDocument();
    userEvent.click(container.querySelector('.fav-icon-button'));
    await waitFor(() => {
      expect(toggleFavStub.callCount).toBe(1);
      expect(saveRecentOppPrefStub.callCount).toBe(1);
    });
  });

  it('should stop progress if error while toggle favourite', async () => {
    sinonSandbox.stub(SSOApis, 'toggleFavourite').rejects();
    sinonSandbox.stub(ProposalsApi, 'saveRecentOppActivity').resolves();
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: {
        customOpportunityNameFlag: true,
        favouriteFlag: true
      }
    });
    const { container } = render(
      <TableViewWithRedux data={data} updateFavouriteWrapper={jest.fn()} />
    );
    expect(
      container.querySelector('.fav-icon-button .MuiSvgIcon-root')
    ).toBeInTheDocument();
    userEvent.click(container.querySelector('.fav-icon-button'));
    await waitFor(() => {
      expect(
        container.querySelector('.MuiCircularProgress-root')
      ).toBeInTheDocument();
    });

    expect(
      container.querySelector('.MuiCircularProgress-root')
    ).not.toBeInTheDocument();
  });

  it('should show empty message when no data', async () => {
    const { getByText } = render(
      <TableViewWithRedux data={[]} updateFavouriteWrapper={jest.fn()} />
    );
    expect(getByText('No data to show')).toBeInTheDocument();
  });

  it('should show edit name modal on clicking edit icon', async () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: {
        customOpportunityNameFlag: true,
        favouriteFlag: true
      }
    });
    localStorage.setItem('access_token', 'token');
    window.history.pushState({}, '', '/dashboard');
    const { container, queryByTestId, debug } = render(
      <TableViewWithRedux data={data} updateFavouriteWrapper={jest.fn()} />
    );
    await waitFor(() =>
      expect(container.querySelector('.edit-icon-button')).toBeInTheDocument()
    );
    userEvent.click(container.querySelector('.edit-icon-button'));
    await waitFor(() =>
      expect(queryByTestId('edit-name-modal')).toBeInTheDocument()
    );
  });
});
