import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import QuestionContainer from '../QuestionContainer';
import { shallow } from 'enzyme';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('QuestionContainer Component', () => {
  it('renders without crashing', () => {
    const item = {
      questionId: 'c46b37e1-33a2-430f-af91-f074208247ac',
      sfField: 'n/a',
      proposalId: '8f54b1c0-b78f-4ae6-87b8-3a6587b9e5e1',
      proposalDetail: {},
      isNotApplicable: false,
      milestoneCond: true,
      NaLoading: false,
      currentSFAnswer: {},
      sficon: 'n/a',
      milestone: {},
      lastAns: {},
      qvicon: {},
      answers: {},
      loading: {},
      sfObject: 'n/a',
      questionHint: '',
      questionHintJSON: '',
      questionHTML:
        '<div data-contents="true"><div data-block="true" data-editor="58hir" data-offset-key="eqhkm-0-0"><div data-offset-key="eqhkm-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="eqhkm-0-0"><span data-text="true">Team absences from Strategy Call</span></span></div></div></div>',
      sectionName: 'Key Milestones & Deliverable Timelines',
      events: {},
      questionText: 'Team absences from Strategy Call',
      questionJSON:
        '{"blocks":[{"key":"eqhkm","text":"Team absences from Strategy Call","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      isCustomQuestion: false,
      notApplicable: false,
      isSetQuestionLoadingData: {},
      questionData: {},
      section: {},
      milestoneNew: {},
      allSections: {},
      answerConfiguration: {},
      questionLockInfo: {},
      roleNames: ['Proposal Developer'],
      visible: true,
      hasDifferentSFanswer: false,
      qvidianIntegration: '',
      bidAnswerCopy: false,
      bidType: 'Early_Engagement_Bid',
      latestAnsweredBidNo: null,
      questionDataDestinations: {}
    };

    const wrapper = shallow(<QuestionContainer item={item} />, container);
    expect(wrapper.exists()).toBe(true);
  });
});
