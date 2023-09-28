import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import VerticalTabsCollapsiblePanel from '../VerticalTabsCollapsiblePanel';
import { Provider } from 'react-redux';
import { store } from '../../../../../../store';

const VerticalTabsCollapsiblePanelWithRedux = props => (
  <Provider store={store}>
    <VerticalTabsCollapsiblePanel {...props} />
  </Provider>
);

describe('verticalTabs test cases', () => {
  it('should render verticaltabs with QuestionsForCustomerTab by default', () => {
    const { getByTestId } = render(
      <VerticalTabsCollapsiblePanelWithRedux
        showQuestionsForCustomerTab
        showNotepadTab
        showProposalTeamTab
        showKeyMilestoneDeliverableTab
        showEmailTemplatesTab
        renderPanel={activeTab => {
          if (activeTab === 'showQuestionsForCustomerTab') {
            return <div data-testid="vtab-1" />;
          }
          if (activeTab === 'showNotepadTab') {
            return <div data-testid="vtab-2" />;
          }
          if (activeTab === 'proposalteamtab') {
            return <div data-testid="vtab-3" />;
          }
          if (activeTab === 'keymilestonedeliverabletab') {
            return <div data-testid="vtab-4" />;
          }
          if (activeTab === 'showEmailTemplatesTab') {
            return <div data-testid="vtab-5" />;
          }
        }}
      />
    );
    expect(getByTestId('vtab-4')).toBeInTheDocument();
  });

  it('should hide questionsforcustomer tab when flag is off and render notepad', () => {
    const { getByTestId } = render(
      <VerticalTabsCollapsiblePanelWithRedux
        showQuestionsForCustomerTab
        showNotepadTab
        showProposalTeamTab
        showKeyMilestoneDeliverableTab
        showEmailTemplatesTab
        renderPanel={activeTab => {
          if (activeTab === 'showQuestionsForCustomerTab') {
            return <div data-testid="vtab-1" />;
          }
          if (activeTab === 'showNotepadTab') {
            return <div data-testid="vtab-2" />;
          }
          if (activeTab === 'proposalteamtab') {
            return <div data-testid="vtab-3" />;
          }
          if (activeTab === 'keymilestonedeliverabletab') {
            return <div data-testid="vtab-4" />;
          }
          if (activeTab === 'showEmailTemplatesTab') {
            return <div data-testid="vtab-5" />;
          }
        }}
      />
    );
    expect(getByTestId('vtab-4')).toBeInTheDocument();
  });

  it('should show only proposal team tab when other flags are off', () => {
    const { getByTestId, queryByTestId } = render(
      <VerticalTabsCollapsiblePanelWithRedux
        showQuestionsForCustomerTab={false}
        showNotepadTab={false}
        showProposalTeamTab
        showKeyMilestoneDeliverableTab
        showEmailTemplatesTab
        renderPanel={activeTab => {
          if (activeTab === 'showQuestionsForCustomerTab') {
            return <div data-testid="vtab-1" />;
          }
          if (activeTab === 'showNotepadTab') {
            return <div data-testid="vtab-2" />;
          }
          if (activeTab === 'proposalteamtab') {
            return <div data-testid="vtab-3" />;
          }
          if (activeTab === 'keymilestonedeliverabletab') {
            return <div data-testid="vtab-4" />;
          }
          if (activeTab === 'showEmailTemplatesTab') {
            return <div data-testid="vtab-5" />;
          }
        }}
      />
    );
    expect(getByTestId('vtab-3')).toBeInTheDocument();
    expect(queryByTestId('vtab-2')).not.toBeInTheDocument();
  });
});
