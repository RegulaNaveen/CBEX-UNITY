import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import QuestionLabel from '../QuestionLabel';

const questionLabel = 'Question Label';
const initState = { questionLabel };
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initState);

describe('Question Label Component', () => {
  it('renders Question label component', () => {
    render(
      <Provider store={store}>
        <QuestionLabel {...initState} />
      </Provider>
    );
    const labeltext = screen.getByText('Question Label');
    expect(labeltext).toBeInTheDocument();
  });
});
