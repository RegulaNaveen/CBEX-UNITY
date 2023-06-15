import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Card from 'apollo-react/components/Card';
import StatusExclamation from 'apollo-react-icons/StatusExclamation';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import deviceParser from 'ua-parser-js';
import Toolbar from '../views/toolbar';
import MatomoHOC from './MatomoHOC';
import { getProposalDetails } from '../../redux/selectors';
// Fallback UI Component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <Router>
        <Toolbar withinErrorBoundary />
      </Router>
      <div className="error-wrapper">
        <Card>
          <div className="error-boundary" role="alert">
            <div className="error-boundary-exclamation">
              <StatusExclamation
                style={{ color: 'red', width: '67px', height: '61px' }}
              />
              <h1>Something went wrong!</h1>
              <p>It seems Unity has experienced a problem</p>
            </div>
            <pre class="box">
              <p>Here are the details of the problem:</p>
              {error.stack}
            </pre>
          </div>
        </Card>
      </div>
    </>
  );
}
const email = localStorage.getItem('userEmail');
const name = localStorage.getItem('userName');
const role = localStorage.getItem('userRole');
const deviceInfo = deviceParser(window.navigator.userAgent);
const user = {
  key: email,
  name,
  email
};
async function getPublicIP() {
  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();
  return data.ip;
}
// eslint-disable-next-line react/prop-types
const ErrorBoundaryComponent = ({ children, eventCategories, trackEvent }) => {
  const date = new Date();
  const proposalDetail = useSelector(state => getProposalDetails(state));
  const trackMatomoEventErrorHandler = error => {
    getPublicIP()
      .then(ipAddress => {
        trackEvent({
          category: `proposalDetail: ${proposalDetail['CRM #']}`,
          action: `UI-error: ${error.message}`,
          customDimensions: [
            {
              id: 1,
              value: JSON.stringify({
                user,
                role,
                osName: deviceInfo?.os?.name,
                osVersion: deviceInfo?.os?.version,
                browserName: deviceInfo?.browser?.name,
                browserVersion: deviceInfo?.browser?.version,
                ipAddress,
                bidNo: proposalDetail.bidNo,
                CRM: proposalDetail['CRM #'],
                opportunityId: proposalDetail.opportunityId,
                date,
                error: error.stack
              })
            }
          ]
        });
      })
      .catch(e => {
        console.error('Error:', e);
      });
  };
  const errorHandler = error => {
    trackMatomoEventErrorHandler(error);
  };
  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={errorHandler}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        {children}
      </ErrorBoundary>
    </>
  );
};
export default MatomoHOC(ErrorBoundaryComponent);
