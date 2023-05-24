import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { mount } from 'enzyme';
import App from '../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<App />, div);
    root.unmount();
  });

  it('renders the App component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(App)).toHaveLength(1);
  });
});
