import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import App from '../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the App component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(App)).toHaveLength(1);
  });
});
