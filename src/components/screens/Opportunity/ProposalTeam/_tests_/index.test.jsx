import React from 'react';
import { render, screen } from '@testing-library/react';
import ProposalTeamTab from '../index';
import { Provider } from 'react-redux';

test.skip('test for proposal team tab component', () => {
  render(
    <Provider>
      <ProposalTeamTab />
    </Provider>
  );
  const proposalteam = screen.getByText(/team/i);
  expect(proposalteam).toBeInTheDocument();
});
