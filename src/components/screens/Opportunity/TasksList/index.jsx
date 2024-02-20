import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Accordion from 'apollo-react/components/Accordion';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Typography from 'apollo-react/components/Typography';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { cloneDeep } from 'lodash';
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
import {
  tasksListReordering,
  tasksListMove
} from '../../../../redux/actions/tasksList-actions';
import { reorder } from '../../../../utils/helpers';
import { AlertDiamond, AlertTriangle } from '../../../svg';
import ListItem from './ListItem';

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

// Drag & Drop Style
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#ecf3ff' : 'transparent',
  display: 'flex',
  flexDirection: 'column'
});

const TasksList = () => {
  const [tasksGroupsByDay, setTasksGroupsByDay] = useState({});

  const selectedBid = useSelector(getSelectedBid).toJS();
  const tasks = useSelector(selectTasksList);
  const tasksLoading = useSelector(selectTasksFetching);

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

  const dispatch = useDispatch();

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

  function handleDragEnd(result) {
    const { source, destination } = result;
    // dragging outside the list
    if (!result.destination) return;

    let newTasksGroupsByDay = cloneDeep(tasksGroupsByDay);

    const sourceParentId = source.droppableId;
    const destParentId = destination.droppableId;

    const sourceDay = Number(sourceParentId.substring(21, 23));
    const destDay = Number(destParentId.substring(21, 23));

    const sourceSubItems = newTasksGroupsByDay[sourceDay];
    const destSubItems = newTasksGroupsByDay[destDay];

    // For reordering within the same day
    if (sourceParentId === destParentId) {
      if (source.index === destination.index) return;

      const reorderedSubItems = reorder(
        sourceSubItems.tasks,
        source.index,
        destination.index
      );

      newTasksGroupsByDay[sourceDay].tasks = reorderedSubItems;
      setTasksGroupsByDay({ ...newTasksGroupsByDay });

      dispatch(
        tasksListReordering(
          selectedBid.id,
          reorderedSubItems,
          reorderedSubItems[destination.index].task_id
        )
      ).then(response => {
        if (!response.status) {
          console.log('response', response);
        }
      });
    } else {
      // For moving from one day to another
      const [removed] = sourceSubItems.tasks.splice(source.index, 1);
      destSubItems.tasks.splice(destination.index, 0, removed);
      setTasksGroupsByDay({ ...newTasksGroupsByDay });

      dispatch(
        tasksListMove(
          selectedBid.id,
          destSubItems.tasks,
          removed.task_id,
          destDay
        )
      ).then(response => {
        if (!response.status) {
          console.log('response', response);
        }
      });
    }
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
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="accordions-wrapper">
          {Object.entries(tasksGroupsByDay).map(([day, tasksGroup]) => (
            <Droppable droppableId={`droppable-task-group-${day}`}>
              {(provided, snapshot) => (
                <Accordion
                  defaultExpanded={isCorrectDay(day)}
                  expanded={tasksGroup.expanded}
                  onChange={() => handleExpandChange(day)}
                  key={`task-day-${day}`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  data-testid={`droppable-task-group-${day}`}
                >
                  <AccordionSummary>
                    <div className="header">
                      <Typography
                        className={classNames('header-title', {
                          'font-bold':
                            bidCreatedDate.isValid() && false // remove && false
                              ? isCorrectDay(day)
                              : false
                        })}
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
                  </AccordionSummary>
                  <AccordionDetails>
                    {tasksGroup.tasks.map((task, index) => (
                      <ListItem
                        index={index}
                        task={task}
                        day={day}
                        key={`task-item-${day}-${index}`}
                      />
                    ))}
                  </AccordionDetails>
                  {provided.placeholder}
                </Accordion>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TasksList;
