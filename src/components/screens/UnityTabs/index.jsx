/* eslint-disable react/prop-types */
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ClipboardCheck from 'apollo-react-icons/ClipboardCheck';
import Card from 'apollo-react/components/Card';
import Section from './Section';
import BidHistory from '../../common/Bidhistory';
import Filters from './Filters';
import FilterButton from './FilterButton';
import ViewAboveVerticalTabs from '../../views/ViewAboveVerticalTabs';

const CustomTabs = ({ tabId, key }) => {
  const allTab = useSelector(state => state.unitytab.allTabs);
  const tab = allTab[tabId];
  const [isShowFilters, setIsShowFilters] = useState(false);

  return (
    <div className="approvals-tab">
      <ViewAboveVerticalTabs>
        <BidHistory data-testid="bid-history" />
      </ViewAboveVerticalTabs>

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
      </div>
    </div>
  );
};

export default CustomTabs;
