/* eslint-disable dot-notation */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import Panel from 'apollo-react/components/Panel';
import Spinner from 'react-loader-spinner';
import Typography from 'apollo-react/components/Typography';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useWindowSize } from '../../../../hooks';
import Validate from '../../../screens/Opportunity/Validate';
import {
  getChangeBidStatus,
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
  setPanelStatus,
  setVTabUserPreferenceAction,
  updateChangeBidStatusOperation
} from '../../../../redux/actions/proposal-actions';
import { createMatomoObj, saveDataInMatomo } from '../../../../utils/utils';
import { selectCurrentSearchResult } from '../../../../redux/selectors/search';
import { autoNavigationCompletedAction } from '../../../../redux/actions/search-actions';
import lazyWithRetry from '../../../../utils/lazy';
import VerticalTabsCollapsiblePanel from '../../../screens/Opportunity/layout/navigation/VerticalTabsCollapsiblePanel';
import Timelines from '../../../screens/Timelines';
import { checkTabRender } from '../../../screens/UnityTabs/utils';
import { setTabRefresh } from '../../../../redux/actions/unitytab-action';
import { DEFAULT_TABS_LEN } from '../../../../constants/app';

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
  const [tabLoaded, setTabloaded] = useState(false);
  const [isShowVerticalTab, setShowVerticalTab] = useState(false);
  const [
    showQuestionsForCustomerTab,
    setShowQuestionsForCustomerTab
  ] = useState(false);
  const switchTempStatus = useSelector(
    state => state.proposal?.toJSON()?.switchTempCallStatus
  );
  const tabRefresh = useSelector(state => state.unitytab.tabRefresh);
  const [showNotepadTab, setShowNotepadTab] = useState(false);
  const [showProposalTeamTab, setShowProposalTeamTab] = useState(false);
  const [isNotepadOpen, setIsNotepadOpen] = useState(true);
  const [vtabCollpased, setVTabCollapsed] = useState(false);
  const [systemTriggeredClick, setSystemTriggeredClick] = useState(false);
  const [currentRefreshRate, setRefreshTab] = useState('');
  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const proposalId = selectedBid?.id || 1;
  const isApprovalCount = selectedBid?.isApprovalCountPresent || false;
  const history = useHistory();
  const isOpen = useSelector(state => getIsOpen(state));
  const proposalDetail = useSelector(state => getProposalDetails(state));
  const userEmail = useSelector(state => getUserEmail(state));
  const userRole = useSelector(state => getUserRole(state));
  const changeBidStatus = useSelector(state => getChangeBidStatus(state));
  const allFlags = useSelector(state => state.proposal.get('eventflag'));
  const value = useSelector(selectActiveTabIndex);
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const vTabUserPreference = useSelector(selectVTabUserPreference);
  const customTabs = useSelector(state => state.unitytab.allTabs);
  const dispatch = useDispatch();
  const { trackEvent } = useMatomo();
  const [panelRef, setPanelRef] = useState(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const [newTab, setNewTab] = useState([]);
  const resolution = window.screen.availWidth;
  const minPixelToExclude = 20;
  const notepadMinWidthPx =
    (window.innerWidth - minPixelToExclude) * (30 / 100); // 30% of the total screen size
  const notepadMaxWidthPx = isOpen
    ? notepadMinWidthPx
    : (window.innerWidth - minPixelToExclude) * (47 / 100); // 50% of the total screen size
  const calculateTab = val => {
    const questionCount = val.some(v => v?.UnityTabSectionQuestions.length > 0);
    if (questionCount) {
      const final = val.map(c => {
        const result = checkTabRender(
          c.UnityTabSectionQuestions,
          selectedBid?.opportunityType
        );
        return result;
      });
      return final.some(c => c === true);
    }
    return false;
  };
  useEffect(() => {
    if (switchTempStatus === 'success' && tabs?.length > 5) {
      dispatch(setTabRefresh(`Refresh${Date.now().toString()}`));
    }
  }, [switchTempStatus]);

  useEffect(() => {
    if (resolution) {
      dispatch(setTabRefresh(`Refresh${Date.now().toString()}`));
    }
  }, [resolution]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentviewType = searchParams.get('bidNo');
    // without bid no url
    if (!currentviewType) {
      setTabloaded(false);
      if (tabs.length > 5) {
        const refreshTab = tabs.slice(0, 5);
        setTabs([...refreshTab]);
      }
      const tempTab = [];
      let len = 5;
      // eslint-disable-next-line no-restricted-syntax
      const orderedCustomTabs = Object.values(customTabs)
        .filter(
          sections =>
            sections.filter(section => section['UnityTabTitle']).length
        )
        .sort(
          (sectionsA, sectionsB) =>
            sectionsA[0].UnityTabOrder - sectionsB[0].UnityTabOrder
        );
      orderedCustomTabs.forEach(customTabSections => {
        const tabID = customTabSections[0]['UnityTabId'];
        const questionCount = customTabSections.some(
          v => v['UnityTabSectionQuestions'].length > 0
        );
        const filterTitle = customTabSections.filter(v => v['UnityTabTitle']);
        if (filterTitle.length && questionCount) {
          const title = String(filterTitle[0]['UnityTabTitle'])
            .trim()
            .toLowerCase();
          const tabpath = String(customTabSections[0]['UnityTabTitle'])
            .replace(' ', '_')
            .trim()
            .toLowerCase();
          const response = calculateTab(customTabSections);
          if (filterTitle && response) {
            tempTab.push({
              label: customTabSections[0]['UnityTabTitle'],
              value: len++,
              component: <CustomTabs tabId={tabID} key={title} />,
              path: tabpath
            });
          }
        }
      });
      setNewTab(tempTab);
      setTabloaded(true);
    }
  }, [customTabs, changeBidStatus]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentviewType = searchParams.get('bidNo');
    // without bid no url
    if (changeBidStatus && currentviewType) {
      if (tabs.length > 5) {
        const refreshTab = tabs.slice(0, 5);
        setTabs([...refreshTab]);
      }
      setTabloaded(false);
      const tempTab = [];
      let len = 5;
      // eslint-disable-next-line no-restricted-syntax
      const orderedCustomTabs = Object.values(customTabs)
        .filter(
          sections =>
            sections.filter(section => section['UnityTabTitle']).length
        )
        .sort(
          (sectionsA, sectionsB) =>
            sectionsA[0].UnityTabOrder - sectionsB[0].UnityTabOrder
        );
      orderedCustomTabs.forEach(customTabSections => {
        const tabID = customTabSections[0]['UnityTabId'];
        const questionCount = customTabSections.some(
          v => v['UnityTabSectionQuestions'].length > 0
        );
        const filterTitle = customTabSections.filter(v => v['UnityTabTitle']);
        if (filterTitle.length && questionCount) {
          const title = String(filterTitle[0]['UnityTabTitle'])
            .trim()
            .toLowerCase();
          const tabpath = String(customTabSections[0]['UnityTabTitle'])
            .replace(' ', '_')
            .trim()
            .toLowerCase();
          const response = calculateTab(customTabSections);
          if (filterTitle && response) {
            tempTab.push({
              label: customTabSections[0]['UnityTabTitle'],
              value: len++,
              component: <CustomTabs tabId={tabID} key={title} />,
              path: tabpath
            });
          }
        }
      });
      if (tempTab && !tempTab?.length) {
        setTabs(defaultTabs);
        const searchParams = new URLSearchParams(window.location.search);
        const currentviewType = searchParams.get('viewType');
        if (
          currentviewType &&
          currentviewType !== 'documents' &&
          currentviewType !== 'approvals' &&
          currentviewType !== 'timelines' &&
          currentviewType !== 'questions'
        ) {
          const className = '._question-tab > div > div > button:nth-child(1)';
          if (document && document.querySelector(className)) {
            document.querySelector(className).click();
          }
        }
      } else {
        setNewTab([...tempTab]);
      }
      setTabloaded(true);
      tempTab.length = 0;
    }
  }, [customTabs, changeBidStatus]);
  useEffect(() => {
    setRefreshTab(tabRefresh);
  }, [tabRefresh]);
  // Refresh Tab more button when switch template

  useEffect(() => {
    if (newTab && newTab?.length) {
      const finalTab = [...tabs, ...newTab];
      setTabs(finalTab);
      setNewTab([...[]]);
    }
  }, [newTab]);

  useEffect(() => {
    dispatch(setPanelStatus(vtabCollpased));
  }, [vtabCollpased]);

  useEffect(() => {
    if (
      tabs.length > 4 &&
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

  const evalAndSetVTabCollapse = useCallback(
    windowWidth => {
      // we can only make change if panelRef is captured
      if (panelRef !== null) {
        if (value === 1) {
          // do nothing. if active tab is timelines
          return;
        }
        let shouldvtabCollapsed = vtabCollpased;
        if (vtabCollpased && windowWidth < 850) {
          return;
        }
        if (windowWidth < 850) {
          shouldvtabCollapsed = true;
        } else {
          if (value === 0 || value >= DEFAULT_TABS_LEN) {
            shouldvtabCollapsed = false;
            if (vTabUserPreference && vTabUserPreference[value]) {
              shouldvtabCollapsed = vTabUserPreference[value].collapsed;
            }
          }
          if (value === 2) {
            shouldvtabCollapsed = true;
            if (vTabUserPreference && vTabUserPreference[2]) {
              shouldvtabCollapsed = vTabUserPreference[2].collapsed;
            }
          }
          if (value === 3) {
            shouldvtabCollapsed = true;
            if (vTabUserPreference && vTabUserPreference[3]) {
              shouldvtabCollapsed = vTabUserPreference[3].collapsed;
            }
          }
        }
        // triggering click event of Panel's toggle button since Apollo's Panel component lacks ability to control it through prop
        if (vtabCollpased !== shouldvtabCollapsed) {
          setSystemTriggeredClick(true);
          setVTabCollapsed(shouldvtabCollapsed);
        }
      }
    },
    [panelRef, vtabCollpased, vTabUserPreference]
  );

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
    let verticalTabFlag = allFlags.verticalTab || false;
    if (value === 1) {
      setShowVerticalTab(false);
    } else if (verticalTabFlag) {
      setShowVerticalTab(true);
    }
  }, [value, allFlags]);

  useEffect(() => {
    if (selectedView && selectedView === 'documents') {
      dispatch(
        setActiveTabIndexAction(
          tabs.find(item => item.label === 'Documents').value
        )
      );
    }
    if (selectedView && selectedView === 'approvals' && approvalsFlag) {
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
    if (selectedView && selectedView === 'timelines') {
      if (!allFlags?.showTimelineFlag) {
        history.push(`${window.location.pathname}`);
      } else {
        const timelinesTabValue = tabs.find(item => item.label === 'Timeline')
          .value;
        dispatch(setActiveTabIndexAction(timelinesTabValue));
      }
    }
  }, [selectedView, approvalsFlag]);

  useEffect(() => {
    evalAndSetVTabCollapse(window.innerWidth);
  }, [value, panelRef]);

  useEffect(() => {
    evalAndSetVTabCollapse(windowWidth);
  }, [windowWidth]);

  useEffect(() => {
    if (panelRef !== null && systemTriggeredClick) {
      setTimeout(() => {
        const toggleButton = panelRef.children[0].children[1];
        toggleButton.click();
      }, 500);
    }
  }, [panelRef, systemTriggeredClick]);

  useEffect(() => {
    if (currentSearchResult !== null && panelRef !== null) {
      if (
        currentSearchResult.vTab !== null &&
        currentSearchResult.vTab >= 0 &&
        currentSearchResult.vTab <= 2
      ) {
        if (!isNotepadOpen) {
          setSystemTriggeredClick(true);
        }
        setTimeout(() => {
          panelRef.scrollIntoView({
            behaviour: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
          dispatch(autoNavigationCompletedAction());
        }, 700);
      }
    }
  }, [currentSearchResult]);

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

  function handleVerticalTabClick(tab) {
    if (vtabCollpased) {
      setVTabCollapsed(false);
      if (panelRef !== null) {
        setTimeout(() => {
          const toggleButton = panelRef.children[0].children[1];
          toggleButton.click();
        }, 500);
      }
      dispatch(setVTabUserPreferenceAction(tab, true));
    }
  }

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
    tabsToReturn = tabsToReturn.map((vc, i) => {
      vc.value = i;
      return vc;
    });
    return tabsToReturn;
  };

  const renderVerticleTabsComponent = activeVerticleTab => {
    if (activeVerticleTab === 'showQuestionsForCustomerTab') {
      return (
        <div
          id="panel-notepad"
          style={{ borderRadius: '5px' }}
          ref={refVal => setPanelRef(refVal)}
          className={classNames({
            collapsed: vtabCollpased
          })}
        >
          <Panel
            minWidth={notepadMinWidthPx}
            maxWidth={notepadMaxWidthPx}
            width={notepadMaxWidthPx}
            style={{ borderRadius: '5px' }}
            resizable
            onClose={e => {
              setIsNotepadOpen(false);
              setVTabCollapsed(true);
              if (!systemTriggeredClick) {
                dispatch(setVTabUserPreferenceAction(value, true));
              }
              setSystemTriggeredClick(false);
            }}
            onOpen={e => {
              setIsNotepadOpen(true);
              setVTabCollapsed(false);
              if (!systemTriggeredClick) {
                dispatch(setVTabUserPreferenceAction(value, false));
              }
              setSystemTriggeredClick(false);
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
              currentSearchResult !== null && currentSearchResult.vTab === 1,
            collapsed: vtabCollpased
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
              setVTabCollapsed(true);
              if (!systemTriggeredClick) {
                dispatch(setVTabUserPreferenceAction(value, true));
              }
              setSystemTriggeredClick(false);
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
              setVTabCollapsed(false);
              if (!systemTriggeredClick) {
                dispatch(setVTabUserPreferenceAction(value, false));
              }
              setSystemTriggeredClick(false);
            }}
          >
            <div
              className={classNames('panel-notepad-inner', {
                hidden: !isNotepadOpen
              })}
            >
              <div id="panel-notepad-header">
                <Typography
                  variant="h3"
                  className={classNames('network-heading')}
                >
                  Notepad
                  <div
                    id="notepad-interrupt"
                    className={classNames('network-interrupt')}
                  />
                </Typography>
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
          className={classNames({
            collapsed: vtabCollpased
          })}
        >
          <Panel
            minWidth={notepadMinWidthPx}
            maxWidth={notepadMaxWidthPx}
            width={notepadMaxWidthPx}
            style={{ borderRadius: '5px' }}
            resizable
            onClose={() => {
              setIsNotepadOpen(false);
              setVTabCollapsed(true);
              if (!systemTriggeredClick) {
                dispatch(setVTabUserPreferenceAction(value, true));
              }
              setSystemTriggeredClick(false);
            }}
            onOpen={() => {
              setIsNotepadOpen(true);
              setVTabCollapsed(false);
              if (!systemTriggeredClick) {
                dispatch(setVTabUserPreferenceAction(value, false));
              }
              setSystemTriggeredClick(false);
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
        <div className="tab-size">
          <Tabs
            value={value}
            onChange={handleChangeTab}
            key={currentRefreshRate}
            truncate
            size="medium"
            className="_question-tab"
          >
            {visibleTabs().map(item => {
              return (
                <Tab key={item.label} label={item.label} value={item.value} />
              );
            })}
          </Tabs>
        </div>
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
                onTabClick={handleVerticalTabClick}
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
