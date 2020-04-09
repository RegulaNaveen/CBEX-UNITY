// @flow
import React from 'react';
import ProposalInfo from './ProposalInfo';
import TasksList from './TasksList';

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
          question: 'Question',
          answer: 'Answer',
          owner: ['Owner', 'Pedro'],
          dueDate: '02-Apr-2020',
          completionDate: '02-Apr-2020',
          complete: true
        },
        {
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
          question: 'Question',
          answer: 'Answer',
          owner: ['Owner', 'Pedro'],
          dueDate: '02-Apr-2020',
          completionDate: '02-Apr-2020',
          complete: false
        },
        {
          question: 'Question',
          answer: 'Answer',
          owner: ['Awner', 'Homer', 'jesus'],
          dueDate: '02-Apr-2020',
          completionDate: '02-Apr-2020',
          complete: false
        },
        {
          question: 'Question',
          answer: 'Answer',
          owner: ['Awner', 'Homer', 'jesus'],
          dueDate: '02-Apr-2020',
          completionDate: '02-Apr-2020',
          complete: true
        },
        {
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
          question: 'Question',
          answer: 'Answer',
          owner: ['Owner', 'Pedro'],
          dueDate: '02-Apr-2020',
          completionDate: '02-Apr-2020',
          complete: true
        },
        {
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

  return (
    <div className="proposal-wrapper">
      This is the Proposal Screen
      <ProposalInfo data={data} />
      <TasksList tasks={tasks} />
    </div>
  );
};

export default Proposal;
