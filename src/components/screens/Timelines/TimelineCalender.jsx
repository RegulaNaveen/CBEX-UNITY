import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { parseMomentDate } from '../../../utils/DateUtils';
import { setProposalAnswerData } from '../../../redux/actions/proposal-actions';
import MatomoHOC from '../../HOC/MatomoHOC';
import CustomComponents from './CustomComponents';
import CustomTimelineMonth from './CustomTimelineMonth';
import { selectTimelineDateRange } from '../../../redux/selectors';

const DragAndDropCalendar = withDragAndDrop(Calendar);

const formatName = (name, count) => `${name} ID ${count}`;

const DnDOutsideResource = ({
  timelineEvents,
  socketContext,
  userData,
  isCurrent,
  eventCategories,
  trackEvent,
  currentBidDetails,
  draggedQuestionData,
  setDraggedQuestionData
}) => {
  const localizer = momentLocalizer(moment);
  const [myEvents, setMyEvents] = useState(timelineEvents);
  const [draggedEvent, setDraggedEvent] = useState();

  const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);
  const [counters, setCounters] = useState({ item1: 0, item2: 0 });
  const dispatch = useDispatch();
  const [selectedEvent, setSelectedEvent] = useState(undefined);
  const timelineDateRange = useSelector(selectTimelineDateRange);

  useEffect(() => {
    setMyEvents(timelineEvents);
  }, [timelineEvents]);

  const eventPropGetter = useCallback(event => {
    const backgroundColor = event.color;
    const dragClass = event.isDraggable ? 'isDraggable' : 'nonDraggable';
    return {
      style: { backgroundColor, textOverflow: 'ellipsis' },
      className: `${dragClass}`
    };
  }, []);

  const trackMatomoEventSubmitAnswer = (answer, question) => {
    const {
      section,
      questionText,
      questionHTML,
      questionJSON,
      questionHintJSON,
      questionId
    } = question;
    const { sectionName } = section;

    trackEvent({
      category: eventCategories.crmNo,
      action: `Edit Timeline Question : ${questionText} (${sectionName}) `,
      name: `Answer: ${answer}`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify({
            answer,
            sectionName,
            questionText,
            questionHTML,
            questionJSON,
            questionHintJSON,
            questionId
          })
        }
      ]
    });
  };

  const handleDayChange = async (selectedDay, question) => {
    try {
      const { proposalId, questionId } = question;
      const lastAnswerValue =
        question?.answers[question?.answers?.length - 1]?.answer;
      if (
        parseMomentDate(lastAnswerValue?.trim()) !==
          parseMomentDate(selectedDay) &&
        selectedDay
      ) {
        await dispatch(
          setProposalAnswerData(
            socketContext,
            proposalId,
            questionId,
            selectedDay,
            userData,
            null,
            true
          )
        );
        trackMatomoEventSubmitAnswer(selectedDay, question);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent]);

  const customOnDragOver = useCallback(
    dragEvent => {
      if (draggedEvent !== 'undroppable') {
        dragEvent.preventDefault();
      }
    },
    [draggedEvent]
  );

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay, question } = event;

      handleDayChange(start, question);
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      setMyEvents(prev => {
        const existing = prev.find(ev => ev.id === event.id) ?? {};
        const filtered = prev.filter(ev => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay }];
      });
    },
    [setMyEvents]
  );

  const newEvent = useCallback(event => {}, [setMyEvents]);

  const onDropFromOutside = useCallback(
    ({ start, end, allDay: isAllDay }) => {
      console.log({ draggedQuestionData });
      if (draggedQuestionData) {
        console.log('11111111111111');

        const event = {
          id: draggedQuestionData?.id,
          title: formatName(
            draggedQuestionData?.title,
            counters[draggedQuestionData?.title]
          ),
          start,
          end,
          isAllDay,
          isDraggable: isCurrent,
          question: draggedQuestionData,
          color: '#00C221'
        };
        setDraggedEvent(null);

        newEvent(event);
        handleDayChange(start, draggedQuestionData);
        setDraggedQuestionData(null);
        return;
      }
      if (draggedEvent === 'undroppable') {
        setDraggedEvent(null);

        return;
      }

      if (selectedEvent) {
        console.log('222222222222222222');
        handleDayChange(start, selectedEvent?.question);
        const event = {
          title: formatName(selectedEvent.title, counters[selectedEvent.title]),
          start,
          end,
          isAllDay,

          id: selectedEvent?.question?.id,

          isDraggable: isCurrent,
          question: selectedEvent?.question,
          color: '#00C221'
        };
        setDraggedEvent(null);

        newEvent(event);
      }
    },
    [
      draggedEvent,
      counters,
      setDraggedEvent,
      setCounters,
      newEvent,
      selectedEvent
    ]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents(prev => {
        const existing = prev.find(ev => ev.id === event.id) ?? {};
        const filtered = prev.filter(ev => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents]
  );

  const handleSelectedEvent = event => {
    setSelectedEvent(event.event);
  };

  CustomTimelineMonth.title = () => 'title text';

  return (
    <>
      <div style={{ height: '85vh', width: '100%' }}>
        <DragAndDropCalendar
          toolbar={false}
          date={new Date(timelineDateRange[0]?._i)}
          defaultView="customMonth"
          dragFromOutsideItem={
            displayDragItemInCell ? dragFromOutsideItem : null
          }
          draggableAccessor="isDraggable"
          eventPropGetter={eventPropGetter}
          events={myEvents}
          localizer={localizer}
          onDropFromOutside={isCurrent ? onDropFromOutside : null}
          onDragOver={isCurrent ? customOnDragOver : null}
          onEventDrop={isCurrent ? moveEvent : null}
          onEventResize={isCurrent ? resizeEvent : null}
          onSelectSlot={newEvent}
          onSelectEvent={e => {
            if (isCurrent) handleSelectedEvent(e);
          }}
          onDragStart={e => {
            if (isCurrent) handleSelectedEvent(e);
          }}
          resizable={false}
          selectable
          popup
          views={{
            customMonth: CustomTimelineMonth
          }}
          messages={{
            customMonth: 'custom month'
          }}
          components={{
            dateCellWrapper: props => (
              // eslint-disable-next-line react/jsx-pascal-case
              <CustomComponents.dateCellWrapper
                {...props}
                currentBidDetails={currentBidDetails}
              />
            )
          }}
        />
      </div>
    </>
  );
};

DnDOutsideResource.defaultProps = {
  timelineEvents: [],
  draggedQuestionData: null
};
DnDOutsideResource.propTypes = {
  timelineEvents: PropTypes.array,
  socketContext: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  currentBidDetails: PropTypes.object.isRequired,
  draggedQuestionData: PropTypes.object,
  setDraggedQuestionData: PropTypes.func.isRequired
};

export default MatomoHOC(DnDOutsideResource);
