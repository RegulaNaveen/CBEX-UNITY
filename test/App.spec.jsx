import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import App from '../src/App';

describe('App component', () => {
    it('should render a test text', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.props().children).toBe('Hello world :D');
    });
});