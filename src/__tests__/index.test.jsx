import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

jest.mock('../components/views/export-component/GenerateDocs.jsx', () => (
  <p>React PDF Component</p>
));

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    mount(<App />, { attachTo: div });
  });
});
