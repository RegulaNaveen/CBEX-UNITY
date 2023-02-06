/* eslint-disable no-else-return */
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import Panel from 'apollo-react/components/Panel';
import Spinner from 'react-loader-spinner';
import Typography from 'apollo-react/components/Typography';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import Validate from '../../../screens/Opportunity/Validate';
import {
  getSelectedBid,
  selectActiveTabIndex
} from '../../../../redux/selectors/proposal';
import {
  getIsOpen,
  getProposalDetails,
  getUserEmail,
  getUserRole
} from '../../../../redux/selectors';
import { setActiveTabIndexAction } from '../../../../redux/actions/proposal-actions';
import { createMatomoObj, saveDataInMatomo } from '../../../../utils/utils';
import { selectCurrentSearchResult } from '../../../../redux/selectors/search';
import { NOTEPAD_UI_ID } from '../../../../constants/app';
import { autoNavigationCompletedAction } from '../../../../redux/actions/search-actions';
import lazyWithRetry from '../../../../utils/lazy';
import VerticalTabsCollapsiblePanel from '../../../screens/Opportunity/layout/navigation/VerticalTabsCollapsiblePanel';

const Questions = React.lazy(() =>
  lazyWithRetry(() =>
    import(
      /* webpackChunkName: "Questions" */ '../../../screens/Opportunity/Questions'
    )
  )
);

const NotepadWrapper = React.lazy(() =>
  lazyWithRetry(() =>
    import(
      /* webpackChunkName: "Notepad" */ '../../../views/WysiwygNotepad/NotepadWrapper'
    )
  )
);
const Approvals = React.lazy(() =>
  lazyWithRetry(() =>
    import(
      /* webpackChunkName: "Approvals" */ '../../../screens/Approvals/index'
    )
  )
);
const Documents = React.lazy(() =>
  lazyWithRetry(() =>
    import(
      /* webpackChunkName: "Documents" */ '../../../screens/Opportunity/Documents'
    )
  )
);

const QuestionsForCustomer = React.lazy(() =>
  lazyWithRetry(() =>
    import(
      /* webpackChunkName: "QuestionsForCustomerTab" */ '../../../screens/Opportunity/QuestionsForCustomerTab'
    )
  )
);

const ProposalTeam = React.lazy(() =>
  lazyWithRetry(() =>
    import(
      /* webpackChunkName: "ProposalTeam" */ '../../../screens/Opportunity/ProposalTeam'
    )
  )
);

