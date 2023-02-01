import React from 'react';
import { render, screen } from '@testing-library/react';
import ProposalTeamTab from '../index';

test('test for proposal team tab component', () => {
    render(<ProposalTeamTab />);
    const proposalteam = screen.getByText(/proposal team/i);
    expect(proposalteam).toBeInTheDocument();
})