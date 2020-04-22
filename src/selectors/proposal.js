// @flow
import { Map } from 'immutable';

export const getTestingData = (state: Map): string => state.get('testingData');

export const DummyForExport = (state: Map): Map => state.get('asd');
