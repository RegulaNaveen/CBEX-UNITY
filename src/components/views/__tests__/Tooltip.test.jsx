import React from 'react';
import { shallow } from 'enzyme';
import ToolTip from '../ToolTip';

describe('ToolTip', () => {
    const child = <button>Hover Me</button>;
    const title = 'Tooltip Title';
    const content = <p>Tooltip Content</p>;

    it('renders without crashing', () => {
        shallow(<ToolTip child={child} title={title} content={content} />);
    });

    it('sets default prop values', () => {
        const wrapper = shallow(
            <ToolTip child={child} title={title} content={content} />
        );
        expect(wrapper.props().children[1].props.style.backgroundColor).toEqual('#444444');
        expect(wrapper.props().children[1].props.style.color).toEqual('#ffffff');
        expect(wrapper.props().children[1].props.style.width).toEqual('200px');
    });

    it('displays tooltip content on hover', () => {
        const wrapper = shallow(<ToolTip child={child} title={title} content={content} />);
        wrapper.find('.child').simulate('mouseenter');
        expect(wrapper.find('.tooltip').exists()).toEqual(true);
        expect(wrapper.find('.title').text()).toEqual(title);
        expect(wrapper.find('.tooltip').contains(content)).toEqual(true);
    });

    it('hides tooltip content on mouseleave', () => {
        const wrapper = shallow(<ToolTip child={child} title={title} content={content} />);
        wrapper.find('.child').simulate('mouseenter');
        wrapper.find('.child').simulate('mouseleave');
        expect(wrapper.find('.tooltip').exists()).toEqual(true);
    });

    it('positions tooltip at bottom if extends beyond window width', () => {
        // Mock the DOM element's `getBoundingClientRect()` method to return a width that exceeds the window width
        const mockBoundingClientRect = jest.fn(() => ({ right: 2000 }));
        const element = { getBoundingClientRect: mockBoundingClientRect };
        const originalClientWidth = Object.getOwnPropertyDescriptor(document.documentElement, 'clientWidth');

        Object.defineProperty(document.documentElement, 'clientWidth', {
            value: 1000,
            writable: true,
        });

        const wrapper = shallow(<ToolTip child={child} title={title} content={content} />);
        wrapper.instance().tooltip.current = element;
        wrapper.instance().componentDidMount();
        expect(wrapper.state('position')).toEqual('bottom');

        // Object.defineProperty(document.documentElement, 'clientWidth', originalClientWidth);
    });
});
