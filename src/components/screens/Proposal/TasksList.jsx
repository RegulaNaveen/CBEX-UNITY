// @flow
import React from 'react';
import Task from './Task';

type Props = {
  tasks: Array<Object>
};

function TasksList({ tasks }: Props) {
  return (
    <div className="tasksList-wrapper">
      <div className="tasksList-title">Questions</div>
      {tasks.map(task => {
        const { complete, data, title, incomplete } = task;
        return (
          <div>
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
