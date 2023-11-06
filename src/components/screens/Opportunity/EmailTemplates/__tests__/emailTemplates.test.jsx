import React from 'react';

// import Email templates from index file
import EmailTemplates from '../index';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { configure, mount, shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import configureMockStore from 'redux-mock-store';
import { Map } from 'immutable';

// import initial state from email templates reducer
// import mock proposal data
import mockProposalData from './mockdata/mockProposalData.json';
import { INITIAL_STATE as emailTemplatesInitialState } from '../../../../../redux/reducers/emailTemplates';

const proposal = mockProposalData.proposal;
const selectedBidMap = Map(proposal.selectedBid);
proposal.selectedBid = selectedBidMap;

// setup redux for testing
configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const store = mockStore({
  emailTemplates: emailTemplatesInitialState,
  proposal: Map(proposal),
  search: []
});
const mockDispatch = store.dispatch;
store.dispatch = jest.fn(mockDispatch);

// write test case to test the EmailTemplates component

// test case to check if the component renders without crashing
it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <Provider store={store}>
      <EmailTemplates />
    </Provider>,
    div
  );
  unmountComponentAtNode(div);
});

// write more test cases here
