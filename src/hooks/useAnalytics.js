import React from 'react';
import { useHistory } from 'react-router-dom';
import { trackEventApi } from '../api/analytics';

const useAnalytics = () => {
  const history = useHistory();

  function trackPageView(info) {
    const payload = {
      type: 'event',
      user_id: localStorage.getItem('userId') || null,
      role: localStorage.getItem('userRole') || null,
      // proposal_id: '',
      // bid_number: null,
      // opp_number: '',
      // "event_category": "page",
      event_action: info.documentTitle,
      // "event_name": "dasboard visit",
      // "visitor_type": "",
      // "device_type": "laptop",
      // "operating_system": "windows",
      // "browser": "edge",
      // "continent": "asia",
      // "country": "IN",
      visit_local_time: new Date().toString()
    };
    // console.log('trackPageView called!', args);
    // console.log('trackPageView payload', payload);
    // console.log('trackPageView history', history);
    trackEventApi(payload);
  }

  function trackEvent(...args) {
    console.log('trackEvent called!', args);
  }

  function pushInstruction() {
    console.log('pushInstruction called!');
  }

  return {
    trackPageView,
    trackEvent,
    pushInstruction
  };
};
export default useAnalytics;
