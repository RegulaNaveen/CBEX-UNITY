// @flow
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

let onSessionChange;

export const getSession = (onSessionCallback: Function) => {
  onSessionChange = onSessionCallback;
  return !!localStorage.getItem('isLoggedin');
};

export const setSession = () => {
  localStorage.setItem('isLoggedin', 'true');
  onSessionChange();
};

export const getProposalId = () => {
  return !!localStorage.getItem('proposalId');
};

type Props = {
  children: any
};

const SessionHandler = ({ children }: Props) => {
  const location = useLocation();

  const setProposalId = () => {
    const proposalId = location.pathname.split('/')[3];
    if (proposalId) localStorage.setItem('proposalId', proposalId);
    console.log('SessionH', proposalId);
  };

  useEffect(() => {
    function checkSession() {
      const isLoggedin = localStorage.getItem('isLoggedin');
      if (!isLoggedin) {
        setProposalId();
      }
    }
    checkSession();
  });

  return children;
};

export default SessionHandler;
