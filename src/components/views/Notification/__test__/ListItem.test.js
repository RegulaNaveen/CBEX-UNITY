import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import moment from 'moment';
import configureStore from 'redux-mock-store';
import ListItem from '../ListItem';
import * as notificationActions from '../../../../redux/actions/notification-actions';

const mockStore = configureStore();

describe('ListItem component', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
    wrapper = shallow(
      <Provider store={store}>
        <ListItem
          id={1}
          url="/test-url"
          oppNo="OPP_NO_123"
          data="Opportunity OPP_NO_123 Bid BID_123"
          isSeen={false}
          createdAt={moment().toISOString()}
        />
      </Provider>
    );
  });

  it('should render without errors', () => {
    expect(wrapper.find('.notification-item').length).toBe(0);
  });

  it('should render the dot icon', () => {
    expect(wrapper.find('.notification-item-dots').length).toBe(0);
  });

  it('should render the header and header title', () => {
    expect(wrapper.find('.notification-item-header').length).toBe(0);
    expect(wrapper.find('.notification-item-header-title').length).toBe(0);
  });

  it('should render the notification content data', () => {
    expect(wrapper.find('.notification-content-data').length).toBe(0);
  });

  it('should call the setSeenOne action on envelope button click', () => {
    wrapper = mount(
      <Provider store={store}>
        <ListItem
          id={1}
          url="/test-url"
          oppNo="OPP_NO_123"
          data="Opportunity OPP_NO_123 Bid BID_123"
          isSeen={false}
          setSeenOne={notificationActions.setSeenOne}
          createdAt={moment().toISOString()}
          jsonBody={{ bidNo: 1 }}
        />
      </Provider>
    );

    wrapper.find('EnvelopeButton').prop('onClick')();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
