// @flow
import React from 'react';
import Task from './Task';
import { Add } from '../../svg';

type Props = {
  tasks: Array<Object>
};

const TasksList = ({ tasks }: Props) => {
  return (
    <div className="tasksList-wrapper">
      <div className="tasksList-title-wrapper">
        <p className="tasksList-title">Questions</p>
        <div className="tasksList-add-icon-wrapper">
          <Add className="tasksList-add-icon" />
        </div>
      </div>
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
