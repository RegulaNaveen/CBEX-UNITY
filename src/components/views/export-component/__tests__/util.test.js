import { questionTables } from '../pdf-template';
import { formatAnswer } from '../utils';

describe('util tests', () => {
  it('should return hyperlink if question type is table', () => {
    const question = {
      answerConfiguration: {
        type: 'table'
      },
      questionId: '1'
    };
    const result = formatAnswer(question, 'pdf');
    expect(result).toEqual(
      `<a target="_blank" href="${window.location.href}&search_q=1">Click here to view the table in Unity</a>`
    );
  });

  it('should return last answer if question type is not table', () => {
    const question = {
      answerConfiguration: {
        type: 'text'
      },
      answers: [
        {
          answer: 'answer 1',
          date: '2020-01-01'
        },
        {
          answer: 'answer 2',
          date: '2020-01-02'
        }
      ]
    };
    const result = formatAnswer(question, 'pdf');
    expect(result).toEqual('answer 2');
  });

  it('should return last answer if doc_type is not pdf and question type is not table', () => {
    const question = {
      answerConfiguration: {
        type: 'text'
      },
      answers: [
        {
          answer: 'answer 1',
          date: '2020-01-01'
        },
        {
          answer: 'answer 2',
          date: '2020-01-02'
        }
      ]
    };
    const result = formatAnswer(question);
    expect(result).toEqual('answer 2');
  });

  it('test pdf template', () => {
    const proposalquestion = [
      {
        proposalId: 'e7a77d70-b7a1-4a98-8d6e-e1f1244b64f5',
        questionId: '088e8e63-0a1a-4167-919e-bc0961954a43',
        section: {
          sectionOrder: 27,
          sectionName: 'Questions for the Customer'
        },
        questionText: 'Latest table question',
        answerConfiguration: {
          type: 'table',
          options: []
        },
        roleNames: ['Business Developer'],
        answers: [],
        questionOrder: 4,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestoneNew: [],
        opportunityType:
          'Default Type,Non-Core Clinical Studies,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"77kb5","text":"Latest table question","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="cv55e" data-offset-key="77kb5-0-0"><div data-offset-key="77kb5-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="77kb5-0-0"><span data-text="true">Latest table question</span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        bidAnswerCopy: true,
        questionTableConfig:
          '{"canEditColumn":false,"canAddRow":false,"rows":[{"header":"row 1","col 1":"","rowId":0}],"columns":[{"accessor":"header","frozen":true,"hidden":false,"locked":false,"type":"text","alwaysVisible":false},{"hidden":false,"alwaysVisible":false,"accessor":"col 1","header":"col 1","frozen":false,"locked":false,"type":"text"}],"canAddColumn":false,"canEditRow":false}',
        latestAnsweredBidNo: null,
        bidType: 'Early_Engagement_Bid'
      },
      {
        proposalId: 'e7a77d70-b7a1-4a98-8d6e-e1f1244b64f5',
        questionId: 'Proposal Team-Z5P',
        section: {
          sectionOrder: 1,
          sectionName: 'Proposal Team'
        },
        questionText: 'Proposal Developer',
        answerConfiguration: {
          type: 'table',
          options: []
        },
        roleNames: ['Business Developer', 'Proposal Developer'],
        answers: [],
        questionOrder: 2,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestoneNew: [
          {
            Name: 'Team',
            Color: '#595959'
          }
        ],
        interestedParties:
          'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead,Feasibility,Global Site Activation (GSA),Site Analytics,Global Analytics,Clinical Coder',
        opportunityType:
          'Core Opportunity Launch Call (AMR/EMEA),Core Opportunity Launch Call (APAC)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"kqovm","text":"Proposal Developer","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="woh2x" data-offset-key="kqovm-0-0"><div data-offset-key="kqovm-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="kqovm-0-0"><span data-text="true">Proposal Developer</span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        bidAnswerCopy: false,
        questionTableConfig:
          '{"canEditColumn":false,"canAddRow":false,"rows":[{"header":"Row 1","hidden":false,"Col 1":"","rowId":0}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","header":"","frozen":true,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"Col 1","header":"Col 1","frozen":false,"locked":false,"type":"text"}],"canAddColumn":false,"canEditRow":false}',
        latestAnsweredBidNo: null,
        bidType: 'Early_Engagement_Bid'
      }
    ];
    const allquestion = [
      ,
      {
        proposalId: 'e7a77d70-b7a1-4a98-8d6e-e1f1244b64f5',
        questionId: '088e8e63-0a1a-4167-919e-bc0961954a43',
        section: {
          sectionOrder: 27,
          sectionName: 'Questions for the Customer'
        },
        questionText: 'Latest table question',
        answerConfiguration: {
          type: 'table',
          options: []
        },
        roleNames: ['Business Developer'],
        answers: [],
        questionOrder: 4,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestoneNew: [],
        opportunityType:
          'Default Type,Non-Core Clinical Studies,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"77kb5","text":"Latest table question","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="cv55e" data-offset-key="77kb5-0-0"><div data-offset-key="77kb5-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="77kb5-0-0"><span data-text="true">Latest table question</span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        bidAnswerCopy: true,
        questionTableConfig:
          '{"canEditColumn":false,"canAddRow":false,"rows":[{"header":"row 1","col 1":"","rowId":0}],"columns":[{"accessor":"header","frozen":true,"hidden":false,"locked":false,"type":"text","alwaysVisible":false},{"hidden":false,"alwaysVisible":false,"accessor":"col 1","header":"col 1","frozen":false,"locked":false,"type":"text"}],"canAddColumn":false,"canEditRow":false}',
        latestAnsweredBidNo: null,
        bidType: 'Early_Engagement_Bid'
      },
      {
        proposalId: 'e7a77d70-b7a1-4a98-8d6e-e1f1244b64f5',
        questionId: 'Proposal Team-Z5P',
        section: {
          sectionOrder: 1,
          sectionName: 'Proposal Team'
        },
        questionText: 'Proposal Developer',
        answerConfiguration: {
          type: 'table',
          options: []
        },
        roleNames: ['Business Developer', 'Proposal Developer'],
        answers: [],
        questionOrder: 2,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestoneNew: [
          {
            Name: 'Team',
            Color: '#595959'
          }
        ],
        interestedParties:
          'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead,Feasibility,Global Site Activation (GSA),Site Analytics,Global Analytics,Clinical Coder',
        opportunityType:
          'Core Opportunity Launch Call (AMR/EMEA),Core Opportunity Launch Call (APAC)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"kqovm","text":"Proposal Developer","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="woh2x" data-offset-key="kqovm-0-0"><div data-offset-key="kqovm-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="kqovm-0-0"><span data-text="true">Proposal Developer</span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        bidAnswerCopy: false,
        questionTableConfig:
          '{"canEditColumn":false,"canAddRow":false,"rows":[{"header":"Row 1","hidden":false,"Col 1":"","rowId":0}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","header":"","frozen":true,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"Col 1","header":"Col 1","frozen":false,"locked":false,"type":"text"}],"canAddColumn":false,"canEditRow":false}',
        latestAnsweredBidNo: null,
        bidType: 'Early_Engagement_Bid'
      }
    ];
    const html = questionTables(allquestion, proposalquestion);
    expect(html.length).toBeGreaterThan(0);
  });
});
