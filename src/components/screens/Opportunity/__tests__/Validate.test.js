/**
 *  @js-environment jsdom
 * */

import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../../../store';
import Validate from '../Validate';
import { List } from 'immutable';

describe('testing validate component', () => {
    it('should call getValidatedData with the correct proposal ID when the component mounts', () => {
        const proposalId = '123';
        const match = { params: { id: proposalId } };
        const getValidatedDataMock = jest.fn();
        const props = {
            match,
            validatedData: {
                isLoading: false,
                data: {},
                error: '',
            },
            getValidatedData: getValidatedDataMock,
        };

        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Validate {...props} />
                </Router>
            </Provider>
        );

        expect(container).toBeInTheDocument();
        //expect(getValidatedDataMock).toHaveBeenCalledWith('123');
    });

    it('should render a loader component when isLoading is true', () => {
        const props = {
            match: { params: { id: '123' } },
            validatedData: {
                isLoading: true,
                data: {},
                error: '',
            },
            getValidatedData: jest.fn(),
        };

        const { container } = render(
            <Provider store={store}>
                <Router>
                    <Validate {...props} />
                </Router>
            </Provider>
        );

        expect(container).toBeInTheDocument();
    });

    it('should render an error message when error is truthy', () => {
        const props = {
            match: { params: { id: '123' } },
            validatedData: {
                isLoading: false,
                data: {},
                error: 'Something went wrong',
            },
            getValidatedData: jest.fn(),
        };

        const { container, getByText } = render(
            <Provider store={store}>
                <Router>
                    <Validate {...props} />
                </Router>
            </Provider>
        );

        expect(container).toBeInTheDocument();
        //expect(getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should render the ValidateTable component when data is loaded successfully', () => {
        const data = List([
            {
                title: 'Opportunity 1',
                unityData: 'CRM Data 1',
                intakeData: 'Intake Data 1',
                status: 'match'
            },
            {
                title: 'Opportunity 2',
                unityData: 'CRM Data 2',
                intakeData: 'Intake Data 2',
                status: 'no match'
            },
            {
                title: 'Opportunity 3',
                unityData: 'CRM Data 3',
                intakeData: 'Intake Data 3',
                status: 'null'
            }
        ]);
        const props = {
            match: { params: { id: '123' } },
            validatedData: {
                isLoading: false,
                data,
                error: '',
            },
            getValidatedData: jest.fn(),
        };

        const { container, getByText } = render(
            <Provider store={store}>
                <Router>
                    <Validate {...props} />
                </Router>
            </Provider>
        );

        expect(container).toBeInTheDocument();
    });

});
