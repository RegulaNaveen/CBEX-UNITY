import React from 'react';
import {
  render,
  screen,
  fireEvent,
  renderHook,
  act
} from '@testing-library/react';
import { fromJS, Map } from 'immutable';
import { Provider } from 'react-redux';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

import { store } from '../../../../store';
import mockData from '../../../views/modals/__test__/data.json';
import calenderData from './mockData/timelineCalender.json';
import Timeline from '../index';

const DragAndDropCalendar = withDragAndDrop(Calendar);
const formatName = (name, count) => `${name} ID ${count}`;
const localizer = momentLocalizer(moment);

const defaultProps = {
  questions: mockData.proposal.proposalQuestions,
  selectedBid: mockData.selectedBid,
  proposalDetails: mockData.proposal.proposalDetails,
  isSetQuestionLoadingData: false,
  timelineEvents: calenderData.timelineEvents,
  proposalDate: new Date(),
  socketContext: calenderData.socketContext,
  userData: calenderData.userData,
  isCurrent: true,
  eventCategories: calenderData.eventCategories,
  trackEvent: jest.fn(),
  DragAndDropCalendar,
  localizer,
  formatName
};

describe('unit testing for timeline index component', () => {
  it.skip('render timline index component', () => {
    render(
      <Provider store={store}>
        <Timeline {...defaultProps} />
      </Provider>
    );
    // const ele = screen.getByTestId('Timeline-main-wrapper');
    // expect(ele).toBeInTheDocument();
  });
  it.skip('Search component functionality', () => {
    const { getByPlaceholderText, queryByTestId } = render(
      <Provider store={store}>
        <Timeline {...defaultProps} />
      </Provider>
    );
    const search = getByPlaceholderText('Search');
    expect(search).toBeInTheDocument();
    fireEvent.change(search, { target: { value: 'abc' } });
    expect(search.value).toBe('abc');
  });
});
