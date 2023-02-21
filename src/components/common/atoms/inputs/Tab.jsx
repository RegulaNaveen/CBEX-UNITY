/* eslint-disable no-lonely-if */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable dot-notation */
/* eslint-disable no-restricted-syntax */
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense
} from 'react';
import { useHistory } from 'react-router-dom';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import Panel from 'apollo-react/components/Panel';
import Spinner from 'react-loader-spinner';
import Typography from 'apollo-react/components/Typography';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { debounce } from 'lodash';
import Validate from '../../../screens/Opportunity/Validate';
import {
  getSelectedBid,
  selectActiveTabIndex,
  selectVTabUserPreference
} from '../../../../redux/selectors/proposal';
import {
  getIsOpen,
  getProposalDetails,
  getUserEmail,
  getUserRole
} from '../../../../redux/selectors';
import {
  setActiveTabIndexAction,
  setVTabUserPreferenceAction
} from '../../../../redux/actions/proposal-actions';
import { createMatomoObj, saveDataInMatomo } from '../../../../utils/utils';
import { selectCurrentSearchResult } from '../../../../redux/selectors/search';
import { autoNavigationCompletedAction } from '../../../../redux/actions/search-actions';
import lazyWithRetry from '../../../../utils/lazy';
import VerticalTabsCollapsiblePanel from '../../../screens/Opportunity/layout/navigation/VerticalTabsCollapsiblePanel';
import Timelines from '../../../screens/Timelines';

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

const CustomTabs = React.lazy(() =>
  lazyWithRetry(() =>
    import(
      /* webpackChunkName: "Approvals" */ '../../../screens/UnityTabs/index'
    )
  )
);

