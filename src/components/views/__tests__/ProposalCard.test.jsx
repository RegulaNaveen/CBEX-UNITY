import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ProposalCard from '../ProposalCard';

afterEach(cleanup);

const props = {
  title: 'Proposal 1',
  opportunityName: 'Opportunity 1',
  daysRemain: 10,
  dueDate: '2023-02-16',
  customer: 'Acme Inc.',
  protocolNumber: 'P-12345',
  phase: 'Phase III',
  therapeuticArea: 'Oncology',
  verbatimIndication: 'Cancer treatment',
  proposalId: '12345',
  approvalsCount: 3,
  isApprovalCountPresent: true
};

describe('ProposalCard component', () => {
  it('renders with correct content', () => {
    const { getByText } = render(
      <Router>
        <ProposalCard {...props} />
      </Router>
    );

    expect(getByText(props.title)).toBeInTheDocument();
    expect(getByText(props.opportunityName)).toBeInTheDocument();
    expect(getByText(props.customer)).toBeInTheDocument();
    expect(getByText(props.protocolNumber)).toBeInTheDocument();
    expect(getByText(props.phase)).toBeInTheDocument();
    expect(getByText(props.therapeuticArea)).toBeInTheDocument();
    expect(getByText(props.verbatimIndication)).toBeInTheDocument();
    expect(getByText(props.dueDate)).toBeInTheDocument();
  });

  it('renders the strategy development button', () => {
    const { getByText } = render(
      <Router>
        <ProposalCard {...props} />
      </Router>
    );

    expect(getByText('Strategy Development')).toBeInTheDocument();
  });

  it('does not render the approvals count if it is not present', () => {
    const newProps = { ...props, isApprovalCountPresent: false };
    const { queryByText } = render(
      <Router>
        <ProposalCard {...newProps} />
      </Router>
    );

    expect(queryByText('3')).not.toBeInTheDocument();
  });
});
