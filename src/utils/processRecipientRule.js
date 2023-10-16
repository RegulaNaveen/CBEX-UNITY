import moment from 'moment';

const processTextOrNumberOrDate = (
  questionAnswer,
  filter,
  recipientRuleAnswer
) => {
  try {
    let firstArr = null;
    let secondArr = null;
    if (questionAnswer.length !== recipientRuleAnswer.length) {
      firstArr =
        recipientRuleAnswer.length > questionAnswer.length
          ? recipientRuleAnswer
          : questionAnswer;
      secondArr =
        recipientRuleAnswer.length < questionAnswer.length
          ? recipientRuleAnswer
          : questionAnswer;
    } else {
      firstArr = recipientRuleAnswer;
      secondArr = questionAnswer;
    }

    switch (filter) {
      case 'Equal':
      case '=':
        return firstArr.some(value => secondArr.includes(value));
        break;
      case 'Not Equal':
      case '<>':
        return firstArr.some(value => !secondArr.includes(value));
        break;
      case 'Contains':
      case 'CONTAINS':
        return firstArr.some(value => secondArr.includes(value));
        break;
      case 'Does not Contain':
      case 'DOES NOT CONTAIN':
        return firstArr.some(value => !secondArr.includes(value));
        break;
      case 'Is Blank':
        return firstArr.length === 0;
        break;
      case 'Is Not Blank':
        return firstArr.length > 0;
        break;
      case 'Less Than':
        return questionAnswer < recipientRuleAnswer;
        break;
      case 'Greater Than':
        return questionAnswer > recipientRuleAnswer;
        break;
      default:
        console.warn(`Unsupported filter: ${filter}`);
        break;
    }
  } catch (error) {
    console.log(error);
  }
};

function strictCompareArray(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (!arr2.includes(arr1[i])) {
      return false;
    }
  }
  return true;
}

const processMultiDataTypeCondition = (
  questionAnswer,
  filter,
  operator,
  type,
  recipientRuleAnswer
) => {
  try {
    let firstArr = null;
    let secondArr = null;
    if (questionAnswer.length !== recipientRuleAnswer.length) {
      firstArr =
        recipientRuleAnswer.length > questionAnswer.length
          ? recipientRuleAnswer
          : questionAnswer;
      secondArr =
        recipientRuleAnswer.length < questionAnswer.length
          ? recipientRuleAnswer
          : questionAnswer;
    } else {
      firstArr = recipientRuleAnswer;
      secondArr = questionAnswer;
    }
    switch (filter) {
      case 'Equal':
      case '=':
        if (operator === 'AND' || operator === 'And') {
          return strictCompareArray(firstArr, secondArr);
        } else {
          return firstArr.some(value => secondArr.includes(value));
        }
        break;
      case 'Not Equal':
      case '<>':
        if (operator === 'AND' || operator === 'And') {
          return !strictCompareArray(firstArr, secondArr);
        } else {
          return firstArr.some(value => !secondArr.includes(value));
        }
        break;
      case 'Contains':
      case 'CONTAINS':
        if (operator === 'AND' || operator === 'And') {
          return strictCompareArray(firstArr, secondArr);
        } else {
          return firstArr.some(value => secondArr.includes(value));
        }
        break;
      case 'Does not Contain':
      case 'DOES NOT CONTAIN':
        if (operator === 'AND' || operator === 'And') {
          return !strictCompareArray(firstArr, secondArr);
        } else {
          return firstArr.some(value => !secondArr.includes(value));
        }
        break;
      case 'Is Blank':
        return firstArr.length === 0;
        break;
      case 'Is Not Blank':
        return firstArr.length > 0;
        break;
      case 'Less Than':
        return questionAnswer < recipientRuleAnswer;
        break;
      case 'Greater Than':
        return questionAnswer > recipientRuleAnswer;
        break;
      default:
        console.warn(`Unsupported filter: ${filter}`);
        break;
    }
  } catch (error) {
    console.log(error);
  }
};

