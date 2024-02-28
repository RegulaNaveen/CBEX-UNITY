import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import ReactDOM from 'react-dom';
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
import { groupBy, isEmpty, merge } from 'lodash';
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
import SeeOwners from './SeeOwnersModal';
import ProgressIndicator from './ProgressIndicator';
import getNextWorkingDay from './utils';
import AddTaskItem from './AddTaskItem';
import { SocketContext } from '../../../../context/SocketContext';

const UncompletedTasksCount = ({ count, dayDiffFromToday }) => {
  if (count === 0) {
    return null;
  }
  if (dayDiffFromToday < 0) {
    return (
      <div className="uncompleted-tasks-count">
        <AlertTriangle />
        <Typography className="font-red count-text" variant="caption">
          {count}
        </Typography>
      </div>
    );
  }

  if (dayDiffFromToday === 0) {
    return (
      <div className="uncompleted-tasks-count">
        <AlertDiamond />
        <Typography className="font-yellow count-text" variant="caption">
          {count}
        </Typography>
      </div>
    );
  }

  return (
    <div className="uncompleted-tasks-count">
      <Typography className="count-text" variant="caption">
        {count}
      </Typography>
    </div>
  );
};

const TaskListToolbarMenuPortal = props => {
  const modalRoot = document.getElementById('tasklist-modal-wrapper');
  return ReactDOM.createPortal(props.children, modalRoot);
};
// Drag & Drop Style
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#ecf3ff' : 'transparent',
  display: 'flex',
  flexDirection: 'column'
});

const TasksList = () => {
  const [tasksGroupsByDay, setTasksGroupsByDay] = useState({});
  const selectedBid = useSelector(getSelectedBid).toJS();
  const proposalId = selectedBid.id;
  const tasks = useSelector(selectTasksList);
  const tasksLoading = useSelector(selectTasksFetching);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [isNewTask, setIsNewTask] = useState({ result: {}, isNew: false });
  const [saveButtonDisable, setSaveButtonDisable] = useState(false);

  const bidCreatedDate = moment(selectedBid.proposalDate);
  const TODAY = useMemo(() => moment(), []);
  const editable = selectedBid.isEditable;

  const { getTaskLockDetailsWrapper } = useContext(SocketContext);

  const dispatch = useDispatch();

  const isCorrectDay = useCallback(
    dateOFADay => {
      return TODAY.date() === dateOFADay.date();
    },
    [TODAY]
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
    let tasksGroup = {
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
    tasksGroup = merge(tasksGroup, groupBy(tasks, 'no_of_units'));
    Object.entries(tasksGroup).forEach(([day, tasksForADay]) => {
      let dateForDay;
      if (day === '1') {
        dateForDay = getNextWorkingDay(bidCreatedDate);
      } else {
        dateForDay = getNextWorkingDay(tasksGroup[day - 1].date);
      }
      tasksGroup[day] = {
        tasks: tasksForADay
          .sort((a, b) => a.order - b.order)
          .map(task => {
            const ownersCount = task?.task_role?.length;
            return { ...task, ownersCount };
          }),
        expanded: isEmpty(tasksGroupsByDay)
          ? isCorrectDay(dateForDay)
          : tasksGroupsByDay[day].expanded,
        date: dateForDay,
        dateFormatted: dateForDay.format('DD MMM'),
        uncompletedCount: tasksForADay.filter(task => !task.is_completed)
          .length,
        completedCount: tasksForADay.filter(task => task.is_completed).length,
        dayDiffFromToday: moment([
          dateForDay.year(),
          dateForDay.month(),
          dateForDay.date()
        ]).diff(moment([TODAY.year(), TODAY.month(), TODAY.date()]), 'd')
      };
    });
    // If tasksGroupsByDay is empty, then it is the first render
    if (isEmpty(tasksGroupsByDay)) {
      getTaskLockDetailsWrapper();
    }

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

  const openModal = task_id => {
    setTaskId(task_id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTaskId(null);
    setIsModalOpen(false);
  };

  return (
    <div id="tasks-list-left-section">
      <div className="task-list-header">
        <Header />
        <div className="progress-indicator">
          <ProgressIndicator tasksList={tasksGroupsByDay} />
        </div>
      </div>
      <hr style={{ marginTop: '8px' }} className="task-list-divider-hr" />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="accordions-wrapper">
          {Object.entries(tasksGroupsByDay).map(([day, tasksGroup]) => (
            <Droppable droppableId={`droppable-task-group-${day}`}>
              {(provided, snapshot) => (
                <Accordion
                  defaultExpanded={isCorrectDay(tasksGroup.date)}
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
                          'font-bold': bidCreatedDate.isValid()
                            ? isCorrectDay(tasksGroup.date)
                            : false
                        })}
                      >
                        Day {day}{' '}
                        {tasksGroup.expanded
                          ? ` (${tasksGroup.dateFormatted})`
                          : ''}
                      </Typography>
                      <div>
                        <UncompletedTasksCount
                          count={tasksGroup.uncompletedCount}
                          dayDiffFromToday={tasksGroup.dayDiffFromToday}
                        />
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    {tasksGroup.tasks.map((task, index) => (
                      <ListItem
                        index={index}
                        task={task}
                        day={day}
                        dayDiffFromToday={tasksGroup.dayDiffFromToday}
                        key={`task-item-${day}-${index}`}
                        editable={editable}
                      />
                    ))}
                    {selectedBid.isEditable && (
                      <AddTaskItem
                        day={day}
                        proposalId={proposalId}
                        openModal={openModal}
                        setIsNewTask={setIsNewTask}
                        isNewTask={isNewTask}
                        saveButtonDisable={saveButtonDisable}
                        setSaveButtonDisable={setSaveButtonDisable}
                        //onChangeAddTask={handleExpandChange}
                      />
                    )}
                  </AccordionDetails>
                  {provided.placeholder}
                </Accordion>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {isModalOpen && (
        <TaskListToolbarMenuPortal>
          <SeeOwners
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            setIsModalOpen={setIsModalOpen}
            taskId={taskId}
            isNewTask={isNewTask}
            setIsNewTask={setIsNewTask}
            saveButtonDisable={saveButtonDisable}
            setSaveButtonDisable={setSaveButtonDisable}
          />
        </TaskListToolbarMenuPortal>
      )}
    </div>
  );
};

export default TasksList;
