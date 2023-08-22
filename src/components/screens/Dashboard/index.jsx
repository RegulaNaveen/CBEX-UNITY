// @flow
import React, { useEffect, useState, useContext } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import * as serviceWorker from 'register-service-worker';
import { useDispatch, useSelector } from 'react-redux';
import Toolbar from '../../views/toolbar';
import Tabbar from '../../views/Tabbar';
import MyDocketTab from './MyDocketTab';
import FavoritesTab from './FavoritesTab';
import RecentTab from './RecentTab';
import AllTab from './AllTab';
import * as packageJson from '../../../../package.json';
import launchDarkly from '../../../utils/launchDarkly';
import { setFlag } from '../../../redux/actions/proposal-actions';
import featureFlags from '../../../constants/featureFlags';

serviceWorker.unregister();

const Dashboard = () => {
  const { trackPageView } = useMatomo();
  const [filterApply, setFilterApply] = useState(0);
  const dispatch = useDispatch();
  const allFlags = useSelector(state => state.proposal.get('eventflag'));
  const getLaunchdarklyFlags = async () => {
    const flagValue = await launchDarkly(Object.values(featureFlags), false);
    if (flagValue) dispatch(setFlag(flagValue));
  };

  useEffect(() => {
    trackPageView({ documentTitle: 'Unity Dashboard' });
    // cache check and removal if build number is missmatched
    const version = localStorage.getItem('unity-version');
    if (version !== packageJson.version) {
      if ('caches' in window) {
        caches.keys().then(names => {
          // Delete all the cache files
          names.forEach(thisname => {
            caches.delete(thisname);
          });
        });
        // Makes sure the page reloads. Changes are only visible after you
        window.location.reload(true);
      }
      localStorage.setItem('unity-version', packageJson.version);
    }
    getLaunchdarklyFlags();
  }, []);
  return (
    <div id="dashboard">
      <Toolbar selected="dashboard" />
      <div className="tab-wrapper">
        <Tabbar
          allFlags={allFlags}
          getFilterStatus={e => {
            setFilterApply(e);
          }}
        >
          <div label="Assigned" className="dashboard-content">
            <MyDocketTab allFlags={allFlags} filterApply={filterApply} />
          </div>
          <div label="Favorites" className="dashboard-content">
            <FavoritesTab allFlags={allFlags} filterApply={filterApply} />
          </div>
          <div label="Recent" className="dashboard-content">
            <RecentTab allFlags={allFlags} />
          </div>
          <div label="All" className="dashboard-content">
            <AllTab allFlags={allFlags} />
          </div>
        </Tabbar>
      </div>
    </div>
  );
};

export default Dashboard;
