import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import { render } from '@testing-library/react';
import { store } from '../../../../store';
import mockData from './mockdata/QuestionContainer.json';
import QuestionContainer from '../QuestionsForCustomerTab/QuestionContainer';

const initState = {
  setNewEntry: jest.fn(),
  setShowLoader: jest.fn(),
  deleteQuestionHandler: jest.fn(),
  questionData: Map(mockData.questionData),
  proposal: Map(mockData.proposal),
  socketContext: {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn()
  }
};

describe('test for question container component', () => {
  it('render question component', () => {
    const { container } = render(
      <Provider store={store}>
        <QuestionContainer {...initState} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });
});
