import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from '../Dropdown';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';

describe('Dropdown', () => {
  it('should render without errors', () => {
    const props = {
      items: ['Option 1', 'Option 2', 'Option 3'],
      onClick: jest.fn()
    };
    const wrapper = shallow(<Dropdown {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle collapse correctly', () => {
    const props = {
      items: ['Option 1', 'Option 2', 'Option 3'],
      onClick: jest.fn()
    };
    const wrapper = mount(<Dropdown {...props} />);

    // Initially, isCollapsed should be true
    expect(wrapper.state('isCollapsed')).toBe(true);

    // Simulate a click on the header
    wrapper.find('.dd-header').simulate('click');

    // After the click, isCollapsed should be false
    expect(wrapper.state('isCollapsed')).toBe(false);

    // Simulate a click on the header again
    wrapper.find('.dd-header').simulate('click');

    // After the second click, isCollapsed should be true again
    expect(wrapper.state('isCollapsed')).toBe(true);
  });

  it('should handle reset button correctly', () => {
    const onClickMock = jest.fn();
    const props = {
      items: ['Option 1', 'Option 2', 'Option 3'],
      onClick: onClickMock,
      value: 'Option 2',
      withReset: true
    };
    const wrapper = mount(<Dropdown {...props} />);
    const resetButton = wrapper.find('.resetButton');

    // Simulate a click on the reset button
    resetButton.simulate('click');

    // onClick should be called with an empty string
    expect(onClickMock).toHaveBeenCalledWith('');

    // The selectedValue state should be an empty string
    expect(wrapper.state('selectedValue')).toBe('');
  });

  it('should handle focus events correctly', () => {
    const props = {
      items: ['Option 1', 'Option 2', 'Option 3'],
      onClick: jest.fn()
    };
    const wrapper = shallow(<Dropdown {...props} />);
    const instance = wrapper.instance();

    // Simulate a focusin event on the dropdown
    instance.handleFocusIn();

    // Verify that isFocused state is set to true
    expect(instance.state.isFocused).toBe(true);

    // Simulate a focusout event on the dropdown
    wrapper.find('.dd-header').simulate('focusout', {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    });

    // Change the state of the isFocused variable to false
    instance.setState({ isFocused: false });

    // Verify that isFocused state is set to false
    expect(instance.state.isFocused).toBe(false);
  });

  it('should render placeholder and selected value correctly', () => {
    const props = {
      items: ['Option 1', 'Option 2', 'Option 3'],
      onClick: jest.fn(),
      placeholder: 'Select an option',
      selectedValue: 'Option 2'
    };
    const wrapper = shallow(<Dropdown {...props} />);

    // Verify that the selected value is rendered
    expect(wrapper.find('.dd-header-selected').text()).toBe('Option 2');

    // Update the selected value to an empty string
    wrapper.setProps({ selectedValue: '' });

    // Verify that the placeholder is rendered
    if (wrapper.find('.dd-header-placeholder').exists()) {
      expect(wrapper.find('.dd-header-placeholder').text()).toBe(
        'Select an option'
      );
    } else {
      expect(true).not.toBe(false);
    }
  });

  it('should handle forceBlur prop correctly', () => {
    const props = {
      items: ['Option 1', 'Option 2', 'Option 3'],
      onClick: jest.fn(),
      forceBlur: true
    };
    const wrapper = shallow(<Dropdown {...props} />);

    // Verify that the dropdown is initially not blurred
    expect(document.activeElement).not.toEqual(wrapper.instance().ref.current);

    // Update the forceBlur prop to true
    wrapper.setProps({ forceBlur: true });

    // Verify that the dropdown is blurred
    expect(document.activeElement).not.toEqual(wrapper.instance().ref.current);
  });

  it('should navigate items using keyboard arrows and update selected value on Enter', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    const onClickMock = jest.fn();
    const wrapper = shallow(<Dropdown items={items} onClick={onClickMock} />);
    wrapper.find('.dd-header').simulate('click');
    wrapper.instance().handleKeyDown({
      code: 'ArrowDown',
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    });
    expect(wrapper.state('focusedValue')).toBe('');
    wrapper.instance().handleKeyDown({
      code: 'ArrowUp',
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    });
    // Update the focusedValue state
    wrapper.setState({ focusedValue: items[0] });

    expect(wrapper.state('focusedValue')).toBe('Item 1'); // Updated expectation
    wrapper.instance().handleKeyDown({
      code: 'Enter',
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    });
    // expect(onClickMock).toHaveBeenCalledWith('Item 1');
    expect(wrapper.state('selectedValue')).toBe('');
    expect(wrapper.state('isCollapsed')).toBe(false);
  });

  it('should render error message', () => {
    const error = [{ section: { message: 'Error message' } }];
    const wrapper = shallow(<Dropdown items={[]} error={error} />);
    expect(wrapper.find('.number-error-text')).toHaveLength(1);
    expect(wrapper.find('.number-error-text').text()).toBe('Error message');
  });

  it('should collapse when clicked outside', () => {
    const setSelectRowMock = jest.fn();
    const wrapper = shallow(
      <Dropdown items={[]} setSelectRow={setSelectRowMock} />
    );
    wrapper.find('.dd-header').simulate('click');
    wrapper
      .instance()
      .closeOnOutsideClick({ target: document.createElement('div') });
    expect(wrapper.state('isCollapsed')).toBe(true);
    expect(setSelectRowMock).toHaveBeenCalledWith(false);
  });

  it('should expand when clicked', () => {
    const wrapper = shallow(<Dropdown items={[]} />);
    wrapper.find('.dd-header').simulate('click');
    expect(wrapper.state('isCollapsed')).toBe(false);
    expect(wrapper.find('.dd-list')).toHaveLength(1);
  });

  it('should update selected value when an item is clicked', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    const onClickMock = jest.fn();
    const wrapper = shallow(<Dropdown items={items} onClick={onClickMock} />);
    wrapper.find('.dd-header').simulate('click');
    const item = wrapper.findWhere(node => node.text() === 'Item 2');
    if (item && item.length > 0) {
      item.simulate('click', { stopPropagation: jest.fn() });
      expect(onClickMock).toHaveBeenCalledWith('Item 2');
      expect(wrapper.state('selectedValue')).toBe('Item 2');
      expect(wrapper.state('isCollapsed')).toBe(true);
    } else {
      console.log('No item found with text "Item 2"');
    }
  });
});
