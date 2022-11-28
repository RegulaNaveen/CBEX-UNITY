import {
  generateApprovalEmailInfo,
  generateApprovalEmailURL,
  getProposalTeamUsers
} from '../emailUtils';
import '@testing-library/jest-dom/extend-expect';

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
      `https://outlook.office.com/?path=/mail/action/compose&to=&subject=&cc=&body=Unity%20has%20copied%20the%20approval%20section%20details%20to%20your%20clipboard.%20Press%20Control%20%2B%20V%20to%20paste%20the%20content%20to%20include%20it%20in%20your%20mail%20and%20share%20it%20with%20your%20team.&online=1`
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
});
