import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import PropTypes from 'prop-types';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
// import events from './resources/events';
import { parseMomentDate } from '../../../utils/DateUtils';
import { setProposalAnswerData } from '../../../redux/actions/proposal-actions';
import { useDispatch } from 'react-redux';
import MatomoHOC from '../../HOC/MatomoHOC';

const DragAndDropCalendar = withDragAndDrop(Calendar);

// const adjEvents = events.map((it, ind) => ({
//   ...it,
//   isDraggable: true
// }));

const formatName = (name, count) => `${name} ID ${count}`;

const DnDOutsideResource = ({
  timelineEvents,
  proposalDate,
  socketContext,
  userData,
  isCurrent,
  eventCategories,
  trackEvent
}) => {
  const localizer = momentLocalizer(moment);
  const [myEvents, setMyEvents] = useState(timelineEvents);
  const [draggedEvent, setDraggedEvent] = useState();
  const [date, setDate] = useState(new Date());
  const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);
  const [counters, setCounters] = useState({ item1: 0, item2: 0 });
  const dispatch = useDispatch();
  const [selectedEvent, setSelectedEvent] = useState(undefined);

  useEffect(() => {
    setMyEvents(timelineEvents);
  }, [timelineEvents]);

  const eventPropGetter = useCallback(event => {
    const backgroundColor = event.color;
    const dragClass = event.isDraggable ? 'isDraggable' : 'nonDraggable';
    return {
      style: { backgroundColor },
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
        question?.answers[question?.answers?.length - 1].answer;
      if (
        parseMomentDate(lastAnswerValue.trim()) !==
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

  const handleDisplayDragItemInCell = useCallback(
    () => setDisplayDragItemInCell(prev => !prev),
    []
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

  const newEvent = useCallback(event => { }, [setMyEvents]);

  const onDropFromOutside = useCallback(
    ({ start, end, allDay: isAllDay }) => {
      if (draggedEvent === 'undroppable') {
        setDraggedEvent(null);
        return;
      }

      if (selectedEvent) {
        handleDayChange(start, selectedEvent?.question);
        const { name } = draggedEvent;
        const event = {
          title: formatName(selectedEvent.title, counters[selectedEvent.title]),
          start,
          end,
          isAllDay
        };
        setDraggedEvent(null);
        setCounters(prev => {
          const { [name]: count } = prev;
          return {
            ...prev,
            [name]: count + 1
          };
        });
        newEvent(event);
      } else {
        const { name } = draggedEvent;
        const event = {
          title: formatName(name, counters[name]),
          start,
          end,
          isAllDay
        };
        setDraggedEvent(null);
        setCounters(prev => {
          const { [name]: count } = prev;
          return {
            ...prev,
            [name]: count + 1
          };
        });
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

  const defaultDate = useMemo(() => new Date(proposalDate), [proposalDate]);

  useEffect(() => {
    setDate(proposalDate);
  }, [proposalDate]);

  const { views } = useMemo(
    () => ({
      views: {
        month: true,
        week: false,
        day: false
      }
      // ... other props
    }),
    []
  );

  return (
    <>
      <div style={{ height: '75vh', width: '100%' }}>
        <DragAndDropCalendar
          date={date}
          onNavigate={newDate => {
            setDate(newDate);
          }}
          defaultView={Views.MONTH}
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
          views={['month']}
        />
      </div>
    </>
  );
};
DnDOutsideResource.propTypes = {};

export default MatomoHOC(DnDOutsideResource);
