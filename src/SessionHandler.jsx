// @flow
import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
  getAuthData,
  authHasErrors,
  getChangeRoleError
} from './redux/selectors';
import { refreshAuthData, changeRole } from './redux/actions/auth-actions';
import { DASHBOARD, PROPOSAL } from './routes';

export const setSession = (
  role: string,
  accessToken: string,
  token: string,
  refreshToken: string,
  email: string,
  userName: string
) => {
  localStorage.setItem('isLoggedin', 'true');
  localStorage.setItem('userRole', role);
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('jwt', token);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userName', userName);
};

export const getSession = () => {
  return !!localStorage.getItem('isLoggedin');
};

export const getUserRole = () => {
  return localStorage.getItem('userRole');
};

export const getUserName = () => {
  return localStorage.getItem('userName');
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('access_token');
};

export const getJwt = () => {
  return localStorage.getItem('jwt');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const getProposalId = () => {
  return localStorage.getItem('proposalId');
};

export const getUserEmail = () => {
  return localStorage.getItem('userEmail');
};

type Props = {
  children: any
};

const SessionHandler = ({ children }: Props) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { authData, serror, changeRoleError } = useSelector(
    state => ({
      authData: getAuthData(state),
      serror: authHasErrors(state),
      changeRoleError: getChangeRoleError(state)
    }),
    shallowEqual
  );

  const setProposalId = () => {
    const proposalId = location.pathname.split('/')[3];
    if (proposalId) localStorage.setItem('proposalId', proposalId);
  };

  const navigateFunc = () => {
    const proposalId = getProposalId();
    if (proposalId) localStorage.removeItem('proposalId');
    history.push(proposalId ? `${PROPOSAL}${proposalId}` : DASHBOARD);
  };

  const renewSession = async (error: string, role: string) => {
    if (error === 'The incoming token has expired') {
      await dispatch(refreshAuthData());
      await dispatch(changeRole(role));
    }
  };

  useEffect(() => {
    function checkSession() {
      setProposalId();
      if (getSession()) {
        navigateFunc();
      }
    }
    checkSession();
  }, [authData, serror]);

  useEffect(() => {
    if (changeRoleError)
      renewSession(changeRoleError.error, changeRoleError.role);
  }, [changeRoleError, renewSession]);

  return children;
};

export default SessionHandler;
