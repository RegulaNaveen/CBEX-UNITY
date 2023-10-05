/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { Map } from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import EmailTemplates from '../EmailTemplates';
import StateData from './mockdata/eventlauncher.json';

const proposal = StateData.proposal;
const selectedBidMap = Map(proposal.selectedBid);
proposal.selectedBid = selectedBidMap;

const initState = {
  ssoAuth: Map(StateData.ssoAuth),
  proposalDetail: StateData.proposalDetail,
  emailTemplates: StateData.emailTemplates,
  questionData: Map(StateData.questionData),
  proposal: Map(proposal)
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initState);
describe('Email Template component', () => {
  test('Email Template render component', async () => {
    const { container, getAllByText } = await render(
      <Provider store={store}>
        <EmailTemplates {...initState} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
    expect(await getAllByText(/Email Templates/i)?.[0]).toBeInTheDocument();
  });

  test('Email Template on load', async () => {
    initState.emailTemplates.isLoadingEmailTemplates = false;
    const { container } = render(
      <Provider store={store}>
        <EmailTemplates {...initState} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  test.skip('Email Template click on Email Button', async () => {
    initState.emailTemplates.isLoadingEmailTemplates = true;
    window.ClipboardItem = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        write: () => {}
      }
    });
    jest.spyOn(navigator.clipboard, 'write');
    const { container, getByText, getByTestId } = await render(
      <Provider store={store}>
        <EmailTemplates {...initState} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
    const btn = await getByText(/concurrency/i);
    expect(btn).toBeInTheDocument();
    if (btn) {
      fireEvent.click(getByTestId('expand-cell'));
      fireEvent.click(btn);
    }
    const paramtr = await getByText(/Parameters/i);
    expect(paramtr).toBeInTheDocument();
    expect(await getByText(/sushil.munda@iqvia.com/i)).toBeInTheDocument();
    expect(await getByText(/Connected Devices/i)).toBeInTheDocument();
    const email = await getByTestId('email-btn');
    if (email) {
      fireEvent.click(email);
    }
    const tooltip = await getByTestId('tooltip-btn');
    if (tooltip) {
      fireEvent.click(tooltip);
    }
  });
  test('Email Template empty', async () => {
    initState.emailTemplates.isLoadingEmailTemplates = false;
    initState.emailTemplates.emailTemplatesList = [];
    const { container, getByText } = await render(
      <Provider store={store}>
        <EmailTemplates {...initState} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
    expect(
      getByText(/No Email Templates available for this Opportunity Type/i)
    ).toBeInTheDocument();
  });
});
