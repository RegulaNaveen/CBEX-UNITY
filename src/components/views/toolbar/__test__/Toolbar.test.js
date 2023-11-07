//  * @jest-environment jsdom
//  */

import React from 'react';
import { Provider } from 'react-redux';
import { configure, mount, shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { BrowserRouter as Router } from 'react-router-dom';
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { REDUX_TYPES } from '../../../../constants';
import { store } from '../../../../store';
import ToolbarMenu from '../ToolbarMenu';
import Toolbar from '../index';
import Notification from '../../Notification';

configure({ adapter: new Adapter() });
afterEach(() => {
  cleanup();
});

const ToolbarComponent = (props) => (
  <Provider store={store}>
    <Router>
      <Toolbar {...props} />
    </Router>
  </Provider>
);

describe('Toolbarmenu Test', () => {
  it('Toolbar Component is rendered in Dom', async () => {
    const wrapper = shallow(<Toolbar />);
    expect(wrapper.exists()).toBe(true);
  });

  it('Toolbar Component is rendered in Dom', async () => {
    const wrapper = shallow(<Notification />);
    expect(wrapper.exists()).toBe(true);
  });

  it('Toolbar Component is rendered in Dom', async () => {
    const wrapper = shallow(<ToolbarMenu />);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Toolbar Component with redux store', () => {

  it('should render welcome modal Component with empty user role', () => {
    const { container } = render(<ToolbarComponent />);
    expect(container).toBeInTheDocument();
    expect(screen.getByText('Welcome to Unity!')).toBeInTheDocument();
    expect(screen.getByText('Setting up your account')).toBeInTheDocument();
  });

  it('save button should be disabled when user role is not selected', () => {
    const { container } = render(<ToolbarComponent />);
    expect(container).toBeInTheDocument();
    const saveButton = screen.getByRole('button', { name: 'Save And Next' });
    expect(saveButton).toBeDisabled();
  });

  it('check for selecting roles list dropdown', () => {
    store.dispatch({ type: REDUX_TYPES.PROPOSAL.ROLES_INFO, payload: ['admin', 'Proposal Developer'] });
    render(<ToolbarComponent />);
    const roleDropdown = screen.getByRole('button', { name: 'Select Role' });
    fireEvent.click(roleDropdown);
    waitFor (() => {
      expect(screen.getByText('Proposal Developer')).toBeInTheDocument();
      const roleOption = screen.getByRole('option', { name: 'Proposal Developer' });
      fireEvent.click(roleOption);
      const saveButton = screen.getByRole('button', { name: 'Save And Next' });
      expect(saveButton).toBeEnabled();
      fireEvent.click(saveButton);

      expect(screen.getByText('Accept Tracking')).toBeInTheDocument();
      const acknowlegeButton = screen.getByRole('button', { name: 'Acknowledge' });
      fireEvent.click(acknowlegeButton);
      expect(screen.getByText('Welcome to Unity!')).not.toBeInTheDocument();
    });
    
  });

  it('render with default role', () => {
    localStorage.setItem('userRole', 'admin');
    render(<ToolbarComponent />);
    const saveButton = screen.getByRole('button', { name: 'Save And Next' });
    expect(saveButton).toBeEnabled();
    fireEvent.click(saveButton);
    expect(screen.getByText('Accept Tracking')).toBeInTheDocument();
    const acknowlegeButton = screen.getByRole('button', { name: 'Acknowledge' });
    fireEvent.click(acknowlegeButton);
  });

  it('user already acknowledged', () => {
    localStorage.setItem('userRole', 'admin');
    localStorage.setItem('userAcknowledged', true);
    render(<ToolbarComponent />);
  });
});
