/**
 * @jest-environment jsdom
 */
import { 
  getStyle, 
  getFormattedTextStyles, 
  getLastAnswer, 
  getLastAnswerHtml, 
  getFilteredQuestion,
  createWord 
} from '../word-template';

import * as data from '../../../screens/Proposal/__tests__/data.json';

describe('Word Template Library Test', () => {
  beforeAll(() => {});
  test('fn: getFormattedTextStyles | case no style', async () => {
    let styleMap = {};
    styleMap['BOLD'] = { start: 10, end: 15 };
    const res = getFormattedTextStyles(styleMap, 0);
    expect('').toEqual(res.styleId);
  });

  test('fn: getStyle | case no style', async () => {
    let styleMap = {};
    styleMap['BOLD'] = { start: 10, end: 15 };
    const res = getStyle(styleMap, 0);
    expect('').toEqual(res.styleId);
  });

  test('fn: getFormattedTextStyles | case bold style', async () => {
    const styleMap = [{ start: 10, end: 15, style: 'BOLD' }];
    const res = getFormattedTextStyles(styleMap, 12);
    expect('(b)').toEqual(res.styleId);
    expect(true).toEqual(res.styles.bold);
  });

  test('fn: getStyle | case bold style', async () => {
    const styleMap = [{ start: 10, end: 15, style: 'BOLD' }];
    const res = getStyle(styleMap, 12);
    expect('(b)').toEqual(res.styleId);
    expect(true).toEqual(res.styles.bold);
  });

  test('fn: getFormattedTextStyles | case bold and italic style', async () => {
    const styleMap = [
      { start: 10, end: 15, style: 'BOLD' },
      { start: 9, end: 12, style: 'ITALIC' }
    ];
    const res = getFormattedTextStyles(styleMap, 11);
    expect('(b)(i)').toEqual(res.styleId);
    expect(true).toEqual(res.styles.bold);
    expect(true).toEqual(res.styles.italics);
  });

  test('fn: getStyle | case bold and italic style', async () => {
    const styleMap = [
      { start: 10, end: 15, style: 'BOLD' },
      { start: 9, end: 12, style: 'ITALIC' }
    ];
    const res = getStyle(styleMap, 11);
    expect('(b)(i)').toEqual(res.styleId);
    expect(true).toEqual(res.styles.bold);
    expect(true).toEqual(res.styles.italics);
  });

  test('fn: getFormattedTextStyles | case bold and italic not strike', async () => {
    const styleMap = [
      { start: 10, end: 15, style: 'BOLD' },
      { start: 9, end: 12, style: 'ITALIC' },
      { start: 12, end: 19, style: 'STRIKETHROUGH' }
    ];
    const res = getFormattedTextStyles(styleMap, 11);
    expect('(b)(i)').toEqual(res.styleId);
    expect(true).toEqual(res.styles.bold);
    expect(true).toEqual(res.styles.italics);
    expect(false).toEqual(res.styles.strike);
  });

  test('fn: getStyle | case bold and italic not strike', async () => {
    const styleMap = [
      { start: 10, end: 15, style: 'BOLD' },
      { start: 9, end: 12, style: 'ITALIC' },
      { start: 12, end: 19, style: 'STRIKETHROUGH' }
    ];
    const res = getStyle(styleMap, 11);
    expect('(b)(i)').toEqual(res.styleId);
    expect(true).toEqual(res.styles.bold);
    expect(true).toEqual(res.styles.italics);
    expect(false).toEqual(res.styles.strike);
  });

  test('fn: getFormattedTextStyles | case bold and italic and strike style', async () => {
    const styleMap = [
      { start: 10, end: 15, style: 'BOLD' },
      { start: 9, end: 12, style: 'ITALIC' },
      { start: 11, end: 13, style: 'STRIKETHROUGH' }
    ];
    const res = getFormattedTextStyles(styleMap, 11);
    expect('(b)(i)(s)').toEqual(res.styleId);
    expect(true).toEqual(res.styles.bold);
    expect(true).toEqual(res.styles.italics);
    expect(true).toEqual(res.styles.strike);
  });

  test('fn: getStyle | case bold and italic and strike style', async () => {
    const styleMap = [
      { start: 10, end: 15, style: 'BOLD' },
      { start: 9, end: 12, style: 'ITALIC' },
      { start: 11, end: 13, style: 'STRIKETHROUGH' }
    ];
    const res = getStyle(styleMap, 11);
    expect('(b)(i)(s)').toEqual(res.styleId);
    expect(true).toEqual(res.styles.bold);
    expect(true).toEqual(res.styles.italics);
    expect(true).toEqual(res.styles.strike);
  });

  test('fn: getFormattedTextStyles | case bold and italic and strike style with underline', async () => {
    const styleMap = [
      { start: 10, end: 15, style: 'BOLD' },
      { start: 9, end: 12, style: 'ITALIC' },
      { start: 11, end: 13, style: 'STRIKETHROUGH' },
      { start: 0, end: 15, style: 'UNDERLINE' }
    ];
    const res = getFormattedTextStyles(styleMap, 11);
    expect('(b)(i)(s)(u)').toEqual(res.styleId);
    expect(true).toEqual(res.styles.bold);
    expect(true).toEqual(res.styles.italics);
    expect(true).toEqual(res.styles.strike);
    expect({}).toEqual(res.styles.underline);
  });

  test('fn: getStyle | case bold and italic and strike style with underline', async () => {
    const styleMap = [
      { start: 10, end: 15, style: 'BOLD' },
      { start: 9, end: 12, style: 'ITALIC' },
      { start: 11, end: 13, style: 'STRIKETHROUGH' },
      { start: 0, end: 15, style: 'UNDERLINE' }
    ];
    const res = getStyle(styleMap, 11);
    expect('(b)(i)(s)(u)').toEqual(res.styleId);
    expect(true).toEqual(res.styles.bold);
    expect(true).toEqual(res.styles.italics);
    expect(true).toEqual(res.styles.strike);
    expect({}).toEqual(res.styles.underline);
  });

  test('should update style values when styleMaps contains applicable styles for the given index', () => {
    // Arrange
    const DEFAULT_FONT = 'Arial';
    const styleMaps = [
      { start: 0, end: 6, style: 'BOLD' },
      { start: 2, end: 5, style: 'ITALIC' },
      { start: 3, end: 6, style: 'fontSize14' },
      { start: 4, end: 7, style: 'color000000' },
      { start: 5, end: 8, style: 'backgroundColorFFFFFF' },
    ];
    const index = 5;
    const expected = {
      styles: {
        bold: true,
        italics: true,
        strike: false,
        font: DEFAULT_FONT,
        size: NaN,
        color: '000000',
        shading: {
          fill: 'FFFFFF',
          type: 'clear',
          color: 'auto',
        },
      },
      styleId: '(b)(i)(fs)(fc)(bc)',
    };

    // Act
    const actual = getFormattedTextStyles(styleMaps, index);

    // Assert
    expect(actual).toEqual(expected);
  });

  afterAll(() => {});
});

