import {
  formatProposalTeamAnswers,
  generateApprovalEmailInfo,
  generateApprovalEmailURL,
  generateEmailTemplateEmail,
  getProposalTeamUsers,
  handleHyperlinks
} from '../emailUtils';
import '@testing-library/jest-dom/extend-expect';
import moment from 'moment';

describe('emailUtils getProposalTeamUsers unit tests', () => {
  it('getProposalTeamUsers should return empty array on no input', () => {
    const result = getProposalTeamUsers();
    expect(result).toEqual([]);
  });

  it("getProposalTeamUsers should return array of user object from question with 'Proposal Team' section", () => {
    const mockQuestions = [
      {
        proposalId: '705b8f01-8b34-467b-bab3-0ed7ef30a1cd',
        questionId: '0c391d22-8c40-4823-bd8e-9967802ee108',
        section: { sectionOrder: 40, sectionName: 'Proposal Team' },
        questionText: 'Customer Accounts',
        answerConfiguration: { type: 'text', options: [] },
        roleNames: ['Core - Proposal Developer'],
        answers: [{ answer: 'someemail (someemail@test.valid)' }],
        questionOrder: 29,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestone: 'Overview',
        milestoneNew: [[Object]],
        opportunityType: 'APAC ',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"s536q","text":"Customer Accounts","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="2hg89" data-offset-key="s536q-0-0"><div data-offset-key="s536q-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="s536q-0-0"><span data-text="true">Customer Accounts/span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: false,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false
      },
      {
        proposalId: '705b8f01-8b34-467b-bab3-0ed7ef30a1cd',
        questionId: '32c0b1ac-a2cc-403c-84a8-7e3dfd6fa580',
        section: { sectionOrder: 40, sectionName: 'Proposal Team' },
        questionText: 'Non-Clinical DS&B',
        answerConfiguration: { type: 'text', options: [] },
        roleNames: ['Core - Proposal Developer'],
        answers: [{ answer: 'someemail2 (someemail2@test.valid)' }],
        questionOrder: 25,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestone: 'Overview',
        milestoneNew: [[Object]],
        opportunityType:
          'Opportunity Launch Call (preferred),Opportunity Launch Call (not preferred)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"c4d9k","text":"Non-Clinical DS&B","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="x9q8n" data-offset-key="c4d9k-0-0"><div data-offset-key="c4d9k-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="c4d9k-0-0"><span data-text="true">Non-Clinical DS&B/span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: false,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false
      },
      {
        proposalId: '705b8f01-8b34-467b-bab3-0ed7ef30a1cd',
        questionId: '6b162e05-a2ed-4690-871d-0976b8bcc776',
        section: { sectionOrder: 40, sectionName: 'Proposal Team' },
        questionText: 'GSA DS&B',
        answerConfiguration: { type: 'text', options: [] },
        roleNames: ['Core - Proposal Developer'],
        answers: [{ answer: 'someemail3 (someemail3@test.valid)' }],
        questionOrder: 24,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestone: 'Overview',
        milestoneNew: [[Object]],
        opportunityType:
          'Opportunity Launch Call (preferred),Opportunity Launch Call (not preferred)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"08irq","text":"GSA DS&B","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="4y8an" data-offset-key="08irq-0-0"><div data-offset-key="08irq-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="08irq-0-0"><span data-text="true">GSA DS&B/span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: false,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false
      },
      {
        proposalId: '705b8f01-8b34-467b-bab3-0ed7ef30a1cd',
        questionId: '722f9c3c-5538-4b64-bda5-76604d61da46',
        section: { sectionOrder: 40, sectionName: 'Proposal Team' },
        questionText: 'Strategic Proposal Writer',
        answerConfiguration: { type: 'text', options: [] },
        roleNames: ['Core - Proposal Developer'],
        answers: [{ answer: 'someemail4 (someemail4@test.valid)' }],
        questionOrder: 3,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestone: 'Overview',
        milestoneNew: [[Object]],
        opportunityType:
          'Opportunity Launch Call (not preferred),Opportunity Launch Call (preferred)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"xkjql","text":"Strategic Proposal Writer","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="c66w1" data-offset-key="xkjql-0-0"><div data-offset-key="xkjql-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="xkjql-0-0"><span data-text="true">Strategic Proposal Writer/span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: false,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false
      },
      {
        proposalId: '705b8f01-8b34-467b-bab3-0ed7ef30a1cd',
        questionId: '72b7febc-d3c1-465d-b0a7-e712d8971960',
        section: { sectionOrder: 40, sectionName: 'Proposal Team' },
        questionText: 'Government Solutions',
        answerConfiguration: { type: 'text', options: [] },
        roleNames: ['Core - Proposal Developer'],
        answers: [{ answer: 'someemail5 (someemail5@test.valid)' }],
        questionOrder: 27,
        visible: false,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        logic:
          '{"type":"unary","operation":"","condition":[{"fieldName":"7239d1b4-eeb4-4a98-9a74-93a3432a3852","fieldValue":"Yes","operator":"Equal"}]}',
        milestone: 'Overview',
        milestoneNew: [[Object]],
        opportunityType:
          'Opportunity Launch Call (preferred),Opportunity Launch Call (not preferred)',
        businessRule:
          '{"conditions":[{"operator":"Or","condition":[{"fieldName":"7239d1b4-eeb4-4a98-9a74-93a3432a3852","fieldValue":["Yes"],"answerRelationship":"Or","Operator":"Equal"}],"action":[{"fieldName":"72b7febc-d3c1-465d-b0a7-e712d8971960","fieldValue":["Government Paul"],"fieldAction":"Equal","action":"setAnswer"}]}]}',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"0qvq3","text":"Government Solutions","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="9ujqh" data-offset-key="0qvq3-0-0"><div data-offset-key="0qvq3-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="0qvq3-0-0"><span data-text="true">Government Solutions/span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: false,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false
      }
    ];
    const result = getProposalTeamUsers(mockQuestions);
    expect(result).toHaveLength(5);
  });

  it("getProposalTeamUsers should return array of user object which has valid email from question with 'Proposal Team' section", () => {
    const mockQuestions = [
      {
        proposalId: '705b8f01-8b34-467b-bab3-0ed7ef30a1cd',
        questionId: '0c391d22-8c40-4823-bd8e-9967802ee108',
        section: { sectionOrder: 40, sectionName: 'Proposal Team' },
        questionText: 'Customer Accounts',
        answerConfiguration: { type: 'text', options: [] },
        roleNames: ['Core - Proposal Developer'],
        answers: [{ answer: 'someemail' }],
        questionOrder: 29,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestone: 'Overview',
        milestoneNew: [[Object]],
        opportunityType: 'APAC ',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"s536q","text":"Customer Accounts","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="2hg89" data-offset-key="s536q-0-0"><div data-offset-key="s536q-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="s536q-0-0"><span data-text="true">Customer Accounts/span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: false,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false
      },
      {
        proposalId: '705b8f01-8b34-467b-bab3-0ed7ef30a1cd',
        questionId: '32c0b1ac-a2cc-403c-84a8-7e3dfd6fa580',
        section: { sectionOrder: 40, sectionName: 'Proposal Team' },
        questionText: 'Non-Clinical DS&B',
        answerConfiguration: { type: 'text', options: [] },
        roleNames: ['Core - Proposal Developer'],
        answers: [{ answer: 'someemail2 (someemail2@test.valid)' }],
        questionOrder: 25,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestone: 'Overview',
        milestoneNew: [[Object]],
        opportunityType:
          'Opportunity Launch Call (preferred),Opportunity Launch Call (not preferred)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"c4d9k","text":"Non-Clinical DS&B","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="x9q8n" data-offset-key="c4d9k-0-0"><div data-offset-key="c4d9k-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="c4d9k-0-0"><span data-text="true">Non-Clinical DS&B/span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: false,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false
      },
      {
        proposalId: '705b8f01-8b34-467b-bab3-0ed7ef30a1cd',
        questionId: '6b162e05-a2ed-4690-871d-0976b8bcc776',
        section: { sectionOrder: 40, sectionName: 'Proposal Team' },
        questionText: 'GSA DS&B',
        answerConfiguration: { type: 'text', options: [] },
        roleNames: ['Core - Proposal Developer'],
        answers: [{ answer: 'someemail3 (someemail3@test.valid)' }],
        questionOrder: 24,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestone: 'Overview',
        milestoneNew: [[Object]],
        opportunityType:
          'Opportunity Launch Call (preferred),Opportunity Launch Call (not preferred)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"08irq","text":"GSA DS&B","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="4y8an" data-offset-key="08irq-0-0"><div data-offset-key="08irq-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="08irq-0-0"><span data-text="true">GSA DS&B/span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: false,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false
      },
      {
        proposalId: '705b8f01-8b34-467b-bab3-0ed7ef30a1cd',
        questionId: '722f9c3c-5538-4b64-bda5-76604d61da46',
        section: { sectionOrder: 40, sectionName: 'Proposal Team' },
        questionText: 'Strategic Proposal Writer',
        answerConfiguration: { type: 'text', options: [] },
        roleNames: ['Core - Proposal Developer'],
        answers: [{ answer: 'someemail4 (someemail4@test.valid)' }],
        questionOrder: 3,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestone: 'Overview',
        milestoneNew: [[Object]],
        opportunityType:
          'Opportunity Launch Call (not preferred),Opportunity Launch Call (preferred)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"xkjql","text":"Strategic Proposal Writer","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="c66w1" data-offset-key="xkjql-0-0"><div data-offset-key="xkjql-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="xkjql-0-0"><span data-text="true">Strategic Proposal Writer/span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: false,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false
      },
      {
        proposalId: '705b8f01-8b34-467b-bab3-0ed7ef30a1cd',
        questionId: '72b7febc-d3c1-465d-b0a7-e712d8971960',
        section: { sectionOrder: 40, sectionName: 'Proposal Team' },
        questionText: 'Government Solutions',
        answerConfiguration: { type: 'text', options: [] },
        roleNames: ['Core - Proposal Developer'],
        answers: [{ answer: 'someemail5 (someemail5@test.valid)' }],
        questionOrder: 27,
        visible: false,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        logic:
          '{"type":"unary","operation":"","condition":[{"fieldName":"7239d1b4-eeb4-4a98-9a74-93a3432a3852","fieldValue":"Yes","operator":"Equal"}]}',
        milestone: 'Overview',
        milestoneNew: [[Object]],
        opportunityType:
          'Opportunity Launch Call (preferred),Opportunity Launch Call (not preferred)',
        businessRule:
          '{"conditions":[{"operator":"Or","condition":[{"fieldName":"7239d1b4-eeb4-4a98-9a74-93a3432a3852","fieldValue":["Yes"],"answerRelationship":"Or","Operator":"Equal"}],"action":[{"fieldName":"72b7febc-d3c1-465d-b0a7-e712d8971960","fieldValue":["Government Paul"],"fieldAction":"Equal","action":"setAnswer"}]}]}',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"0qvq3","text":"Government Solutions","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="9ujqh" data-offset-key="0qvq3-0-0"><div data-offset-key="0qvq3-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="0qvq3-0-0"><span data-text="true">Government Solutions/span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: false,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false
      }
    ];
    const result = getProposalTeamUsers(mockQuestions);
    expect(result).toHaveLength(4);
  });

  it('getProposalTeamUsers should return empty array on invalid questions input', () => {
    const result = getProposalTeamUsers({});
    expect(result).toEqual([]);
  });
});

