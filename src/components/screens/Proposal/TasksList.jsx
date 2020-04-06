// @flow
import React from 'react';
import Task from './Task';

function TasksList() {
  return (
    <div className="tasksList-wrapper">
      <div className="tasksList-title">Questions</div>
      <Task />
    </div>
  );
}

export default TasksList;