describe('getLastAnswer', () => {
  it('should return an empty string if the answers array is empty', () => {
    const answers = [];
    const result = getLastAnswer(answers);
    expect(result).toEqual('');
  });

  it('should return an empty string if the last answer is null', () => {
    const answers = [null];
    const result = getLastAnswer(answers);
    expect(result).toEqual('');
  });

  it('should return an empty string if the last answer is undefined', () => {
    const answers = [undefined];
    const result = getLastAnswer(answers);
    expect(result).toEqual('');
  });

  it('should return the string value of the last answer if it exists', () => {
    const answers = [{ answer: 42 }];
    const result = getLastAnswer(answers);
    expect(result).toEqual('42');
  });

  it('should return the string value of the last answer if it is a string', () => {
    const answers = [{ answer: 'hello' }, { answer: 'world' }];
    const result = getLastAnswer(answers);
    expect(result).toEqual('world');
  });

  it('should log an error to the console if an error occurs', () => {
    console.log = jest.fn();
    const answers = null;
    const result = getLastAnswer(answers);
    expect(result).toEqual('');
    expect(console.log).toHaveBeenCalled();
  });
});

describe('getLastAnswerHtml', () => {
  test('returns empty string when given an empty array', () => {
    expect(getLastAnswerHtml([])).toBe('');
  });

  test('returns empty string when the last answer has no html property', () => {
    const answers = [{ formattedAnswer: {} }];
    expect(getLastAnswerHtml(answers)).toBe('');
  });

  test('returns empty string when the last answer is undefined', () => {
    const answers = undefined;
    expect(getLastAnswerHtml(answers)).toBe('');
  });

  test('returns the html of the last answer in the array', () => {
    const answers = [{ formattedAnswer: { html: '<p>First answer</p>' } }, { formattedAnswer: { html: '<p>Second answer</p>' } }, { formattedAnswer: { html: '<p>Last answer</p>' } }];
    expect(getLastAnswerHtml(answers)).toBe('<p>Last answer</p>');
  });

  test('returns empty string when the last answer is not an object', () => {
    const answers = ['not an object'];
    expect(getLastAnswerHtml(answers)).toBe('');
  });
});

