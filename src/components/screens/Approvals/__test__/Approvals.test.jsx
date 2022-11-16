import React from 'react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import { configure, mount, shallow, render } from 'enzyme';
import thunk from 'redux-thunk';
import { Map, fromJS } from 'immutable';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

import DateQuestion from '../InputComponents/DateQuestion';
import RadioQuestion from '../InputComponents/RadioQuestion';
import SelectQuestion from '../InputComponents/SelectQuestion';
import MultiSelectQuestion from '../InputComponents/MultiSelectQuestion';
import ProposalTeamQuestion from '../InputComponents/ProposalTeamQuestion';
import NumberQuestion from '../InputComponents/NumberQuestion';
import TextQuestion from '../InputComponents/TextQuestion';
import YesNoQuestion from '../InputComponents/YesNoQuestion';
import { sfOptions, dummyQuestions } from './data';
import { getLastAnswer } from '../../../views/export-component/word-template';

configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const lookUpOptions = Map(sfOptions);
const proposal = Map(lookUpOptions);
const initialState = { proposal };
const store = mockStore(initialState);
const mockDispatch = store.dispatch;
store.dispatch = jest.fn(mockDispatch);

const propsForSelectTypeQuestions = {
  lastAnswer: { answer: 'Orange' },
  question: {
    sfObject: 'n/a',
    sfField: 'n/a',
    answerConfiguration: { options: ['Apple', 'Banana', 'Orange'] }
  }
};
describe('Test Approval Input Components', () => {
  beforeEach(() => {});
  test('Test DateQuestion', () => {
    const props = {
      lastAnswer: { answer: '' }
    };
    const container = render(
      <Provider store={store}>
        <DateQuestion {...props} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  test('Test RadioQuestion', () => {
    const props = propsForSelectTypeQuestions;
    const container = render(
      <Provider store={store}>
        <RadioQuestion {...props} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  test('Test SelectQuestion', () => {
    const props = propsForSelectTypeQuestions;
    const container = render(
      <Provider store={store}>
        <SelectQuestion {...props} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  test('Test MultiSelectQuestion', () => {
    const question = dummyQuestions.find(
      item => item.answerConfiguration.type === 'picklist-lookup'
    );
    const lastAnswer = getLastAnswer(question);
    const props = { question, lastAnswer };
    const container = render(
      <Provider store={store}>
        <MultiSelectQuestion {...props} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  // test('Test ProposalTeamQuestion', () => {});
  // test('Test NumberQuestion', () => {});
  // test('Test TextQuestion', () => {});
  // test('Test YesNoQuestion', () => {});
});
