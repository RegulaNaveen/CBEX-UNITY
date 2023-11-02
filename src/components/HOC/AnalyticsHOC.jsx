// @flow
import React from 'react';
import {useAnalytics} from "../../hooks" ;
const AnalyticsHOC = Component => {
  const categories = {
    dp: 'Unity Dashboard',
    pd: props =>
      `Proposal Detail (CRM#: ${
        props && props.proposalDetail ? props.proposalDetail['CRM #'] : ''
      })`,
    plainPd: `Proposal Detail`,
    tb: `ToolBar Menu`,
    pg: `Pagination`,
    crmNo: `Proposal Detail (CRM#: ${localStorage.getItem('oppNo') || ''})`
  };
  const actions = {
    click: 'Clicked',
    changed: 'Changed',
    submit: 'Submitted',
    scroll: 'Scrolled',
    edit: 'Edited'
  };
  return props => {
   const { trackPageView, trackEvent, pushInstruction } = useAnalytics();
    if (!localStorage.getItem('MatomoUserIdSet')) {
      const userEmail = localStorage.getItem('userEmail');
      const userRole = localStorage.getItem('userRole');
      pushInstruction('setUserId', `${userEmail} (${userRole || ''})`);
      localStorage.setItem(
        'MatomoUserIdSet',
        `${userEmail} (${userRole || ''})`
      );
    }

    return (
      <Component
        trackPageView={trackPageView}
        eventCategories={categories}
        userActions={actions}
        trackEvent={trackEvent}
        {...props}
      />
    );
  };
};

export default AnalyticsHOC;
