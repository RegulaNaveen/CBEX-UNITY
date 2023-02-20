import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TextQuestion from '../TextQuestion';

describe('TextQuestion', () => {
  let wrapper;

  const question = { questionId: 1, text: 'What is your name?' };
  const lastAnswer = { answer: 'John' };
  const userData = { id: 1, name: 'Test User' };
  const socketContext = {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn(),
  };
  const trackMatomoEventSubmitAnswer = jest.fn();
  const checkDisableFlag = jest.fn().mockReturnValue(false);
  const initState = {
    question,
    lastAnswer,
    userData,
    socketContext,
    trackMatomoEventSubmitAnswer,
    checkDisableFlag,
  };
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(initState);

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <TextQuestion {...initState} />
      </Provider>
    );
  });

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it.skip('should render a CustomApolloRichText component', () => {
    expect(wrapper.find('CustomApolloRichText').exists()).toBe(true);
  });

  it.skip('should pass the correct props to the CustomApolloRichText component', () => {
    const customApolloRichText = wrapper.find('CustomApolloRichText');

    expect(customApolloRichText.prop('richTextString')).toEqual('John');
    expect(customApolloRichText.prop('richTextVal')).toEqual({ blocks: [] });
    expect(customApolloRichText.prop('richTextHtml')).toEqual('');
    expect(customApolloRichText.prop('enableFocus')).toBe(true);
    expect(customApolloRichText.prop('isEditable')).toBe(false);
    expect(customApolloRichText.prop('disabled')).toBe(false);
    expect(customApolloRichText.prop('canUserTagInQuestion')).toBe(false);
    expect(customApolloRichText.prop('allFlags')).toEqual([]);
    expect(typeof customApolloRichText.prop('onBlur')).toEqual('function');
    expect(typeof customApolloRichText.prop('onFocus')).toEqual('function');
  });

  it.skip('should call the handleRichTextChange function when onBlur is called with different text', () => {
    const customApolloRichText = wrapper.find('CustomApolloRichText');
    const data = { value: { blocks: [{ text: 'Hello' }] }, text: 'Hello' };
    const handleRichTextChange = jest.fn().mockResolvedValue();

    wrapper.setProps({ handleRichTextChange });

    customApolloRichText.prop('onBlur')(data);

    expect(handleRichTextChange).toHaveBeenCalledWith(data);
  });

  it.skip('should not call the handleRichTextChange function when onBlur is called with the same text', () => {
    const customApolloRichText = wrapper.find('CustomApolloRichText');
    const data = { value: { blocks: [] }, text: '' };
    const handleRichTextChange = jest.fn().mockResolvedValue();

    wrapper.setProps({ handleRichTextChange });

    customApolloRichText.prop('onBlur')(data);

    expect(handleRichTextChange).not.toHaveBeenCalled();
  });

  it.skip('should call the questionLockWrapper function when onFocus is called', () => {
    const customApolloRichText = wrapper.find('CustomApolloRichText');

    customApolloRichText.prop('onFocus')();

    expect(socketContext.questionLockWrapper).toHaveBeenCalledWith(1);
  });
});
