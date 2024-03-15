import React from 'react';
import { OrderedMap, Map, List } from 'immutable';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { store } from '../../../store';
import CollapsibleQuestionMapping from '../CollapsibleQuestionMapping';

const textQuestions = OrderedMap({
  'c22451f2-9dda-4dd4-a09c-a34467bfd72a': Map({
    isCustomQuestion: true,
    questionId: 'c22451f2-9dda-4dd4-a09c-a34467bfd72a',
    section: Map({
      sectionOrder: 24,
      sectionName: 'Adding new section'
    }),
    active: false,
    sfField: 'n/a',
    questionOrder: 1,
    questionApproval: false,
    locked: false,
    opportunityType:
      'Default Type,Core Strategy Call Template - AMR/EMEA,Core Strategy Call Template - APAC,Core Strategy and Data Planning Calls - AMR/EMEA,Non-Core Clinical Studies,Ballpark,Opportunity Launch Call (Pilot)',
    proposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
    questionJSON:
      '{"blocks":[{"key":"bcfph","text":"Adding new question","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    milestoneNew: List([]),
    hasDifferentSFanswer: false,
    questionHTML:
      '<div data-contents="true"><div data-block="true" data-editor="6r9m6" data-offset-key="bcfph-0-0"><div data-offset-key="bcfph-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="bcfph-0-0"><span data-text="true">Adding new question</span></span></div></div></div>',
    roleNames: ['Business Developer', 'Business Account Manager'],
    visible: true,
    notApplicable: false,
    sfObject: 'n/a',
    questionText: 'Adding new question',
    integration: '',
    answers: List([
      Map({
        user: 'AnswerPulledFromSalesforce',
        userName: 'AnswerPulledFromSalesforce',
        userRole: 'AnswerPulledFromSalesforce',
        date: '2023-02-01T12:56:41.433Z',
        answer: List(['Viral hepatitis C']),
        formattedAnswer: ['Viral hepatitis C'],
        proposalId: '93c77a01-5e31-4191-9b2f-cfac782a21af',
        updatedInPG: false
      })
    ]),
    questionHintJSON: '',
    questionHintHTML: '',
    answerConfiguration: Map({
      type: 'text',
      options: []
    }),
    events: ''
  }),
})

const statement = OrderedMap({
  '21664eb6-a924-4dad-a49b-cbcb9cad5bd9': Map({
    proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
    questionId: '21664eb6-a924-4dad-a49b-cbcb9cad5bd9',
    section: Map({
      sectionOrder: 23,
      sectionName: 'Test_4447 updated'
    }),
    questionText:
      ' Opportunity Type Akash  Hyperlinks added in the statement questions in Ubuild are not working in Unity. https://qa-unity.iqvia.app/ ',
    answerConfiguration: Map({
      type: 'statement',
      options: []
    }),
    roleNames: ['Business Account Manager', 'Business Developer'],
    answers: List([]),
    questionOrder: 4,
    visible: true,
    locked: false,
    sfObject: 'n/a',
    sfField: 'n/a',
    milestoneNew: List([]),
    opportunityType:
      'Default Type,Core Opportunity Launch Call (AMR/EMEA),Core Opportunity Launch Call (APAC)',
    hasDifferentSFanswer: false,
    isCustomQuestion: false,
    questionJSON:
      '{"blocks":[{"key":"aacf0","text":" Opportunity Type Akash  Hyperlinks added in the statement questions in Ubuild are not working in Unity. https://qa-unity.iqvia.app/ ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":25,"length":10,"key":0},{"offset":72,"length":6,"key":1},{"offset":105,"length":26,"key":2}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://gitlabrnds.quintiles.com/cbex/unity/unity-app-frontend/-/jobs/2836930","rel":"noreferrer","target":"_blank","url":"https://gitlabrnds.quintiles.com/cbex/unity/unity-app-frontend/-/jobs/2836930"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://dev-unity.dev.iqvia.app/ubuild","rel":"noreferrer","target":"_blank","url":"https://dev-unity.dev.iqvia.app/ubuild"}},"2":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://qa-unity.iqvia.app/","rel":"noreferrer","target":"_blank","url":"https://qa-unity.iqvia.app/"}}}}',
    questionHTML:
      '<div data-contents="true"><div data-block="true" data-editor="b7qnq" data-offset-key="aacf0-0-0"><div data-offset-key="aacf0-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="aacf0-0-0"><span data-text="true"> Opportunity Type Akash  </span></span><span><a href="https://gitlabrnds.quintiles.com/cbex/unity/unity-app-frontend/-/jobs/2836930" target="_blank" rel="noreferrer" style="color: rgb(7, 104, 253);"><span data-offset-key="aacf0-1-0"><span data-text="true">Hyperlinks</span></span></a></span><span data-offset-key="aacf0-2-0"><span data-text="true"> added in the statement questions in </span></span><span><a href="https://dev-unity.dev.iqvia.app/ubuild" target="_blank" rel="noreferrer" style="color: rgb(7, 104, 253);"><span data-offset-key="aacf0-3-0"><span data-text="true">Ubuild</span></span></a></span><span data-offset-key="aacf0-4-0"><span data-text="true"> are not working in Unity. </span></span><span><a href="https://qa-unity.iqvia.app/" target="_blank" rel="noreferrer" style="color: rgb(7, 104, 253);"><span data-offset-key="aacf0-5-0"><span data-text="true">https://qa-unity.iqvia.app</span></span></a></span><span data-offset-key="aacf0-6-0"><span data-text="true">/ </span></span></div></div></div>',
    questionHintJSON: '',
    questionHintHTML: '',
    active: true,
    integration: '',
    events: '',
    notApplicable: false,
    questionApproval: false,
    bidAnswerCopy: false,
    questionTableConfig: '{}',
    latestAnsweredBidNo: null,
    bidType: 'RFI_Request'
  })
})

