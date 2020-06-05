// @flow
import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { getAuthData, authHasErrors } from './selectors';

export const setSession = (
  role: string,
  accessToken: string,
  token: string,
  refreshToken: string,
  email: string
) => {
  localStorage.setItem('isLoggedin', 'true');
  localStorage.setItem('userRole', role);
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('jwt', token);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('userEmail', email);
};

export const getSession = () => {
  return !!localStorage.getItem('isLoggedin');
};

export const getUserRole = () => {
  return localStorage.getItem('userRole');
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
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

  const { authData, serror } = useSelector(
    state => ({
      authData: getAuthData(state),
      serror: authHasErrors(state)
    }),
    shallowEqual
  );

  const setProposalId = () => {
    const proposalId = location.pathname.split('/')[3];
    if (proposalId) localStorage.setItem('proposalId', proposalId);
  };

  const navigateFunc = () => {
    const proposalId = localStorage.getItem('proposalId') || '';
    history.push(`/app/proposals/${proposalId}`);
  };

  useEffect(() => {
    function checkSession() {
      const isLoggedin = localStorage.getItem('isLoggedin');
      if (!isLoggedin) {
        setProposalId();
        console.log('SESSIONHANDLER');
      } else {
        console.log('SESSIONHANDLERLOGED');
        setProposalId();
        navigateFunc();
      }
    }
    checkSession();
  }, [authData, serror]);

  return children;
};

export default SessionHandler;
