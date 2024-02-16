import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Typography from 'apollo-react/components/Typography';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import { useSelector } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Loader from 'apollo-react/components/Loader';
import { groupBy, merge } from 'lodash';
import Header from './Header';
import { getSelectedBid } from '../../../../redux/selectors';
import {
  selectTasksFetching,
  selectTasksList
} from '../../../../redux/selectors/tasks';
import { AlertDiamond, AlertTriangle } from '../../../svg';
import ListItem from './ListItem';
import ProgressIndicator from './ProgressIndicator';
import AddTaskItem from './AddTaskItem';

// const UncompletedTasksCount = ({ count, dayDiffFromToday }) => {
//   if (count === 0) {
//     return null;
//   }
//   if (dayDiffFromToday < 0) {
//     return (
//       <div className="uncompleted-tasks-count">
//         <AlertTriangle />
//         <Typography className="font-red count-text" variant="caption">
//           {count}
//         </Typography>
//       </div>
//     );
//   }

//   if (dayDiffFromToday === 0) {
//     return (
//       <div className="uncompleted-tasks-count">
//         <AlertDiamond />
//         <Typography className="font-yellow count-text" variant="caption">
//           {count}
//         </Typography>
//       </div>
//     );
//   }

//   return (
//     <div className="uncompleted-tasks-count">
//       <Typography className="count-text" variant="caption">
//         {count}
//       </Typography>
//     </div>
//   );
// };

const TasksList = () => {
  const [tasksGroupsByDay, setTasksGroupsByDay] = useState({});
  const selectedBid = useSelector(getSelectedBid).toJS();
  const proposalId = selectedBid.id;
  const tasks = useSelector(selectTasksList);
  const tasksLoading = useSelector(selectTasksFetching);
  const bidCreatedDate = moment(selectedBid.proposalDate);
  console.log(
    'bidCreatedDate',
    moment([
      bidCreatedDate.year(),
      bidCreatedDate.month(),
      bidCreatedDate.date()
    ]).format('DD MMM')
  );
  const TODAY = useMemo(() => moment(), []);
  const DAYS_SINCE_BID_CREATED = useMemo(
    () =>
      moment([TODAY.year(), TODAY.month(), TODAY.date()]).diff(
        moment([
          bidCreatedDate.year(),
          bidCreatedDate.month(),
          bidCreatedDate.date()
        ]),
        'd'
      ),
    [bidCreatedDate, TODAY]
  );

  const isCorrectDay = useCallback(
    day => {
      if (bidCreatedDate.isValid()) {
        if (DAYS_SINCE_BID_CREATED <= 1) {
          return day === '1';
        }
        return `${DAYS_SINCE_BID_CREATED}` === `${day}`;
      }
      return false;
    },
    [bidCreatedDate, DAYS_SINCE_BID_CREATED]
  );

  const getDays = bidDate => {
    let days = [];
    let date = moment(bidDate, 'DD MMM YY');
    date = date.add(1, 'days');
    let count = 0;
    while (count < 10) {
      if (date.day() !== 0 && date.day() !== 6) {
        days.push(date.format('DD MMM YY'));
        count++;
      }
      date = date.add(1, 'days');
    }
    return days;
  };

  useEffect(() => {
    const tasksGroup = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: []
    };
    const days = getDays(moment(bidCreatedDate).format('DD MMM YY')); // 10 days from bid created date
    Object.entries(merge(tasksGroup, groupBy(tasks, 'no_of_units'))).forEach(
      ([day, tasksForADay]) => {
        const dateForDay = bidCreatedDate.clone().add(day, 'd');
        tasksGroup[day] = {
          tasks: tasksForADay.sort((a, b) => a.order - b.order),
          expanded: isCorrectDay(day),
          date: days[day - 1],
          dateFormatted: dateForDay.format('DD MMM'),
          uncompletedCount: tasksForADay.filter(task => !task.is_completed)
            .length,
          completedCount: tasksForADay.filter(task => !task.is_completed)
            .length,
          dayDiffFromToday: moment([
            dateForDay.year(),
            dateForDay.month(),
            dateForDay.date()
          ]).diff(moment([TODAY.year(), TODAY.month(), TODAY.date()]), 'd')
        };
      }
    );

    setTasksGroupsByDay(tasksGroup);
  }, [tasks]);

  function handleDragUpdate(...args) {
    console.log('Drag update: ', args);
  }

  const handleExpandChange = useCallback(
    day => {
      setTasksGroupsByDay({
        ...tasksGroupsByDay,
        [day]: {
          ...tasksGroupsByDay[day],
          expanded: !tasksGroupsByDay[day].expanded
        }
      });
    },
    [tasksGroupsByDay]
  );

  if (tasksLoading) {
    return (
      <div id="tasks-list-left-section">
        <Loader
          isInner
          size={20}
          style={{
            width: '20px',
            height: '20px'
          }}
        />
      </div>
    );
  }

  return (
    <div id="tasks-list-left-section">
      <div className="task-list-header">
        <Header />
        <div className="progress-indicator">
          <ProgressIndicator tasksList={tasksGroupsByDay} />
        </div>
      </div>
      <div className="accordions-wrapper">
        <DragDropContext onDragUpdate={handleDragUpdate}>
          {Object.entries(tasksGroupsByDay).map(([day, tasksGroup]) => (
            <Accordion
              defaultExpanded={isCorrectDay(day)}
              expanded={tasksGroup.expanded}
              onChange={() => handleExpandChange(day)}
              key={`task-day-${day}`}
            >
              <AccordionSummary>
                <Droppable droppableId={`droppable-task-group-${day}-header`}>
                  {(provided, snapshot) => (
                    <div className="header">
                      <Typography
                        className={classNames('header-title', {
                          'font-bold': bidCreatedDate.isValid() && false // remove && false
                          // ? isCorrectDay(day)
                          // : false
                        })}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        Day {day}{' '}
                        {/* {tasksGroup.expanded || isCorrectDay(day)
                          ? ` (${tasksGroup.dateFormatted})`
                          : ''} */}
                      </Typography>
                      <div>
                        {/* <UncompletedTasksCount
                          count={tasksGroup.uncompletedCount}
                          dayDiffFromToday={tasksGroup.dayDiffFromToday}
                        /> */}
                      </div>
                    </div>
                  )}
                </Droppable>
              </AccordionSummary>
              <AccordionDetails>
                <Droppable droppableId={`droppable-task-group-${day}`}>
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {tasksGroup.tasks.map((task, index) => (
                        <ListItem
                          index={index}
                          task={task}
                          key={`task-item-${day}-${index}`}
                        />
                      ))}
                    </div>
                  )}
                </Droppable>
                <AddTaskItem
                  day={day}
                  proposalId={proposalId}
                  //onChangeAddTask={handleExpandChange}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default TasksList;
