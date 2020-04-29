// @flow
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const getSession = () => {
  return !!localStorage.getItem('isLoggedin');
};

type Props = {
  children: any
};

const SessionHandler = ({ children }: Props) => {
  const location = useLocation();

  const setProposalId = () => {
    const proposalId = location.pathname.split('/')[3];
    localStorage.setItem('proposalId', proposalId);
  };

  useEffect(() => {
    function checkSession() {
      const isLoggedin = localStorage.getItem('isLoggedin');
      if (!isLoggedin) {
        setProposalId();
      }
    }
    checkSession();
  }, [setProposalId]);

  const setSession = () => {
    localStorage.setItem('isLoggedin', 'true');
    setProposalId();
  };

  return children;
};

export default SessionHandler;
