//  * @jest-environment jsdom
//  */

import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PROFILE } from '../../../../constants/app';

import NotificationPreference from '../AccountPreferences/NotificationPreference';

configure({ adapter: new Adapter() });
afterEach(() => {
  cleanup();
});

const {
  NOTIFICATION_PREFERENCE,
  IN_APP,
  EMAIL,
  NOT_FOUND,
  EMAIL_PREFERENCES
} = PROFILE;

describe('Notification Preference Component is rendered in Dom', () => {
  test('Notification Preference render', () => {
    const wrapper = shallow(<NotificationPreference />);
    expect(wrapper.exists()).toBe(true);
  });
  test('check for Email text', () => {
    const wrapper = shallow(<NotificationPreference />);
    expect(wrapper.exists()).toBe(true);
    const chkText = EMAIL;
    expect(wrapper.text().includes(chkText)).toBe(true);
  });

  test('check for Notification text', () => {
    const wrapper = shallow(<NotificationPreference />);
    expect(wrapper.exists()).toBe(true);
    const chkText = NOTIFICATION_PREFERENCE;
    expect(wrapper.text().includes(chkText)).toBe(true);
  });

  test('check for Email', () => {
    const wrapper = shallow(<NotificationPreference />);
    expect(wrapper.exists()).toBe(true);
    const chkText = EMAIL;
    expect(wrapper.text().includes(chkText)).toBe(true);
  });

  test('check for No Found text', () => {
    const wrapper = shallow(<NotificationPreference />);
    expect(wrapper.exists()).toBe(true);
    const chkText = NOT_FOUND;
    expect(wrapper.text().includes(chkText)).toBe(true);
  });

  test('Check for In-App text', () => {
    const props = {
      handleEmailPreferenceChange: jest.fn(),
      setEmailPrefList: jest.fn()
    };
    const wrapper = shallow(<NotificationPreference {...props} />);
    expect(wrapper.exists()).toBe(true);
    const chkText = IN_APP;
    expect(wrapper.text().includes(chkText)).toBe(true);
  });

  test('Check for Email-Preference', () => {
    const props = {
      handleEmailPreferenceChange: jest.fn(),
      setEmailPrefList: jest.fn()
    };
    const wrapper = shallow(<NotificationPreference {...props} />);
    expect(wrapper.exists()).toBe(true);
    const chkText = EMAIL_PREFERENCES;
    expect(wrapper.text().includes(chkText)).toBe(true);
  });
});
