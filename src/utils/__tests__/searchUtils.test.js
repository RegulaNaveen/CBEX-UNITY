import { NOTEPAD_UI_ID } from '../../constants/app';
import {
  extractTextFromProseMirrorJSON,
  getSearchResults,
  searchInTab,
  searchInApprovals,
  searchInQuestionsForCustomer,
  searchInKeyMilestone
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

  // it('check approvals', () => {
  //   const searchutl = require('../../components/screens/Approvals/utils');
  //   jest.spyOn(searchutl, 'shouldShowSection').mockReturnValue(true);
  //   jest.spyOn(searchutl, 'shouldShowQuestion').mockReturnValue(true);
  //   const props = {
  //     finalResult: {
  //       count: 1,
  //       results: [
  //         {
  //           tab: 0,
  //           searchIndex: 'a9431c40-4dd9-44ea-b9e2-68fce5a1fef7',
  //           inputText: 'MAP Call',
  //           vTab: 3,
  //           startIndex: 0,
  //           endIndex: 3,
  //           matchIndex: 0,
  //           tabName: 'Strategy Development',
  //           sectionName: null
  //         }
  //       ]
  //     },
  //     regexp: '/MAP/gi',
  //     questionsMap: mockData.questions,
  //     approvals: mockData.approvals,
  //     approvalFilters: mockData.approvalFilters,
  //     allFlags: mockData.allFlags
  //   };
  //   const {
  //     finalResult,
  //     regexp,
  //     questionsMap,
  //     approvals,
  //     approvalFilters,
  //     allFlags
  //   } = props;

  //   const result = searchInApprovals(
  //     finalResult,
  //     regexp,
  //     questionsMap,
  //     approvals,
  //     approvalFilters,
  //     allFlags
  //   );
  // });
});
