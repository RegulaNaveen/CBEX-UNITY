import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store'
// import { store } from '../../../../store';
import mockData from './mockdata/QuestionContainer.json'
import QuestionContainer from '../QuestionsForCustomerTab/QuestionContainer';
import thunk from 'redux-thunk';

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
            <Provider>
                <QuestionContainer {...initState} />
            </Provider>
        );
        expect(container).toBeInTheDocument();
    })
})