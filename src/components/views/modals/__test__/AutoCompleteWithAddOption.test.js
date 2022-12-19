import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configure, render, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import * as data from '../../../screens/Proposal/__tests__/data.json';
import thunk from 'redux-thunk';
import AutoCompleteWithAddOption from '../AutoCompleteWithAddOption';
import { Map, fromJS } from 'immutable';

const middlewares = [thunk];
const proposalQuestions = Map(Object.entries(data.proposal.proposalQuestions));
const proposal = Map(Object.entries(data.proposal));
const initialState = {
  proposal,
  proposalQuestions,
};
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

describe('AutoCompleteWithAddOption component', () => {
  test('testing autocomplete component', async () => {
    const lovOptions = [
      'Central ECG - ECG',
      'Central ECG - Holter',
      'Central ECG - Device rental',
      'ePro/eCOA',
      'Glucose monitoring - CGM',
      'Glucose monitoring - BGM',
      'Spirometry',
      'Blood Pressure Monitoring - ABPM',
      'Blood Pressure Monitoring - HBPM',
      'Blood Pressure Monitoring - OBPM',
      'Actigraphy',
      'Imaging - X-ray',
      'Imaging - MRI',
      'Imaging - PET scan',
      'Imaging - CT scan',
      'Imaging - EEG',
      'Endoscopy',
      'Other',
    ];
    const props = {
      options: [
        'N/A',
        'DPP / DPO for GDPR',
        'Translations',
        'ePRO / eCOA',
        'Medical Photography',
        'Drug Supply and Distribution',
        'Imaging',
        'Home Health Care',
        'EDC EHR ESR eSource',
        'IRT IVRS IWRS IxRS',
        'Rater Training Services (for Rating Scales)',
        'Clinical Laboratory Services',
        'Clinical Trial Services',
        'CRO - Clinical Research Organisation',
        'MDD - Actigraphy & Vital Sign Patches',
        'BPM - Cardiac Safety - ECG',
        'BPM - Continuous Glucose Monitoring',
        'BPM - Imaging & File Adjudication',
        'BPM - Logistics',
        'BPM - Medication Adherence',
        'BPM - Spirometry / Lung Function Testing',
        'Patient Solutions',
        'Meeting Planning',
        'SMO - Site Management Organisations',
        'Site Supplies and Equipment',
      ],
      sfObject: 'opportunity',
      lov: lovOptions,
      sfField: 'Potential_Regions__c',
      answer: ['Central ECG - ECG', 'Central ECG - Holter'],
      disabled: false,
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn(),
      multiple: true,
      loading: false,
      toggleWatch: jest.fn(),
      onCascadeChange: jest.fn(),
      forceBlur: false,
    };
    const container = render(
      <Provider store={store}>
        <AutoCompleteWithAddOption {...props} />
      </Provider>
    );
    expect(container).toBeDefined();
    await expect(screen.getByTestId('autocomplete-varsha')).toBeTruthy();
  });
});