const UnityTab = ({
  id,
  enableValidateTab,
  selectedView,
  onChangeSelectedTab
}) => {
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
  const proposalId = selectedBid?.id || 1;
  const isApprovalCount = selectedBid?.isApprovalCountPresent || false;
  const history = useHistory();
  const isOpen = useSelector(state => getIsOpen(state));
  const proposalDetail = useSelector(state => getProposalDetails(state));
  const userEmail = useSelector(state => getUserEmail(state));
  const userRole = useSelector(state => getUserRole(state));
  const allFlags = useSelector(state => state.proposal.get('eventflag'));
  const value = useSelector(selectActiveTabIndex);
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const dispatch = useDispatch();

  const { trackEvent } = useMatomo();

  const panelRef = useRef(null);

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
    let verticalTabFlag = allFlags.verticalTab || false; // Vertical tab flag
    const questionsForCustomerFlag = allFlags.questionsForCustomerTab || false;
    const notepadFlag = allFlags.notepad || false; // Notepad flag
    const proposalTeamFlag = allFlags.proposalTeamTab || false; // Proposal Team flag
    const approvalFlag = allFlags.approvalsFlag || false;
    if (
      !verticalTabFlag ||
      ![questionsForCustomerFlag, notepadFlag, proposalTeamFlag].some(
        flag => !!flag
      )
    ) {
      verticalTabFlag = false;
    }
    setApprovalsFlag(approvalFlag);
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
      dispatch(
        setActiveTabIndexAction(
          tabs.find(item => item.label === 'Documents').value
        )
      );
    }
    if (selectedView && selectedView === 'approvals' && isApprovalCount) {
      const isApprovalTabVisible = approvalsFlag;
      const approvalTabValue = tabs.find(item => item.label === 'Approvals')
        .value;
      dispatch(
        setActiveTabIndexAction(isApprovalTabVisible ? approvalTabValue : 0)
      ); // Shows questions tab if Approvals are not found for the proposal
    }
    if (selectedView && selectedView === 'questions') {
      dispatch(setActiveTabIndexAction(0));
    }
  }, [selectedView, approvalsFlag, showApprovalTab]);

  useEffect(() => {
    if (currentSearchResult !== null && panelRef.current !== null) {
      if (
        currentSearchResult.vTab !== null &&
        currentSearchResult.vTab >= 0 &&
        currentSearchResult.vTab <= 2
      ) {
        if (!isNotepadOpen) {
          // by inspecting DOM, found there is only one button element inside Panel component hence choosing first button
          const toggleButton = panelRef.current.children[0].getElementsByTagName(
            'button'
          )[0];
          toggleButton.click();
        }
        setTimeout(() => {
          panelRef.current.scrollIntoView({
            behaviour: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
          dispatch(autoNavigationCompletedAction());
        }, 500);
      }
    }
  }, [dispatch, panelRef, currentSearchResult, isNotepadOpen]);

  const winLocationSearch = window.location.search;
  const handleChangeTab = (event, val) => {
    const selectView = new URLSearchParams(winLocationSearch);
    const currentTab = tabs.find(item => item.value === val);
    const currentPath = currentTab.path || '';
    dispatch(setActiveTabIndexAction(val));
    onChangeSelectedTab(currentPath);
    selectView.set('viewType', currentPath);
    if (val === 0) {
      // No need to update pathname for question tab
      history.push(`${window.location.pathname}`);
    } else {
      history.push(`${window.location.pathname}?${selectView.toString()}`);
    }
  };

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

  const renderVerticleTabsComponent = activeVerticleTab => {
    if (activeVerticleTab === 'showQuestionsForCustomerTab') {
      return (
        <div id="panel-notepad" style={{ borderRadius: '5px' }} ref={panelRef}>
          <Panel
            minWidth={notepadMinWidthPx}
            maxWidth={notepadMaxWidthPx}
            width={notepadMaxWidthPx}
            style={{ borderRadius: '5px' }}
            resizable
            onClose={() => {
              setIsNotepadOpen(false);
            }}
            onOpen={() => {
              setIsNotepadOpen(true);
            }}
          >
            <Suspense
              fallback={
                <Spinner
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
              }
            >
              <QuestionsForCustomer />
            </Suspense>
          </Panel>
        </div>
      );
    }
    if (activeVerticleTab === 'showNotepadTab') {
      /* Notepad */
      return (
        <div
          id="panel-notepad"
          style={{ borderRadius: '5px' }}
          className={classNames({
            'show-highlight':
              currentSearchResult !== null && currentSearchResult.vTab === 1
          })}
          ref={panelRef}
        >
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
              <Suspense
                fallback={
                  <Spinner
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
                }
              >
                <NotepadWrapper
                  key={proposalId}
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
              </Suspense>
            </div>
          </Panel>
        </div>
      );
    }
    if (activeVerticleTab === 'proposalteamtab') {
      return (
        <div id="panel-notepad" style={{ borderRadius: '5px' }} ref={panelRef}>
          <Panel
            minWidth={notepadMinWidthPx}
            maxWidth={notepadMaxWidthPx}
            width={notepadMaxWidthPx}
            style={{ borderRadius: '5px' }}
            resizable
            onClose={() => {
              setIsNotepadOpen(false);
            }}
            onOpen={() => {
              setIsNotepadOpen(true);
            }}
          >
            <Suspense
              fallback={
                <Spinner
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
              }
            >
              <ProposalTeam />
            </Suspense>
          </Panel>
        </div>
      );
    }
  };

  const renderTab = () => {
    let activeVerticleTab = null;
    if (!showQuestionsForCustomerTab) {
      if (!showNotepadTab) {
        activeVerticleTab = 'proposalteamtab';
      } else {
        activeVerticleTab = 'showNotepadTab';
      }
    } else {
      activeVerticleTab = 'showQuestionsForCustomerTab';
    }
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
          <div id="fullwidth-view-above-vertical-tabs" />
          <div style={{ display: 'flex', marginTop: '16px' }}>
            {isShowVerticalTab ? (
              <VerticalTabsCollapsiblePanel
                showQuestionsForCustomerTab={showQuestionsForCustomerTab}
                showNotepadTab={showNotepadTab}
                showProposalTeamTab={showProposalTeamTab}
                activeVerticleTab={activeVerticleTab}
                renderPanel={activeTab => {
                  // Check activeTab value and render required component
                  return <>{renderVerticleTabsComponent(activeTab)}</>;
                }}
              />
            ) : null}
            {visibleTabs().map(item => {
              return (
                <Suspense
                  fallback={
                    <Spinner
                      type="TailSpin"
                      color="#297DFD"
                      width={30}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        paddingLeft: '25%'
                      }}
                    />
                  }
                >
                  {value === item.value && item.component}
                </Suspense>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return <div className="tab-container">{renderTab()}</div>;
};

export default UnityTab;
