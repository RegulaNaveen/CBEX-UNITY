import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import VerticalTabsCollapsiblePanel from '../VerticalTabsCollapsiblePanel';

describe('verticalTabs test cases', () => {
  it('should render verticaltabs with QuestionsForCustomerTab by default', () => {
    const { getByTestId } = render(
      <VerticalTabsCollapsiblePanel
        showQuestionsForCustomerTab
        showNotepadTab
        showProposalTeamTab
        renderPanel={activeTab => {
          if (activeTab === 0) {
            return <div data-testid="vtab-1" />;
          }
          if (activeTab === 1) {
            return <div data-testid="vtab-2" />;
          }
          if (activeTab === 2) {
            return <div data-testid="vtab-3" />;
          }
        }}
      />
    );
    expect(getByTestId('vtab-1')).toBeInTheDocument();
  });

  it('should hide questionsforcustomer tab when flag is off and render notepad', () => {
    const { getByTestId } = render(
      <VerticalTabsCollapsiblePanel
        showQuestionsForCustomerTab={false}
        showNotepadTab
        showProposalTeamTab
        renderPanel={activeTab => {
          if (activeTab === 0) {
            return <div data-testid="vtab-1" />;
          }
          if (activeTab === 1) {
            return <div data-testid="vtab-2" />;
          }
          if (activeTab === 2) {
            return <div data-testid="vtab-3" />;
          }
        }}
      />
    );
    expect(getByTestId('vtab-2')).toBeInTheDocument();
  });

  it('should show only proposal team tab when other flags are off', () => {
    const { getByTestId, queryByTestId } = render(
      <VerticalTabsCollapsiblePanel
        showQuestionsForCustomerTab={false}
        showNotepadTab={false}
        showProposalTeamTab
        renderPanel={activeTab => {
          if (activeTab === 0) {
            return <div data-testid="vtab-1" />;
          }
          if (activeTab === 1) {
            return <div data-testid="vtab-2" />;
          }
          if (activeTab === 2) {
            return <div data-testid="vtab-3" />;
          }
        }}
      />
    );
    expect(getByTestId('vtab-3')).toBeInTheDocument();
    expect(queryByTestId('vtab-2')).not.toBeInTheDocument();
  });
});
