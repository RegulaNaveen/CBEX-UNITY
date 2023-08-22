import React from 'react';
import { shallow } from 'enzyme';
import Bell from 'apollo-react-icons/Bell';
import RecentNoNotification from '../RecentNoNotification';

describe('RecentNoNotification', () => {
  it('renders without crashing', () => {
    shallow(<RecentNoNotification />);
  });

  it('renders the Bell icon', () => {
    const wrapper = shallow(<RecentNoNotification />);
    expect(wrapper.find(Bell).length).toEqual(1);
  });

  it('renders "No notifications" text when notificationCount is 0', () => {
    const wrapper = shallow(<RecentNoNotification notificationCount={0} />);
    expect(wrapper.text()).toContain('No notifications');
  });

  it('renders "No matching notifications" and "View All Notifications" text when notificationCount is greater than 0', () => {
    const wrapper = shallow(<RecentNoNotification notificationCount={1} />);
    expect(wrapper.text()).toContain('No matching notifications');
    expect(wrapper.text()).toContain('View All Notifications');
  });

  it('calls resetSearch with an empty string when "View All Notifications" is clicked', () => {
    const resetSearch = jest.fn();
    const wrapper = shallow(<RecentNoNotification resetSearch={resetSearch} notificationCount={1} />);
    wrapper.find('.no-notification-viewAll p').simulate('click');
    expect(resetSearch).toHaveBeenCalledWith('');
  });
});
