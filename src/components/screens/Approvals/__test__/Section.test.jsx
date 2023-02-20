import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { allApprovals, quesHashData } from './data';
import Section, { ApprovalContext } from '../Section';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
const approvals = { allApprovals, quesHashData };
const store = mockStore({ approvals });
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
describe('Approval Section Component', () => {
  let wrapper;
  jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
  }));
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <ApprovalContext.Provider
          value={{ sectionLoading: false, dispatchLoadingEvent: jest.fn() }}
        >
          <Section
            sectionId="d791a317-8f1b-488b-85cb-4247fca2b156"
            testVisibility
          />
        </ApprovalContext.Provider>
      </Provider>
    );
  });

  it.skip('should component render', () => {
    useSelector.mockImplementation(() => ({
      allApprovals,
    }));
    expect(wrapper).toBeDefined();
    expect(wrapper.exists('.accordion-container')).toEqual(true);
    expect(wrapper.exists('.accordion-title')).toEqual(true);
  });

  it.skip('Check with component snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
