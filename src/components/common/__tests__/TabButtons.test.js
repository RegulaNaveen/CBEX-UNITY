import React from 'react';
import { shallow } from 'enzyme';
import TabButtons from '../TabButtons';

describe('TabButtons component', () => {
    const elements = [
        { tabName: 'Tab 1' },
        { tabName: 'Tab 2', notifications: 2 },
        { tabName: 'Tab 3', notifications: 5 }
    ];
    const selectedView = 'Tab 1';
    const onChangeView = jest.fn();
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <TabButtons
                elements={elements}
                selectedView={selectedView}
                onChangeView={onChangeView}
            />
        );
    });

    it('renders a button for each tab element', () => {
        expect(wrapper.find('button').length).toEqual(elements.length);
    });

    it('sets the "is-active" class on the selected tab button', () => {
        const selectedTabButton = wrapper.find('.is-active');
        expect(selectedTabButton.text()).toEqual(selectedView);
    });

    it('calls the onChangeView function when a tab button is clicked', () => {
        const tabButton = wrapper.find('button').at(1);
        tabButton.simulate('click', { target: { id: 'Tab 2' } });
        expect(onChangeView).toHaveBeenCalledWith('Tab 2');
    });

    it('displays the number of notifications for tabs with notifications > 0', () => {
        const notificationSpan = wrapper.find('.notification').at(0);
        expect(notificationSpan.text()).toEqual('2');
    });
});
