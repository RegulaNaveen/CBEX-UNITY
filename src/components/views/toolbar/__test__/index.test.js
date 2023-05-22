//  * @jest-environment jsdom
//  */

import React from 'react';

import { configure, mount, shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ToolbarMenu from '../ToolbarMenu';
import Toolbar from '../index';
import Notification from '../../Notification';

configure({ adapter: new Adapter() });
afterEach(() => {
  cleanup();
});

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
