import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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

  it('should show only proposal team tab when other flags are off', async () => {
    const { getByTestId, queryByTestId } = await render(
      <VerticalTabsCollapsiblePanelWithRedux
        showQuestionsForCustomerTab={false}
        showNotepadTab={false}
        showProposalTeamTab={true}
        showKeyMilestoneDeliverableTab={false}
        showEmailTemplatesTab={false}
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
    expect(await getByTestId('vtab-3')).toBeInTheDocument();
    expect(await queryByTestId('vtab-2')).not.toBeInTheDocument();
  });

  it('VerticalTabsCollapsiblePanelWithRedux', async () => {
    const { getByText, container } = await render(
      <VerticalTabsCollapsiblePanelWithRedux
        showQuestionsForCustomerTab={true}
        showNotepadTab={true}
        showProposalTeamTab={true}
        showKeyMilestoneDeliverableTab={true}
        showEmailTemplatesTab={true}
        showTasklistTab={true}
        renderPanel={jest.fn()}
        onTabClick={jest.fn()}
      />
    );
    fireEvent.click(getByText('Questions for Customer'));
    fireEvent.click(getByText('Notes'));
    fireEvent.click(getByText('Team'));
    fireEvent.click(getByText('Key Milestones & Deliverable Timelines'));
    fireEvent.click(getByText('Email Templates'));
    fireEvent.click(container.querySelector('#vTab-tasklist'));
  });
});
