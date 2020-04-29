// @flow
import React from 'react';
import { Map } from 'immutable';
import Task from './Task';

type Props = {
  tasks: Map
};

const TasksList = ({ tasks }: Props) => {
  return (
    <div className="tasksList-wrapper">
      {tasks.map(task => {
        const data = [
          {
            id: 1,
            question: 'Question',
            answer: 'Answer',
            owner: ['Owner', 'Pedro'],
            dueDate: '02-Apr-2020',
            completionDate: '02-Apr-2020',
            complete: true
          },
          {
            id: 2,
            question: 'Question',
            answer: 'Answer',
            owner: ['Awner', 'Homer', 'jesus'],
            dueDate: '02-Apr-2020',
            completionDate: '02-Apr-2020',
            complete: true
          }
        ];
        const complete = true;
        const incomplete = 4;
        return (
          <Task
            data={data}
            title={task}
            isComplete={complete}
            uncompletedQuestions={incomplete}
            key={task}
          />
        );
      })}
    </div>
  );
};

export default TasksList;
