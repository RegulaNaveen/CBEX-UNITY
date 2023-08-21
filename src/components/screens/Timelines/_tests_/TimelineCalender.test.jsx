import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DnDOutsideResource from '../TimelineCalender';

const localizer = momentLocalizer(moment);
const mockStore = configureStore([]);

describe('DnDOutsideResource component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it.skip('should render the component', () => {
    const timelineEvents = [];
    const proposalDate = '';
    const socketContext = {};
    const userData = {};
    const isCurrent = false;
    const eventCategories = {};
    const trackEvent = jest.fn();

    const { getByTestId } = render(
      <Provider store={store}>
        <DnDOutsideResource
          timelineEvents={timelineEvents}
          proposalDate={proposalDate}
          socketContext={socketContext}
          userData={userData}
          isCurrent={isCurrent}
          eventCategories={eventCategories}
          trackEvent={trackEvent}
        />
      </Provider>
    );

    expect(getByTestId('dnd-outside-resource')).toBeInTheDocument();
  });
});
