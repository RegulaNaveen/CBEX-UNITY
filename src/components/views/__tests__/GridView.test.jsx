import React from 'react';
import { render, screen } from '@testing-library/react';
import GridView from '../GridView';

describe('GridView component', () => {
  test('displays a message when no data is provided', () => {
    render(<GridView data={[]} />);
    expect(screen.getByText('No data to show')).toBeInTheDocument();
  });

  test.skip('displays proposals when data is provided', () => {
    const data = [
      {
        opportunityName: 'Opportunity 1',
        customer: 'Customer 1',
        verbatimIndication: 'Indication 1',
        proposalId: 'P1',
      },
      {
        opportunityName: 'Opportunity 2',
        customer: 'Customer 2',
        verbatimIndication: 'Indication 2',
        proposalId: 'P2',
      },
    ];

    render(<GridView data={data} />);
    expect(screen.getByText('Opportunity 1')).toBeInTheDocument();
    expect(screen.getByText('Customer 1')).toBeInTheDocument();
    expect(screen.getByText('Indication 1')).toBeInTheDocument();
    expect(screen.getByText('Opportunity 2')).toBeInTheDocument();
    expect(screen.getByText('Customer 2')).toBeInTheDocument();
    expect(screen.getByText('Indication 2')).toBeInTheDocument();
  });
});
