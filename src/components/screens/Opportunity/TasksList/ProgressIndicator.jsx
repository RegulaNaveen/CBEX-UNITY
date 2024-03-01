import React, { useEffect, useState } from 'react';
import LinearProgress from 'apollo-react/components/LinearProgress';
import Typography from 'apollo-react/components/Typography';
import StatusExclamation from 'apollo-react-icons/StatusExclamation';
import StatusCheck from 'apollo-react-icons/StatusCheck';
import StatusNegative from 'apollo-react-icons/StatusNegative';
import { DayIndicator } from '../../../svg';

const ProgressIndicator = ({ tasksList }) => {
  const [totalTasksCount, setTotalTasksCount] = useState(0); //total tasks count

  const [progressBarValue, setProgressBarValue] = useState(0); //progress bar value

  const [currentDayIndex, setCurrentDayIndex] = useState(null); //current day index

  const [tasksCountTillDate, setTasksCountTillDate] = useState(0); //tasks count till date (current day)

  const [incompletedTasksCount, setIncompletedTasksCount] = useState(0); //incompleted tasks count

  const [taskProgress, setTaskProgress] = useState(false); //task progress

  const [totalDays, setTotalDays] = useState([]); //total days count

  const [maxNoOfUnits, setMaxNoOfUnits] = useState(0); //max no of units

  useEffect(() => {
    let completedTasks = 0;
    let totalCount = 0;
    let totalTasksTillDay = 0;
    let currentDayIndexValue = null;
    setTaskProgress(false);
    const tasksForDay = Object.values(tasksList);
    if (tasksForDay.length === 0) return;
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
    if (currentDayIndexValue !== null && currentDayIndexValue >= 0) {
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
      setTaskProgress(true);
    } else {
      setTaskProgress(true);
    }

    return () => {
      setTaskProgress(false);
    };
  }, [tasksList, totalTasksCount]);
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
                      : currentDayIndex === null && index === 0
                      ? 'indicator-icon show day-zero'
                      : 'indicator-icon hidden'
                  }
                  style={{
                    width:
                      currentDayIndex === null
                        ? 0
                        : day * Math.round(100 / maxNoOfUnits) + '%'
                  }}
                >
                  <div
                    className={
                      day === maxNoOfUnits
                        ? 'indicator-day day-ten'
                        : currentDayIndex === null && index === 0
                        ? 'indicator-day day-zero'
                        : 'indicator-day'
                    }
                  >
                    <DayIndicator />
                    <span className={day === maxNoOfUnits ? 'ten' : ''}>
                      {currentDayIndex === null ? `Day 0` : `Day ${day}`}
                    </span>
                  </div>
                </div>
              );
            })}
          <LinearProgress
            variant="determinate"
            value={currentDayIndex === null ? 1 : progressBarValue}
          />
          {taskProgress && (
            <div className="task-status">
              {/* NO tasks assigned */}
              {totalTasksCount === 0 && (
                <Typography className="task-text no-task">
                  No Tasks Assigned <StatusNegative className="status-icon" />{' '}
                </Typography>
              )}

              {/* NO tasks assigned Till date*/}
              {totalTasksCount > 0 && tasksCountTillDate === 0 && (
                <Typography
                  className={
                    currentDayIndex === null
                      ? 'task-text no-task hidden-text'
                      : 'task-text no-task'
                  }
                >
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