describe('emailUtils generateApprovalEmailURL unit tests', () => {
  it('should return valid url as string', () => {
    const result = generateApprovalEmailURL();
    expect(result).toEqual(
      `https://outlook.office.com/?path=/mail/action/compose&to=?cc=&subject=&body=Unity%20has%20copied%20the%20approval%20section%20details%20to%20your%20clipboard.%20Press%20Control%20%2B%20V%20to%20paste%20the%20content%20to%20include%20it%20in%20your%20mail%20and%20share%20it%20with%20your%20team.&online=1`
    );
  });

  it('should contain subject in the generated URL', () => {
    const result = generateApprovalEmailURL('test subject');
    expect(result).toMatch(/test subject/);
  });

  it('should contain to emails in the generated URL', () => {
    const result = generateApprovalEmailURL('', [
      'johndoe@noone.himself',
      'janedoe@noone.herself'
    ]);
    expect(result).toMatch(/johndoe@noone.himself,janedoe@noone.herself/);
  });

  it('should contain cc emails in the generated URL', () => {
    const result = generateApprovalEmailURL(
      '',
      [],
      ['johndoe@noone.himself', 'janedoe@noone.herself']
    );
    expect(result).toMatch(/johndoe@noone.himself,janedoe@noone.herself/);
  });
});

