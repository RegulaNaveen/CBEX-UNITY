import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { trackEventApi } from '../api/analytics';
import {getOperatingSystemType,getBrowserType,getDeviceType} from "../utils/AnalyticsUtils" ;
const useAnalytics = () => {
  const history = useHistory();
  const winLocationSearch = window.location.search;
  const queryparams = new URLSearchParams(winLocationSearch);
  const bid_number = queryparams.get('bidNo');
  function trackPageView(info) {
    const payload = {
      type: 'event',
      user_id: localStorage.getItem('userId') || null,
      role: localStorage.getItem('userRole') || null,
      event_action: info.documentTitle,
      device_type:getDeviceType(),
      operating_system: getOperatingSystemType(),
      browser: getBrowserType(),
      visit_local_time: new Date().toString()
    };
    trackEventApi(payload);
  }

  function trackEvent(info) {
    const payload_trackEvent = {
      type: 'event',
      user_id: localStorage.getItem('userId') || null,
      role: localStorage.getItem('userRole') || null,
      proposal_id: localStorage.getItem('proposalId') || '',
      bid_number: bid_number,
      opp_number: localStorage.getItem('oppNo') || '',
      event_category: info.category,
      event_action: info.action,
      device_type:getDeviceType(),
      operating_system: getOperatingSystemType(),
      browser: getBrowserType(),
      visit_local_time: new Date().toString()
    };
    trackEventApi(payload_trackEvent);
  }

  function pushInstruction() {
  }
  return {
    trackPageView,
    trackEvent,
    pushInstruction
  };
};
export default useAnalytics;
