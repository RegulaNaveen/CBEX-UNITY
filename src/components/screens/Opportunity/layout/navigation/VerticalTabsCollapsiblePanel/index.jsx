/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/styles';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import {
  setActiveTabIndexAction,
  setVTabActiveIndexAction
} from '../../../../../../redux/actions/proposal-actions';
import NotesIcon from '../../../../../svg/Notes';
import QuestionsForCustomerIcon from '../../../../../svg/QuestionsForCustomer';
import ProposalTeamIcon from '../../../../../svg/ProposalTeam';
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
  } else {
    return '';
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
  }
});

function VerticalTabsCollapsiblePanel({
  renderPanel,
  showQuestionsForCustomerTab,
  showNotepadTab,
  showProposalTeamTab,
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
      dispatch(setVTabActiveIndexAction(0));
    }
  }, [showQuestionsForCustomerTab, showNotepadTab, showProposalTeamTab]);
  const tabArr = [
    { showQuestionsForCustomerTab },
    { showNotepadTab },
    { showProposalTeamTab }
  ];

  function handleTabChange(event, newActiveTab) {
    dispatch(setVTabActiveIndexAction(newActiveTab));
    onTabClick(newActiveTab);
  }
  const renderTab = () => {
    const tabs = tabArr.map(v => {
      if (v['showQuestionsForCustomerTab']) {
        return (
          <div onClick={e => handleTabChange(e, 0)}>
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
      if (v['showNotepadTab']) {
        return (
          <div onClick={e => handleTabChange(e, 1)}>
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
      if (v['showProposalTeamTab']) {
        return (
          <div onClick={e => handleTabChange(e, 2)}>
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
    });
    return <>{tabs}</>;
  };

  return (
    <div
      className={`vertical-tabs-collapsible-panel ${
        showQuestionsForCustomerTab || showNotepadTab || showProposalTeamTab
          ? ''
          : 'hide'
      }`}
    >
      {(showQuestionsForCustomerTab ||
        showNotepadTab ||
        showProposalTeamTab) && (
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
