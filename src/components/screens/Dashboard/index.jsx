// @flow
import React, { useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import Toolbar from '../../Toolbar';
import Tabbar from '../../common/Tabbar';
import MyDocketTab from './MyDocketTab';
import RecentTab from './RecentTab';
import AllTab from './AllTab';

const Dashboard = () => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({ documentTitle: 'Unity Dashboard' });
  }, []);

  return (
    <div id="dashboard">
      <Toolbar selected="dashboard" />
      <div className="tab-wrapper">
        <Tabbar>
          <div label="My Docket">
            <MyDocketTab />
          </div>
          <div label="Recent">
            <RecentTab />
          </div>
          <div label="All">
            <AllTab />
          </div>
        </Tabbar>
      </div>
    </div>
  );
};

export default Dashboard;
