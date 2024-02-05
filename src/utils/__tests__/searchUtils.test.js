import { NOTEPAD_UI_ID } from '../../constants/app';
import {
  extractTextFromProseMirrorJSON,
  getSearchResults,
  searchInTab,
  searchInApprovals,
  searchInQuestionsForCustomer,
  searchInKeyMilestone,
  searchInNotepad,
  searchInEmailTemplates,
  searchInProposalTeam,
  updateSearchMatches,
  getTableData
} from '../searchUtils';
import mockData from './search_data.json';
import { shouldShowSection } from '../../components/screens/Approvals/utils';
describe.skip('searchUtils unit tests', () => {
  it('getSearchResults should return count and searchResults on a match', async () => {
    let queryStr = 'test';
    let searchResults = await getSearchResults(
      queryStr,
      mockData.questions,
      mockData.sections,
      mockData.approvals,
      ''
    );
    expect(searchResults.count).toBe(searchResults.results.length);
  });

  it('should match text from section title by ignoring case', async () => {
    let queryStr = 'section 1';
    let searchResults = await getSearchResults(
      queryStr,
      mockData.questions,
      mockData.sections,
      mockData.approvals,
      ''
    );
    expect(searchResults.results[0].searchIndex).toBe('Test Section 1');
  });

  it('should match text from question text', async () => {
    let queryStr = 'question 1';
    let searchResults = await getSearchResults(
      queryStr,
      mockData.questions,
      mockData.sections,
      mockData.approvals,
      ''
    );
    expect(searchResults.results[0].searchIndex).toBe('question_ID_1');
  });

  it('should match text from question answer', async () => {
    let queryStr = 'answer 1';
    let searchResults = await getSearchResults(
      queryStr,
      mockData.questions,
      mockData.sections,
      mockData.approvals,
      ''
    );
    expect(searchResults.results[0].searchIndex).toBe('question_ID_1');
  });

  it('should match text from notepad', async () => {
    let queryStr = 'notepad data';
    let searchResults = await getSearchResults(
      queryStr,
      mockData.questions,
      mockData.sections,
      mockData.approvals,
      ['notepad data']
    );
    expect(searchResults.results[0].searchIndex).toBe(NOTEPAD_UI_ID);
  });

  it('should match text from multiple question answers', async () => {
    let queryStr = 'multiple answer';
    let searchResults = await getSearchResults(
      queryStr,
      mockData.questions,
      mockData.sections,
      mockData.approvals,
      ''
    );
    expect(searchResults.results[0].searchIndex).toBe('question_multiple_ID_1');
  });

  it('should match name from proposal team section', async () => {
    let queryStr = 'John';
    let searchResults = await getSearchResults(
      queryStr,
      mockData.questions,
      mockData.sections,
      mockData.approvals,
      ''
    );
    expect(searchResults.count).toBe(1);
    expect(searchResults.results[0].searchIndex).toBe('proposal_team_que_1');
  });

  it('should match name from proposal team section with multiple answers', async () => {
    let queryStr = 'doe';
    let searchResults = await getSearchResults(
      queryStr,
      mockData.questions,
      mockData.sections,
      mockData.approvals,
      ''
    );
    expect(searchResults.count).toBe(2);
    expect(searchResults.results[0].searchIndex).toBe('proposal_team_que_1');
    expect(searchResults.results[1].searchIndex).toBe('proposal_team_que_1');
  });

  it('should match text from approval section title', async () => {
    let queryStr = 'approval section';
    let searchResults = await getSearchResults(
      queryStr,
      mockData.questions,
      mockData.sections,
      mockData.approvals,
      ''
    );
    expect(searchResults.count).toBe(1);
    expect(searchResults.results[0].searchIndex).toBe('approval_section_1');
  });

  it("should match text from approvalsection's left question", async () => {
    let queryStr = 'Test Question 2';
    let searchResults = await getSearchResults(
      queryStr,
      mockData.questions,
      mockData.sections,
      mockData.approvals,
      ''
    );
    expect(searchResults.count).toBe(2);
    expect(searchResults.results[1].searchIndex).toBe(
      'question_ID_2-approval-approval_section_1-left-ques'
    );
  });

  it("should match text from approval section's right question", async () => {
    let queryStr = 'Test Question 1';
    let searchResults = await getSearchResults(
      queryStr,
      mockData.questions,
      mockData.sections,
      mockData.approvals,
      ''
    );
    expect(searchResults.count).toBe(2);
    expect(searchResults.results[1].searchIndex).toBe(
      'question_ID_1-approval-approval_section_1-right-ques'
    );
  });

  it("should match text from approval section's multiple answer type question", () => {});

  it('extractTextFromProseMirrorJSON should return textual data from prosemirror json', async () => {
    let proseMirrorJSON = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: { textAlign: 'left' },
          content: [
            {
              type: 'text',
              text: 'highlight in notepad ',
              marks: [{ type: 'highlight', attrs: {} }]
            },
            { type: 'text', text: ' non-highlight in same line' },
            { type: 'mention', attrs: { label: 'User name' } }
          ]
        }
      ]
    };

    const responseTextArr = extractTextFromProseMirrorJSON(proseMirrorJSON);
    expect(responseTextArr).toEqual([
      'highlight in notepad ',
      ' non-highlight in same line',
      'User name'
    ]);
  });

  ////************************************* */
  test('test getSearchResults function ', async () => {
    let queryStr = 'Test Question 1';
    let searchResults = await getSearchResults(
      queryStr,
      mockData.query,
      mockData.questions,
      mockData.sections,
      mockData.approvals,
      mockData.notepadData,
      mockData.activeTab,
      mockData.isQuestionsFilterEnabled,
      mockData.approvalFilters,
      mockData.unityTabFilters,
      mockData.questionsForCustomersEnabled,
      mockData.allTabs,
      mockData.filteredQuestionsMap,
      mockData.sectionsUnfiltered,
      mockData.allFlags,
      mockData.emailTemplates
    );

    expect(searchResults).toBe(1);
    expect(searchResults.results[0].searchIndex).toBe('Date');
  });
});

