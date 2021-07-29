// @flow
import React from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

const MatomoHOC = (Component: any) => {
  const categories = {
    dp: 'Unity Dashboard',
    pd: (props) =>
      `Proposal Detail (CRM#: ${
        props && props.proposalDetail ? props.proposalDetail['CRM #'] : ''
      })`,
    plainPd: `Proposal Detail`,
    tb: `ToolBar Menu`,
    pg: `Pagination`
  };
  const actions = {
    click: 'Clicked',
    changed: 'Changed',
    submit: 'Submitted',
    scroll: 'Scrolled'
  };
  return (props: any) => {
    const { trackPageView, trackEvent, pushInstruction } = useMatomo();

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

export default MatomoHOC;
