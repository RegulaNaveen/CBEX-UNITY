import React from 'react';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import * as data from '../../../screens/Proposal/__tests__/data.json';
import thunk from 'redux-thunk';
import AutoCompleteWithAddOption from '../AutoCompleteWithAddOption';
import { Map } from 'immutable';

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
  test('testing autocomplete component', () => {
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
      options: {
        'SF#Bid_History__c_SF#Additional_Services_Requested__c': [
          'BPM - Cardiac Safety - ECG',
          'BPM - Continuous Glucose Monitoring',
          'BPM - Imaging & File Adjudication',
          'BPM - Logistics',
          'BPM - Medication Adherence',
          'BPM - Spirometry / Lung Function Testing',
          'Clinical Laboratory Services',
          'Clinical Trial Services',
          'CRO - Clinical Research Organisation',
          'DPP / DPO for GDPR',
          'Drug Supply and Distribution',
          'EDC EHR ESR eSource',
          'ePRO / eCOA',
          'Home Health Care',
          'Imaging',
          'IRT IVRS IWRS IxRS',
          'MDD - Actigraphy & Vital Sign Patches',
          'Medical Photography',
          'Meeting Planning',
          'N/A',
          'Patient Solutions',
          'Rater Training Services (for Rating Scales)',
          'Site Supplies and Equipment',
          'SMO - Site Management Organisations',
          'Translations',
        ],
      },
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
  });

  test('render autocomplete component', async () => {
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
      options: {
        'SF#Bid_History__c_SF#Additional_Services_Requested__c': [
          'BPM - Cardiac Safety - ECG',
          'BPM - Continuous Glucose Monitoring',
          'BPM - Imaging & File Adjudication',
          'BPM - Logistics',
          'BPM - Medication Adherence',
          'BPM - Spirometry / Lung Function Testing',
          'Clinical Laboratory Services',
          'Clinical Trial Services',
          'CRO - Clinical Research Organisation',
          'DPP / DPO for GDPR',
          'Drug Supply and Distribution',
          'EDC EHR ESR eSource',
          'ePRO / eCOA',
          'Home Health Care',
          'Imaging',
          'IRT IVRS IWRS IxRS',
          'MDD - Actigraphy & Vital Sign Patches',
          'Medical Photography',
          'Meeting Planning',
          'N/A',
          'Patient Solutions',
          'Rater Training Services (for Rating Scales)',
          'Site Supplies and Equipment',
          'SMO - Site Management Organisations',
          'Translations',
        ],
      },
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
    render(
      <Provider store={store}>
        <AutoCompleteWithAddOption {...props} />
      </Provider>
    );
    await expect(screen.findByTestId('autocomplete-test')).toBeTruthy();
  });
});
