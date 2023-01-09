/**
 * function to find search results with query string
 * @param {*} questions
 * @param {*} sections
 * @param {*} approvals
 * @param {string} query
 */
export async function getSearchResults(questions, sections, approvals, query) {
  let finalResult = {
    count: 0,
    results: []
  };
  let filteredQuestionsMap = {};
  questions
    .filter(
      question =>
        question.visible && (question.active || question.isCustomQuestion)
    )
    .forEach(question => {
      filteredQuestionsMap[question.questionId] = question;
    });
  const regexp = new RegExp(query, 'gi');

  // searching sections
  Object.keys(sections)
    .sort(
      (key1, key2) =>
        sections[key1]['sectionOrder'] - sections[key2]['sectionOrder']
    )
    .forEach(sectionKey => {
      const section = sections[sectionKey];
      const questions = section['questions'];
      const filteredQuestions = Object.keys(questions).filter(
        questionKey =>
          questions[questionKey]['visible'] &&
          (questions[questionKey]['active'] ||
            questions[questionKey]['isCustomQuestion'])
      );

      if (filteredQuestions.length > 0) {
        // searching in sectionName
        updateSearchMatches(
          section.sectionName,
          sectionKey,
          0,
          finalResult,
          regexp
        );

        // searching questions
        filteredQuestions
          .filter(questionKey => {
            const question = questions[questionKey];
            return (
              question['visible'] &&
              (question['active'] || question['isCustomQuestion']) &&
              !question['questionApproval']
            );
          })
          .forEach(questionKey => {
            const question = questions[questionKey];
            // searching in questionText
            if (question['questionText']) {
              updateSearchMatches(
                question['questionText'],
                questionKey,
                0,
                finalResult,
                regexp
              );
            }
            // searching in answer
            if (
              Array.isArray(question.answers) &&
              question.answers.length > 0
            ) {
              const recentAnswer =
                question.answers[question.answers.length - 1].answer;
              // if multiple answer
              if (Array.isArray(recentAnswer)) {
                recentAnswer.forEach(answerChunk => {
                  updateSearchMatches(
                    answerChunk,
                    questionKey,
                    0,
                    finalResult,
                    regexp
                  );
                });
              } else if (typeof recentAnswer === 'string') {
                updateSearchMatches(
                  recentAnswer,
                  questionKey,
                  0,
                  finalResult,
                  regexp
                );
              }
            }
          });
      }
    });

  // searching approvals
  approvals.forEach(approval => {
    // searching in approvalTitle
    if (approval.ApprovalSectionTitle) {
      updateSearchMatches(
        approval.ApprovalSectionTitle,
        approval.ApprovalSectionId,
        1,
        finalResult,
        regexp
      );
    }

    // searching archivedData
    if (
      Array.isArray(approval.ArchivedData) &&
      approval.ArchivedData.length > 0
    ) {
      approval.ArchivedData.forEach((archive, aIndex) => {
        // searching in approvalTitle but not in 0 index
        if (archive.section_title && aIndex !== 0) {
          updateSearchMatches(
            archive.section_title,
            `${archive.section_id}-archive-${aIndex}-section-title`,
            1,
            finalResult,
            regexp
          );
        }
        archive.section_left_questions
          .filter(question => question['active'] && question['visible'])
          .forEach(question => {
            updateSearchMatches(
              question.questionText,
              `${question.questionId}-archive-${aIndex}-left-ques`,
              1,
              finalResult,
              regexp
            );

            // searching in answer
            if (
              Array.isArray(question.answers) &&
              question.answers.length > 0
            ) {
              const recentAnswer =
                question.answers[question.answers.length - 1].answer;
              // if multiple answer
              if (Array.isArray(recentAnswer)) {
                recentAnswer.forEach(answerChunk => {
                  updateSearchMatches(
                    answerChunk,
                    `${question.questionId}-archive-${aIndex}-left-ques`,
                    1,
                    finalResult,
                    regexp
                  );
                });
              } else if (typeof recentAnswer === 'string') {
                updateSearchMatches(
                  recentAnswer,
                  `${question.questionId}-archive-${aIndex}-left-ques`,
                  1,
                  finalResult,
                  regexp
                );
              }
            }
          });

        archive.section_right_questions
          .filter(question => question['active'] && question['visible'])
          .forEach(question => {
            updateSearchMatches(
              question.questionText,
              `${question.questionId}-archive-${aIndex}-right-ques`,
              1,
              finalResult,
              regexp
            );

            // searching in answer
            if (
              Array.isArray(question.answers) &&
              question.answers.length > 0
            ) {
              const recentAnswer =
                question.answers[question.answers.length - 1].answer;
              // if multiple answer
              if (Array.isArray(recentAnswer)) {
                recentAnswer.forEach(answerChunk => {
                  updateSearchMatches(
                    answerChunk,
                    `${question.questionId}-archive-${aIndex}-right-ques`,
                    1,
                    finalResult,
                    regexp
                  );
                });
              } else if (typeof recentAnswer === 'string') {
                updateSearchMatches(
                  recentAnswer,
                  `${question.questionId}-archive-${aIndex}-right-ques`,
                  1,
                  finalResult,
                  regexp
                );
              }
            }
          });
      });
    }

    // searching active section questions
    if (Array.isArray(approval.ApprovalSectionLeftQuestions)) {
      approval.ApprovalSectionLeftQuestions.forEach(questionId => {
        const question = filteredQuestionsMap[questionId];
        if (question) {
          updateSearchMatches(
            question.questionText,
            `${question.questionId}-approval-${approval.ApprovalSectionId}-left-ques`,
            1,
            finalResult,
            regexp
          );

          // searching in answer
          if (Array.isArray(question.answers) && question.answers.length > 0) {
            const recentAnswer =
              question.answers[question.answers.length - 1].answer;
            // if multiple answer
            if (Array.isArray(recentAnswer)) {
              recentAnswer.forEach(answerChunk => {
                updateSearchMatches(
                  answerChunk,
                  `${question.questionId}-approval-${approval.ApprovalSectionId}-left-ques`,
                  1,
                  finalResult,
                  regexp
                );
              });
            } else if (typeof recentAnswer === 'string') {
              updateSearchMatches(
                recentAnswer,
                `${question.questionId}-approval-${approval.ApprovalSectionId}-left-ques`,
                1,
                finalResult,
                regexp
              );
            }
          }
        }
      });
    }
    if (Array.isArray(approval.ApprovalSectionRightQuestions)) {
      approval.ApprovalSectionRightQuestions.forEach(questionId => {
        const question = filteredQuestionsMap[questionId];
        if (question) {
          updateSearchMatches(
            question.questionText,
            `${question.questionId}-approval-${approval.ApprovalSectionId}-right-ques`,
            1,
            finalResult,
            regexp
          );

          // searching in answer
          if (Array.isArray(question.answers) && question.answers.length > 0) {
            const recentAnswer =
              question.answers[question.answers.length - 1].answer;
            // if multiple answer
            if (Array.isArray(recentAnswer)) {
              recentAnswer.forEach(answerChunk => {
                updateSearchMatches(
                  answerChunk,
                  `${question.questionId}-approval-${approval.ApprovalSectionId}-right-ques`,
                  1,
                  finalResult,
                  regexp
                );
              });
            } else if (typeof recentAnswer === 'string') {
              updateSearchMatches(
                recentAnswer,
                `${question.questionId}-approval-${approval.ApprovalSectionId}-right-ques`,
                1,
                finalResult,
                regexp
              );
            }
          }
        }
      });
    }
  });

  return finalResult;
}

export function updateSearchMatches(
  inputText,
  index,
  tab,
  finalResult,
  regexp
) {
  const matchesFound = inputText.match(regexp);
  if (matchesFound === null) {
    return;
  }
  if (Array.isArray(matchesFound)) {
    matchesFound.forEach(() => {
      finalResult.count++;
      finalResult.results.push({
        tab,
        searchIndex: index,
        inputText
      });
    });
  } else {
    finalResult.count++;
    finalResult.results.push({
      tab,
      searchIndex: index
    });
  }
}

// strategy function for adding highlight decorator to draftjs editor
export function highlightQueryStrategy(
  contentBlock,
  callback,
  contentState,
  query
) {
  findWithRegex(new RegExp(query, 'gi'), contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}
