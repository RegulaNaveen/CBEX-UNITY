import React from 'react';
import configureMockStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import mockData from './mockdata/AnswerInput.json';
import AnswerInput from '../QuestionsForCustomerTab/AnswerInput';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  ...mockData,
  checkDisableFlag: jest.fn(),
};
const store = mockStore(initialState);
describe('testing answer input component', () => {
  test('render component', () => {
    const { container } = render(
      <Provider store={store}>
        <AnswerInput {...initialState} />
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });
});