const approvalQuestions = OrderedMap({
  'd0b52140-0d00-4cd5-a613-caa815d94ab8': Map({
    proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
    questionId: 'd0b52140-0d00-4cd5-a613-caa815d94ab8',
    section: Map({
      sectionOrder: 20,
      sectionName: 'Approvals'
    }),
    questionText:
      'Follow-up items, key decisions, reasons for approval or no approval  ',
    answerConfiguration: Map({
      type: 'text',
      options: []
    }),
    roleNames: ['Proposal Developer'],
    answers: List([]),
    questionOrder: 5,
    visible: true,
    locked: false,
    sfObject: 'n/a',
    sfField: 'n/a',
    milestoneNew: List([]),
    interestedParties:
      'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Feasibility,Global Site Activation (GSA),Medical Strategy Lead,Project Lead,Proposal Developer,Site Analytics,Therapeutic Strategy Lead,Global Analytics',
    opportunityType:
      'Default Type,Core Opportunity Launch Call (AMR/EMEA),Core Opportunity Launch Call (APAC)',
    hasDifferentSFanswer: false,
    isCustomQuestion: true,
    questionJSON:
      '{"blocks":[{"key":"9h195","text":"Follow-up items, key decisions, reasons for approval or no approval  ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    questionHTML:
      '<div data-contents="true"><div data-block="true" data-editor="3sqnm" data-offset-key="9h195-0-0"><div data-offset-key="9h195-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="9h195-0-0"><span data-text="true">Budget: Follow-up items, key decisions, reasons for approval or no approval  </span></span></div></div></div>',
    questionHintJSON: '',
    questionHintHTML: '',
    active: false,
    integration: '',
    events: '',
    notApplicable: false,
    questionApproval: true,
    bidAnswerCopy: false,
    questionTableConfig: '{}',
    latestAnsweredBidNo: null,
    bidType: 'RFI_Request'
  })
});

describe('CollapsibleQuestionMapping', () => {
  it('render a Question component for visible text question', () => {
    const defaultProps = {
      questions: textQuestions,
      milestone: 'true',
      title: 'Adding new section',
      isNotepadOpen: true,
      setQuestionToDisplayHistory: jest.fn()
    };
    const { container } = render(
      <Provider store={store}>
        <CollapsibleQuestionMapping {...defaultProps} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  it('render a Question component for visible statement', () => {
    const defaultProps = {
      questions: statement,
      milestone: 'true',
      title: 'Test_4447 updated',
      isNotepadOpen: true,
      setQuestionToDisplayHistory: jest.fn()
    };
    const { container } = render(
      <Provider store={store}>
        <CollapsibleQuestionMapping {...defaultProps} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  it('render a Question component for visible approval question', () => {
    const defaultProps = {
      questions: approvalQuestions,
      milestone: 'true',
      title: 'Approvals',
      isNotepadOpen: true,
      setQuestionToDisplayHistory: jest.fn()
    };
    const { container } = render(
      <Provider store={store}>
        <CollapsibleQuestionMapping {...defaultProps} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });
});