describe('searchUtils unit tests cases', () => {
  it('check function getSearchResults', async () => {
    const {
      query,
      questions,
      sections,
      approvals,
      notepadData,
      activeTab,
      isQuestionsFilterEnabled,
      approvalFilters,
      unityTabFilters,
      questionsForCustomersEnabled,
      allTabs,
      filteredQuestionsMap,
      sectionsUnfiltered,
      allFlags,
      emailTemplates
    } = mockData;
    const searchResults = await getSearchResults(mockData);

    //expect(searchResults).toBe({ count: 0, results: ['Date'] });
    //expect(searchResults.results[0]).toBe('Date');
  });

  it('check searchInTab function', () => {
    const props = {
      finalResult: {
        count: 1,
        results: [
          {
            tab: 0,
            searchIndex: 'a9431c40-4dd9-44ea-b9e2-68fce5a1fef7',
            inputText: 'MAP Call',
            vTab: 3,
            startIndex: 0,
            endIndex: 3,
            matchIndex: 0,
            tabName: 'Strategy Development',
            sectionName: null
          }
        ]
      },
      regexp: '/MAP/gi',
      sections: {
        'Test Section 1': {
          sectionOrder: 1,
          sectionName: 'Key Milestones & Deliverable Timelines',
          questions: {
            question_ID_1: {
              proposalId: 'proposal_ID_1',
              questionId: 'question_ID_1',
              section: { sectionOrder: 1, sectionName: 'Test Section 1' },
              questionText: 'Test Question 1',
              answers: [
                {
                  user: 'testUser',
                  userName: 'testUser',
                  userRole: 'testRole',
                  date: '2022-12-06T13:08:14.123Z',
                  answer: 'Test answer 1',
                  proposalId: 'proposal_ID_1',
                  formattedAnswer: ''
                }
              ],
              questionOrder: 1,
              visible: true,
              isCustomQuestion: false,
              active: true,
              notApplicable: false,
              questionApproval: false,
              answerConfiguration: {
                type: 'date',
                options: []
              }
            },
            question_multiple_ID_1: {
              proposalId: 'proposal_ID_1',
              questionId: 'question_multiple_ID_1',
              section: { sectionOrder: 1, sectionName: 'Test Section 1' },
              questionText: 'Test Multiple Question 1',
              answers: [
                {
                  user: 'testUser',
                  userName: 'testUser',
                  userRole: 'testRole',
                  date: '2022-12-06T13:08:14.123Z',
                  answer: ['multiple answer 1', 'multiple answer 2'],
                  proposalId: 'proposal_ID_1',
                  formattedAnswer: ''
                }
              ],
              questionOrder: 2,
              visible: true,
              isCustomQuestion: true,
              active: false,
              notApplicable: false,
              questionApproval: false,
              answerConfiguration: {
                type: 'proposal_team',
                options: ['YES', 'NO']
              }
            }
          }
        },
        'Test Section 2': {
          sectionOrder: 2,
          sectionName: 'Test Section 2',
          questions: {
            question_ID_2: {
              proposalId: 'proposal_ID_2',
              questionId: 'question_ID_2',
              section: { sectionOrder: 2, sectionName: 'Test Section 2' },
              questionText: 'Test Question 2',
              answers: [
                {
                  user: 'testUser',
                  userName: 'testUser',
                  userRole: 'testRole',
                  date: '2022-12-06T13:08:14.123Z',
                  answer: 'Test answer 2',
                  proposalId: 'proposal_ID_2',
                  formattedAnswer: ''
                }
              ],
              questionOrder: 1,
              visible: true,
              isCustomQuestion: false,
              active: true,
              notApplicable: false,
              questionApproval: false,
              answerConfiguration: {
                type: 'proposal_team',
                options: ['YES', 'NO']
              }
            }
          }
        },
        'Proposal Team': {
          sectionOrder: 3,
          sectionName: 'Proposal Team',
          questions: {
            proposal_team_que_1: {
              proposalId: 'proposal_ID_2',
              questionId: 'proposal_team_que_1',
              section: { sectionOrder: 3, sectionName: 'Proposal Team' },
              questionText: 'proposal team que 1',
              answers: [
                {
                  user: 'testUser',
                  userName: 'testUser',
                  userRole: 'testRole',
                  date: '2022-12-06T13:08:14.123Z',
                  answer:
                    'John Doe(johndoe@noone.himself), Jane Doe(janedoe@noone.herself)',
                  proposalId: 'proposal_ID_2',
                  formattedAnswer: ''
                }
              ],
              questionOrder: 1,
              visible: true,
              isCustomQuestion: false,
              active: true,
              notApplicable: false,
              questionApproval: false,
              answerConfiguration: {
                type: 'proposal_team',
                options: ['YES', 'NO']
              }
            }
          }
        }
      },
      tabName: 'new custom tab1',
      activeTab: 1,
      tabId: '943b8c70-1e90-4319-b5fa-728221d1a940',
      tabIndex: 4
    };
    const data = { ...mockData, ...props };
    const searchResults = searchInTab(data);
  });
  // it('check function getSearchResults with activeTab is zero', async () => {
  //   mockData.activeTab = 0;
  //   mockData = { ...mockData };
  //   const searchResults = await getSearchResults(mockData);
  // });

  it('check searchInQuestionsForCustomer', () => {
    const props = {
      finalResult: {
        count: 1,
        results: [
          {
            tab: 0,
            searchIndex: 'a9431c40-4dd9-44ea-b9e2-68fce5a1fef7',
            inputText: 'MAP Call',
            vTab: 3,
            startIndex: 0,
            endIndex: 3,
            matchIndex: 0,
            tabName: 'Strategy Development',
            sectionName: null
          }
        ]
      },
      regexp: '/MAP/gi',
      sections: {
        'Test Section 1': {
          sectionOrder: 1,
          sectionName: 'Questions_for_the_Customer_left_panel',
          questions: {
            question_ID_1: {
              proposalId: 'proposal_ID_1',
              questionId: 'question_ID_1',
              section: { sectionOrder: 1, sectionName: 'Test Section 1' },
              questionText: 'Test Question 1',
              answers: [
                {
                  user: 'testUser',
                  userName: 'testUser',
                  userRole: 'testRole',
                  date: '2022-12-06T13:08:14.123Z',
                  answer: 'Test answer 1',
                  proposalId: 'proposal_ID_1',
                  formattedAnswer: ''
                }
              ],
              questionOrder: 1,
              visible: true,
              isCustomQuestion: false,
              active: true,
              notApplicable: false,
              questionApproval: false,
              answerConfiguration: {
                type: 'proposal_team',
                options: ['YES', 'NO']
              }
            },
            question_multiple_ID_1: {
              proposalId: 'proposal_ID_1',
              questionId: 'question_multiple_ID_1',
              section: { sectionOrder: 1, sectionName: 'Test Section 1' },
              questionText: 'Test Multiple Question 1',
              answers: [
                {
                  user: 'testUser',
                  userName: 'testUser',
                  userRole: 'testRole',
                  date: '2022-12-06T13:08:14.123Z',
                  answer: ['multiple answer 1', 'multiple answer 2'],
                  proposalId: 'proposal_ID_1',
                  formattedAnswer: ''
                }
              ],
              questionOrder: 2,
              visible: true,
              isCustomQuestion: true,
              active: false,
              notApplicable: false,
              questionApproval: false,
              answerConfiguration: {
                type: 'proposal_team',
                options: ['YES', 'NO']
              }
            }
          }
        },
        'Test Section 2': {
          sectionOrder: 2,
          sectionName: 'Test Section 2',
          questions: {
            question_ID_2: {
              proposalId: 'proposal_ID_2',
              questionId: 'question_ID_2',
              section: { sectionOrder: 2, sectionName: 'Test Section 2' },
              questionText: 'Test Question 2',
              answers: [
                {
                  user: 'testUser',
                  userName: 'testUser',
                  userRole: 'testRole',
                  date: '2022-12-06T13:08:14.123Z',
                  answer: 'Test answer 2',
                  proposalId: 'proposal_ID_2',
                  formattedAnswer: ''
                }
              ],
              questionOrder: 1,
              visible: true,
              isCustomQuestion: false,
              active: true,
              notApplicable: false,
              questionApproval: false,
              answerConfiguration: {
                type: 'proposal_team',
                options: ['YES', 'NO']
              }
            }
          }
        },
        'Proposal Team': {
          sectionOrder: 3,
          sectionName: 'Proposal Team',
          questions: {
            proposal_team_que_1: {
              proposalId: 'proposal_ID_2',
              questionId: 'proposal_team_que_1',
              section: { sectionOrder: 3, sectionName: 'Proposal Team' },
              questionText: 'proposal team que 1',
              answers: [
                {
                  user: 'testUser',
                  userName: 'testUser',
                  userRole: 'testRole',
                  date: '2022-12-06T13:08:14.123Z',
                  answer:
                    'John Doe(johndoe@noone.himself), Jane Doe(janedoe@noone.herself)',
                  proposalId: 'proposal_ID_2',
                  formattedAnswer: ''
                }
              ],
              questionOrder: 1,
              visible: true,
              isCustomQuestion: false,
              active: true,
              notApplicable: false,
              questionApproval: false,
              answerConfiguration: {
                type: 'proposal_team',
                options: ['YES', 'NO']
              }
            }
          }
        }
      },
      tabName: 'new custom tab1',
      activeTab: 1
    };

    const { finalResult, regexp, sections, tabName, activeTab } = props;
    const result = searchInQuestionsForCustomer(
      finalResult,
      regexp,
      sections,
      tabName,
      activeTab
    );
  });

  it('check searchInKeyMilestone', () => {
    const props = {
      finalResult: {
        count: 1,
        results: [
          {
            tab: 0,
            searchIndex: 'a9431c40-4dd9-44ea-b9e2-68fce5a1fef7',
            inputText: 'MAP Call',
            vTab: 3,
            startIndex: 0,
            endIndex: 3,
            matchIndex: 0,
            tabName: 'Strategy Development',
            sectionName: null
          }
        ]
      },
      regexp: '/MAP/gi',
      sections: {
        'Test Section 1': {
          sectionOrder: 1,
          sectionName: 'Key Milestones & Deliverable Timelines',
          questions: {
            question_ID_1: {
              proposalId: 'proposal_ID_1',
              questionId: 'question_ID_1',
              section: { sectionOrder: 1, sectionName: 'Test Section 1' },
              questionText: 'Test Question 1',
              answers: [
                {
                  user: 'testUser',
                  userName: 'testUser',
                  userRole: 'testRole',
                  date: '2022-12-06T13:08:14.123Z',
                  answer: 'Test answer 1',
                  proposalId: 'proposal_ID_1',
                  formattedAnswer: ''
                }
              ],
              questionOrder: 1,
              visible: true,
              isCustomQuestion: false,
              active: true,
              notApplicable: false,
              questionApproval: false,
              answerConfiguration: {
                type: 'proposal_team',
                options: ['YES', 'NO']
              }
            },
            question_multiple_ID_1: {
              proposalId: 'proposal_ID_1',
              questionId: 'question_multiple_ID_1',
              section: { sectionOrder: 1, sectionName: 'Test Section 1' },
              questionText: 'Test Multiple Question 1',
              answers: [
                {
                  user: 'testUser',
                  userName: 'testUser',
                  userRole: 'testRole',
                  date: '2022-12-06T13:08:14.123Z',
                  answer: ['multiple answer 1', 'multiple answer 2'],
                  proposalId: 'proposal_ID_1',
                  formattedAnswer: ''
                }
              ],
              questionOrder: 2,
              visible: true,
              isCustomQuestion: true,
              active: false,
              notApplicable: false,
              questionApproval: false,
              answerConfiguration: {
                type: 'proposal_team',
                options: ['YES', 'NO']
              }
            }
          }
        },
        'Test Section 2': {
          sectionOrder: 2,
          sectionName: 'Test Section 2',
          questions: {
            question_ID_2: {
              proposalId: 'proposal_ID_2',
              questionId: 'question_ID_2',
              section: { sectionOrder: 2, sectionName: 'Test Section 2' },
              questionText: 'Test Question 2',
              answers: [
                {
                  user: 'testUser',
                  userName: 'testUser',
                  userRole: 'testRole',
                  date: '2022-12-06T13:08:14.123Z',
                  answer: 'Test answer 2',
                  proposalId: 'proposal_ID_2',
                  formattedAnswer: ''
                }
              ],
              questionOrder: 1,
              visible: true,
              isCustomQuestion: false,
              active: true,
              notApplicable: false,
              questionApproval: false,
              answerConfiguration: {
                type: 'proposal_team',
                options: ['YES', 'NO']
              }
            }
          }
        },
        'Proposal Team': {
          sectionOrder: 3,
          sectionName: 'Proposal Team',
          questions: {
            proposal_team_que_1: {
              proposalId: 'proposal_ID_2',
              questionId: 'proposal_team_que_1',
              section: { sectionOrder: 3, sectionName: 'Proposal Team' },
              questionText: 'proposal team que 1',
              answers: [
                {
                  user: 'testUser',
                  userName: 'testUser',
                  userRole: 'testRole',
                  date: '2022-12-06T13:08:14.123Z',
                  answer:
                    'John Doe(johndoe@noone.himself), Jane Doe(janedoe@noone.herself)',
                  proposalId: 'proposal_ID_2',
                  formattedAnswer: ''
                }
              ],
              questionOrder: 1,
              visible: true,
              isCustomQuestion: false,
              active: true,
              notApplicable: false,
              questionApproval: false,
              answerConfiguration: {
                type: 'proposal_team',
                options: ['YES', 'NO']
              }
            }
          }
        }
      },
      tabName: 'new custom tab1',
      activeTab: 1
    };

    const { finalResult, regexp, sections, tabName, activeTab } = props;

    const result = searchInKeyMilestone(
      finalResult,
      regexp,
      sections,
      tabName,
      activeTab
    );
  });

  it('check approvals', () => {
    const searchutl = require('../../components/screens/Approvals/utils');
    jest.spyOn(searchutl, 'shouldShowSection').mockReturnValue(true);
    jest.spyOn(searchutl, 'shouldShowQuestion').mockReturnValue(false);
    const props = {
      finalResult: {
        count: 1,
        results: [
          {
            tab: 0,
            searchIndex: 'a9431c40-4dd9-44ea-b9e2-68fce5a1fef7',
            inputText: 'MAP Call',
            vTab: 3,
            startIndex: 0,
            endIndex: 3,
            matchIndex: 0,
            tabName: 'Strategy Development',
            sectionName: null
          }
        ]
      },
      regexp: '/MAP/gi',
      questionsMap: mockData.filteredQuestionsMap,
      approvals: mockData.approvals,
      approvalFilters: mockData.approvalFilters,
      allFlags: mockData.allFlags
    };
    const {
      finalResult,
      regexp,
      questionsMap,
      approvals,
      approvalFilters,
      allFlags
    } = props;

    const result = searchInApprovals(
      finalResult,
      regexp,
      questionsMap,
      approvals,
      approvalFilters,
      allFlags
    );
  });

  it('check searchInNotepad ', () => {
    const props = {
      finalResult: {
        count: 1,
        results: [
          {
            tab: 0,
            searchIndex: 'a9431c40-4dd9-44ea-b9e2-68fce5a1fef7',
            inputText: 'MAP Call',
            vTab: 3,
            startIndex: 0,
            endIndex: 3,
            matchIndex: 0,
            tabName: 'Strategy Development',
            sectionName: null
          }
        ]
      },
      regexp: '/MAP/gi',
      notepadData: ['testing', 'data', 'notes', 'MAP'],
      tabName: 'new custom tab1',
      activeTab: 1
    };

    const { finalResult, regexp, notepadData, tabName, activeTab } = props;

    const result = searchInNotepad(
      finalResult,
      regexp,
      notepadData,
      tabName,
      activeTab
    );
  });

  it('check searchInEmailTemplates ', () => {
    const props = {
      finalResult: {
        count: 1,
        results: [
          {
            tab: 0,
            searchIndex: 'a9431c40-4dd9-44ea-b9e2-68fce5a1fef7',
            inputText: 'MAP Call',
            vTab: 3,
            startIndex: 0,
            endIndex: 3,
            matchIndex: 0,
            tabName: 'Strategy Development',
            sectionName: null
          }
        ]
      },
      regexp: '/MAP/gi',
      templates: [mockData.emailTemplates],
      tabName: 'new custom tab1',
      activeTab: 1
    };

    const { finalResult, regexp, templates, tabName, activeTab } = props;

    const result = searchInEmailTemplates(
      finalResult,
      regexp,
      templates,
      tabName,
      activeTab
    );
  });

  it('check searchInProposalTeam ', () => {
    const props = {
      finalResult: {
        count: 1,
        results: [
          {
            tab: 0,
            searchIndex: 'a9431c40-4dd9-44ea-b9e2-68fce5a1fef7',
            inputText: 'MAP Call',
            vTab: 3,
            startIndex: 0,
            endIndex: 3,
            matchIndex: 0,
            tabName: 'Strategy Development',
            sectionName: null
          }
        ]
      },
      regexp: '/MAP/gi',
      sections: {
        'Test Section 1': {
          sectionOrder: 1,
          sectionName: 'Key Milestones & Deliverable Timelines',
          questions: {
            question_ID_1: {
              proposalId: 'proposal_ID_1',
              questionId: 'question_ID_1',
              section: { sectionOrder: 1, sectionName: 'Test Section 1' },
              questionText: 'Test Question 1',
              answers: [
                {
                  user: 'testUser',
                  userName: 'testUser',
                  userRole: 'testRole',
                  date: '2022-12-06T13:08:14.123Z',
                  answer: 'Test answer 1',
                  proposalId: 'proposal_ID_1',
                  formattedAnswer: ''
                }
              ],
              questionOrder: 1,
              visible: true,
              isCustomQuestion: false,
              active: true,
              notApplicable: false,
              questionApproval: false,
              answerConfiguration: {
                type: 'date',
                options: []
              }
            },
            question_multiple_ID_1: {
              proposalId: 'proposal_ID_1',
              questionId: 'question_multiple_ID_1',
              section: { sectionOrder: 1, sectionName: 'Test Section 1' },
              questionText: 'Test Multiple Question 1',
              answers: [
                {
                  user: 'testUser',
                  userName: 'testUser',
                  userRole: 'testRole',
                  date: '2022-12-06T13:08:14.123Z',
                  answer: ['multiple answer 1', 'multiple answer 2'],
                  proposalId: 'proposal_ID_1',
                  formattedAnswer: ''
                }
              ],
              questionOrder: 2,
              visible: true,
              isCustomQuestion: true,
              active: false,
              notApplicable: false,
              questionApproval: false,
              answerConfiguration: {
                type: 'proposal_team',
                options: ['YES', 'NO']
              }
            }
          }
        },
        'Test Section 2': {
          sectionOrder: 2,
          sectionName: 'Test Section 2',
          questions: {
            question_ID_2: {
              proposalId: 'proposal_ID_2',
              questionId: 'question_ID_2',
              section: { sectionOrder: 2, sectionName: 'Test Section 2' },
              questionText: 'Test Question 2',
              answers: [
                {
                  user: 'testUser',
                  userName: 'testUser',
                  userRole: 'testRole',
                  date: '2022-12-06T13:08:14.123Z',
                  answer: 'Test answer 2',
                  proposalId: 'proposal_ID_2',
                  formattedAnswer: ''
                }
              ],
              questionOrder: 1,
              visible: true,
              isCustomQuestion: false,
              active: true,
              notApplicable: false,
              questionApproval: false,
              answerConfiguration: {
                type: 'proposal_team',
                options: ['YES', 'NO']
              }
            }
          }
        },
        'Proposal Team': {
          sectionOrder: 3,
          sectionName: 'Proposal Team',
          questions: {
            proposal_team_que_1: {
              proposalId: 'proposal_ID_2',
              questionId: 'proposal_team_que_1',
              section: { sectionOrder: 3, sectionName: 'Proposal Team' },
              questionText: 'proposal team que 1',
              answers: [
                {
                  user: 'testUser',
                  userName: 'testUser',
                  userRole: 'testRole',
                  date: '2022-12-06T13:08:14.123Z',
                  answer:
                    'John Doe(johndoe@noone.himself), Jane Doe(janedoe@noone.herself)',
                  proposalId: 'proposal_ID_2',
                  formattedAnswer: ''
                }
              ],
              questionOrder: 1,
              visible: true,
              isCustomQuestion: false,
              active: true,
              notApplicable: false,
              questionApproval: false,
              answerConfiguration: {
                type: 'proposal_team',
                options: ['YES', 'NO']
              }
            }
          }
        }
      },
      tabName: 'new custom tab1',
      activeTab: 1
    };

    const { finalResult, regexp, sections, tabName, activeTab } = props;

    const result = searchInProposalTeam(
      finalResult,
      regexp,
      sections,
      tabName,
      activeTab
    );
  });

  it('extractTextFromProseMirrorJSON should return textual data from prosemirror json', async () => {
    let proseMirrorJSON = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: { textAlign: 'left' },
          content: [
            {
              type: 'text',
              text: 'highlight in notepad ',
              marks: [{ type: 'highlight', attrs: {} }]
            },
            { type: 'text', text: ' non-highlight in same line' },
            { type: 'mention', attrs: { label: 'User name' } }
          ]
        }
      ]
    };

    const responseTextArr = extractTextFromProseMirrorJSON(proseMirrorJSON);
    expect(responseTextArr).toEqual([
      'highlight in notepad ',
      ' non-highlight in same line',
      'User name'
    ]);
  });

  it('check getTableData ', () => {
    const question = {
      proposalId: '27423fe0-ea03-497b-9fc3-491cdd21f120',
      questionId: 'cb44f794-0a0d-49d5-93ee-8d0a1de80a2e',
      section: {
        sectionOrder: 26,
        sectionName: 'TestCRMEE'
      },
      questionText: 'TEST RFI',
      answerConfiguration: {
        type: 'table',
        options: []
      },
      roleNames: ['BD Leadership'],
      answers: [
        {
          user: 'pooja.chahar@iqvia.com',
          userName: 'Pooja Chahar',
          userRole: 'Business Developer',
          date: '2024-02-01T07:17:26.170Z',
          answer:
            '{"rows":[{"header":"Row 1","OClumn 2":"row 2 answer","Column 1":"row 1 answer","canEdit":true,"column-3":"test cell data entry test cell data entry test cell data entry","index":0,"hidden":false},{"header":"r","OClumn 2":"","Column 1":"test r2c2","canEdit":true,"column-3":"","index":1,"hidden":true},{"header":"Row 2","canEdit":true,"rowId":"row-2","Column 1":"","OClumn 2":"","column-3":"","index":2,"hidden":true}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","frozen":true,"locked":false,"type":"text","canEdit":true,"index":0,"header":""},{"hidden":false,"alwaysVisible":false,"accessor":"Column 1","frozen":false,"locked":false,"type":"text","canEdit":true,"index":1,"header":"col 4"},{"hidden":false,"alwaysVisible":false,"accessor":"OClumn 2","frozen":false,"locked":false,"type":"text","canEdit":true,"index":2,"header":"OClumn 2"},{"accessor":"column-3","canEdit":true,"index":3,"hidden":true,"header":"col3"}]}',
          proposalId: '27423fe0-ea03-497b-9fc3-491cdd21f120',
          updatedInPG: true
        }
      ],
      questionOrder: 3,
      visible: true,
      locked: true,
      sfObject: 'Bid_History__c',
      sfField: 'RFP_Ranking__c',
      milestoneNew: [
        {
          Name: 'abc',
          Color: '#df216d'
        },
        {
          Name: 'Budget',
          Color: '#00c221'
        },
        {
          Name: 'Follow-Up',
          Color: '#015ff1'
        },
        {
          Name: 'Overview',
          Color: '#015ff1'
        }
      ],
      opportunityType: 'Default Type',
      questionHint: 'hello test Rfi ',
      hasDifferentSFanswer: true,
      currentSFanswer: {
        value: '',
        time: '2024-02-01T07:11:21.906Z'
      },
      isCustomQuestion: false,
      questionJSON:
        '{"blocks":[{"key":"b8f2h","text":"TEST RFI","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      questionHTML:
        '<div data-contents="true"><div data-block="true" data-editor="69dgi" data-offset-key="b8f2h-0-0"><div data-offset-key="b8f2h-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="b8f2h-0-0"><span data-text="true">TEST RFI</span></span></div></div></div>',
      questionHintJSON:
        '{"blocks":[{"key":"dirvm","text":"hello test Rfi ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      questionHintHTML:
        '<div data-contents="true"><div data-block="true" data-editor="f663a" data-offset-key="dirvm-0-0"><div data-offset-key="dirvm-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="dirvm-0-0"><span data-text="true">hello test Rfi </span></span></div></div></div>',
      active: true,
      integration: '',
      events: '',
      notApplicable: false,
      questionApproval: false,
      bidAnswerCopy: true,
      questionTableConfig:
        '{"canEditColumn":true,"canAddRow":true,"rows":[{"header":"Row 1","OClumn 2":"","Column 1":""},{"header":"Row 2","OClumn 2":"","Column 1":""}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","header":"","frozen":true,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"Column 1","header":"Column 1","frozen":false,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"OClumn 2","header":"OClumn 2","frozen":false,"locked":false,"type":"text"}],"canAddColumn":true,"canEditRow":true}',
      latestAnsweredBidNo: null,
      bidType: 'Clinical_Bid'
    };
    const result = getTableData(question);
  });

  it('check searchInKeyMilestone question table', () => {
    const props = {
      finalResult: {
        count: 1,
        results: [
          {
            tab: 0,
            searchIndex: 'a9431c40-4dd9-44ea-b9e2-68fce5a1fef7',
            inputText: 'MAP Call',
            vTab: 3,
            startIndex: 0,
            endIndex: 3,
            matchIndex: 0,
            tabName: 'Strategy Development',
            sectionName: null
          }
        ]
      },
      regexp: '/MAP/gi',
      sections: {
        'Test Section 1': {
          sectionOrder: 1,
          sectionName: 'Key Milestones & Deliverable Timelines',
          questions: {
            '3bf32bea-d703-4e31-b68b-97d1c93edf45': {
              isCustomQuestion: false,
              questionId: '3bf32bea-d703-4e31-b68b-97d1c93edf45',
              section: {
                sectionOrder: 12,
                sectionName: 'Key Milestones & Deliverable Timelines'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 34,
              questionApproval: false,
              questionTableConfig:
                '{"canEditColumn":false,"canAddRow":true,"rows":[{"column 1":"","header":"row 1","rowId":0}],"columns":[{"accessor":"header","frozen":true,"hidden":false,"locked":false,"type":"text","alwaysVisible":false},{"hidden":false,"alwaysVisible":false,"accessor":"column 1","header":"column 1","frozen":false,"locked":false,"type":"text"}],"canAddColumn":false,"canEditRow":true}',
              locked: false,
              opportunityType: 'Default Type',
              proposalId: '27423fe0-ea03-497b-9fc3-491cdd21f120',
              questionJSON:
                '{"blocks":[{"key":"k2gv","text":"test table","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="f38l4" data-offset-key="k2gv-0-0"><div data-offset-key="k2gv-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="k2gv-0-0"><span data-text="true">test table</span></span></div></div></div>',
              roleNames: [
                'Customer Accounts',
                'BD Leadership',
                'Business Developer'
              ],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText: 'test table',
              integration: '',
              answers: [
                {
                  user: 'keerthiprasath.chandran@iqvia.com',
                  userName: 'Keerthiprasath Chandran',
                  userRole: 'Business Developer',
                  date: '2024-01-04T13:25:05.025Z',
                  answer:
                    '{"rows":[{"column 1":"r1c1","header":"row 1","rowId":0,"canEdit":true}],"columns":[{"accessor":"header","frozen":true,"hidden":false,"locked":false,"type":"text","alwaysVisible":false,"canEdit":false},{"hidden":false,"alwaysVisible":false,"accessor":"column 1","frozen":false,"locked":false,"type":"text","canEdit":false,"header":"column 1"}]}',
                  proposalId: '27423fe0-ea03-497b-9fc3-491cdd21f120',
                  updatedInPG: true
                }
              ],
              questionHintJSON: '',
              bidType: 'Clinical_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'table',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null
            }
          }
        }
      },
      tabName: 'new custom tab1',
      activeTab: 1
    };

    const { finalResult, regexp, sections, tabName, activeTab } = props;

    const result = searchInKeyMilestone(
      finalResult,
      regexp,
      sections,
      tabName,
      activeTab
    );
  });

  it('check searchInTab question table', () => {
    const data = {
      finalResult: {
        count: 2,
        results: [
          {
            tab: 0,
            searchIndex: '6939d6ed-4590-4e35-90a9-ebfb89d52f75',
            inputText: 'Table Type Test C1',
            vTab: null,
            startIndex: 0,
            endIndex: 18,
            matchIndex: 0,
            tabName: 'Strategy Development',
            sectionName: 'TestCRMEE'
          }
        ],
        newCurrentResultIndex: 0,
        autoNavigatedToCurrentResult: false,
        prevResult: null
      },
      regexp: '/Table Type Test C1/gi',
      sections: {
        'testing-table': {
          questions: {
            '89d8a1bc-1677-4749-b271-f9273700595f': {
              isCustomQuestion: false,
              questionId: '89d8a1bc-1677-4749-b271-f9273700595f',
              section: {
                sectionOrder: 33,
                sectionName: 'testing-table'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 1,
              questionApproval: false,
              questionTableConfig:
                '{"canEditColumn":false,"canAddRow":false,"rows":[{"header":"r1","hidden":false,"c1":"","rowId":1}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","header":"","frozen":true,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"c1","header":"c1","frozen":false,"locked":false,"type":"text"}],"canAddColumn":false,"canEditRow":false}',
              locked: false,
              opportunityType:
                'Non-Core Clinical Studies,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA),Ballpark OT,IQB Template OT,Default Type',
              proposalId: '27423fe0-ea03-497b-9fc3-491cdd21f120',
              questionJSON:
                '{"blocks":[{"key":"195kj","text":"table 1","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="ftoda" data-offset-key="195kj-0-0"><div data-offset-key="195kj-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="195kj-0-0"><span data-text="true">table 1</span></span></div></div></div>',
              roleNames: ['CEVA', 'Connected Devices', 'Executive Oversight'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText: 'table 1',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Clinical_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'table',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null
            },
            '26700f35-dfc3-4aa8-b6d6-2d6fdb97d0c1': {
              isCustomQuestion: false,
              questionId: '26700f35-dfc3-4aa8-b6d6-2d6fdb97d0c1',
              section: {
                sectionOrder: 33,
                sectionName: 'testing-table'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 2,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Default Type,Non-Core Clinical Studies,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA),Ballpark OT,IQB Template OT',
              proposalId: '27423fe0-ea03-497b-9fc3-491cdd21f120',
              questionJSON:
                '{"blocks":[{"key":"35sn0","text":"Event Date tableplaceholder","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="a252q" data-offset-key="35sn0-0-0"><div data-offset-key="35sn0-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="35sn0-0-0"><span data-text="true">Event Date tableplaceholder</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText: 'Event Date tableplaceholder',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Clinical_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'date',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null
            },
            '76b0dda1-ac72-4522-a48f-3e569dfe468b': {
              isCustomQuestion: false,
              questionId: '76b0dda1-ac72-4522-a48f-3e569dfe468b',
              section: {
                sectionOrder: 33,
                sectionName: 'testing-table'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 4,
              questionApproval: false,
              questionTableConfig:
                '{"canEditColumn":false,"canAddRow":false,"rows":[{"header":"r1","hidden":false,"c1":"","rowId":1}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","header":"","frozen":true,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"c1","header":"c1","frozen":false,"locked":false,"type":"text"}],"canAddColumn":false,"canEditRow":false}',
              locked: false,
              opportunityType:
                'Default Type,Non-Core Clinical Studies,IQB Template OT,Ballpark OT',
              proposalId: '27423fe0-ea03-497b-9fc3-491cdd21f120',
              questionJSON:
                '{"blocks":[{"key":"fssl9","text":"table3","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="devdt" data-offset-key="fssl9-0-0"><div data-offset-key="fssl9-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="fssl9-0-0"><span data-text="true">table3</span></span></div></div></div>',
              roleNames: ['Clinical DS&B'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText: 'table3',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Clinical_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'table',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null
            },
            '292a38e8-7c53-49ad-bc39-c9ec412d220a': {
              isCustomQuestion: false,
              questionId: '292a38e8-7c53-49ad-bc39-c9ec412d220a',
              section: {
                sectionOrder: 33,
                sectionName: 'testing-table'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 5,
              questionApproval: false,
              questionTableConfig:
                '{"canEditColumn":true,"canAddRow":false,"rows":[{"header":"row1","row1":"","hidden":false,"rowId":1}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","header":"","frozen":true,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"row1","header":"row1","frozen":false,"locked":false,"type":"text"}],"canAddColumn":false,"canEditRow":false}',
              locked: false,
              opportunityType:
                'Default Type,Non-Core Clinical Studies,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA)',
              proposalId: '27423fe0-ea03-497b-9fc3-491cdd21f120',
              questionJSON:
                '{"blocks":[{"key":"668g8","text":"Test_tble","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="7fuob" data-offset-key="668g8-0-0"><div data-offset-key="668g8-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="668g8-0-0"><span data-text="true">Test_tble</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText: 'Test_tble',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Clinical_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'table',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null
            }
          },
          sectionName: 'testing-table',
          sectionOrder: 33
        }
      },
      tabName: 'Strategy Development',
      activeTab: 1,
      tabId: '',
      tabIndex: 0
    };

    const searchResults = searchInTab(data);
  });

  it('check approval tab for left question table', () => {
    const searchutl = require('../../components/screens/Approvals/utils');
    jest.spyOn(searchutl, 'shouldShowSection').mockReturnValue(true);
    jest.spyOn(searchutl, 'shouldShowQuestion').mockReturnValue(true);
    const data = {
      finalResult: {
        count: 2,
        results: [
          {
            tab: 2,
            searchIndex:
              'cb44f794-0a0d-49d5-93ee-8d0a1de80a2e-approval-20ca3c51-1238-4067-bf0c-43ad3f2baa5f-left-ques',
            inputText: 'TEST RFI',
            vTab: null,
            startIndex: 0,
            endIndex: 8,
            matchIndex: 0,
            tabName: 'Approvals',
            sectionName: 'TestCRMEE Approval'
          },
          {
            tab: 0,
            searchIndex: 'cb44f794-0a0d-49d5-93ee-8d0a1de80a2e',
            inputText: 'TEST RFI',
            vTab: null,
            startIndex: 0,
            endIndex: 8,
            matchIndex: 0,
            tabName: 'Strategy Development',
            sectionName: 'TestCRMEE'
          }
        ],
        newCurrentResultIndex: 0,
        autoNavigatedToCurrentResult: false,
        prevResult: null
      },
      regexp: '/TEST RFI/gi',
      questionsMap: {
        'cb44f794-0a0d-49d5-93ee-8d0a1de80a2e': {
          proposalId: '3a7d2079-81e4-4ab3-a15d-d54819f84a47',
          questionId: 'cb44f794-0a0d-49d5-93ee-8d0a1de80a2e',
          section: {
            sectionOrder: 26,
            sectionName: 'TestCRMEE'
          },
          questionText: 'TEST RFI',
          answerConfiguration: {
            type: 'table',
            options: []
          },
          roleNames: ['BD Leadership'],
          answers: [
            {
              proposalId: '3a7d2079-81e4-4ab3-a15d-d54819f84a47',
              questionId: 'cb44f794-0a0d-49d5-93ee-8d0a1de80a2e',
              answer:
                '{"rows":[{"header":"Row 1","OClumn 2":"ocl2","Column 1":"col1","canEdit":true},{"header":"Row 2","OClumn 2":"","Column 1":"","canEdit":true}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","frozen":true,"locked":false,"type":"text","canEdit":true,"header":""},{"hidden":false,"alwaysVisible":false,"accessor":"Column 1","frozen":false,"locked":false,"type":"text","canEdit":true,"header":"Column 1"},{"hidden":false,"alwaysVisible":false,"accessor":"OClumn 2","frozen":false,"locked":false,"type":"text","canEdit":true,"header":"OClumn 2"}]}',
              formattedAnswer: null,
              date: '2024-01-18T09:22:02.849Z',
              user: 'Srinivas.Manchikatla@iqvia.com',
              userName: 'Srinivas Manchikatla',
              userRole: 'Data Management',
              created_by: '1167288',
              updated_by: '1167288',
              created_date: '2024-01-18T09:22:04.326Z',
              updated_date: '2024-01-18T09:22:04.326Z',
              updatedInPG: true,
              cfProposalId: null
            },
            {
              proposalId: '71734224-f31b-4d47-b75c-6e37acb0d6bd',
              questionId: 'cb44f794-0a0d-49d5-93ee-8d0a1de80a2e',
              answer:
                '{"rows":[{"header":"row 1","OClumn 2":"It is a long established fact ","Column 1":"Lorem Ipsum is sisdfdsssssssssssssssssssssssssssssssmply dummy text of the printing and typesetting industry.","canEdit":true,"column-3":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","column-4":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","index":0,"hidden":false,"column-5":"Lorem Ipsum is simply dummy text of the printing and typesetting industry."},{"header":"row 3","OClumn 2":"It is a long established fact ","Column 1":"It is a long established fact ","canEdit":true,"column-4":"It is a long established fact ","column-3":"It is a long established fact ","index":1,"hidden":false,"column-5":""},{"header":"row 2","OClumn 2":"It is a long established fact ","Column 1":"It is a long established fact ","canEdit":true,"column-3":"It is a long established fact ","column-4":"It is a long established fact ","index":2,"hidden":false,"column-5":""},{"header":"row 4","canEdit":true,"Column 1":"","OClumn 2":"","column-4":"0","column-3":"1","index":3,"hidden":true,"column-5":"2"},{"header":"row 5","canEdit":true,"OClumn 2":"","Column 1":"","column-4":"3","column-3":"4","column-5":"5","index":4,"hidden":false}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","frozen":true,"locked":false,"type":"text","canEdit":true,"index":0,"header":""},{"hidden":false,"alwaysVisible":false,"accessor":"OClumn 2","frozen":false,"locked":false,"type":"text","index":1,"canEdit":true,"header":"col 1"},{"hidden":false,"alwaysVisible":false,"accessor":"Column 1","frozen":false,"locked":false,"type":"text","index":2,"canEdit":true,"header":"col 2"},{"accessor":"column-4","width":100,"canEdit":true,"index":3,"hidden":false,"header":"col 4"},{"accessor":"column-3","width":100,"canEdit":true,"index":4,"hidden":true,"header":"col 3"},{"accessor":"column-5","width":100,"canEdit":true,"index":5,"hidden":true,"header":"col 4"}]}',
              formattedAnswer: null,
              date: '2024-01-18T12:01:37.449Z',
              user: 'Srinivas.Manchikatla@iqvia.com',
              userName: 'Srinivas Manchikatla',
              userRole: 'Data Management',
              created_by: '1167288',
              updated_by: '1167288',
              created_date: '2024-01-18T12:01:38.838Z',
              updated_date: '2024-01-18T12:01:38.838Z',
              updatedInPG: true,
              cfProposalId: null
            },
            {
              proposalId: '71734224-f31b-4d47-b75c-6e37acb0d6bd',
              questionId: 'cb44f794-0a0d-49d5-93ee-8d0a1de80a2e',
              answer:
                '{"rows":[{"header":"row 1","OClumn 2":"It is a long established fact ","Column 1":"Lorem Ipsum is sisdfdsssssssssssssssssssssssssssssssmply dummy text of the printing and typesetting industry.","canEdit":true,"column-3":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","column-4":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","index":0,"hidden":false,"column-5":"Lorem Ipsum is simply dummy text of the printing and typesetting industry."},{"header":"row 3","OClumn 2":"It is a long established fact ","Column 1":"It is a long established fact ","canEdit":true,"column-4":"It is a long established fact ","column-3":"It is a long established fact ","index":1,"hidden":false,"column-5":""},{"header":"row 2","OClumn 2":"It is a long established fact ","Column 1":"It is a long established fact ","canEdit":true,"column-3":"It is a long established fact ","column-4":"It is a long established fact ","index":2,"hidden":false,"column-5":""},{"header":"row 4","canEdit":true,"Column 1":"","OClumn 2":"","column-4":"0","column-3":"1","index":3,"hidden":true,"column-5":"2"},{"header":"row 5","canEdit":true,"OClumn 2":"","Column 1":"","column-4":"3","column-3":"4","column-5":"5","index":4,"hidden":false}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","frozen":true,"locked":false,"type":"text","canEdit":true,"index":0,"header":""},{"hidden":false,"alwaysVisible":false,"accessor":"OClumn 2","frozen":false,"locked":false,"type":"text","index":1,"canEdit":true,"header":"col 1"},{"hidden":false,"alwaysVisible":false,"accessor":"Column 1","frozen":false,"locked":false,"type":"text","index":2,"canEdit":true,"header":"col 2"},{"accessor":"column-4","width":100,"canEdit":true,"index":3,"hidden":false,"header":"col 3"},{"accessor":"column-3","width":100,"canEdit":true,"index":4,"hidden":false,"header":"col 4"},{"accessor":"column-5","width":100,"canEdit":true,"index":5,"hidden":false,"header":"col 5"}]}',
              formattedAnswer: null,
              date: '2024-01-18T12:02:26.960Z',
              user: 'Srinivas.Manchikatla@iqvia.com',
              userName: 'Srinivas Manchikatla',
              userRole: 'Data Management',
              created_by: '1167288',
              updated_by: '1167288',
              created_date: '2024-01-18T12:02:28.448Z',
              updated_date: '2024-01-18T12:02:28.448Z',
              updatedInPG: true,
              cfProposalId: null
            },
            {
              user: 'AnswerPulledFromSalesforce',
              userName: 'AnswerPulledFromSalesforce',
              userRole: 'AnswerPulledFromSalesforce',
              date: '2024-01-30T13:26:56.385Z',
              answer: '1',
              proposalId: '347d203c-e58b-4328-82cd-75811b79fe98',
              formattedAnswer: '1',
              updatedInPG: false
            },
            {
              user: 'CarryForwardAnswer',
              userName: 'CarryForwardAnswer',
              userRole: 'CarryForwardAnswer',
              date: '2024-02-02T04:53:37.800Z',
              answer: '1',
              formattedAnswer: '1',
              proposalId: '3a7d2079-81e4-4ab3-a15d-d54819f84a47',
              updatedInPG: false,
              cfProposalId: '347d203c-e58b-4328-82cd-75811b79fe98'
            }
          ],
          questionOrder: 3,
          visible: true,
          locked: false,
          sfObject: 'Bid_History__c',
          sfField: 'RFP_Ranking__c',
          milestoneNew: [
            {
              Name: 'abc',
              Color: '#df216d'
            },
            {
              Name: 'Budget',
              Color: '#00c221'
            },
            {
              Name: 'Follow-Up',
              Color: '#015ff1'
            },
            {
              Name: 'Overview',
              Color: '#015ff1'
            }
          ],
          opportunityType: 'Default Type',
          questionHint: 'hello test Rfi ',
          hasDifferentSFanswer: true,
          currentSFanswer: {
            value: '',
            time: '2024-02-02T04:53:12.672Z'
          },
          isCustomQuestion: false,
          questionJSON:
            '{"blocks":[{"key":"b8f2h","text":"TEST RFI","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          questionHTML:
            '<div data-contents="true"><div data-block="true" data-editor="69dgi" data-offset-key="b8f2h-0-0"><div data-offset-key="b8f2h-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="b8f2h-0-0"><span data-text="true">TEST RFI</span></span></div></div></div>',
          questionHintJSON:
            '{"blocks":[{"key":"dirvm","text":"hello test Rfi ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          questionHintHTML:
            '<div data-contents="true"><div data-block="true" data-editor="f663a" data-offset-key="dirvm-0-0"><div data-offset-key="dirvm-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="dirvm-0-0"><span data-text="true">hello test Rfi </span></span></div></div></div>',
          active: true,
          integration: '',
          events: '',
          notApplicable: false,
          questionApproval: false,
          bidAnswerCopy: true,
          questionTableConfig:
            '{"canEditColumn":true,"canAddRow":true,"rows":[{"header":"Row 1","OClumn 2":"","Column 1":""},{"header":"Row 2","OClumn 2":"","Column 1":""}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","header":"","frozen":true,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"Column 1","header":"Column 1","frozen":false,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"OClumn 2","header":"OClumn 2","frozen":false,"locked":false,"type":"text"}],"canAddColumn":true,"canEditRow":true}',
          latestAnsweredBidNo: 1,
          bidType: 'Clinical_Bid'
        }
      },
      approvals: [
        {
          ApprovalSectionTitle: 'TestCRMEE Approval',
          ApprovalSectionRightQuestions: [],
          ApprovalSectionId: '20ca3c51-1238-4067-bf0c-43ad3f2baa5f',
          ApprovalSectionOrder: 18,
          ApprovalSectionLeftQuestions: [
            'cb44f794-0a0d-49d5-93ee-8d0a1de80a2e'
          ],
          ArchivedData: [],
          key: '20ca3c51-1238-4067-bf0c-43ad3f2baa5f-1706871713470'
        }
      ],
      approvalFilters: [
        {
          name: 'answered',
          displayName: 'Answered',
          group: 'answer',
          value: false
        },
        {
          name: 'unanswered',
          displayName: 'Unanswered',
          group: 'answer',
          value: false
        },
        {
          name: 'verificationRequired',
          displayName: 'Verification Required',
          group: 'verification',
          value: false
        },
        {
          name: 'responsible',
          displayName: 'Responsible',
          group: 'roles',
          value: false
        },
        {
          name: 'informed',
          displayName: 'Informed',
          group: 'roles',
          value: false
        },
        {
          displayName: 'Budget',
          group: 'milestone',
          name: 'budget',
          color: '#00c221',
          value: false
        },
        {
          displayName: 'Text',
          group: 'milestone',
          name: 'text',
          color: '#830065',
          value: false
        },
        {
          displayName: 'Overview',
          group: 'milestone',
          name: 'overview',
          color: '#015ff1',
          value: false
        },
        {
          displayName: 'abc',
          group: 'milestone',
          name: 'abc',
          color: '#df216d',
          value: false
        },
        {
          displayName: 'Prep',
          group: 'milestone',
          name: 'prep',
          color: '#10558a',
          value: false
        },
        {
          displayName: 'Team',
          group: 'milestone',
          name: 'team',
          color: '#595959',
          value: false
        },
        {
          displayName: 'Follow-Up',
          group: 'milestone',
          name: 'follow-up',
          color: '#015ff1',
          value: false
        }
      ],
      allFlags: {
        RFIInBidHistory: true,
        answerUserTagFlag: true,
        approvalSendMailFlag: true,
        approvalsFlag: true,
        bidCostDetail: true,
        canLinkOpportunityNo: true,
        carryForwardAnswerFlag: true,
        customOpportunityNameFlag: true,
        earlyEngagementInBidHistory: true,
        emailTemplatesFlag: true,
        eventLauncher: true,
        favouriteFlag: true,
        isQuestionForCustomerEditable: true,
        notepad: true,
        notepadLinker: true,
        notesUserTag: true,
        postAwardInBidHistory: true,
        proposalTeamTab: true,
        questionsForCustomerTab: true,
        'schedule-events': false,
        searchFlag: true,
        showTimelineFlag: true,
        verticalTab: true
      }
    };

    const {
      finalResult,
      regexp,
      questionsMap,
      approvals,
      approvalFilters,
      allFlags
    } = data;

    const result = searchInApprovals(
      finalResult,
      regexp,
      questionsMap,
      approvals,
      approvalFilters,
      allFlags
    );
  });

  it('check approval tab for right question table', () => {
    const searchutl = require('../../components/screens/Approvals/utils');
    jest.spyOn(searchutl, 'shouldShowSection').mockReturnValue(true);
    jest.spyOn(searchutl, 'shouldShowQuestion').mockReturnValue(true);
    const data = {
      finalResult: {
        count: 2,
        results: [
          {
            tab: 2,
            searchIndex:
              'cb44f794-0a0d-49d5-93ee-8d0a1de80a2e-approval-20ca3c51-1238-4067-bf0c-43ad3f2baa5f-left-ques',
            inputText: 'TEST RFI',
            vTab: null,
            startIndex: 0,
            endIndex: 8,
            matchIndex: 0,
            tabName: 'Approvals',
            sectionName: 'TestCRMEE Approval'
          },
          {
            tab: 0,
            searchIndex: 'cb44f794-0a0d-49d5-93ee-8d0a1de80a2e',
            inputText: 'TEST RFI',
            vTab: null,
            startIndex: 0,
            endIndex: 8,
            matchIndex: 0,
            tabName: 'Strategy Development',
            sectionName: 'TestCRMEE'
          }
        ],
        newCurrentResultIndex: 0,
        autoNavigatedToCurrentResult: false,
        prevResult: null
      },
      regexp: '/Table Type Test C1/gi',
      questionsMap: {
        '6939d6ed-4590-4e35-90a9-ebfb89d52f75': {
          proposalId: '3a7d2079-81e4-4ab3-a15d-d54819f84a47',
          questionId: '6939d6ed-4590-4e35-90a9-ebfb89d52f75',
          section: {
            sectionOrder: 26,
            sectionName: 'TestCRMEE'
          },
          questionText: 'Table Type Test',
          answerConfiguration: {
            type: 'table',
            options: []
          },
          roleNames: ['BD Leadership'],
          answers: [
            {
              user: 'pooja.chahar@iqvia.com',
              userName: 'Pooja Chahar',
              userRole: 'Business Developer',
              date: '2024-01-17T06:37:23.316Z',
              answer:
                '{"rows":[{"header":"Table Type Test R1","Table Type Test C1":"","Table Type Test C2":"","Table Type Test C3":"","canEdit":true,"index":0,"hidden":false},{"header":"Table Type Test R3","Table Type Test C1":"","Table Type Test C2":"","Table Type Test C3":"","canEdit":true,"index":1,"hidden":false},{"header":"ZXz","canEdit":true,"rowId":"row-2","Table Type Test C1":"","Table Type Test C3":"","index":2,"hidden":false},{"header":"asa","canEdit":true,"rowId":"row-3","Table Type Test C1":"","Table Type Test C3":"","index":3,"hidden":false}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","frozen":true,"locked":false,"type":"text","canEdit":false,"header":""},{"hidden":false,"alwaysVisible":false,"accessor":"Table Type Test C1","frozen":false,"locked":false,"type":"text","canEdit":false,"header":"Table Type Test C1"},{"hidden":false,"alwaysVisible":false,"accessor":"Table Type Test C3","frozen":false,"locked":false,"type":"text","canEdit":false,"header":"Table Type Test C3"}]}',
              proposalId: '3a7d2079-81e4-4ab3-a15d-d54819f84a47',
              updatedInPG: true
            }
          ],
          questionOrder: 4,
          visible: true,
          locked: false,
          sfObject: 'n/a',
          sfField: 'n/a',
          milestoneNew: [],
          opportunityType: 'Default Type',
          hasDifferentSFanswer: false,
          isCustomQuestion: false,
          questionJSON:
            '{"blocks":[{"key":"egtl9","text":"Table Type Test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          questionHTML:
            '<div data-contents="true"><div data-block="true" data-editor="bm8um" data-offset-key="egtl9-0-0"><div data-offset-key="egtl9-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="egtl9-0-0"><span data-text="true">Table Type Test</span></span></div></div></div>',
          questionHintJSON: '',
          questionHintHTML: '',
          active: true,
          integration: '',
          events: '',
          notApplicable: false,
          questionApproval: false,
          bidAnswerCopy: true,
          questionTableConfig:
            '{"canEditColumn":false,"canAddRow":true,"rows":[{"header":"Table Type Test R1","Table Type Test C1":"","Table Type Test C2":"","Table Type Test C3":""},{"header":"Table Type Test R3","Table Type Test C1":"","Table Type Test C2":"","Table Type Test C3":""}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","header":"","frozen":true,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"Table Type Test C1","header":"Table Type Test C1","frozen":false,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"Table Type Test C3","header":"Table Type Test C3","frozen":false,"locked":false,"type":"text"}],"canAddColumn":false,"canEditRow":true}',
          latestAnsweredBidNo: null,
          bidType: 'Post_Award_Bid'
        }
      },
      approvals: [
        {
          ApprovalSectionTitle: 'TestCRMEE Approval',
          ApprovalSectionRightQuestions: [
            '6939d6ed-4590-4e35-90a9-ebfb89d52f75'
          ],
          ApprovalSectionId: '20ca3c51-1238-4067-bf0c-43ad3f2baa5f',
          ApprovalSectionOrder: 18,
          ApprovalSectionLeftQuestions: [],
          ArchivedData: [],
          key: '20ca3c51-1238-4067-bf0c-43ad3f2baa5f-1706871713470'
        }
      ],
      approvalFilters: [
        {
          name: 'answered',
          displayName: 'Answered',
          group: 'answer',
          value: false
        },
        {
          name: 'unanswered',
          displayName: 'Unanswered',
          group: 'answer',
          value: false
        },
        {
          name: 'verificationRequired',
          displayName: 'Verification Required',
          group: 'verification',
          value: false
        },
        {
          name: 'responsible',
          displayName: 'Responsible',
          group: 'roles',
          value: false
        },
        {
          name: 'informed',
          displayName: 'Informed',
          group: 'roles',
          value: false
        },
        {
          displayName: 'Budget',
          group: 'milestone',
          name: 'budget',
          color: '#00c221',
          value: false
        },
        {
          displayName: 'Text',
          group: 'milestone',
          name: 'text',
          color: '#830065',
          value: false
        },
        {
          displayName: 'Overview',
          group: 'milestone',
          name: 'overview',
          color: '#015ff1',
          value: false
        },
        {
          displayName: 'abc',
          group: 'milestone',
          name: 'abc',
          color: '#df216d',
          value: false
        },
        {
          displayName: 'Prep',
          group: 'milestone',
          name: 'prep',
          color: '#10558a',
          value: false
        },
        {
          displayName: 'Team',
          group: 'milestone',
          name: 'team',
          color: '#595959',
          value: false
        },
        {
          displayName: 'Follow-Up',
          group: 'milestone',
          name: 'follow-up',
          color: '#015ff1',
          value: false
        }
      ],
      allFlags: {
        RFIInBidHistory: true,
        answerUserTagFlag: true,
        approvalSendMailFlag: true,
        approvalsFlag: true,
        bidCostDetail: true,
        canLinkOpportunityNo: true,
        carryForwardAnswerFlag: true,
        customOpportunityNameFlag: true,
        earlyEngagementInBidHistory: true,
        emailTemplatesFlag: true,
        eventLauncher: true,
        favouriteFlag: true,
        isQuestionForCustomerEditable: true,
        notepad: true,
        notepadLinker: true,
        notesUserTag: true,
        postAwardInBidHistory: true,
        proposalTeamTab: true,
        questionsForCustomerTab: true,
        'schedule-events': false,
        searchFlag: true,
        showTimelineFlag: true,
        verticalTab: true
      }
    };

    const {
      finalResult,
      regexp,
      questionsMap,
      approvals,
      approvalFilters,
      allFlags
    } = data;

    const result = searchInApprovals(
      finalResult,
      regexp,
      questionsMap,
      approvals,
      approvalFilters,
      allFlags
    );
  });
});
