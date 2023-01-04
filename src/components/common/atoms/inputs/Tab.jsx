import React, { useState, useEffect, useMemo, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import Panel from 'apollo-react/components/Panel';
import Typography from 'apollo-react/components/Typography';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import classNames from 'classnames';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import Questions from '../../../screens/Opportunity/Questions';
import Documents from '../../../screens/Opportunity/Documents';
import Validate from '../../../screens/Opportunity/Validate';
import featureFlags from '../../../../constants/featureFlags';
import launchDarkly from '../../../../utils/launchDarkly';
import {
  getOpportunityData,
  getSelectedBid
} from '../../../../redux/selectors/proposal';
import {
  getIsOpen,
  getProposalDetails,
  getUserEmail,
  getUserRole
} from '../../../../redux/selectors';
import Approvals from '../../../screens/Approvals/index';
import VerticalTabsCollapsiblePanel from '../../../screens/Opportunity/layout/navigation/VerticalTabsCollapsiblePanel';
import QuestionsForCustomer from '../../../screens/Opportunity/QuestionsForCustomerTab';
import WysiwygNotepad from '../../../views/WysiwygNotepad';
import ProposalTeam from '../../../screens/Opportunity/ProposalTeam';
import { createMatomoObj, saveDataInMatomo } from '../../../../utils/utils';
import NotesSocketContext from '../../../../context/notesSocketContext';

const UnityTab = ({
  id,
  enableValidateTab,
  selectedView,
  onChangeSelectedTab
}) => {
  const [value, setValue] = useState(0);
  const [approvalsFlag, setApprovalsFlag] = useState(false);
  const [showApprovalTab, setShowApprovalTab] = useState(false);
  const [isShowVerticalTab, setShowVerticalTab] = useState(false);
  const [
    showQuestionsForCustomerTab,
    setShowQuestionsForCustomerTab
  ] = useState(false);
  const [showNotepadTab, setShowNotepadTab] = useState(false);
  const [showProposalTeamTab, setShowProposalTeamTab] = useState(false);
  const [isNotepadOpen, setIsNotepadOpen] = useState(true);

  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const isApprovalCount = selectedBid?.isApprovalCountPresent || false;
  const oppData = useSelector(getOpportunityData)?.toJS();
  const memoizeBid = useMemo(() => selectedBid, [selectedBid?.id]);
  const proposalID = memoizeBid?.id;
  const history = useHistory();
  const isOpen = useSelector(state => getIsOpen(state));
  const proposalDetail = useSelector(state => getProposalDetails(state));
  const userEmail = useSelector(state => getUserEmail(state));
  const userRole = useSelector(state => getUserRole(state));

  const { trackEvent } = useMatomo();

  const socketContext = useContext(NotesSocketContext);

  const minPixelToExclude = 20;
  const notepadMinWidthPx =
    (window.innerWidth - minPixelToExclude) * (30 / 100); // 30% of the total screen size
  const notepadMaxWidthPx = isOpen
    ? notepadMinWidthPx
    : (window.innerWidth - minPixelToExclude) * (47 / 100); // 50% of the total screen size

  const tabs = [
    {
      label: 'Strategy Development',
      value: 0,
      component: <Questions key="Strategy Development" proposalID={id} />,
      path: 'questions'
    },
    {
      label: 'Approvals',
      value: 1,
      component: <Approvals key="Approvals" />,
      path: 'approvals'
    },
    {
      label: 'Documents',
      value: 2,
      component: <Documents key="Documents" />,
      path: 'documents'
    },
    {
      label: 'Validate',
      value: 3,
      component: <Validate key="Validate" />,
      path: 'validate'
    }
  ];

  async function fetchTabFlags() {
    // launchDarkly calls should be optimized
    let verticalTabFlag = await launchDarkly(featureFlags.VERTICAL_TAB, false); // Vertical tab flag
    const questionsForCustomerFlag = await launchDarkly(
      featureFlags.QUESTIONS_FOR_CUSTOMER_TAB,
      false
    ); // Questions for the customer flag
    const notepadFlag = await launchDarkly(featureFlags.NOTEPAD_TAB, false); // Notepad flag
    const proposalTeamFlag = await launchDarkly(
      featureFlags.PROPOSAL_TEAM_TAB,
      false
    ); // Proposal Team flag

    if (
      !verticalTabFlag ||
      ![questionsForCustomerFlag, notepadFlag, proposalTeamFlag].some(
        flag => !!flag
      )
    ) {
      verticalTabFlag = false;
    }
    setShowVerticalTab(verticalTabFlag);
    setShowQuestionsForCustomerTab(questionsForCustomerFlag);
    setShowNotepadTab(notepadFlag);
    setShowProposalTeamTab(proposalTeamFlag);
  }

  useEffect(() => {
    fetchTabFlags();
    if (isApprovalCount) {
      setShowApprovalTab(true);
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      setShowApprovalTab(false);
      if (urlParams && urlParams?.get('viewType')?.includes('approval')) {
        history.push(`${window.location.pathname}`);
        if (window && window.scrollTo) {
          window.scrollTo(0, 0);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (selectedView && selectedView === 'documents') {
      setValue(tabs.find(item => item.label === 'Documents').value);
    }
    if (selectedView && selectedView === 'approvals' && isApprovalCount) {
      const isApprovalTabVisible = approvalsFlag;
      const approvalTabValue = tabs.find(item => item.label === 'Approvals')
        .value;
      setValue(isApprovalTabVisible ? approvalTabValue : 0); // Shows questions tab if Approvals are not found for the proposal
    }
    if (selectedView && selectedView === 'questions') {
      setValue(0);
    }
  }, [selectedView, approvalsFlag, showApprovalTab]);

  const winLocationSearch = window.location.search;
  const handleChangeTab = (event, val) => {
    const selectView = new URLSearchParams(winLocationSearch);
    const currentTab = tabs.find(item => item.value === val);
    const currentPath = currentTab.path || '';
    setValue(val);
    onChangeSelectedTab(currentPath);
    selectView.set('viewType', currentPath);
    if (val === 0) {
      // No need to update pathname for question tab
      history.push(`${window.location.pathname}`);
    } else {
      history.push(`${window.location.pathname}?${selectView.toString()}`);
    }
  };

  useEffect(() => {
    (async () => {
      const approvalFlag = await launchDarkly(featureFlags.APPROVALS, false);
      setApprovalsFlag(approvalFlag);
    })();
  }, []);

  /**
   * Decides which tabs to be rendered
   * @returns Array of objects
   */
  const visibleTabs = () => {
    let tabsToReturn = tabs;
    const isApprovalTab = approvalsFlag;
    if (!isApprovalTab || !showApprovalTab) {
      tabsToReturn = tabsToReturn.filter(item => item.label !== 'Approvals');
    }
    if (!enableValidateTab) {
      tabsToReturn = tabsToReturn.filter(item => item.label !== 'Validate');
    }
    return tabsToReturn;
  };

  const renderTab = () => {
    return (
      <>
        <Tabs
          value={value}
          onChange={handleChangeTab}
          truncate
          className="_question-tab"
        >
          {visibleTabs().map(item => {
            return (
              <Tab key={item.label} label={item.label} value={item.value} />
            );
          })}
        </Tabs>
        <div style={{ padding: 20, paddingTop: 5 }}>
          <div id="fullwidth-view-above-vertical-tabs"></div>
          <div style={{ display: 'flex', marginTop: '16px' }}>
            {isShowVerticalTab ? (
              <VerticalTabsCollapsiblePanel
                showQuestionsForCustomerTab={showQuestionsForCustomerTab}
                showNotepadTab={showNotepadTab}
                showProposalTeamTab={showProposalTeamTab}
                renderPanel={activeTab => {
                  // Check activeTab value and render required component
                  if (activeTab === 0) {
                    return (
                      <div id="panel-notepad" style={{ borderRadius: '5px' }}>
                        <Panel
                          minWidth={notepadMinWidthPx}
                          maxWidth={notepadMaxWidthPx}
                          width={notepadMaxWidthPx}
                          style={{ borderRadius: '5px' }}
                          resizable
                        >
                          <QuestionsForCustomer />
                        </Panel>
                      </div>
                    );
                  } else if (activeTab === 1) {
                    /* Notepad */
                    return (
                      <div id="panel-notepad" style={{ borderRadius: '5px' }}>
                        <Panel
                          minWidth={notepadMinWidthPx}
                          maxWidth={notepadMaxWidthPx}
                          width={notepadMaxWidthPx}
                          className="notepad-classoverride"
                          style={{ borderRadius: '5px' }}
                          resizable
                          onClose={() => {
                            setIsNotepadOpen(false);
                            const matamoObj = createMatomoObj(
                              proposalDetail,
                              userEmail,
                              userRole,
                              'closed event'
                            );
                            saveDataInMatomo(trackEvent, matamoObj);
                          }}
                          onOpen={() => {
                            setIsNotepadOpen(true);
                          }}
                        >
                          <div
                            className={classNames('panel-notepad-inner', {
                              hidden: !isNotepadOpen
                            })}
                          >
                            <div id="panel-notepad-header">
                              <Typography variant="h3">Notepad</Typography>
                            </div>

                            {socketContext.wsInstance ? (
                              <WysiwygNotepad
                                trackEvent={trackEvent}
                                eventCategories={{
                                  dp: 'Unity Dashboard',
                                  pd: props =>
                                    `Proposal Detail (CRM#: ${
                                      props && props.proposalDetail
                                        ? props.proposalDetail['CRM #']
                                        : ''
                                    })`,
                                  plainPd: `Proposal Detail`,
                                  tb: `ToolBar Menu`,
                                  pg: `Pagination`,
                                  crmNo: `Proposal Detail (CRM#: ${localStorage.getItem(
                                    'oppNo'
                                  ) || ''})`
                                }}
                              />
                            ) : (
                              <Loader
                                type="TailSpin"
                                color="#297DFD"
                                width={30}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  height: '100vh'
                                }}
                              />
                            )}
                          </div>
                        </Panel>
                      </div>
                    );
                  }
                  return (
                    <div id="panel-notepad" style={{ borderRadius: '5px' }}>
                      <Panel
                        minWidth={notepadMinWidthPx}
                        maxWidth={notepadMaxWidthPx}
                        width={notepadMaxWidthPx}
                        style={{ borderRadius: '5px' }}
                        resizable
                      >
                        <ProposalTeam />
                      </Panel>
                    </div>
                  );
                }}
              />
            ) : null}
            {visibleTabs().map(item => {
              return value === item.value && item.component;
            })}
          </div>
        </div>
      </>
    );
  };
  return <div className="tab-container">{renderTab()}</div>;
};

export default UnityTab;
