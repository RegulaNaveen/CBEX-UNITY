import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

jest.mock('apollo-react-4.19.0/components/ChatBotFab', () => {
  return {
    __esModule: true,
    default: () => <div>ChatBotFab</div>
  };
});

jest.mock('../components/views/export-component/GenerateDocs.jsx', () => (
  <p>React PDF Component</p>
));

describe.skip('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    mount(<App />, { attachTo: div });
  });
});
