import React from 'react';
import { Map } from 'immutable';
import { screen, render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import * as data from '../../../screens/Proposal/__tests__/data.json';
import thunk from 'redux-thunk';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import AutoCompleteWithAddOption from '../AutoCompleteWithAddOption';

const middlewares = [thunk];
const proposalQuestions = Map(Object.entries(data.proposal.proposalQuestions));
const proposal = Map(Object.entries(data.proposal));
const filter = createFilterOptions();
const initialState = {
  proposal,
  proposalQuestions,
};
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);
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
const defaultProps = {
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
  sfObject: 'Bid_History__c',
  lov: lovOptions,
  sfField: 'Additional_Services_Requested__c',
  disabled: false,
  onChange: jest.fn(),
  onFocus: jest.fn(),
  onBlur: jest.fn(),
  loading: false,
  toggleWatch: jest.fn(),
  onCascadeChange: jest.fn(),
  filter
};

afterEach(cleanup);

describe('AutoCompleteWithAddOption component', () => {
  test('testing autocomplete component', () => {
    const container = render(
      <Provider store={store}>
        <AutoCompleteWithAddOption {...defaultProps} />
      </Provider>
    );
    expect(container).toBeDefined();
  });

  test('render autocomplete component', () => {
    const props = {
      multiple: true,
      forceBlur: false,
      answer: ['Central ECG - ECG', 'Central ECG - Holter'],
      ...defaultProps
    }
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <AutoCompleteWithAddOption {...props} />
      </Provider>
    );
    const chip = getByText('Central ECG - ECG');
    expect(getByTestId('autocomplete-test')).toBeTruthy();
    expect(chip).toBeInTheDocument();
  });

  test('test for single select lookup answer', () => {
    const props = {
      multiple: false,
      forceBlur: false,
      answer: 'Central ECG - ECG',
      ...defaultProps
    }
    render(
      <Provider store={store}>
        <AutoCompleteWithAddOption {...props} />
      </Provider>
    );
    expect(screen.findByTestId('autocomplete-test')).toBeTruthy();
  })

  test('check for forceblur true', () => {
    const props = {
      multiple: true,
      answer: ['Central ECG - ECG', 'Central ECG - Holter'],
      forceBlur: true,
      ...defaultProps
    }
    render(
      <Provider store={store}>
        <AutoCompleteWithAddOption {...props} />
      </Provider>
    );
    expect(screen.findByTestId('autocomplete-test')).toBeTruthy();
  })

  test.skip('filters the options based on the input value', () => {
    const props = {
      multiple: false,
      answer: 'Central ECG - ECG',
      forceBlur: true,
      ...defaultProps
    }

    const { getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <AutoCompleteWithAddOption {...props} />
      </Provider>
    );
    const autocomplete = getByTestId('autocomplete-test');
    const input = getByPlaceholderText('');
    fireEvent.change(input, { target: { value: 'Glucose monitoring - CGM' } });
    expect(autocomplete).toHaveValue('Glucose monitoring - CGM');
  });

  test.skip('adds a new option when the input value is not in the list of options', () => {
    const props = {
      multiple: true,
      answer: ['Central ECG - ECG'],
      forceBlur: true,
      ...defaultProps
    }
    const onChange = jest.fn();
    const { getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <AutoCompleteWithAddOption {...props} />
      </Provider>
    );
    const autocomplete = getByTestId('autocomplete-test');
    const input = getByPlaceholderText('');
    fireEvent.change(input, { target: { value: 'date' } });
    fireEvent.click(autocomplete);
    expect(onChange).toHaveBeenCalledWith(['add "date"']);
  });

  test.skip('clears the input when the clearable prop is set to true', () => {
    const props = {
      multiple: true,
      answer: ['Central ECG - ECG', 'Central ECG - Holter'],
      forceBlur: true,
      ...defaultProps
    }
    const { getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <AutoCompleteWithAddOption {...props} />
      </Provider>
    );
    const autocomplete = getByTestId('autocomplete-test');
    console.log(autocomplete);
    const input = getByPlaceholderText('');
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.click(autocomplete);
    expect(autocomplete).toHaveValue([]);
  });
});
