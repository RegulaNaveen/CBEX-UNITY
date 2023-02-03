import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import mockData from './mockdata/QuestionContainer.json';
import SocketContext from '../../../../context/SocketContext';
import QuestionContainer from '../QuestionsForCustomerTab/QuestionContainer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initState = {
  setNewEntry: jest.fn(),
  setShowLoader: jest.fn(),
  deleteQuestionHandler: jest.fn(),
  questionData: Map(mockData.questionData),
  proposal: Map(mockData.proposal)
};
const store = mockStore(initState);

describe.skip('test for question container component', () => {
  it('render question component', () => {
    const { container } = render(
      <Provider store={store}>
        <SocketContext>
          <QuestionContainer {...initState} />
        </SocketContext>
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });
});
