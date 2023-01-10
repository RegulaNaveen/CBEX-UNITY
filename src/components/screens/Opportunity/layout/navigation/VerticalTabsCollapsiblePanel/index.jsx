import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/styles';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import { setVTabActiveIndexAction } from '../../../../../../redux/actions/proposal-actions';
import NotesIcon from '../../../../../svg/Notes';
import QuestionsForCustomerIcon from '../../../../../svg/QuestionsForCustomer';
import ProposalTeamIcon from '../../../../../svg/ProposalTeam';
import './styles.scss';
import { selectActiveVTabIndex } from '../../../../../../redux/selectors/proposal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

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
  showProposalTeamTab
}) {
  const activeTab = useSelector(selectActiveVTabIndex);
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

  function handleTabChange(event, newActiveTab) {
    dispatch(setVTabActiveIndexAction(newActiveTab));
  }

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
            value={activeTab}
            onChange={handleTabChange}
            orientation="vertical"
          >
            <VerticalTab
              icon={
                <QuestionsForCustomerIcon
                  fill={activeTab === 0 ? '#0557d5' : '#999999'}
                />
              }
              className={`${showQuestionsForCustomerTab ? '' : 'hide'}`}
            />
            <VerticalTab
              icon={
                <NotesIcon fill={activeTab === 1 ? '#0557d5' : '#999999'} />
              }
              className={`${showNotepadTab ? '' : 'hide'}`}
            />
            <VerticalTab
              icon={
                <ProposalTeamIcon
                  fill={activeTab === 2 ? '#0557d5' : '#999999'}
                />
              }
              className={`${showProposalTeamTab ? '' : 'hide'}`}
            />
          </VerticalTabs>
          {renderPanel(activeTab)}
        </>
      )}
    </div>
  );
}

export default VerticalTabsCollapsiblePanel;
