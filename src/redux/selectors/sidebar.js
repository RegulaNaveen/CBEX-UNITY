// @flow
import { Map } from 'immutable';

const getSelectedSectionSelector = (sidebar: Map): string =>
  sidebar.get('selectedSection');

const getIsOpen = (sidebar: Map): string => sidebar.get('isOpen');

export { getSelectedSectionSelector, getIsOpen };
