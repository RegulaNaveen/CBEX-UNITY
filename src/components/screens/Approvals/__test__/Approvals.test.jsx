import React from 'react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import { configure, render, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Map } from 'immutable';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

import DateQuestion from '../InputComponents/DateQuestion';
import RadioQuestion from '../InputComponents/RadioQuestion';
import SelectQuestion from '../InputComponents/SelectQuestion';
import MultiSelectQuestion from '../InputComponents/MultiSelectQuestion';
import ProposalTeamQuestion from '../InputComponents/ProposalTeamQuestion';
import NumberQuestion from '../InputComponents/NumberQuestion';
import YesNoQuestion from '../InputComponents/YesNoQuestion';
import CheckBoxQuestion from '../InputComponents/CheckBoxQuestion';
import { sfOptions, dummyQuestions } from './data';
import { getLastAnswer } from '../../../views/export-component/word-template';
import Approvals from '../../../../redux/reducers/approvals';

configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const lookUpOptions = Map(sfOptions);
const proposal = Map(lookUpOptions);
const initialState = { proposal };
const store = mockStore(initialState);
const mockDispatch = store.dispatch;
store.dispatch = jest.fn(mockDispatch);

describe('Snapshot Test Approval Input Components', () => {
  beforeEach(() => {});
  test('Test DateQuestion', () => {
    const question = dummyQuestions.find(
      item => item.answerConfiguration.type === 'date'
    );
    const lastAnswer = getLastAnswer(question);
    const props = { question, lastAnswer };
    const container = render(
      <Provider store={store}>
        <DateQuestion {...props} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  test('Test RadioQuestion', () => {
    const question = dummyQuestions.find(
      item => item.answerConfiguration.type === 'radio'
    );
    const lastAnswer = getLastAnswer(question);
    const props = { question, lastAnswer };
    const container = render(
      <Provider store={store}>
        <RadioQuestion {...props} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  test('Test SelectQuestion', () => {
    const question = dummyQuestions.find(
      item => item.answerConfiguration.type === 'select-lookup'
    );
    const lastAnswer = getLastAnswer(question);
    const props = { question, lastAnswer };
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
  test('Test ProposalTeamQuestion', () => {
    const question = dummyQuestions.find(
      item => item.section.sectionName === 'Proposal Team'
    );
    const lastAnswer = getLastAnswer(question);
    const props = { question, lastAnswer };
    const container = render(
      <Provider store={store}>
        <ProposalTeamQuestion {...props} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  test('Test NumberQuestion', () => {
    const question = dummyQuestions.find(
      item => item.answerConfiguration.type === 'number'
    );
    const lastAnswer = getLastAnswer(question);
    const props = { question, lastAnswer };
    const container = render(
      <Provider store={store}>
        <NumberQuestion {...props} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  test('Test YesNoQuestion', () => {
    const question = dummyQuestions.find(
      item => item.answerConfiguration.type === 'y/n'
    );
    const lastAnswer = getLastAnswer(question);
    const props = { question, lastAnswer };
    const container = render(
      <Provider store={store}>
        <YesNoQuestion {...props} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  test('Test CheckboxQuestion', () => {
    const question = dummyQuestions.find(
      item => item.answerConfiguration.type === 'checkbox'
    );
    const lastAnswer = getLastAnswer(question);
    const props = { question, lastAnswer };
    const container = render(
      <Provider store={store}>
        <CheckBoxQuestion {...props} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});

describe('Approvals Component', () => {
  it('Should render', () => {
    const wrapper = shallow(<Approvals />);
    expect(wrapper).toBeDefined();
  });
});
