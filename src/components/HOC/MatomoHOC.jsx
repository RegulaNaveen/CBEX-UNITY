// @flow
import React from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

const MatomoHOC = (Component: any) => {
  const categories = {
    dp: 'Unity Dashboard',
    pd: 'Proposal Detail'
  }
  const actions = {
    click: 'Clicked'
  }
  return (props: any) => {
    const { trackPageView, trackEvent} = useMatomo();
    return <Component trackPageView={trackPageView} eventCategories={categories} userActions={actions} trackEvent={trackEvent} {...props} />;
  };
};

export default MatomoHOC;
