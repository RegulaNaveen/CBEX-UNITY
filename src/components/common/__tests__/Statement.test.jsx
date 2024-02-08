import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Statement from '../Statement';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { List, OrderedMap } from 'immutable';
const milestoneNewList = List([
  {
    Name: 'Overview',
    Color: '#015ff1'
  }
]);
const oppdataOrderedmap = OrderedMap({});
const roleNamesList = List(['Business Developer']);
const selectedBidMap = new Map();
const questionDataMap = new Map();
const proposalDetail = {
  Customer: 'Vamsitest',
  'CRM #': 'UZA89202',
  'Bid due date': '2025-04-01',
  'Line of business': 'Clinical',
  'Is this IQVIA Biotech': 'Yes',
  Phase: 'Phase 3',
  'Verbatim indication': 'chronic hcv',
  'Therapeutic area': 'Endocrinology',
  'Protocol number': 'gs - us - 342 - 1138',
  'Product name': 'gs - 5816',
  BoxId: '193778632818',
  IsFsp: 'No',
  pertinentDetails: 'QA',
  opportunityId: '0060100000BBXHsAAP',
  bidNo: 4
};
describe('Statement', () => {
  const defaultProps = {
    questionText: 'Sample question text',
    milestone: 'Overview',
    milestoneNew: milestoneNewList,
    ismilestoneavailable: true,
    loading: '',
    sfField: 'Indication__c',
    answerValue: '',
    sfObject: 'Opportunity',
    oppdata: oppdataOrderedmap,
    //currentSFanswer: currentSFanswerMap,
    qvidianIntegration: '',
    hasDifferentSFanswer: true,
    questionHint: 'Sample question hint',
    questionHintHTML: '',
    questionHTML:
      '<div data-contents="true"><div data-block="true" data-editor="8vq7g" data-offset-key="fao2w-0-0"><div data-offset-key="fao2w-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="fao2w-0-0"><span data-text="true">Sample question text(</span></span></div></div></div>',
    questionJSON:
      '{"blocks":[{"key":"fao2w","text":"Sample question text","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    questionHintJSON:
      '{"blocks":[{"key":"fao2w","text":"Sample question hint","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    sectionName: 'Opportunity Information from CRM (for Team review)',
    roleNames: roleNamesList,
    setEditQuestionData: jest.fn(),
    isCustomQuestion: false,
    selectedBid: selectedBidMap,
    proposalInfo: '',
    isNotepadOpen: true,
    questionId: '8959b856-0f49-4c4e-8ec8-f5955320866a',
    events: {},
    integrationsData: '',
    questionData: questionDataMap,
    proposalDetail: proposalDetail,
    eventCategories: '',
    NaLoading: false,
    showNaCheckbox: false
  };

  test('renders question text correctly', () => {
    render(
      <Provider store={store}>
        <Statement {...defaultProps} />
      </Provider>
    );
    const questionTextElement = screen.getByText('Sample question text');
    expect(questionTextElement).toBeInTheDocument();
  });

  test('renders question hint correctly', () => {
    render(
      <Provider store={store}>
        <Statement {...defaultProps} />
      </Provider>
    );
    const questionHintButton = screen.getByTestId('question-tooltip-button');
    fireEvent.click(questionHintButton);
    const questionHintElement = screen.getByTestId('question-popover');
    expect(questionHintElement).toHaveTextContent('Sample question hint');
  });

  test('renders milestone tags correctly', () => {
    const mockPropsWithMilestone = { ...defaultProps };
    const { container } = render(
      <Provider store={store}>
        <Statement {...mockPropsWithMilestone} />
      </Provider>
    );
    const milestoneTags = container.getElementsByClassName('tag');
    expect(milestoneTags).toHaveLength(1);
  });
});
