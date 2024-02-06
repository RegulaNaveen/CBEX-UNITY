import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

describe('App', () => {
  it.skip('renders without crashing', () => {
    const div = document.createElement('div');
    mount(<App />, { attachTo: div });
  });
});
