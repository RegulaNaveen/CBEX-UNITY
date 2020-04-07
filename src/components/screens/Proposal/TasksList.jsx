// @flow
import React from 'react';
import Task from './Task';

function TasksList() {
  return (
    <div className="tasksList-wrapper">
      <div className="tasksList-title">Questions</div>
      <Task collapsed />
      <div className="tasksList-separator" />
      <Task collapsed={false} />
    </div>
  );
}

export default TasksList;
