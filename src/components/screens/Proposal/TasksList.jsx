// @flow
import React from 'react';
import Task from './Task';

type Props = {
  tasks: Array<Object>
};

const TasksList = ({ tasks }: Props) => {
  return (
    <div className="tasksList-wrapper">
      <p className="tasksList-title">Questions</p>
      {tasks.map(task => {
        const { complete, data, title, incomplete } = task;
        return (
          <Task
            data={data}
            title={title}
            isComplete={complete}
            uncompletedQuestions={incomplete}
            key={title}
          />
        );
      })}
    </div>
  );
};

export default TasksList;
