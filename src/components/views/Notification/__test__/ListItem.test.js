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
  it('should render notification data for post award bid', () => {
    wrapper = mount(
      <Provider store={store}>
        <ListItem
          id="828aa8df-1dfb-449a-a486-663eb931f8b4"
          url="/opportunities/JAB53164?notification_id=828aa8df-1dfb-449a-a486-663eb931f8b4&bidNo=10&bidType=Post_Award_Bid"
          oppNo="JAB53164"
          data="You’ve been assigned to Opportunity JAB53164 Post Award 10. View the opportunity overview and prepare for upcoming calls in Unity."
          isSeen={false}
          setSeenOne={notificationActions.setSeenOne}
          createdAt="2024-01-17T09:14:47.808Z"
          jsonBody={{
            opportunityId: 'JAB53164',
            bidNo: 10,
            bidType: 'Post_Award_Bid'
          }}
        />
      </Provider>
    );
    console.log(wrapper.debug());
    expect(
      wrapper
        .find('.notification-content-data')
        .text()
        .includes(
          'You’ve been assigned to Opportunity JAB53164 Post Award 10. View the opportunity overview and prepare for upcoming calls in Unity'
        )
    ).toBe(true);

    const expectedLinks = [
      '<a style="display: inline-block" href="http://localhost/opportunities/JAB53164?notification_id=828aa8df-1dfb-449a-a486-663eb931f8b4&amp;bidNo=10&amp;bidType=Post_Award_Bid">Opportunity</a>',
      '<a style="display: inline-block" href="http://localhost/opportunities/JAB53164?notification_id=828aa8df-1dfb-449a-a486-663eb931f8b4&amp;bidNo=10&amp;bidType=Post_Award_Bid">JAB53164</a>',
      '<a style="display: inline-block" href="http://localhost/opportunities/JAB53164?notification_id=828aa8df-1dfb-449a-a486-663eb931f8b4&amp;bidNo=10&amp;bidType=Post_Award_Bid">Post</a>',
      '<a style="display: inline-block" href="http://localhost/opportunities/JAB53164?notification_id=828aa8df-1dfb-449a-a486-663eb931f8b4&amp;bidNo=10&amp;bidType=Post_Award_Bid">Award</a>',
      '<a style="display: inline-block" href="http://localhost/opportunities/JAB53164?notification_id=828aa8df-1dfb-449a-a486-663eb931f8b4&amp;bidNo=10&amp;bidType=Post_Award_Bid">10.</a>'
    ];
    expectedLinks.forEach(link => {
      expect(wrapper.html()).toContain(link);
    });
  });

  it('should render notification data for rfi bid', () => {
    wrapper = mount(
      <Provider store={store}>
        <ListItem
          id="8e251519-422c-4a26-a166-9175898ff9d8"
          url="/opportunities/LAB09021?notification_id=8e251519-422c-4a26-a166-9175898ff9d8&bidNo=4&bidType=RFI_Request"
          oppNo="LAB09021"
          data="You’ve been tagged in an answer to a question for Opportunity LAB09021 RFI 4. <br>Tagging_in_Answer"
          isSeen={false}
          setSeenOne={notificationActions.setSeenOne}
          createdAt="2024-01-23T11:20:10.732Z "
          jsonBody={{
            opportunityId: 'LAB09021',
            bidNo: 4,
            bidType: 'RFI_Request',
            questionText: 'Tagging_in_Answer',
            questionAnswer: 'Varsha Kumari'
          }}
        />
      </Provider>
    );
    console.log(wrapper.debug());
    const text = wrapper.text();
    expect(text).toContain('You’ve been tagged in an answer to a question for');
    expect(text).toContain('Opportunity');
    expect(text).toContain('LAB09021');
    expect(text).toContain('RFI');
    expect(text).toContain('4.');
    expect(text).toContain('Tagging_in_Answer');
  });

  it('should render notification data for Early Engagement Bid', () => {
    wrapper = mount(
      <Provider store={store}>
        <ListItem
          id="8e251519-422c-4a26-a166-9175898ff9d8"
          url="/opportunities/LAB09021?notification_id=8e251519-422c-4a26-a166-9175898ff9d8&bidNo=4&bidType=RFI_Request"
          oppNo="LAB09021"
          data="You’ve been tagged in an answer to a question for Opportunity LAB09021 Early Engagement 1. <br>Customer and Opportunity Overview"
          isSeen={false}
          setSeenOne={notificationActions.setSeenOne}
          createdAt="2024-01-23T11:20:10.732Z "
          jsonBody={{
            opportunityId: 'LAB09021',
            bidNo: 1,
            bidType: 'Early_Engagement_Bid',
            questionText: 'Engagement 1',
            questionAnswer: 'Varsha Kumari'
          }}
        />
      </Provider>
    );

    const text = wrapper.text();
    expect(text).toContain('You’ve been tagged in an answer to a question for');
    expect(text).toContain('Opportunity');
    expect(text).toContain('LAB09021');
    expect(text).toContain('Early');
    expect(text).toContain('Engagement');
    expect(text).toContain('1.');
  });
});