describe('emailUtils generateApprovalEmailInfo unit tests', () => {
  it('should return all expected keys on error', () => {
    const result = generateApprovalEmailInfo({}, [], null);
    expect(result).toHaveProperty('subject');
    expect(result).toHaveProperty('to');
    expect(result).toHaveProperty('cc');
    expect(result).toHaveProperty('body');
  });

  it('should return all expected keys when no error', () => {
    const result = generateApprovalEmailInfo({}, [], {});
    expect(result).toHaveProperty('subject');
    expect(result).toHaveProperty('to');
    expect(result).toHaveProperty('cc');
    expect(result).toHaveProperty('body');
  });

  it('should return subject with decision answer', () => {
    const approvalSection = {
      ApprovalSectionTitle: 'Strategy Approval test 01',
      ApprovalSectionRightQuestions: ['32c0b1ac-a2cc-403c-84a8-7e3dfd6fa580'],
      ApprovalSectionId: 'd791a317-8f1b-488b-85cb-4247fca2b156',
      ApprovalSectionOrder: 1,
      ApprovalSectionLeftQuestions: [
        '0c391d22-8c40-4823-bd8e-9967802ee108',
        '6b162e05-a2ed-4690-871d-0976b8bcc776'
      ],
      ArchivedData: []
    };
    const mockQuestions = [
      {
        proposalId: '705b8f01-8b34-467b-bab3-0ed7ef30a1cd',
        questionId: '0c391d22-8c40-4823-bd8e-9967802ee108',
        section: { sectionOrder: 40, sectionName: 'Different section' },
        questionText: 'Decision',
        answerConfiguration: { type: 'table', options: [] },
        roleNames: ['Core - Proposal Developer'],
        answers: [
          {
            user: 'AnswerPulledFromSalesforce',
            userName: 'AnswerPulledFromSalesforce',
            userRole: 'AnswerPulledFromSalesforce',
            date: '2023-01-12T09:04:56.720Z',
            answer: {
              rows: [
                {
                  test: '1',
                  header: '1',
                  rowId: 0,
                  canEdit: true,
                  hidden: false
                },
                {
                  header: '2',
                  canEdit: true,
                  test: '2',
                  hidden: false
                },
                { header: '3', canEdit: true, test: '3', hidden: false }
              ],
              columns: [
                {
                  accessor: 'header',
                  frozen: true,
                  hidden: false,
                  locked: false,
                  type: 'text',
                  alwaysVisible: false,
                  canEdit: false
                },
                {
                  hidden: true,
                  alwaysVisible: false,
                  accessor: 'test',
                  frozen: false,
                  locked: false,
                  type: 'text',
                  canEdit: false,
                  header: 'test'
                }
              ]
            },
            proposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
            formattedAnswer: ['qweq'],
            updatedInPG: false
          },
          {
            user: 'AnswerPulledFromSalesforce',
            userName: 'AnswerPulledFromSalesforce',
            userRole: 'AnswerPulledFromSalesforce',
            date: '2023-01-13T09:12:32.087Z',
            answer: '',
            proposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
            formattedAnswer: ['qweq'],
            updatedInPG: false
          }
        ],
        questionOrder: 29,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestone: 'Overview',
        milestoneNew: [[Object]],
        opportunityType: 'APAC ',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"s536q","text":"Customer Accounts","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="2hg89" data-offset-key="s536q-0-0"><div data-offset-key="s536q-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="s536q-0-0"><span data-text="true">Customer Accounts/span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        questionTableConfig:
          '{"canEditColumn":false,"canAddRow":true,"rows":[{"header":"tptabler1","tptablec3":"","tptablec1":"","rowId":0,"tptablec2":""},{"header":"tptabler2","tptablec3":"","tptablec1":"","rowId":1,"tptablec2":""},{"header":"tptabler3","tptablec3":"","tptablec1":"","rowId":2,"tptablec2":""}],"columns":[{"accessor":"header","frozen":true,"hidden":false,"locked":false,"type":"text","alwaysVisible":false},{"hidden":false,"alwaysVisible":false,"accessor":"tptablec1","header":"tptablec1","frozen":false,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"tptablec2","header":"tptablec2","frozen":false,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"tptablec3","header":"tptablec3","frozen":false,"locked":false,"type":"text"}],"canAddColumn":true,"canEditRow":false}'
      },
      {
        proposalId: '705b8f01-8b34-467b-bab3-0ed7ef30a1cd',
        questionId: '32c0b1ac-a2cc-403c-84a8-7e3dfd6fa580',
        section: { sectionOrder: 40, sectionName: 'Proposal Team' },
        questionText: 'Non-Clinical DS&B',
        answerConfiguration: { type: 'text', options: [] },
        roleNames: ['Core - Proposal Developer'],
        answers: [{ answer: 'someemail2 (someemail2@test.valid)' }],
        questionOrder: 25,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestone: 'Overview',
        milestoneNew: [[Object]],
        opportunityType:
          'Opportunity Launch Call (preferred),Opportunity Launch Call (not preferred)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"c4d9k","text":"Non-Clinical DS&B","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="x9q8n" data-offset-key="c4d9k-0-0"><div data-offset-key="c4d9k-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="c4d9k-0-0"><span data-text="true">Non-Clinical DS&B/span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: false,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false
      },
      {
        proposalId: '705b8f01-8b34-467b-bab3-0ed7ef30a1cd',
        questionId: '6b162e05-a2ed-4690-871d-0976b8bcc776',
        section: { sectionOrder: 40, sectionName: 'Proposal Team' },
        questionText: 'GSA DS&B',
        answerConfiguration: { type: 'text', options: [] },
        roleNames: ['Core - Proposal Developer'],
        answers: [
          {
            answer: 'someemail3 (someemail3@test.valid)',
            formattedAnswer: {
              htmlExport:
                '<a href="mailto=someemail3@test.valid">someemail3</a>'
            }
          }
        ],
        questionOrder: 24,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestone: 'Overview',
        milestoneNew: [[Object]],
        opportunityType:
          'Opportunity Launch Call (preferred),Opportunity Launch Call (not preferred)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"08irq","text":"GSA DS&B","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="4y8an" data-offset-key="08irq-0-0"><div data-offset-key="08irq-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="08irq-0-0"><span data-text="true">GSA DS&B/span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: false,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false
      },
      {
        proposalId: '705b8f01-8b34-467b-bab3-0ed7ef30a1cd',
        questionId: '722f9c3c-5538-4b64-bda5-76604d61da46',
        section: { sectionOrder: 40, sectionName: 'Proposal Team' },
        questionText: 'Strategic Proposal Writer',
        answerConfiguration: { type: 'text', options: [] },
        roleNames: ['Core - Proposal Developer'],
        answers: [{ answer: 'someemail4 (someemail4@test.valid)' }],
        questionOrder: 3,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestone: 'Overview',
        milestoneNew: [[Object]],
        opportunityType:
          'Opportunity Launch Call (not preferred),Opportunity Launch Call (preferred)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"xkjql","text":"Strategic Proposal Writer","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="c66w1" data-offset-key="xkjql-0-0"><div data-offset-key="xkjql-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="xkjql-0-0"><span data-text="true">Strategic Proposal Writer/span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: false,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false
      },
      {
        proposalId: '705b8f01-8b34-467b-bab3-0ed7ef30a1cd',
        questionId: '72b7febc-d3c1-465d-b0a7-e712d8971960',
        section: { sectionOrder: 40, sectionName: 'Proposal Team' },
        questionText: 'Government Solutions',
        answerConfiguration: { type: 'text', options: [] },
        roleNames: ['Core - Proposal Developer'],
        answers: [{ answer: 'someemail5 (someemail5@test.valid)' }],
        questionOrder: 27,
        visible: false,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        logic:
          '{"type":"unary","operation":"","condition":[{"fieldName":"7239d1b4-eeb4-4a98-9a74-93a3432a3852","fieldValue":"Yes","operator":"Equal"}]}',
        milestone: 'Overview',
        milestoneNew: [[Object]],
        opportunityType:
          'Opportunity Launch Call (preferred),Opportunity Launch Call (not preferred)',
        businessRule:
          '{"conditions":[{"operator":"Or","condition":[{"fieldName":"7239d1b4-eeb4-4a98-9a74-93a3432a3852","fieldValue":["Yes"],"answerRelationship":"Or","Operator":"Equal"}],"action":[{"fieldName":"72b7febc-d3c1-465d-b0a7-e712d8971960","fieldValue":["Government Paul"],"fieldAction":"Equal","action":"setAnswer"}]}]}',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"0qvq3","text":"Government Solutions","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="9ujqh" data-offset-key="0qvq3-0-0"><div data-offset-key="0qvq3-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="0qvq3-0-0"><span data-text="true">Government Solutions/span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: false,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false
      }
    ];
    const result = generateApprovalEmailInfo(
      approvalSection,
      mockQuestions,
      {},
      []
    );
    expect(result.subject).toMatch(
      'Strategy Approval test 01 for    (Opportunity  Bid )'
    );
  });

  it('should generate the correct email template', () => {
    const subject = 'Test Subject';
    const to = ['test1@example.com', 'test2@example.com'];
    const cc = ['test3@example.com'];
    const body = 'Test Body';
    const result = generateEmailTemplateEmail(subject, to, cc, body);
    const expected =
      `https://outlook.office.com/?path=/mail/action/compose&to=${to.join(
        ','
      )}` +
      `?cc=${cc.join(
        ','
      )}&subject=${subject}&body=Unity%20has%20copied%20the%20configured%20email%20content%20to%20your%20clipboard.%20Press%20Control%20%2B%20V%20to%20paste%20this%20content%20into%20the%20Body%20of%20this%20email.&online=1`;

    expect(result).toEqual(expected);
  });
  it('should return N/A for N/A answer and date type config', () => {
    const answer = 'N/A';
    const config = { type: 'date' };

    const result = handleHyperlinks(answer, config);
    expect(result).toEqual('N/A');
  });

  it('should format date for valid date answer and date type config', () => {
    const answer = '2022-01-01';
    const config = { type: 'date' };

    const result = handleHyperlinks(answer, config);
    expect(result).toEqual(moment(answer).format('DD-MMM-YYYY'));
  });

  it('should return empty string for invalid date answer and date type config', () => {
    const answer = 'invalid date';
    const config = { type: 'date' };

    const result = handleHyperlinks(answer, config);
    expect(result).toEqual('');
  });

  it('should return string answer for non-date type config', () => {
    const answer = 'test';
    const config = { type: 'text' };

    const result = handleHyperlinks(answer, config);
    expect(result).toEqual(answer);
  });

  it('should return undefined answer as is', () => {
    const answer = undefined;
    const config = { type: 'text' };

    const result = handleHyperlinks(answer, config);
    expect(result).toEqual(answer);
  });
  it('should format the proposal team answers correctly', () => {
    const answer = 'JohnDoe,JaneDoe'; // adjust this input as needed
    const PROPOSAL_TEAM_USER_MATCH_REGEXP = /(\w+)(\d+)/; // replace with the actual regular expression

    const result = formatProposalTeamAnswers(answer);
    const expected = answer
      .split(',')
      .map(user => {
        const userMatchFound = user.match(PROPOSAL_TEAM_USER_MATCH_REGEXP);
        if (userMatchFound !== null) {
          return `${userMatchFound[1]} ${userMatchFound[2]}`;
        }
        return user;
      })
      .join(', ');

    expect(result).toEqual(expected);
  });
});
