import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { shallow } from 'enzyme';
import { store } from '../../../store';
import mockData from './mockData/CollapsibleQuestionMapping.json';
import CollapsibleQuestionMapping from '../CollapsibleQuestionMapping';
import Question from '../Question';

// Import the module that exports the `selectIsQuestionsFilterEnabled` selector
import * as mockselectors from '../../../redux/selectors';
import { OrderedMap } from 'immutable';

// Mock the redux selector function
// jest.mock('react-redux', () => ({
//     useSelector: jest.fn(),

// }));

const defaultProps = {
    questions: OrderedMap(mockData.questions),
    milestone: "true",
    title: "Opportunity Information from CRM (for Team review)",
    isNotepadOpen: true,
    setQuestionToDisplayHistory: jest.fn()
}

describe('CollapsibleQuestionMapping', () => {

    // Define a mock implementation of the `selectIsQuestionsFilterEnabled` selector
    const mockSelectIsQuestionsFilterEnabled = jest.fn(() => true);

    // Use `jest.mock` to replace the implementation of the `selectIsQuestionsFilterEnabled` selector
    jest.mock('../../../redux/selectors', () => ({
        ...mockselectors,
        selectIsQuestionsFilterEnabled: mockSelectIsQuestionsFilterEnabled,
    }));

    // beforeEach(() => {
    //     // Reset the mock function's implementation for each test
    //     useSelector.mockReset();

    // });

    it.skip('renders a Question component for each visible question', () => {
        // Mock the selector to return true for questions filter
        // useSelector.mockReturnValue(true);

        const wrapper = shallow(
            <Provider store={store}>
                <CollapsibleQuestionMapping {...defaultProps} />
            </Provider>

        );

        expect(wrapper.find(Question)).toHaveLength(1);
    });

    it('does not render a Question component for invisible questions', () => {
        // Mock the selector to return false for questions filter
        // useSelector.mockReturnValue(false);

        const wrapper = shallow(
            <Provider store={store}>
                <CollapsibleQuestionMapping {...defaultProps} />
            </Provider>
        );

        expect(wrapper.find(Question)).toHaveLength(0);
    });
});
