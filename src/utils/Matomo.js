// @flow
import { createInstance } from '@datapunt/matomo-tracker-react';
import { PROPOSAL } from '../constants/api';

const env = process.env.API_ENV || 'DEV';

const envSideId = {
  DEV: 20,
  SDEV: 20,
  UAT: 20,
  PROD: 21
};

const matomoInstace = createInstance({
  urlBase: PROPOSAL.MAMOTO_IQVIA,
  siteId: envSideId[env]
});

export default matomoInstace;
