// @flow
import React from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

const MatomoHOC = (Component: any) => {
  return (props: any) => {
    const { trackPageView } = useMatomo();
    return <Component trackPageView={trackPageView} {...props} />;
  };
};

export default MatomoHOC;
