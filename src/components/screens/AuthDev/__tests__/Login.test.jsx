import React from 'react';
import { shallow } from 'enzyme';
import Login from '../Login';
import LoginForm from '../LoginForm';

describe('Login', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  it('renders the login form', () => {
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });

  it('renders the background image', () => {
    const backgroundImage = wrapper.find('.login-img');
    expect(backgroundImage.prop('src')).toEqual('login-background.png');
    expect(backgroundImage.prop('alt')).toEqual('Login background');
    expect(backgroundImage.prop('role')).toEqual('presentation');
  });

  it('renders the copyright text', () => {
    const copyrightText = wrapper.find('.copyright-text');
    expect(copyrightText).toHaveLength(1);
    expect(copyrightText.text()).toEqual(
      'Copyright @ 2020. All rights reserved'
    );
  });
});
