// @flow
import React from 'react';
import expect from 'expect';
import PrivateRouteModel from './models/PrivateRouteModel';
import { LOGIN } from '../src/routes';

describe('PrivateRoute component', () => {
    const node = 'Fake Node'
    describe('rendering', () => {
        it('should render a Route component', () => {
            const isAuthenticated: boolean = false;
            const wrapper = new PrivateRouteModel(node, isAuthenticated);
            expect(wrapper.hasRoute()).toBe(true);
        });

        it('should render children if isAuthenticated is true', () => {
            const isAuthenticated: boolean = true;
            const wrapper = new PrivateRouteModel(node, isAuthenticated);
            expect(wrapper.getRenderedChildren()).toBe(node);
        });

        it('should redirect to login if isAuthenticated is false', () => {
            const isAuthenticated: boolean = false;
            const wrapper = new PrivateRouteModel(node, isAuthenticated);
            expect(wrapper.getRedirectToPath()).toBe(LOGIN);
        });
    })
})