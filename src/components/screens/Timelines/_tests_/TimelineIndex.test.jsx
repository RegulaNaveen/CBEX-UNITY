import React from 'react';
import { render, screen } from '@testing-library/react';
import { fromJS, Map } from 'immutable';
import { Provider } from 'react-redux';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

import { store } from '../../../../store';
import mockData from '../../../views/modals/__test__/data.json'
import calenderData from '../_tests_/mockData/data.json'
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
    it('render timline index component', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Timeline {...defaultProps} />
            </Provider>
        )

        expect(getByTestId('timeline')).toBeInTheDocument();
    })
});