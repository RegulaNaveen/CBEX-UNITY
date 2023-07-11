// @flow
import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { MatomoProvider } from '@datapunt/matomo-tracker-react';
import Modal from 'apollo-react/components/Modal';
import TextField from 'apollo-react/components/TextField';
import Typography from 'apollo-react/components/Typography';
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
import SocketContextProvider, { SocketContext } from './context/SocketContext';
import ErrorBoundaryComponent from './components/HOC/ErrorBoundary';
import ReduxSnackbar from './components/common/ReduxSnackbar/ReduxSnackbar';
import { fetchUserOpportunityPrefs } from './redux/actions/sso-auth-actions';
import featureFlags from './constants/featureFlags';
import launchDarkly from './utils/launchDarkly';
import {
  setFlag,
  onSaveCustomName as saveCustomNameAction,
  onCancelEditCustomName,
  toggleEditCustomNameModal
} from './redux/actions/proposal-actions';
import {
  selectOppNoEditing,
  selectCustomNameEditing,
  selectShowEditCustomNameModal
} from './redux/selectors/proposal';

const EditCustomNameModal = ({ show }) => {
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');

  const oppNoEditing = useSelector(selectOppNoEditing);
  const customNameEditing = useSelector(selectCustomNameEditing);

  const dispatch = useDispatch();

  const { updateCustomNameWrapper } = useContext(SocketContext);

  useEffect(() => {
    setEditName(customNameEditing || '');
  }, [customNameEditing]);

  function handleEditCustomName(event) {
    setError('');
    setEditName(event.target.value);
  }

  function handleEditModalClose() {
    dispatch(toggleEditCustomNameModal(false));
  }

  function onSaveCustomName() {
    // do validate and save
    if (editName.length > 200) {
      setError('Custom Name cannot have more than 200 characters');
      return;
    }
    dispatch(saveCustomNameAction(oppNoEditing, editName));
    updateCustomNameWrapper(oppNoEditing, editName);
    handleEditModalClose();
  }

  return (
    <Modal
      data-testid="edit-name-modal"
      open={show}
      variant="default"
      subtitle={`Opportunity Number: ${oppNoEditing}`}
      className="edit-custom-name-modal"
      onClose={() => handleEditModalClose()}
      title={<Typography variant="h3">Edit Custom Name</Typography>}
      buttonProps={[
        { label: 'Cancel', onClick: () => handleEditModalClose() },
        { label: 'Save', onClick: () => onSaveCustomName() }
      ]}
    >
      <TextField
        label="Custom Name"
        placeholder="New Custom Name"
        value={editName}
        error={error.length > 0}
        helperText={error}
        onChange={handleEditCustomName}
        fullWidth
        sizeAdjustable
      />
    </Modal>
  );
};

const Home = () => {
  const dispatch = useDispatch();

  const { favouriteFlag } = useSelector(state =>
    state.proposal.get('eventflag')
  );

  const showEditModal = useSelector(selectShowEditCustomNameModal);

  useEffect(() => {
    (async () => {
      const flagValue = await launchDarkly(Object.values(featureFlags), false);
      if (flagValue) dispatch(setFlag(flagValue));
    })();
    dispatch(fetchUserOpportunityPrefs());
  }, []);

  return (
    <>
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
      {showEditModal ? <EditCustomNameModal show={showEditModal} /> : null}
    </>
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
