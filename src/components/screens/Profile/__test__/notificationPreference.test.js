//  * @jest-environment jsdom
//  */

import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import NotificationPreference from '../NotificationPreference';

configure({ adapter: new Adapter() });
afterEach(() => {
  cleanup();
});

describe('Notification Preference Component is rendered in Dom', () => {
  test('Notification Preference render', () => {
    const wrapper = shallow(<NotificationPreference />);
    expect(wrapper.exists()).toBe(true);
  });
  test('check for Email text', () => {
    const wrapper = shallow(<NotificationPreference />);
    expect(wrapper.exists()).toBe(true);
    const chkText = 'Email';
    expect(wrapper.text().includes(chkText)).toBe(true);
  });

  test('check for Notification text', () => {
    const wrapper = shallow(<NotificationPreference />);
    expect(wrapper.exists()).toBe(true);
    const chkText = 'Notification Preference';
    expect(wrapper.text().includes(chkText)).toBe(true);
  });

  test('check for Answer Changes', () => {
    const wrapper = shallow(<NotificationPreference />);
    expect(wrapper.exists()).toBe(true);
    const chkText = 'Answer Changes';
    expect(wrapper.text().includes(chkText)).toBe(true);
  });

  test('check for New document added Changes', () => {
    const wrapper = shallow(<NotificationPreference />);
    expect(wrapper.exists()).toBe(true);
    const chkText = 'New document added';
    expect(wrapper.text().includes(chkText)).toBe(true);
  });
  
  test('check for Question assigned to my role Changes', () => {
    const wrapper = shallow(<NotificationPreference />);
    expect(wrapper.exists()).toBe(true);
    const chkText = 'Question assigned to my role';
    expect(wrapper.text().includes(chkText)).toBe(true);
  });

  test('Check for In-App text', () => {
    const props = {
      handleEmailPreferenceChange: jest.fn(),
      setEmailPrefList: jest.fn(),
    };
    const wrapper = shallow(<NotificationPreference {...props} />);
    expect(wrapper.exists()).toBe(true);
    const chkText = 'In-App';
    expect(wrapper.text().includes(chkText)).toBe(true);
  });
});
