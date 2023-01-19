import { NOTEPAD_UI_ID } from '../../constants/app';
import {
  extractTextFromProseMirrorJSON,
  getSearchResults
} from '../searchUtils';
import mockData from './search_data.json';

describe('searchUtils unit tests', () => {
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
});
