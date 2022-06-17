// @flow
import React, { useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import Toolbar from '../../views/toolbar';
import Tabbar from '../../views/Tabbar';
import MyDocketTab from './MyDocketTab';
import RecentTab from './RecentTab';
import AllTab from './AllTab';
import * as serviceWorker from 'register-service-worker';
import * as packageJson from '../../../../package.json'

serviceWorker.unregister();

const Dashboard = () => {
  const { trackPageView } = useMatomo();
  useEffect(() => {
    trackPageView({ documentTitle: 'Unity Dashboard' });
      // cache check and removal if build number is missmatched
      const version = localStorage.getItem('unity-version');
      console.log('packageJson.version', packageJson.version);
      if(version !== packageJson.version) {
        if ('caches' in window) {
          caches.keys().then((names) => {
            // Delete all the cache files
            names.forEach((thisname) => {
              caches.delete(thisname);
            });
          });
          // Makes sure the page reloads. Changes are only visible after you
          window.location.reload(true);
        }
        localStorage.setItem('unity-version', packageJson.version);
      }   
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