const processStatement = (
  questionAnswer,
  filter,
  operator,
  type,
  recipientRuleAnswer
) => {
  try {
    // console.log(questionAnswer, filter, operator, type, recipientRuleAnswer);
    switch (type) {
      case 'text':
        return processTextOrNumberOrDate(
          questionAnswer,
          filter,
          recipientRuleAnswer
        );
        break;
      case 'select':
        return processMultiDataTypeCondition(
          questionAnswer,
          filter,
          operator,
          type,
          recipientRuleAnswer
        );
        break;
      case 'multi-select':
        return processMultiDataTypeCondition(
          questionAnswer,
          filter,
          operator,
          type,
          recipientRuleAnswer
        );
        break;
      case 'select-lookup':
        return processTextOrNumberOrDate(
          questionAnswer,
          filter,
          recipientRuleAnswer
        );
        break;
      case 'multi-select-lookup':
        return processTextOrNumberOrDate(
          questionAnswer,
          filter,
          recipientRuleAnswer
        );
        break;
      case 'yes-no':
        return processTextOrNumberOrDate(
          questionAnswer,
          filter,
          recipientRuleAnswer
        );
        break;
      case 'number':
        if (
          operator === 'AND' ||
          (operator === 'And' &&
            filter === 'Less Than' &&
            recipientRuleAnswer.length > 1)
        ) {
          recipientRuleAnswer = [parseFloat(Math.min(...recipientRuleAnswer))];
        } else if (
          operator === 'AND' ||
          (operator === 'And' &&
            filter === 'Greater Than' &&
            recipientRuleAnswer.length > 1)
        ) {
          recipientRuleAnswer = [parseFloat(Math.max(...recipientRuleAnswer))];
        }
        return processTextOrNumberOrDate(
          questionAnswer,
          filter,
          recipientRuleAnswer
        );
        break;
      case 'date':
        const formatedDate = new Date(
          moment(recipientRuleAnswer?.join())?.format('D-MMM-yyyy')
        ).getTime();
        const questionAnswerDate = new Date(questionAnswer).getTime();
        return processTextOrNumberOrDate([questionAnswerDate], filter, [
          formatedDate
        ]);
        break;
      case 'radio':
        return processTextOrNumberOrDate(
          questionAnswer,
          filter,
          recipientRuleAnswer
        );
        break;
      case 'checkbox':
        return processTextOrNumberOrDate(
          questionAnswer,
          filter,
          recipientRuleAnswer
        );
        break;
      default:
        console.warn(`Unsupported types: ${type}`);
        break;
    }
  } catch (error) {
    console.log(error);
  }
};

