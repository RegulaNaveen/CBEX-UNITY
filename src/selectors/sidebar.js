// @flow
import { Map } from 'immutable';

const getSelectedSectionSelector = (sidebar: Map): string =>
  sidebar.get('selectedSection');

// eslint-disable-next-line import/prefer-default-export
export { getSelectedSectionSelector };
