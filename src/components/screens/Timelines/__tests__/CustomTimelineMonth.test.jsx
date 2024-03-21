import React from 'react';
import moment from 'moment';
import MonthView from '../CustomTimelineMonth';
import { Provider } from 'react-redux';
import { momentLocalizer } from 'react-big-calendar';
import { render, screen } from '@testing-library/react';
import calenderData from './mockData/timelineCalender.json';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Map, fromJS } from 'immutable';

jest.mock('clsx', () => jest.fn());
jest.mock('react-big-calendar/lib/DateContentRow', () => jest.fn());

const middlewares = [thunk];
describe('MonthView Component', () => {
  window.addEventListener = jest.fn();
  window.removeEventListener = jest.fn();
  document.addEventListener = jest.fn();
  const mockStore = configureStore(middlewares);
  let store;

  beforeEach(() => {
    store = mockStore({
      timeline: fromJS({
        timelineDateRange: [
          '2024-03-09T18:30:00.000Z',
          '2024-04-27T18:29:59.999Z'
        ],
        showAddModal: false,
        draggedEvent: {}
      }),
      proposal: fromJS({
        selectedBid: Map({
          questionTemplateVersionNumber: 'v2023.12',
          agreementId: 'aM701000000CbmBCAS',
          accountId: '0010100000K3Y1WAAV',
          bidName: 'Bid 1',
          opportunityType: 'Opportunity Launch Call (Pilot)',
          opportunityId: '0060100000BAJ0tAAH',
          isCurrent: true,
          bidStatus: false,
          pertinentDetails: 'Testing',
          isApprovalCountPresent: true,
          id: '86462966-7e94-4648-b1e7-fb908f48eaf0'
        })
      })
    });
  });

  const props = {
    events: calenderData.timelineEvents,
    date: new Date(),
    localizer: momentLocalizer(moment),
    min: new Date('2024-03-09T18:30:00.000Z'),
    max: new Date('2024-04-27T18:29:59.999Z'),
    setTimelineDateRange: jest.fn(),
    setShowAddModal: jest.fn(),
    components: {},
    selectable: 'ignoreEvents',
    getNow: jest.fn(),
    selected: {},
    accessors: {
      allDay: jest.fn(),
      end: jest.fn(),
      resource: jest.fn(),
      resourceId: jest.fn(),
      resourceTitle: jest.fn(),
      start: jest.fn(),
      title: jest.fn(),
      tooltip: jest.fn()
    },
    getters: {
      dayProp: jest.fn(),
      backgroundEventProp: jest.fn(),
      dayProp: jest.fn(),
      eventProp: jest.fn(),
      slotGroupProp: jest.fn(),
      slotProp: jest.fn()
    },
    showAllEvents: false,
    longPressThreshold: 250,
    rtl: false,
    resizable: false,
    onNavigate: jest.fn(),
    onSelectSlot: jest.fn(),
    onSelectEvent: jest.fn(),
    onDoubleClickEvent: jest.fn(),
    onKeyPressEvent: jest.fn(),
    onShowMore: jest.fn(),
    doShowMoreDrillDown: true,
    onDrillDown: jest.fn(),
    getDrilldownView: jest.fn(),
    handleDragStart: jest.fn(),
    step: 30,
    popup: true,
    drilldownView: 'day',
    longPressThreshold: 250,
    className: 'custom-time',
    getRowLimit: jest.fn()
  };

  test('should render MonthView component', () => {
    render(
      <Provider store={store}>
        <MonthView {...props} />
      </Provider>
    );
    expect(screen.getByText('March 2024')).toBeInTheDocument();
  });
});