const processQuestionType = (
  questionAnswer,
  filter,
  operator,
  answerType,
  ruleAnswer
) => {
  try {
    let result = null;
    switch (answerType) {
      case 'text':
        questionAnswer = [questionAnswer];
        result = processStatement(
          questionAnswer,
          filter,
          operator,
          answerType,
          ruleAnswer
        );
        break;
      case 'select':
        questionAnswer = [questionAnswer];
        if (ruleAnswer && ruleAnswer.length > 0) {
          ruleAnswer = ruleAnswer.map(value => {
            return value.Value;
          });
        }
        result = processStatement(
          questionAnswer,
          filter,
          operator,
          answerType,
          ruleAnswer
        );
        break;
      case 'multi-select':
        questionAnswer = questionAnswer?.split(',') || [];
        if (ruleAnswer && ruleAnswer.length > 0) {
          ruleAnswer = ruleAnswer.map(value => {
            return value.Value;
          });
        }
        result = processStatement(
          questionAnswer,
          filter,
          operator,
          answerType,
          ruleAnswer
        );
        break;
      case 'select-lookup':
        questionAnswer = [questionAnswer];
        if (ruleAnswer && ruleAnswer.length > 0) {
          ruleAnswer = ruleAnswer.map(value => {
            return value.Value;
          });
        }
        result = processStatement(
          questionAnswer,
          filter,
          operator,
          answerType,
          ruleAnswer
        );
        break;
      case 'multi-select-lookup':
        questionAnswer = questionAnswer?.split(',') || [];
        if (ruleAnswer && ruleAnswer.length > 0) {
          ruleAnswer = ruleAnswer.map(value => {
            return value.Value;
          });
        }
        result = processStatement(
          questionAnswer,
          filter,
          operator,
          answerType,
          ruleAnswer
        );
        break;
      case 'yes-no':
        questionAnswer = [questionAnswer];
        result = processStatement(
          questionAnswer,
          filter,
          operator,
          answerType,
          ruleAnswer
        );
        break;
      case 'number':
        questionAnswer = [parseInt(questionAnswer)];
        result = processStatement(
          questionAnswer,
          filter,
          operator,
          answerType,
          ruleAnswer
        );
        break;
      case 'date':
        questionAnswer = [questionAnswer];
        ruleAnswer = [ruleAnswer];
        result = processStatement(
          questionAnswer,
          filter,
          operator,
          answerType,
          ruleAnswer
        );
        break;
      case 'radio':
        questionAnswer = [questionAnswer];
        if (ruleAnswer && ruleAnswer.length > 0) {
          ruleAnswer = ruleAnswer.map(value => {
            return value.Value;
          });
        }
        result = processStatement(
          questionAnswer,
          filter,
          operator,
          answerType,
          ruleAnswer
        );
        break;
      case 'checkbox':
        questionAnswer = questionAnswer?.split(',') || [];
        if (ruleAnswer && ruleAnswer.length > 0) {
          ruleAnswer = ruleAnswer.map(value => {
            return value.Value;
          });
        }
        result = processStatement(
          questionAnswer,
          filter,
          operator,
          answerType,
          ruleAnswer
        );
        break;
      default:
        console.warn(`Unsupported types: ${answerType}`);
        break;
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

const processCondition = (answer, filter, operator, answerType, ruleAnswer) => {
  try {
    let results = null;
    results = processQuestionType(
      answer,
      filter,
      operator,
      answerType,
      ruleAnswer
    );
    return results;
  } catch (error) {
    console.log(error);
  }
};

const processQuestion = (data, proposalQuestion) => {
  const answer = proposalQuestion.find(value => {
    return value.questionId === data.RecipientRuleQuestion;
  });
  if (answer) {
    const lastAnswer = answer?.answers[answer?.answers.length - 1];
    const results = processCondition(
      String(lastAnswer?.answer).trim(),
      data.RecipientRuleFilter,
      data.RecipientRuleOperator,
      data.RecipientRuleAnswerType,
      data.RecipientRuleAnswer
    );
    return results;
  } else {
    return false;
  }
};

const processContainer = (RecipientRules, mainCondition, proposalQuestions) => {
  if (RecipientRules && RecipientRules.length > 0) {
    const results = RecipientRules.map(data => {
      return processQuestion(data, proposalQuestions);
    });
    if (mainCondition === 'AND' || mainCondition === 'And') {
      return !results.includes(false);
    } else {
      return results.includes(true);
    }
  }
};

const processRecipientRule = (
  EmailTemplateRecipientRule,
  proposalQuestions
) => {
  const finalResults = {
    RecipientRuleToAnswer: [],
    RecipientRuleCCAnswer: []
  };
  if (
    EmailTemplateRecipientRule &&
    Object.keys(EmailTemplateRecipientRule).length > 0
  ) {
    const RecipientRuleGroups = EmailTemplateRecipientRule.RecipientRuleGroups;
    if (RecipientRuleGroups && RecipientRuleGroups.length > 0) {
      RecipientRuleGroups.forEach(value => {
        const RecipientRules = value.RecipientRules;
        const mainCondition = value.RecipientRuleGroupOperator;
        const result = processContainer(
          RecipientRules,
          mainCondition,
          proposalQuestions
        );
        console.log(result, value);
        if (result) {
          finalResults.RecipientRuleToAnswer.push(
            ...value.RecipientRuleToAnswer
          );
          finalResults.RecipientRuleCCAnswer.push(
            ...value.RecipientRuleCCAnswer
          );
        }
      });
    }
  }
  return finalResults;
};

export default processRecipientRule;
