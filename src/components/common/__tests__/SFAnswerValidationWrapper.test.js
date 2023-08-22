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

    it('should render child components', () => {
        const props = {
            hasDifferentSFanswer: true,
            sfObject: 'Opportunity',
            selectedBid: Map(Object.entries(mockData.selectedBid)),
        }
        const { container } = render(
            <Provider store={store}>
                <SFAnswerValidationWrapper {...props} />
            </Provider>
        );
        expect(container).toBeInTheDocument();
    });

    it('should render child components', () => {
        const props = {
            hasDifferentSFanswer: true,
            sfObject: 'Bid_History__c',
            selectedBid: Map(Object.entries(mockData.selectedBid)),
        }
        const { container } = render(
            <Provider store={store}>
                <SFAnswerValidationWrapper {...props} />
            </Provider>
        );
        expect(container).toBeInTheDocument();
    });

    it('should render child components', () => {
        const props = {
            hasDifferentSFanswer: true,
            sfObject: 'Account',
            selectedBid: Map(Object.entries(mockData.selectedBid)),
        }
        const { container } = render(
            <Provider store={store}>
                <SFAnswerValidationWrapper {...props} />
            </Provider>
        );
        expect(container).toBeInTheDocument();
    });

    it('should render child components', () => {
        const props = {
            hasDifferentSFanswer: true,
            sfObject: '',
            selectedBid: Map(Object.entries(mockData.selectedBid)),
        }
        const { container } = render(
            <Provider store={store}>
                <SFAnswerValidationWrapper {...props} />
            </Provider>
        );
        expect(container).toBeInTheDocument();
    });

    it('should render child components', () => {
        const props = {
            hasDifferentSFanswer: false,
            sfObject: '',
            selectedBid: Map(Object.entries(mockData.selectedBid)),
        }
        const { container } = render(
            <Provider store={store}>
                <SFAnswerValidationWrapper {...props} />
            </Provider>
        );
        expect(container).toBeInTheDocument();
    });

});