const UnityTab = ({
  id,
  enableValidateTab,
  selectedView,
  onChangeSelectedTab
}) => {
  const defaultTabs = [
    {
      label: 'Strategy Development',
      value: 0,
      component: <Questions key="Strategy Development" proposalID={id} />,
      path: 'questions'
    },
    {
      label: 'Timeline',
      value: 1,
      component: <Timelines key="Timeline" proposalID={id} />,
      path: 'timelines'
    },
    {
      label: 'Approvals',
      value: 2,
      component: <Approvals key="Approvals" />,
      path: 'approvals'
    },
    {
      label: 'Documents',
      value: 3,
      component: <Documents key="Documents" />,
      path: 'documents'
    },
    {
      label: 'Validate',
      value: 4,
      component: <Validate key="Validate" />,
      path: 'validate'
    }
  ];
  const [tabs, setTabs] = useState(defaultTabs);
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
  const [vtabCollpased, setVTabCollapsed] = useState(false);

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
  const vTabUserPreference = useSelector(selectVTabUserPreference);
  const customTabs = useSelector(state => state.unitytab.allTabs);
  const dispatch = useDispatch();
  const { trackEvent } = useMatomo();
  const [panelRef, setPanelRef] = useState(null);

  const minPixelToExclude = 20;
  const notepadMinWidthPx =
    (window.innerWidth - minPixelToExclude) * (30 / 100); // 30% of the total screen size
  const notepadMaxWidthPx = isOpen
    ? notepadMinWidthPx
    : (window.innerWidth - minPixelToExclude) * (47 / 100); // 50% of the total screen size

  useEffect(() => {
    if (customTabs && Object.keys(customTabs)?.length > 0) {
      const newTab = [];
      let len = tabs.length;
      for (const [key, value] of Object.entries(customTabs)) {
        const tabID = value[0]['UnityTabId'];
        const questionCount = value.some(
          v => v['UnityTabSectionQuestions'].length > 0
        );
        const filterTitle = value.filter(v => v['UnityTabTitle']);
        if (filterTitle.length && questionCount) {
          const title = String(filterTitle[0]['UnityTabTitle'])
            .trim()
            .toLowerCase();
          newTab.push({
            label: filterTitle[0]['UnityTabTitle'],
            value: len++,
            component: <CustomTabs tabId={tabID} key={title} />,
            path: String(value[0]['UnityTabTitle'])
              .replace(' ', '_')
              .trim()
              .toLowerCase()
          });
        }
      }
      setTabs([...tabs, ...newTab]);
    }
  }, [customTabs]);

  useEffect(() => {
    if (
      tabs.length > 5 &&
      (selectedView !== 'documents' ||
        selectedView !== 'approval' ||
        selectedView !== 'timelines' ||
        selectedView !== 'questions')
    ) {
      const custompath = tabs.find(item => item.path === selectedView);
      dispatch(setActiveTabIndexAction(custompath?.value));
    }
  }, [tabs]);

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
    const urlParams = new URLSearchParams(window.location.search);
    if (isApprovalCount) {
      setShowApprovalTab(true);
    } else {
      setShowApprovalTab(false);
      if (urlParams && urlParams?.get('viewType')?.includes('approval')) {
        history.push(`${window.location.pathname}`);
        if (window && window.scrollTo) {
          window.scrollTo(0, 0);
        }
      }
    }
    if (
      urlParams &&
      urlParams?.get('viewType')?.includes('timelines') &&
      allFlags.showTimelineFlag
    )
      setShowVerticalTab(false);
  }, []);

  useEffect(() => {
    let shouldvtabCollapsed = vtabCollpased;
    if (selectedView && selectedView === 'documents') {
      dispatch(
        setActiveTabIndexAction(
          tabs.find(item => item.label === 'Documents').value
        )
      );
      shouldvtabCollapsed = true;
      if (vTabUserPreference && vTabUserPreference[3]) {
        shouldvtabCollapsed = !vTabUserPreference[3].keepOpen;
      }
    }
    if (selectedView && selectedView === 'approvals' && isApprovalCount) {
      const isApprovalTabVisible = approvalsFlag;
      const approvalTabValue = tabs.find(item => item.label === 'Approvals')
        .value;

      dispatch(
        setActiveTabIndexAction(isApprovalTabVisible ? approvalTabValue : 0)
      ); // Shows questions tab if Approvals are not found for the proposal
      shouldvtabCollapsed = isApprovalTabVisible ? true : false;
      if (vTabUserPreference && vTabUserPreference[2]) {
        shouldvtabCollapsed = !vTabUserPreference[2].keepOpen;
      }
    }
    if (selectedView && selectedView === 'questions') {
      dispatch(setActiveTabIndexAction(0));
      shouldvtabCollapsed = false;
      if (vTabUserPreference && vTabUserPreference[0]) {
        shouldvtabCollapsed = !vTabUserPreference[0].keepOpen;
      }
    }
    if (selectedView && selectedView === 'timelines') {
      if (!allFlags?.showTimelineFlag) {
        history.push(`${window.location.pathname}`);
      } else {
        const timelinesTabValue = tabs.find(item => item.label === 'Timeline')
          .value;
        dispatch(setActiveTabIndexAction(timelinesTabValue));
      }
    }

    // triggering click event of Panel's toggle button since Apollo's Panel component is lack of ability to control from prop
    if (
      panelRef !== null &&
      vtabCollpased !== shouldvtabCollapsed &&
      window.innerWidth >= 850
    ) {
      // by inspecting DOM, found there is only one button element inside Panel component hence choosing first button
      const toggleButton = panelRef.children[0].children[1];
      toggleButton.click();
      setVTabCollapsed(shouldvtabCollapsed);
    }
  }, [selectedView, approvalsFlag, showApprovalTab, vtabCollpased, panelRef]);

  useEffect(() => {
    if (panelRef !== null) {
      evaluateCurrentWindowWidth(window.innerWidth);
    }
  }, [panelRef]);

  useEffect(() => {
    if (currentSearchResult !== null && panelRef !== null) {
      if (
        currentSearchResult.vTab !== null &&
        currentSearchResult.vTab >= 0 &&
        currentSearchResult.vTab <= 2
      ) {
        if (!isNotepadOpen) {
          // by inspecting DOM, found there is only one button element inside Panel component hence choosing first button
          const toggleButton = panelRef.children[0].children[1];
          toggleButton.click();
        }
        setTimeout(() => {
          panelRef.scrollIntoView({
            behaviour: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
          dispatch(autoNavigationCompletedAction());
        }, 500);
      }
    }
  }, [dispatch, panelRef, currentSearchResult, isNotepadOpen]);

  const evaluateCurrentWindowWidth = useCallback(
    windowWidth => {
      let shouldCollapseVTab = vtabCollpased;
      if (windowWidth < 850) {
        shouldCollapseVTab = true;
      } else {
        if (selectedView && selectedView === 'questions' && vtabCollpased) {
          shouldCollapseVTab = false;
        }
      }
      // triggering click event of Panel's toggle button since Apollo's Panel component is lack of ability to control from prop
      if (panelRef !== null && vtabCollpased !== shouldCollapseVTab) {
        // by inspecting DOM, found there is only one button element inside Panel component hence choosing first button
        const toggleButton = panelRef.children[0].children[1];
        toggleButton.click();
        setVTabCollapsed(shouldCollapseVTab);
      }
    },
    [selectedView, vtabCollpased, panelRef]
  );

  const handleWindowResize = debounce(
    e => evaluateCurrentWindowWidth(e.target.innerWidth),
    600
  );

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    window.resizeBy(0, 0);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, [selectedView, vtabCollpased, panelRef]);

  const winLocationSearch = window.location.search;
  const handleChangeTab = (event, val) => {
    const selectView = new URLSearchParams(winLocationSearch);
    const currentTab = tabs.find(item => item.value === val);
    const currentPath = currentTab.path || '';
    dispatch(setActiveTabIndexAction(val));
    onChangeSelectedTab(currentPath);
    selectView.set('viewType', currentPath);
    if (selectView && selectView?.get('viewType')?.includes('timelines'))
      setShowVerticalTab(false);
    else if (allFlags.verticalTab) setShowVerticalTab(true);
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
    if (!allFlags?.showTimelineFlag) {
      tabsToReturn = tabsToReturn.filter(item => item.label !== 'Timeline');
    }
    if (!enableValidateTab) {
      tabsToReturn = tabsToReturn.filter(item => item.label !== 'Validate');
    }
    return tabsToReturn;
  };

  const renderVerticleTabsComponent = activeVerticleTab => {
    if (activeVerticleTab === 'showQuestionsForCustomerTab') {
      return (
        <div
          id="panel-notepad"
          style={{ borderRadius: '5px' }}
          ref={refVal => setPanelRef(refVal)}
        >
          <Panel
            minWidth={notepadMinWidthPx}
            maxWidth={notepadMaxWidthPx}
            width={notepadMaxWidthPx}
            style={{ borderRadius: '5px' }}
            resizable
            onClose={() => {
              setIsNotepadOpen(false);
              dispatch(setVTabUserPreferenceAction(value, false));
            }}
            onOpen={() => {
              setIsNotepadOpen(true);
              dispatch(setVTabUserPreferenceAction(value, true));
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
          ref={refVal => setPanelRef(refVal)}
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
              dispatch(setVTabUserPreferenceAction(value, false));
            }}
            onOpen={() => {
              setIsNotepadOpen(true);
              dispatch(setVTabUserPreferenceAction(value, true));
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
        <div
          id="panel-notepad"
          style={{ borderRadius: '5px' }}
          ref={refVal => setPanelRef(refVal)}
        >
          <Panel
            minWidth={notepadMinWidthPx}
            maxWidth={notepadMaxWidthPx}
            width={notepadMaxWidthPx}
            style={{ borderRadius: '5px' }}
            resizable
            onClose={() => {
              setIsNotepadOpen(false);
              dispatch(setVTabUserPreferenceAction(value, false));
            }}
            onOpen={() => {
              setIsNotepadOpen(true);
              dispatch(setVTabUserPreferenceAction(value, true));
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
