/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { Map } from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import EventLauncher from '../EventLauncher';
import StateData from './mockdata/eventlauncher.json';

const proposal = StateData.proposal;
const selectedBidMap = Map(proposal.selectedBid);
proposal.selectedBid = selectedBidMap;

const initState = {
  ssoAuth: Map(StateData.ssoAuth),
  proposalDetail: StateData.proposalDetail,
  trackMatomoEventLauncher: jest.fn(),
  questionData: Map(StateData.questionData),
  proposal: Map(proposal)
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initState);
describe('EventLauncher component', () => {
  test('EventLauncher render component', async () => {
    const setHookState = newState =>
      jest.fn().mockImplementation(() => [newState.openModal, () => {}]);
    React.useState = setHookState({
      openModal: true
    });
    window.ClipboardItem = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        write: () => {}
      }
    });
    jest.spyOn(navigator.clipboard, 'write');

    const { container } = render(
      <Provider store={store}>
        <EventLauncher {...initState} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId('custom-element')).toBeInTheDocument();
  });

  test('EventLauncher Model Test open', () => {
    const setHookState = newState =>
      jest.fn().mockImplementation(() => [newState.openModal, () => {}]);
    React.useState = setHookState({
      openModal: true
    });
    window.ClipboardItem = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        write: () => {}
      }
    });
    jest.spyOn(navigator.clipboard, 'write');

    const { container } = render(
      <Provider store={store}>
        <EventLauncher {...initState} />
      </Provider>
    );
    expect(screen.getByText('Event Launcher')).toBeInTheDocument();
    expect(screen.getByTestId('event-launcher-icon-id')).toBeInTheDocument();
    expect(screen.getByText('Select Variables')).toBeInTheDocument();
  });

  test('EventLauncher Model Test close', () => {
    const setHookState = newState =>
      jest.fn().mockImplementation(() => [newState.openModal, () => {}]);
    React.useState = setHookState({
      openModal: false
    });
    window.ClipboardItem = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        write: () => {}
      }
    });
    jest.spyOn(navigator.clipboard, 'write');
    StateData.questionData.answers = [];
    initState.questionData = Map(StateData.questionData);
    const { queryByTestId } = render(
      <Provider store={store}>
        <EventLauncher {...initState} />
      </Provider>
    );
    expect(queryByTestId('custom-element')).toBeNull();
  });

  test('EventLauncher icon click', async () => {
    const setHookState = newState =>
      jest.fn().mockImplementation(() => [newState.openModal, () => {}]);
    React.useState = setHookState({
      openModal: true
    });
    window.ClipboardItem = jest.fn();
    window.open = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        write: () => {}
      }
    });
    jest.spyOn(navigator.clipboard, 'write');

    const { getByText } = await render(
      <Provider store={store}>
        <EventLauncher {...initState} />
      </Provider>
    );
    fireEvent.click(await getByText('Launch Outlook'));
    expect(getByText('Launch Outlook')).toBeInTheDocument();
  });
});
