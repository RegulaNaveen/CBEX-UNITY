// @flow
import React from 'react';
import ProposalInfo from './ProposalInfo';
import TasksList from './TasksList';
import Toolbar from '../../Toolbar';
import { Add } from '../../svg';

const Proposal = () => {
  const data = {
    title: 'RFP-1028',
    accountExecutive: 'Jan Levinson-Gould',
    businessDevelopment: 'Dwight Schrute',
    proposalDirector: 'Michael Scott',
    labs: 'Kevin Malone',
    synopsis: true,
    phase: 2,
    sites: 12,
    countries: ['France', 'UK', 'Italy', 'Spain'],
    indication: 'Myopia'
  };

  const tasks = [
    {
      data: [
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
      ],
      complete: false,
      title: 'Resources',
      incomplete: 8
    },
    {
      data: [
        {
          id: 1,
          question: 'Question',
          answer: 'Answer',
          owner: ['Owner', 'Pedro'],
          dueDate: '02-Apr-2020',
          completionDate: '02-Apr-2020',
          complete: false
        },
        {
          id: 2,
          question: 'Question',
          answer: 'Answer',
          owner: ['Awner', 'Homer', 'jesus'],
          dueDate: '02-Apr-2020',
          completionDate: '02-Apr-2020',
          complete: false
        },
        {
          id: 3,
          question: 'Question',
          answer: 'Answer',
          owner: ['Awner', 'Homer', 'jesus'],
          dueDate: '02-Apr-2020',
          completionDate: '02-Apr-2020',
          complete: true
        },
        {
          id: 4,
          question: 'Question',
          answer: 'Answer',
          owner: ['Awner', 'Homer', 'jesus'],
          dueDate: '02-Apr-2020',
          completionDate: '02-Apr-2020',
          complete: true
        }
      ],
      complete: false,
      title: 'Labs',
      incomplete: 2
    },
    {
      data: [
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
      ],
      complete: true,
      title: 'Medical',
      incomplete: 0
    }
  ];

  // const { history } = props;

  return (
    <div className="proposal-wrapper">
      <Toolbar />
      <ProposalInfo data={data} />
      <div className="tasksList-title-wrapper">
        <p className="tasksList-title">Questions</p>
        <div
          className="tasksList-add-icon-wrapper"
          role="presentation"
          //onClick={this.handleModal}
        >
          <Add className="tasksList-add-icon" />
        </div>
      </div>
      <TasksList tasks={tasks} />
    </div>
  );
};

export default Proposal;
