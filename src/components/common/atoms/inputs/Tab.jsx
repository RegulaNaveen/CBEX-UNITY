import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import { useSelector } from 'react-redux';
import Questions from '../../../screens/Opportunity/Questions';
import Documents from '../../../screens/Opportunity/Documents';
import Validate from '../../../screens/Opportunity/Validate';
import featureFlags from '../../../../constants/featureFlags';
import launchDarkly from '../../../../utils/launchDarkly';
import {
  getOpportunityData,
  getSelectedBid
} from '../../../../redux/selectors/proposal';
import Approvals from '../../../screens/Approvals/index';

const UnityTab = ({
  id,
  enableValidateTab,
  selectedView,
  onChangeSelectedTab
}) => {
  const [value, setValue] = useState(0);
  const [approvalsFlag, setApprovalsFlag] = useState(false);
  const [showApprovalTab, setShowApprovalTab] = useState(false);

  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const isApprovalCount = selectedBid?.isApprovalCountPresent || false;
  const oppData = useSelector(getOpportunityData)?.toJS();
  const memoizeBid = useMemo(() => selectedBid, [selectedBid?.id]);
  const proposalID = memoizeBid?.id;
  const history = useHistory();

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

  useEffect(() => {
    if (isApprovalCount) {
      setShowApprovalTab(true);
    } else {
      setShowApprovalTab(false);
    }
  }, []);

  useEffect(() => {
    if (selectedView && selectedView === 'documents') {
      setValue(tabs.find(item => item.label === 'Documents').value);
    }
    if (selectedView && selectedView === 'approvals') {
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
          {visibleTabs().map(item => {
            return value === item.value && item.component;
          })}
        </div>
      </>
    );
  };
  return <div className="tab-container">{renderTab()}</div>;
};

export default UnityTab;
