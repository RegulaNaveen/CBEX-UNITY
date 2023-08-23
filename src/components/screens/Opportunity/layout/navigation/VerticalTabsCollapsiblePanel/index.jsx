/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/styles';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import {
  setActiveTabIndexAction,
  setVTabActiveIndexAction
} from '../../../../../../redux/actions/proposal-actions';
import NotesIcon from '../../../../../svg/Notes';
import QuestionsForCustomerIcon from '../../../../../svg/QuestionsForCustomer';
import ProposalTeamIcon from '../../../../../svg/ProposalTeam';
import KeyMilestoneDeliverableTimelinesIcon from '../../../../../svg/KeyMilestoneDeliverableTimelines';
import './styles.scss';
import { selectActiveVTabIndex } from '../../../../../../redux/selectors/proposal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function getTabNameFromIndex(index) {
  if (index === 0) {
    return 'showQuestionsForCustomerTab';
  } else if (index === 1) {
    return 'showNotepadTab';
  } else if (index === 2) {
    return 'proposalteamtab';
  } else if (index === 3) {
    return 'keymilestonedeliverabletab';
  }
}
const VerticalTabs = styled(Tabs)({
  '&::before': {
    borderBottom: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: '#ecf3ff'
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  }
});

// we use css to hide a tab because Apollo tabs implementation requires atleast one tab to be present as child
const VerticalTab = styled(Tab)({
  marginRight: 0,
  minWidth: '60px',
  '&.hide': {
    display: 'none'
  },
  alignItems: 'center',
  borderBottom: '2px solid #e0e0e0',
  paddingBottom: '7px'
});

function VerticalTabsCollapsiblePanel({
  renderPanel,
  showQuestionsForCustomerTab,
  showNotepadTab,
  showProposalTeamTab,
  showKeyMilestoneDeliverableTab,
  activeVerticleTab,
  onTabClick
}) {
  const activeTabIndex = useSelector(selectActiveVTabIndex);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!showQuestionsForCustomerTab) {
      if (!showNotepadTab) {
        dispatch(setVTabActiveIndexAction(2));
      } else {
        dispatch(setVTabActiveIndexAction(1));
      }
    } else {
      dispatch(setVTabActiveIndexAction(3));
    }
  }, [
    showQuestionsForCustomerTab,
    showNotepadTab,
    showProposalTeamTab,
    showKeyMilestoneDeliverableTab
  ]);
  const tabArr = [
    { showQuestionsForCustomerTab },
    { showNotepadTab },
    { showProposalTeamTab },
    { showKeyMilestoneDeliverableTab } // Add this line
  ];

  function handleTabChange(event, newActiveTab) {
    dispatch(setVTabActiveIndexAction(newActiveTab));
    onTabClick(newActiveTab);
  }
  const renderTab = () => {
    const tabs = tabArr.map((v, vIdx) => {
      if (
        v['showQuestionsForCustomerTab'] !== undefined &&
        v['showQuestionsForCustomerTab'] !== null
      ) {
        return (
          <div onClick={e => handleTabChange(e, 0)} key={`vTab-QFC-${vIdx}`}>
            <VerticalTab
              textColor="primary"
              icon={
                <QuestionsForCustomerIcon
                  fill={
                    getTabNameFromIndex(activeTabIndex) ===
                    'showQuestionsForCustomerTab'
                      ? '#0557d5'
                      : '#999999'
                  }
                />
              }
              className={`${showQuestionsForCustomerTab ? '' : 'hide'}`}
            />
          </div>
        );
      }

      if (v['showNotepadTab'] !== undefined && v['showNotepadTab'] !== null) {
        return (
          <div onClick={e => handleTabChange(e, 1)} key={`vTab-NOTE-${vIdx}`}>
            <VerticalTab
              textColor="primary"
              icon={
                <NotesIcon
                  fill={
                    getTabNameFromIndex(activeTabIndex) === 'showNotepadTab'
                      ? '#0557d5'
                      : '#999999'
                  }
                />
              }
              className={`${showNotepadTab ? '' : 'hide'}`}
            />
          </div>
        );
      }
      if (
        v['showProposalTeamTab'] !== undefined &&
        v['showProposalTeamTab'] !== null
      ) {
        return (
          <div onClick={e => handleTabChange(e, 2)} key={`vTab-TEAM-${vIdx}`}>
            <VerticalTab
              textColor="primary"
              icon={
                <ProposalTeamIcon
                  fill={
                    getTabNameFromIndex(activeTabIndex) === 'proposalteamtab'
                      ? '#0557d5'
                      : '#999999'
                  }
                />
              }
              className={`${showProposalTeamTab ? '' : 'hide'}`}
            />
          </div>
        );
      }
      if (
        v['showKeyMilestoneDeliverableTab'] !== undefined &&
        v['showKeyMilestoneDeliverableTab'] !== null
      ) {
        return (
          <div onClick={e => handleTabChange(e, 3)} key={`vTab-KMD-${vIdx}`}>
            <VerticalTab
              textColor="primary"
              icon={
                <KeyMilestoneDeliverableTimelinesIcon
                  fill={
                    getTabNameFromIndex(activeTabIndex) ===
                    'keymilestonedeliverabletab'
                      ? '#0557d5'
                      : '#999999 '
                  }
                />
              }
              // className={`${showKeyMilestoneDeliverableTab ? '' : 'hide'}`}
            />
          </div>
        );
      }
    });
    return tabs;
  };

  return (
    <div
      className={`vertical-tabs-collapsible-panel ${
        showQuestionsForCustomerTab ||
        showNotepadTab ||
        showProposalTeamTab ||
        showKeyMilestoneDeliverableTab
          ? ''
          : 'hide'
      }`}
    >
      {(showQuestionsForCustomerTab ||
        showNotepadTab ||
        showProposalTeamTab ||
        showKeyMilestoneDeliverableTab) && (
        <>
          <VerticalTabs
            value={activeTabIndex}
            onChange={handleTabChange}
            orientation="vertical"
          >
            {renderTab()}
          </VerticalTabs>
          {renderPanel(getTabNameFromIndex(activeTabIndex))}
        </>
      )}
    </div>
  );
}

export default VerticalTabsCollapsiblePanel;
