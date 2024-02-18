import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
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
import TaskListToolbarMenu from './taskListToolbarMenu';

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

const TaskListToolbarMenuPortal = props => {
  const modalRoot = document.getElementById('modal-wrapper');
  return ReactDOM.createPortal(props.children, modalRoot);
};

const TasksList = () => {
  const [tasksGroupsByDay, setTasksGroupsByDay] = useState({});

  const selectedBid = useSelector(getSelectedBid).toJS();
  const tasks = useSelector(selectTasksList);
  const tasksLoading = useSelector(selectTasksFetching);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskId, setTaskId] = useState(null);

  const bidCreatedDate = moment(selectedBid.proposalDate);
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
    Object.entries(merge(tasksGroup, groupBy(tasks, 'no_of_units'))).forEach(
      ([day, tasksForADay]) => {
        const dateForDay = bidCreatedDate.clone().add(day, 'd');
        tasksGroup[day] = {
          tasks: tasksForADay.sort((a, b) => a.order - b.order),
          expanded: isCorrectDay(day),
          date: dateForDay,
          dateFormatted: dateForDay.format('DD MMM'),
          uncompletedCount: tasksForADay.filter(task => !task.is_completed)
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

  const openModal = task_id => {
    setIsModalOpen(true);
    setTaskId(task_id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskId(null);
  };

  return (
    <div id="tasks-list-left-section">
      <div className="task-list-header">
        <Header />
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
                          openModal={openModal}
                        />
                      ))}
                    </div>
                  )}
                </Droppable>
              </AccordionDetails>
            </Accordion>
          ))}
        </DragDropContext>

        <TaskListToolbarMenuPortal>
          <TaskListToolbarMenu
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            setIsModalOpen={setIsModalOpen}
            taskId={taskId}
          />
        </TaskListToolbarMenuPortal>
      </div>
    </div>
  );
};

export default TasksList;
