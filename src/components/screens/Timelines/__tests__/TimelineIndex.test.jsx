import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import { store } from '../../../../store';
import calenderData from './mockData/timelineCalender.json';
import Timeline, { generateSections } from '../index';
import mockData from '../../../screens/Opportunity/__tests__/mockdata/question.json';

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
  test('renders Timeline component without crashing', () => {
    render(
      <Provider store={store}>
        <Timeline />
      </Provider>
    );
  });
  test('render timline index component', () => {
    render(
      <Provider store={store}>
        <Timeline {...defaultProps} />
      </Provider>
    );
    // const ele = screen.getByTestId('Timeline-main-wrapper');
    // expect(ele).toBeInTheDocument();
  });
  test('Search component functionality', () => {
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

  it('generateSections', () => {
    const ques = cloneDeep(mockData.proposal.proposalQuestions);
    const results = generateSections(ques);
    expect(results.size).toBeGreaterThan(0);
  });
});
