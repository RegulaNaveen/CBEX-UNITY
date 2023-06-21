// @flow
import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { MatomoProvider } from '@datapunt/matomo-tracker-react';
import { store } from './store';
import PrivateRoute from './PrivateRoute';

import {
  LOGIN,
  PROPOSALS,
  DASHBOARD,
  UBUILD,
  OPPORTUNITYS,
  PROFILE,
  RECENT_ACTIVITY
} from './routes';
import SessionHandler from './SSOSessionHandler';
import Login from './components/screens/Auth/Login';
import ProposalComponent from './components/screens/Proposal';
import OpportunityComponent from './components/screens/Opportunity';
import DashboardComponent from './components/screens/Dashboard';
import UbuildShellComponent from './components/screens/Ubuild';
import ProfileComponent from './components/screens/Profile/AccountPreferences';
import RecentActivityComponent from './components/screens/Profile/RecentActivity';
import '../styles/App.scss';
import matomoInstace from './utils/Matomo';
import SocketContextProvider from './context/SocketContext';
import ErrorBoundaryComponent from './components/HOC/ErrorBoundary';
import ReduxSnackbar from './components/common/ReduxSnackbar/ReduxSnackbar';
import { fetchUserFavourites } from './redux/actions/sso-auth-actions';
import featureFlags from './constants/featureFlags';
import launchDarkly from './utils/launchDarkly';
import { setFlag } from './redux/actions/proposal-actions';

const Home = () => {
  const dispatch = useDispatch();

  const { favouriteFlag } = useSelector(state =>
    state.proposal.get('eventflag')
  );

  useEffect(() => {
    (async () => {
      const flagValue = await launchDarkly(Object.values(featureFlags), false);
      if (flagValue) dispatch(setFlag(flagValue));
    })();
  }, []);

  useEffect(() => {
    if (favouriteFlag) {
      dispatch(fetchUserFavourites());
    }
  }, [favouriteFlag]);

  return (
    <Switch>
      <PrivateRoute path={DASHBOARD} component={DashboardComponent} />
      <PrivateRoute path={PROPOSALS} component={ProposalComponent} />
      <PrivateRoute path={PROFILE} component={ProfileComponent} />
      <PrivateRoute
        path={RECENT_ACTIVITY}
        component={RecentActivityComponent}
      />
      <PrivateRoute path={OPPORTUNITYS} component={OpportunityComponent} />
    </Switch>
  );
};

const App = () => (
  <Provider store={store}>
    <SocketContextProvider>
      <MatomoProvider value={matomoInstace}>
        <ErrorBoundaryComponent>
          <ReduxSnackbar />
          <BrowserRouter>
            <SessionHandler>
              <Switch>
                <Route path="/" exact component={Login} />
                <Route exact path={LOGIN} component={Login} />
                <PrivateRoute
                  exact
                  path={UBUILD}
                  component={UbuildShellComponent}
                />
                <Route path="/" component={Home} />
                <Redirect to={LOGIN} />
              </Switch>
            </SessionHandler>
          </BrowserRouter>
        </ErrorBoundaryComponent>
      </MatomoProvider>
    </SocketContextProvider>
  </Provider>
);

export default App;
