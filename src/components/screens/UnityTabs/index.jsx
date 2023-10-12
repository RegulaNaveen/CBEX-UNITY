/* eslint-disable react/prop-types */
import { isEmpty } from 'lodash';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import sortBy from 'lodash/sortBy';
import ClipboardCheck from 'apollo-react-icons/ClipboardCheck';
import Card from 'apollo-react/components/Card';
import Section from './Section';
import BidHistory from '../../common/Bidhistory';
import Filters from './Filters';
import FilterButton from './FilterButton';
import ViewAboveVerticalTabs from '../../views/ViewAboveVerticalTabs';
import {
  updateNewFilters,
  resetFiltersAction
} from '../../../redux/actions/unitytab-action';
import { shouldShowSection } from './utils';
import { Add, Refresh } from '../../svg';
import AddQuestionModalComponent from '../../views/modals/AddQuestionModal';

const CustomTabs = ({ tabId, key }) => {
  const allTab = useSelector(state => state.unitytab.allTabs);
  const allQuestion = useSelector(state =>
    state.proposal.get('proposalQuestions')
  );
  let tab = allTab[tabId];
  tab = sortBy(tab, [
    o => {
      return o.UnityTabSectionOrder;
    }
  ]);
  const [isShowFilters, setIsShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFiltersAction());
    let arr = [];
    for (let index = 0; index < tab?.length; index += 1) {
      const element = tab[index];
      const flag = shouldShowSection(element.UnityTabSectionId, tabId);
      if (flag) {
        arr.push(...element.UnityTabSectionQuestions);
      }
    }
    arr = arr.flat(1);
    const allquestion = allQuestion;

    let result = arr
      .map(v => {
        const res = allquestion.filter(
          c =>
            c.questionId === v &&
            c?.milestone &&
            c?.milestoneNew?.length > 0 &&
            c.active &&
            c.visible
        );
        if (res?.length) {
          return {
            displayName: res[0]?.milestone
          };
        }
      })
      .filter(v => v && typeof v === 'object' && Object.keys(v)?.length > 0);
    result = [...new Set(result.map(i => i.displayName))];

    if (result && result.length) {
      const resp = [];
      for (let index = 0; index < result.length; index += 1) {
        const element = result[index];
        const obj = {
          displayName: element,
          group: 'milestone',
          name: String(element).toLowerCase(),
          value: false
        };
        resp.push(obj);
      }
      dispatch(updateNewFilters(resp));
    }
  }, []);

  const onAddQuestion = value => {
    setShowModal(true);
  };
  const onClose = () => {
    if (showModal) setShowModal(false);
  };

  return (
    <div className="approvals-tab">
      <ViewAboveVerticalTabs>
        <BidHistory data-testid="bid-history" />
      </ViewAboveVerticalTabs>
     
        <div
          data-testid="selectedbid-testid"
          title="Add New Question"
          className="tasksList-add-icon-wrapper"
          role="presentation"
          onClick={onAddQuestion}
        >
          <Add className="tasksList-add-icon" />
        </div>
      
      <div className="filter-container">
        
        <div className="filter-btn">
          <FilterButton setIsShowFilters={setIsShowFilters} />
          
        </div>
        {isShowFilters && <Filters />}
      </div>

      <div className="all-approvals-container">
        {!isEmpty(tab) ? (
          tab.map(tabs => {
            if (tabs?.UnityTabSectionQuestions?.length > 0) {
              return (
                <Section
                  key={tabs.UnityTabSectionId}
                  sectionId={tabs.UnityTabSectionId}
                  title={tabs.UnityTabSectionTitle}
                  tabId={tabId}
                />
              );
            }
            return null;
          })
        ) : (
          <>
            <div className="no-approval-wrapper">
              <Card
                style={{
                  maxWidth: 600,
                  height: 150,
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: '#7f7f7f',
                  padding: '20px'
                }}
              >
                <ClipboardCheck
                  style={{ fontSize: '48px', marginBottom: '10px' }}
                  data-testid="No_approvals"
                />
                No Question associated with your selected Tab
              </Card>
            </div>
          </>
        )}
        <div id="modal-wrapper" />
        {showModal && (
          <AddQuestionModalComponent
            onClose={onClose}
            currentsection={""}
            tabFlag="customTab"
            tabId={tabId}
          />
        )}
      </div>
    </div>
  );
};

export default CustomTabs;
