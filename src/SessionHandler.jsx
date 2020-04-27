// @flow
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {
  children: any
};

const SessionHandler = ({ children }: Props) => {
  const location = useLocation();

  useEffect(() => {
    function checkSession() {
      const isLoggedin = localStorage.getItem('isLoggedin');
      if (!isLoggedin) {
        const proposalId = location.pathname.split('/')[3];
        localStorage.setItem('proposalId', proposalId);
      }
    }
    checkSession();
  });

  return children;
};

export default SessionHandler;
