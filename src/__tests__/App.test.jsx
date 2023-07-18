import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
  cleanup
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sinon from 'sinon';

import App from '../App';
import { store } from '../store';
import { PROPOSAL } from '../constants/types';
import { REDUX_TYPES } from '../constants';
import * as proposalData from '../components/views/__tests__/Search/data.json';

jest.mock('../components/screens/Dashboard', () => () => <p>Dashboard</p>);
jest.mock('../components/screens/Opportunity', () => () => <p>Opportunity</p>);
jest.mock('../utils/launchDarkly', () => ({
  __esModule: true,
  default: () => Promise.resolve({ favouriteFlag: true })
}));
jest.mock('../api/sso-auth', () => ({
  updateCustomName: () => Promise.resolve({}),
  getOppPrefs: () => Promise.resolve([])
}));

describe('App Component', () => {
  let sinonSandbox;

  beforeAll(() => {
    sinonSandbox = Sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
    cleanup();
    jest.clearAllMocks();
  });

  it('should render custom name edit modal', async () => {
    store.dispatch({
      type: PROPOSAL.TOGGLE_EDIT_CUSTOM_NAME_MODAL,
      payload: true
    });
    localStorage.setItem('access_token', 'token');
    window.history.pushState({}, '', '/dashboard');
    const { findByTestId } = render(<App />);
    expect(await findByTestId('edit-name-modal')).toBeInTheDocument();
  });

  it('should close on clicking cancel in custom name edit modal', async () => {
    store.dispatch({
      type: PROPOSAL.TOGGLE_EDIT_CUSTOM_NAME_MODAL,
      payload: true
    });
    localStorage.setItem('access_token', 'token');
    window.history.pushState({}, '', '/dashboard');
    const { getByText, findByTestId, queryByTestId } = render(<App />);
    expect(await findByTestId('edit-name-modal')).toBeInTheDocument();
    fireEvent.click(getByText(/cancel/i));
    await waitFor(() =>
      expect(queryByTestId('edit-name-modal')).not.toBeInTheDocument()
    );
  });

  it('custom name should be editable', async () => {
    store.dispatch({
      type: PROPOSAL.TOGGLE_EDIT_CUSTOM_NAME_MODAL,
      payload: true
    });
    store.dispatch({
      type: PROPOSAL.SET_EDIT_OPP_INFO,
      payload: {
        oppNo: 'TEST123',
        customName: ''
      }
    });
    localStorage.setItem('access_token', 'token');
    window.history.pushState({}, '', '/dashboard');
    const {
      findByLabelText,
      findByTestId,
      debug,
      findByPlaceholderText,
      getByText
    } = render(<App />);
    expect(await findByTestId('edit-name-modal')).toBeInTheDocument();
    const textEdit = await findByLabelText(/Custom Name/i);
    userEvent.type(await findByPlaceholderText('New Custom Name'), 'test');
    await waitFor(() => expect(getByText('test')).toBeInTheDocument());
  });

  it('edit modal should hide on clicking close icon', async () => {
    store.dispatch({
      type: PROPOSAL.TOGGLE_EDIT_CUSTOM_NAME_MODAL,
      payload: true
    });
    store.dispatch({
      type: PROPOSAL.SET_EDIT_OPP_INFO,
      payload: {
        oppNo: 'TEST123',
        customName: ''
      }
    });
    localStorage.setItem('access_token', 'token');
    window.history.pushState({}, '', '/dashboard');
    const { findByTestId, getByTestId } = render(<App />);
    expect(await findByTestId('edit-name-modal')).toBeInTheDocument();
    userEvent.click(
      (await findByTestId('edit-name-modal')).querySelector(
        '.MuiIconButton-root'
      )
    );
    waitForElementToBeRemoved(getByTestId('edit-name-modal'));
  });

  it('edit modal should save and close on clicking save button', async () => {
    store.dispatch({
      type: PROPOSAL.TOGGLE_EDIT_CUSTOM_NAME_MODAL,
      payload: true
    });
    store.dispatch({
      type: PROPOSAL.SET_EDIT_OPP_INFO,
      payload: {
        oppNo: '12345',
        customName: ''
      }
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.ON_GET_PROPOSALS,
      payload: {
        proposals: [
          {
            'opportunity number': '12345'
          }
        ]
      }
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.OPPORTUNITY_INFO,
      payload: [{ ...proposalData }]
    });
    localStorage.setItem('access_token', 'token');
    window.history.pushState({}, '', '/dashboard');
    const {
      findByTestId,
      getByTestId,
      findByPlaceholderText,
      getByText
    } = render(<App />);
    expect(await findByTestId('edit-name-modal')).toBeInTheDocument();
    userEvent.type(await findByPlaceholderText('New Custom Name'), 'test');
    await waitFor(() => expect(getByText('test')).toBeInTheDocument());
    userEvent.click(getByText(/save/i));
    await waitForElementToBeRemoved(() => getByTestId('edit-name-modal'));
  });

  it('edit modal should show error when trying to save more than 250 characters', async () => {
    store.dispatch({
      type: PROPOSAL.TOGGLE_EDIT_CUSTOM_NAME_MODAL,
      payload: true
    });
    store.dispatch({
      type: PROPOSAL.SET_EDIT_OPP_INFO,
      payload: {
        oppNo: 'TEST123',
        customName: ''
      }
    });
    localStorage.setItem('access_token', 'token');
    window.history.pushState({}, '', '/dashboard');
    const {
      findByTestId,
      getByText,
      findByPlaceholderText,
      findByText
    } = render(<App />);
    expect(await findByTestId('edit-name-modal')).toBeInTheDocument();
    fireEvent.change(await findByPlaceholderText('New Custom Name'), {
      target: {
        value:
          'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest'
      }
    });
    await waitFor(() =>
      expect(
        getByText(
          'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest'
        )
      ).toBeInTheDocument()
    );
    userEvent.click(getByText(/save/i));
    expect(
      await findByText(/Custom Name cannot have more than 250 characters/i)
    ).toBeInTheDocument();
  });
});
