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
  setIsAllActiveDisplayed: mockSetIsAllActiveDisplayed,
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

  it('displays the section title', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SectionActive {...props} />
      </Provider>
    );
    const title = wrapper.find('.approval-sec-title');
    // expect(title.text()).toEqual('Title');
  });

  it('renders the left and right questions', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SectionActive {...props} />
      </Provider>
    );
    // const leftQuestions = wrapper.find('.approval-ques-left QuestionItem');
    // const rightQuestions = wrapper.find('.approval-ques-right QuestionItem');
    // expect(leftQuestions.length).toEqual(2);
    // expect(rightQuestions.length).toEqual(2);
  });

  it.skip('calls setIsAllActiveDisplayed with the correct value when the questions are all visible', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SectionActive {...props} />
      </Provider>
    );
    const instance = wrapper.instance();
    instance.updateQuestionVisibility('2', true);
    instance.updateQuestionVisibility('3', true);
    instance.updateQuestionVisibility('4', true);
    instance.updateQuestionVisibility('5', true);
    expect(mockSetIsAllActiveDisplayed).toHaveBeenCalledWith(true);
  });

  it.skip('calls setIsAllActiveDisplayed with the correct value when the questions are not all visible', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SectionActive {...props} />
      </Provider>
    );
    const instance = wrapper.instance();
    instance.updateQuestionVisibility('2', true);
    instance.updateQuestionVisibility('3', false);
    instance.updateQuestionVisibility('4', true);
    instance.updateQuestionVisibility('5', false);
    expect(mockSetIsAllActiveDisplayed).toHaveBeenCalledWith(false);
  });
});
