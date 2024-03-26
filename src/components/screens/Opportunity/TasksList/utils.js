import moment from 'moment';

export default function getNextWorkingDay(date) {
  const day = date.clone();
  let nextDay = day.add(1, 'days');
  if (nextDay.day() === 0) {
    nextDay = nextDay.add(1, 'days');
  } else if (nextDay.day() === 6) {
    nextDay = nextDay.add(2, 'days');
  }
  return nextDay;
}

export const processRole = (value, proposalTeamQuestions) => {
  const data = [];
  const question = proposalTeamQuestions.find(
    question => question.questionId === value
  );

  let questionText = '';
  if (question) {
    questionText = question.questionText;
    const answer = question.answers;
    if (answer && answer.length) {
      const lastAnswer = answer[answer.length - 1];
      const answerData = lastAnswer.answer;

      if (answerData && answerData.length) {
        try {
          const splitAnswer = answerData?.split(',');
          if (Array.isArray(splitAnswer)) {
            for (let i = 0; i < splitAnswer.length; i++) {
              const splitName = splitAnswer[i]?.split('(');
              if (splitName) {
                const name = splitName[0].trim();
                const email = splitName[1]
                  ? splitName[1].substring(0, splitName[1].length - 1).trim()
                  : '';
                data.push({ name, email });
              }
            }
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    }
  }
  return { data, questionText };
};
