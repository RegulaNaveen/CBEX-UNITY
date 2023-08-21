import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SectionActive from '../SectionActive';

const mockSetIsAllActiveDisplayed = jest.fn();
const props = {
  ApprovalSectionId: '1',
  ApprovalSectionTitle: 'Title',
  ApprovalSectionLeftQuestions: ['2', '3'],
  ApprovalSectionRightQuestions: ['4', '5'],
  setIsAllActiveDisplayed: mockSetIsAllActiveDisplayed
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(props);
describe('SectionActive component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SectionActive {...props} />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
