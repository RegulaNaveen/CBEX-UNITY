import React from 'react';
import { Provider } from 'react-redux';
import {
  screen,
  render,
  fireEvent,
  act,
  waitFor
} from '@testing-library/react';
import ApprovalIndex from '../index';
import { SocketContext } from '../../../../context/SocketContext';
import { axiosInstance, store } from '../../../../store';
import { MemoryRouter } from 'react-router-dom';
import axiosMock from 'axios-mock-adapter';
import { REDUX_TYPES } from '../../../../constants';

describe('<approvalIndex />', () => {
  let mock;

  beforeEach(() => {
    mock = new axiosMock(axiosInstance);
  });

  afterEach(() => {
    mock.reset();
  });
  it('to test expand all is rendered', () => {
    render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{ questionLockDetailsWrapper: jest.fn() }}
        >
          <ApprovalIndex />
        </SocketContext.Provider>
      </Provider>
    );
    expect(screen.getByText(/expand all/i)).toBeInTheDocument();
  });

  it('to add new question button is rendered', () => {
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
      <MemoryRouter>
        <Provider store={store}>
          <SocketContext.Provider
            value={{ questionLockDetailsWrapper: jest.fn() }}
          >
            <ApprovalIndex />
          </SocketContext.Provider>
        </Provider>
      </MemoryRouter>
    );

    const addNewQues = screen.getByRole('presentation');
    expect(addNewQues).toBeInTheDocument();
    fireEvent.click(addNewQues);
  });

  it('check filter button is rendered', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SocketContext.Provider
            value={{ questionLockDetailsWrapper: jest.fn() }}
          >
            <ApprovalIndex />
          </SocketContext.Provider>
        </Provider>
      </MemoryRouter>
    );
    const filterBtn = screen.getByRole('button', { name: /filter/i });
    expect(filterBtn).toBeInTheDocument();
    fireEvent.click(filterBtn);
  });

  it('no approval text is rendered', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SocketContext.Provider
            value={{ questionLockDetailsWrapper: jest.fn() }}
          >
            <ApprovalIndex />
          </SocketContext.Provider>
        </Provider>
      </MemoryRouter>
    );
    const filterBtn = screen.getByTestId('No_approvals');
    expect(filterBtn).toBeInTheDocument();
  });
});
