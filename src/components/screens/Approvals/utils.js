/**
 * Function to get the last answer object from a proposal question object
 * @param question Proposal Question
 * @returns Object
 */
export const getLastAnswer = question => {
  let lastAnswer = {};
  try {
    if (Array.isArray(question?.answers) && question?.answers?.length > 0) {
      const answersArr = question.answers;
      lastAnswer = answersArr[answersArr.length - 1];
    }
    return lastAnswer;
  } catch (error) {
    console.error(error);
    return lastAnswer;
  }
};

/**
 * Function to generate new Questions object with key as question id and value as question data
 * @param proposalQuestions Array of proposal questions
 * @returns Object
 */
export const generateQuestionsHash = proposalQuestions => {
  try {
    const hash = {};
    if (Array.isArray(proposalQuestions)) {
      // Filter questions on the current template
      const templateQuestions = proposalQuestions.filter(item => item.active);
      if (Array.isArray(templateQuestions) && templateQuestions.length > 0) {
        templateQuestions.forEach(question => {
          hash[question.questionId] = question;
        });
      }
    }
    return hash;
  } catch (error) {
    console.error(error);
    return {};
  }
};
