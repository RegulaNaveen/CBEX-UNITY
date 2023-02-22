import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GridView from '../GridView';

describe('GridView component', () => {
  test('displays a message when no data is provided', () => {
    render(<GridView data={[]} />);
    expect(screen.getByText('No data to show')).toBeInTheDocument();
  });

  test('displays proposals when data is provided', () => {
    const data = [
      {
        'opportunity number': 1,
        'verbatim indication': 'Indication 1',
        'opportunity number': 1,
        'protocol number': 1,
        'protocol number': 1,
        opportunityName: 'Opportunity 1',
        customer: 'Customer 1',
        proposalId: 'P1',
        dueDate: '2-JAN-2024',
        phase: 1,
        approvalsCount: 1,
        isApprovalCountPresent: true
      },
      {
        opportunityName: 'Opportunity 2',
        customer: 'Customer 2',
        proposalId: 'P2',
        'verbatim indication': 'Indication 2'
      }
    ];
    const allFlags = {
      showTimelineFlag: true
    };
    render(
      <BrowserRouter>
        <GridView data={data} allFlags={allFlags} />
      </BrowserRouter>
    );
    expect(screen.getByText('Opportunity 1')).toBeInTheDocument();
    expect(screen.getByText('Customer 1')).toBeInTheDocument();
    expect(screen.getByText('Indication 1')).toBeInTheDocument();
    expect(screen.getByText('Opportunity 2')).toBeInTheDocument();
    expect(screen.getByText('Customer 2')).toBeInTheDocument();
    expect(screen.getByText('Indication 2')).toBeInTheDocument();
  });

  test('check for timeline button click', () => {
    const data = [
      {
        'opportunity number': 2,
        opportunityName: 'Opportunity 2',
        customer: 'Customer 2',
        proposalId: 'P2',
        'verbatim indication': 'Indication 2'
      }
    ];
    const allFlags = {
      showTimelineFlag: true
    };
    render(
      <BrowserRouter>
        <GridView data={data} allFlags={allFlags} />
      </BrowserRouter>
    );

    const timelineButton = screen.getByRole('link', { name: 'Artboard' });
    fireEvent.click(timelineButton);
  });
});
