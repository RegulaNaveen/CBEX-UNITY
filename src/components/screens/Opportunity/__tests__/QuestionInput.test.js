import React from 'react';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import mockData from './mockdata/QuestionInput.json';
import QuestionInput from '../QuestionsForCustomerTab/QuestionInput';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
    ...mockData,
    checkDisableFlag: jest.fn()
};
const store = mockStore(initialState);

describe('test for question input component', () => {
    test('render question input component', () => {
        const { container } = render(
            <Provider store={store}>
                <QuestionInput {...initialState} />
            </Provider>
        );

        expect(container).toBeInTheDocument();
    })
})