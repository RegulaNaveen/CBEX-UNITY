import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

import { store } from '../../../../store';
import mockData from './mockData/data.json'
import DnDOutsideResource from '../TimelineCalender';

const DragAndDropCalendar = withDragAndDrop(Calendar);
const formatName = (name, count) => `${name} ID ${count}`;
const localizer = momentLocalizer(moment);

describe('DnDOutsideResource component', () => {
    const defaultProps = {
        timelineEvents: mockData.timelineEvents,
        proposalDate: new Date(),
        socketContext: mockData.socketContext,
        userData: mockData.userData,
        isCurrent: true,
        eventCategories: mockData.eventCategories,
        trackEvent: jest.fn(),
        DragAndDropCalendar,
        localizer
    };

    it('renders correctly', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <DnDOutsideResource {...defaultProps} />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it.skip('handles events correctly', () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <DnDOutsideResource {...defaultProps} />
            </Provider>
        );
        const handleDayChangeButton = getByText('testcsqa5');
        const date = new Date();

        fireEvent.click(handleDayChangeButton);

        expect(defaultProps.trackEvent).toHaveBeenCalledWith({
            category: defaultProps.eventCategories.crmNo,
            action: `Edit Timeline Question : testcsqa5 (Proposal Team) `,
            name: `Answer: ${date}`,
            customDimensions: [
                {
                    id: 1,
                    value: JSON.stringify({
                        answer: date,
                        sectionName: '',
                        questionText: '',
                        questionHTML: '',
                        questionJSON: '',
                        questionHintJSON: '',
                        questionId: ''
                    })
                }
            ]
        });
    });
});