import React, { useEffect, useState } from 'react';
import LinearProgress from 'apollo-react/components/LinearProgress';
import Typography from 'apollo-react/components/Typography';
import StatusExclamation from 'apollo-react-icons/StatusExclamation';
import moment from 'moment';
import StatusCheck from 'apollo-react-icons/StatusCheck';
import StatusNegative from 'apollo-react-icons/StatusNegative';

const ProgressIndicator = ({ tasksList }) => {
  console.log('tasksList', tasksList);
  const [totalTasksCount, setTotalTasksCount] = useState(0); //total tasks count

  const [progressBarValue, setProgressBarValue] = useState(0); //progress bar value

  const [currentDayIndex, setCurrentDayIndex] = useState(null); //current day index

  const [tasksCountTillDate, setTasksCountTillDate] = useState(0); //tasks count till date (current day)

  const totalDays = Array.from({ length: 10 }, (v, i) => i + 1);

  const [incompletedTasksCount, setIncompletedTasksCount] = useState(0); //incompleted tasks count

  const [taskProgress, setTaskProgress] = useState(false);

  useEffect(() => {
    let completedTasks = 0;
    let totalCount = 0;
    let totalTasksTillDay = 0;
    let currentDayIndexValue = null;

    setTaskProgress(false);

    const tasksForDay = Object.values(tasksList);
    tasksForDay.forEach((task, index) => {
      if (task?.dayDiffFromToday === 0) {
        currentDayIndexValue = index;
      }
      if (task?.dayDiffFromToday <= 0) {
        // completedTasks += task?.tasks?.length - task?.uncompletedCount; //if completedcount not coming from backend
        completedTasks += task?.completedCount; //completed tasks till current day

        // totalTasksTillDay += task?.tasks?.length;
        totalTasksTillDay += task?.completedCount + task?.uncompletedCount; //total tasks till current day
      }
      totalCount += task?.completedCount + task?.uncompletedCount; //count for 10 days
      //   totalCount += task?.tasks?.length;
    });
    console.log('currentDayIndexValue', currentDayIndexValue);
    if (currentDayIndexValue !== null && currentDayIndexValue >= 0) {
      setCurrentDayIndex(currentDayIndexValue);
      setIncompletedTasksCount(totalTasksTillDay - completedTasks);
      setTasksCountTillDate(totalTasksTillDay);
      setTotalTasksCount(totalCount);
      setProgressBarValue(
        Math.round(
          (completedTasks / totalTasksTillDay) *
            (10 * (currentDayIndexValue + 1))
        )
      );
    } else {
      setCurrentDayIndex(9);
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
  }, [tasksList]);

  {
    /**
    Logic
    (completedTasks on that day / total tasks till that day) * (10 * how many days completed till that day)
    10 --- 100% (10 days of progress bar) 100/10= 10 days of progress bar  
    */
  }
  return (
    <>
      {taskProgress && (
        <div className="progress-bar">
          {totalDays.map((day, index) => {
            return (
              <div
                key={index}
                className={
                  currentDayIndex === index
                    ? 'indicator-icon show'
                    : 'indicator-icon hidden'
                }
                style={{ width: day * 10 + '%' }}
              >
                <span
                  className={day === 10 ? 'indicator-day ten' : 'indicator-day'}
                >{`Day ${day}`}</span>
                <span className="line">|</span>
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
              {totalTasksCount > 0 && tasksCountTillDate === 0 && (
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
