import React from 'react';
import '@testing-library/jest-dom';
import { Map } from 'immutable';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { store } from '../../../store';
import mockData from './mockData/CollapsibleQuestionMapping.json'
import SFAnswerValidationWrapper from '../SFAnswerValidationWrapper';


describe('SFAnswerValidationWrapper', () => {
    const props = {
        hasDifferentSFanswer: true,
        sfObject: 'pse__Resource_Request__c',
        selectedBid: Map(Object.entries(mockData.selectedBid)),
    }
    it('should render child components', () => {
        const { container } = render(
            <Provider store={store}>
                <SFAnswerValidationWrapper {...props} />
            </Provider>
        );
        expect(container).toBeInTheDocument();

    });

});
