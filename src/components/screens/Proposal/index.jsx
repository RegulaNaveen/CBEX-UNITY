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

  return (
    <div className="proposal-wrapper">
      This is the Proposal Screen
      <ProposalInfo data={data} />
      <TasksList />
    </div>
  );
};

export default Proposal;
