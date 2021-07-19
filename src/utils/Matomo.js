// @flow
import { createInstance } from '@datapunt/matomo-tracker-react';
import { PROPOSAL } from '../constants/api';

const env = process.env.API_ENV || 'DEV';
const userEmail = localStorage.getItem('userEmail');
const userRole = localStorage.getItem('userRole');

const envSideId = {
  DEV: 20,
  UAT: 20,
  PROD: 21
};

const matomoInstace = createInstance({
  urlBase: PROPOSAL.MAMOTO_IQVIA,
  siteId: envSideId[env],
  userId: `${userEmail} (${userRole || ''})`
});

export default matomoInstace;
