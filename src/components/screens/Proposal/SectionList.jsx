// @flow
import React from 'react';
import { Map } from 'immutable';
import Task from './Task';

type Props = {
  tasks: Map,
  tasksQuestions: Map
};

const SectionList = ({ tasks, tasksQuestions }: Props) => {
  return (
    <div className="tasksList-wrapper">
      {tasks.map(task => {
        const data = tasksQuestions[task];
        const complete = false;
        // TODO: Pass complete log to Task
        // const incomplete = 4;
        return (
          <Task
            data={data}
            title={task}
            isComplete={complete}
            // uncompletedQuestions={incomplete}
            key={task}
          />
        );
      })}
    </div>
  );
};

export default SectionList;
