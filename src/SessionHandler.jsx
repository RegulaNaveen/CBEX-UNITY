// @flow
import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { getLoginData, getLoginError } from './selectors';

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

  const { data, serror } = useSelector(
    state => ({
      data: getLoginData(state),
      serror: getLoginError(state)
    }),
    shallowEqual
  );

  const setProposalId = () => {
    const proposalId = location.pathname.split('/')[3];
    if (proposalId) localStorage.setItem('proposalId', proposalId);
    console.log('SessionH', proposalId);
  };

  const navigateFunc = () => {
    const proposalId = localStorage.getItem('proposalId') || '';
    console.log(proposalId);
    history.push(`/app/proposals/${proposalId}`);
  };

  useEffect(() => {
    function checkSession() {
      const isLoggedin = localStorage.getItem('isLoggedin');
      if (!isLoggedin) {
        setProposalId();
      } else {
        navigateFunc();
      }
    }
    checkSession();
  }, [data, serror]);

  return children;
};

export default SessionHandler;
