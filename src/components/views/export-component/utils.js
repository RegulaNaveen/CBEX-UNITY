import { formatDate } from './word-template';
import { checkFormattedAnswer } from './pdf-template';

export function formatAnswer(question, docType = 'word') {
  if (docType === 'pdf') {
    if (
      question.answerConfiguration &&
      question.answerConfiguration.type === 'table'
    ) {
      return `<a target="_blank" href="${window.location.href}&search_q=${question.questionId}">Click here to view the table in Unity</a>`;
    }
    return formatDate(
      checkFormattedAnswer(question.answers),
      question.answerConfiguration
    );
  }
  return formatDate(
    checkFormattedAnswer(question.answers),
    question.answerConfiguration
  );
}
