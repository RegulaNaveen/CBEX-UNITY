import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProfileLayout from '../ProfileLayout';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { BrowserRouter } from 'react-router-dom';

const initState = {
    name: 'Jack Sparrow',
    email: 'jacks.parrow@iqvia.com',
    role: 'Bussiness Developer',
    token: null
};
describe('test for profile layout index component', () => {
    test('render index component', () => {
        const { container } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <ProfileLayout {...initState}/>;
                </Provider>
            </BrowserRouter>
            
        );
        expect(container).toBeInTheDocument();
    })
})