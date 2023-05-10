import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import SessionHandler, {
  getSession,
  getUserRole,
  getAccessToken,
  getUserEmail,
  setSession
} from '../SessionHandler';

const mockStore = configureStore([]);

describe('SessionHandler Component', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore({
      authData: null,
      serror: null,
      changeRoleError: null
    });

    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SessionHandler>
            <div>Test child component</div>
          </SessionHandler>
        </BrowserRouter>
      </Provider>
    );
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render child component', () => {
    expect(wrapper.find('div').text()).toEqual('Test child component');
  });
  it('should return a boolean value', () => {
    const result = getSession();
    expect(typeof result).toBe('boolean');
  });

  it('sets session data in local storage', () => {
    setSession(
      'admin',
      'access-token',
      'jwt',
      'refresh-token',
      'test@example.com',
      'Test User'
    );
    expect(localStorage.getItem('isLoggedin')).toBe('true');
    expect(localStorage.getItem('userRole')).toBe('admin');
    expect(localStorage.getItem('accessToken')).toBe('access-token');
    expect(localStorage.getItem('jwt')).toBe('jwt');
    expect(localStorage.getItem('refreshToken')).toBe('refresh-token');
    expect(localStorage.getItem('userEmail')).toBe('test@example.com');
    expect(localStorage.getItem('userName')).toBe('Test User');
  });

  it('should remove proposal id from local storage and redirect to dashboard if session exists', () => {
    localStorage.setItem('isLoggedin', 'true');
    localStorage.setItem('userRole', 'admin');
    localStorage.setItem('proposalId', '123');
    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SessionHandler>
            <div>Test child component</div>
          </SessionHandler>
        </BrowserRouter>
      </Provider>
    );
    expect(localStorage.getItem('proposalId')).toBeNull();
    expect(window.location.pathname).toEqual('/proposals/123');
    localStorage.clear();
  });
});
