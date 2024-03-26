import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollapsibleList from '../CollapsibleList';
import configureMockStore from 'redux-mock-store';
import { configure, mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { OrderedMap } from 'immutable';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { getSelectedSection, selectNotes } from '../../../redux/selectors';
import {
  getProposalDetails,
  getSelectedBid
} from '../../../redux/selectors/proposal';
import { INITIAL_STATE as searchInitialState } from '../../../redux/reducers/search';

configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
searchInitialState.searchResults = [{
  searchIndex: "Customer Scenarios & BTS RFPs",
}];
searchInitialState.currentResultIndex = 0;
searchInitialState.autoNavigatedToCurrentResult = false;
const store = mockStore({
  search: searchInitialState,
  proposal: new Map([['selectedBid', new Map([['isCurrent', true], ['isEditable', true]])]], ['proposalDetails', { 'CRM #': 123 }]),
  sidebar: new Map([['selectedSection', 'customer-scenarios-&-bts-rfps']]),
  notepad: new Map([['notes', []]])
});
const mockDispatch = store.dispatch;
store.dispatch = jest.fn(mockDispatch);

const setup = (props = {}) => {
  const setupProps = { ...props };
  return mount(
    <Provider store={store}>
      <CollapsibleList {...setupProps} />
    </Provider>
  );
};

const initProps = {};
describe('Test CollapsibleList Component', () => {
  const wrapper = setup(initProps);
  let mockQuestionsRef;

  beforeEach(() => {
    mockQuestionsRef = { current: document.createElement('div') };
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const props = {
    selectedSection: getSelectedSection(),
    notes: selectNotes(),
    proposalDetail: getProposalDetails(),
    selectedBid: getSelectedBid(),
    title: 'Customer Scenarios & BTS RFPs',
    questions: OrderedMap({ 1: 'blaa' }),
    questionsRef: mockQuestionsRef,
    isCheckedAll: true,
    onExpandDone: jest.fn()
  };
  test('matchsnapshot of collapsiblelist component', () => {
    const container = render(
      <Provider store={store}>
        <CollapsibleList {...props} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  test('render collapsiblelist component', () => {
    expect(wrapper.length).toBe(1);
  });
  test('should render the component onto the screen', async () => {
    window.localStorage.setItem('enableFirstExpand', 'true');
    const { container } = render(
      <Provider store={store}>
        <CollapsibleList {...props} />
      </Provider>
    );
    expect(screen.getByTestId('collapsible-list')).toBeInTheDocument();
    const chevronRight = screen.getByRole('button', { name: "question arrow" });
    fireEvent.click(chevronRight);
    fireEvent.keyDown(chevronRight, { key: 'Enter', code: 'Enter' });
    fireEvent.keyDown(container, { altKey: true, key: 'q' });
  });
  test('call keyboardShortcutListener function', () => {
    const keyboardShortcutListenerFunc = jest.fn();
    const mockFunc = keyboardShortcutListenerFunc();
    expect(mockFunc).toBeUndefined();
    expect(keyboardShortcutListenerFunc).toHaveBeenCalledTimes(1);
    expect(keyboardShortcutListenerFunc).toHaveBeenCalledWith();
  });
});
