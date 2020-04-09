// @flow
import React from 'react';
import Task from './Task';

type Props = {
  tasks: Array<Object>
};

function TasksList({ tasks }: Props) {
  return (
    <div className="tasksList-wrapper">
      <p className="tasksList-title">Questions</p>
      {tasks.map(task => {
        const { complete, data, title, incomplete } = task;
        return (
          <div key={title}>
            <Task
              data={data}
              title={title}
              complete={complete}
              incomplete={incomplete}
            />
            <div className="tasksList-separator" />
          </div>
        );
      })}
    </div>
  );
}

export default TasksList;
