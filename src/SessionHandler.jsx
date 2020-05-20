// @flow
import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { getAuthData, authHasErrors } from './selectors';

export const setSession = () => {
  localStorage.setItem('isLoggedin', 'true');
};

export const getSession = () => {
  return !!localStorage.getItem('isLoggedin');
};

export const getProposalId = () => {
  return !!localStorage.getItem('proposalId');
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
      } else {
        setProposalId();
        navigateFunc();
      }
    }
    checkSession();
  }, [authData, serror]);

  return children;
};

export default SessionHandler;