const proposalQuestions = [
  { question: 'Question 1', answers: [{answer: 'Answer 1'}], notApplicable: false, roleNames: ["Proposal Developer"] },
  { question: 'Question 2', answers: [], notApplicable: true },
  { question: 'Question 3', answers: [], notApplicable: false },
  { question: 'Question 4', answers: [{answer: 'Answer 4'}], notApplicable: false },
  { question: 'Question 5', answers: [], notApplicable: false },
];

describe('getFilteredQuestion', () => {
  it('should filter questions with answers if "answered" is true', () => {
    const filterState = { answered: true, unanswered: false, myRole: false, interestedParties: 'All', milestones: [], includesNa: true };
    const result = getFilteredQuestion(proposalQuestions, filterState);
    expect(result).toEqual([
      { question: 'Question 1', answers: [{answer: 'Answer 1'}], notApplicable: false, roleNames: ["Proposal Developer"] },
      { question: 'Question 4', answers: [{answer: 'Answer 4'}], notApplicable: false },
    ]);
  });

  it('should filter questions without answers if "unanswered" is true', () => {
    const filterState = { answered: false, unanswered: true, myRole: false, interestedParties: 'All', milestones: [], includesNa: true };
    const result = getFilteredQuestion(proposalQuestions, filterState);
    expect(result).toEqual([
      { question: 'Question 2', answers: [], notApplicable: true },
      { question: 'Question 3', answers: [], notApplicable: false },
      { question: 'Question 5', answers: [], notApplicable: false },
    ]);
  });

  it('should return an empty array if neither "answered" nor "unanswered" is true', () => {
    const filterState = { answered: false, unanswered: false, myRole: false, interestedParties: 'All', milestones: [], includesNa: true };
    const result = getFilteredQuestion(proposalQuestions, filterState);
    expect(result).toEqual([]);
  });

  it('should filter out questions marked as "not applicable" if "includesNa" is false', () => {
    const filterState = { answered: true, unanswered: false, myRole: false, interestedParties: 'All', milestones: [], includesNa: false };
    const result = getFilteredQuestion(proposalQuestions, filterState);
    expect(result).toEqual([
      { question: 'Question 1', answers: [{answer: 'Answer 1'}], notApplicable: false, roleNames: ["Proposal Developer"] },
      { question: 'Question 4', answers: [{answer: 'Answer 4'}], notApplicable: false },
    ]);
  });

  it('should filter questions based on the user role if "myRole" is true', () => {
    localStorage.setItem('userRole', 'Proposal Developer');
    const filterState = { answered: false, unanswered: false, myRole: true, interestedParties: 'Biostats', milestones: ['Budget', 'Data Planning', 'Follow-Up'], includesNa: true };
    const result = getFilteredQuestion(proposalQuestions, filterState);
    expect(result).toEqual([]);
  });

});

describe('createWord function', () => {
  test('should create a Word document object', () => {
    const content = {
      data: {
        proposalQuestions: data.proposal.proposalQuestions,
        proposalDetails: {
          name: 'Proposal 1',
          date: '2023-05-01'
        }
      },
      notes: [],
      filterState: { answered: true, unanswered: false, myRole: false, interestedParties: 'All', milestones: [], includesNa: true },
      image: null,
      editor: null
    };

    const document = createWord(content);

    expect(document).toBeDefined();
  });
});

