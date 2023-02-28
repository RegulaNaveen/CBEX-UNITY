import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
// import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
// import configureMockStore from 'redux-mock-store';
import { store } from '../../../../store';
import mockData from './mockdata/QuestionContainer.json';
import QuestionContainer from '../QuestionsForCustomerTab/QuestionContainer';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

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
// const store = mockStore(initState);

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
