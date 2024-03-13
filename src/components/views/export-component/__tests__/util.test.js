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
});
