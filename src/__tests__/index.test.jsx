import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

describe.skip('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    mount(<App />, { attachTo: div });
  });
});
