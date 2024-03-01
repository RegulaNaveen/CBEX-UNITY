import React, { useEffect, useState } from 'react';
import LinearProgress from 'apollo-react/components/LinearProgress';
import Typography from 'apollo-react/components/Typography';
import StatusExclamation from 'apollo-react-icons/StatusExclamation';
import moment from 'moment';
import StatusCheck from 'apollo-react-icons/StatusCheck';
import StatusNegative from 'apollo-react-icons/StatusNegative';
import { DayIndicator } from '../../../svg';

const ProgressIndicator = ({ tasksList }) => {
  // console.log('tasksList', tasksList);
  const [totalTasksCount, setTotalTasksCount] = useState(0); //total tasks count

  const [progressBarValue, setProgressBarValue] = useState(0); //progress bar value

  const [currentDayIndex, setCurrentDayIndex] = useState(null); //current day index

  const [tasksCountTillDate, setTasksCountTillDate] = useState(0); //tasks count till date (current day)
  const [incompletedTasksCount, setIncompletedTasksCount] = useState(0); //incompleted tasks count
  const [taskProgress, setTaskProgress] = useState(false);
  const [totalDays, setTotalDays] = useState([]); //total days count
  const [maxNoOfUnits, setMaxNoOfUnits] = useState(0); //max no of units
  useEffect(() => {
    let completedTasks = 0;
    let totalCount = 0;
    let totalTasksTillDay = 0;
    let currentDayIndexValue = null;
    setTaskProgress(false);
    const tasksForDay = Object.values(tasksList);
    // console.log('tasksForDay', tasksForDay);
    tasksForDay.forEach((task, index) => {
      if (index === tasksForDay.length - 1 && task?.tasks.length > 0) {
        let lastTaskInfo = task?.tasks[0];
        if (lastTaskInfo) {
          setMaxNoOfUnits(lastTaskInfo?.no_of_units);
        } else {
          setMaxNoOfUnits(0);
        }
      } else {
        setMaxNoOfUnits(0);
      }
      if (task?.dayDiffFromToday === 0) {
        currentDayIndexValue = index;
      }
      if (task?.dayDiffFromToday <= 0) {
        completedTasks += task?.completedCount; //completed tasks till current day

        totalTasksTillDay += task?.completedCount + task?.uncompletedCount; //total tasks till current day
      }
      totalCount += task?.completedCount + task?.uncompletedCount; //count for 10 days
    });
    if (maxNoOfUnits > 0) {
      let totalDaysTemp = Array.from({ length: maxNoOfUnits }, (_, i) => i + 1);
      setTotalDays(totalDaysTemp);
    }
    if (currentDayIndexValue === null) {
      setCurrentDayIndex(0);
      setTotalTasksCount(totalCount);
      setTaskProgress(true);
    } else if (currentDayIndexValue !== null && currentDayIndexValue >= 0) {
      setCurrentDayIndex(currentDayIndexValue);
      setIncompletedTasksCount(totalTasksTillDay - completedTasks);
      setTasksCountTillDate(totalTasksTillDay);
      setTotalTasksCount(totalCount);
      setProgressBarValue(
        Math.round(
          (completedTasks / totalTasksTillDay) *
            (Math.round(100 / maxNoOfUnits) * (currentDayIndexValue + 1))
        )
      );
    } else {
      setCurrentDayIndex(maxNoOfUnits - 1);
      setIncompletedTasksCount(totalTasksTillDay - completedTasks);
      setTasksCountTillDate(totalTasksTillDay);
      setTotalTasksCount(totalCount); //total tasks count of 10 days for previous bids
      setProgressBarValue(
        Math.round((completedTasks / totalTasksTillDay) * 100)
      );
    }

    if (tasksForDay[0]?.dayDiffFromToday > 0) {
      setCurrentDayIndex(currentDayIndexValue);
      setTaskProgress(false);
    } else {
      setTaskProgress(true);
    }

    return () => {
      setTaskProgress(false);
    };
  }, [tasksList, totalTasksCount]);
  // console.log('currentDayIndexValue', currentDayIndex);
  return (
    <>
      {taskProgress && (
        <div className="progress-bar">
          {totalDays &&
            totalDays.length > 0 &&
            totalDays.map((day, index) => {
              return (
                <div
                  key={index}
                  className={
                    currentDayIndex === index
                      ? 'indicator-icon show'
                      : 'indicator-icon hidden'
                  }
                  style={{
                    width:
                      currentDayIndex === 0
                        ? 0
                        : day * Math.round(100 / maxNoOfUnits) + '%'
                  }}
                >
                  <div
                    className={
                      day === maxNoOfUnits
                        ? 'indicator-day day-ten'
                        : 'indicator-day'
                    }
                  >
                    <DayIndicator />
                    <span className={day === maxNoOfUnits ? 'ten' : ''}>
                      {currentDayIndex === 0 ? `Day 0` : `Day ${day}`}
                    </span>
                  </div>
                </div>
              );
            })}
          <LinearProgress variant="determinate" value={progressBarValue} />
          {taskProgress && (
            <div className="task-status">
              {/* NO tasks assigned */}
              {totalTasksCount === 0 && (
                <Typography className="task-text no-task">
                  No Tasks Assigned <StatusNegative className="status-icon" />{' '}
                </Typography>
              )}

              {/* NO tasks assigned Till date*/}
              {totalTasksCount > 0 &&
                tasksCountTillDate === 0 &&
                currentDayIndex !== 0 && (
                  <Typography className="task-text no-task">
                    No Tasks Assigned Till Date
                    <StatusNegative className="status-icon" />{' '}
                  </Typography>
                )}
              {/* Incompleted tasks*/}
              {totalTasksCount > 0 &&
                tasksCountTillDate > 0 &&
                incompletedTasksCount > 0 && (
                  <Typography className="task-text incomplete">
                    Incomplete Task(s){' '}
                    <StatusExclamation className="status-icon" />{' '}
                  </Typography>
                )}

              {/* Completed tasks*/}
              {totalTasksCount > 0 &&
                tasksCountTillDate > 0 &&
                incompletedTasksCount === 0 && (
                  <Typography className="task-text up-to-date">
                    Task Up-to-Date <StatusCheck className="status-icon" />{' '}
                  </Typography>
                )}
              <Typography className="task-no">
                {totalTasksCount} Tasks
              </Typography>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default ProgressIndicator;
