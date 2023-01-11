import { NOTEPAD_UI_ID } from '../constants/app';

/**
 * function to find search results with query string
 * @param {*} questions
 * @param {*} sections
 * @param {*} approvals
 * @param {string} query
 */
export async function getSearchResults(
  query,
  questions,
  sections,
  approvals,
  notepadData
) {
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
  const regexp = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');

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
          regexp,
          section.sectionName,
          sectionKey,
          finalResult,
          0
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
                regexp,
                question['questionText'],
                questionKey,
                finalResult,
                0
              );
            }
            // searching in answer
            if (
              Array.isArray(question.answers) &&
              question.answers.length > 0
            ) {
              let recentAnswer =
                question.answers[question.answers.length - 1].answer;
              // if multiple answer
              if (Array.isArray(recentAnswer)) {
                if (sectionKey === 'Proposal Team') {
                  const newAnswer = [];
                  recentAnswer.forEach(answer => {
                    const split_array = answer.split('(');
                    if (split_array && split_array.length > 0) {
                      newAnswer.push(split_array[0].trim());
                    }
                  });
                  recentAnswer = newAnswer;
                }
                recentAnswer.forEach(answerChunk => {
                  updateSearchMatches(
                    regexp,
                    answerChunk,
                    questionKey,
                    finalResult,
                    0
                  );
                });
              } else if (typeof recentAnswer === 'string') {
                if (sectionKey === 'Proposal Team') {
                  const split_array = recentAnswer.split('(');
                  if (split_array && split_array.length > 0) {
                    recentAnswer = split_array[0].trim();
                  }
                }
                updateSearchMatches(
                  regexp,
                  recentAnswer,
                  questionKey,
                  finalResult,
                  0
                );
              }
            }
          });
      }
    });

  // searching in notepad
  if (notepadData.length > 0) {
    updateSearchMatches(
      regexp,
      notepadData.join(' '),
      NOTEPAD_UI_ID,
      finalResult,
      0,
      1 // vertical tab index of Notepad
    );
  }

  // searching approvals
  approvals.forEach(approval => {
    // searching in approvalTitle
    if (approval.ApprovalSectionTitle) {
      updateSearchMatches(
        regexp,
        approval.ApprovalSectionTitle,
        approval.ApprovalSectionId,
        finalResult,
        1
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
            regexp,
            archive.section_title,
            `${archive.section_id}-archive-${aIndex}-section-title`,
            finalResult,
            1
          );
        }
        archive.section_left_questions
          .filter(question => question['active'] && question['visible'])
          .forEach(question => {
            updateSearchMatches(
              regexp,
              question.questionText,
              `${question.questionId}-archive-${aIndex}-left-ques`,
              finalResult,
              1
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
                    regexp,
                    answerChunk,
                    `${question.questionId}-archive-${aIndex}-left-ques`,
                    finalResult,
                    1
                  );
                });
              } else if (typeof recentAnswer === 'string') {
                updateSearchMatches(
                  regexp,
                  recentAnswer,
                  `${question.questionId}-archive-${aIndex}-left-ques`,
                  finalResult,
                  1
                );
              }
            }
          });

        archive.section_right_questions
          .filter(question => question['active'] && question['visible'])
          .forEach(question => {
            updateSearchMatches(
              regexp,
              question.questionText,
              `${question.questionId}-archive-${aIndex}-right-ques`,
              finalResult,
              1
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
                    regexp,
                    answerChunk,
                    `${question.questionId}-archive-${aIndex}-right-ques`,
                    finalResult,
                    1
                  );
                });
              } else if (typeof recentAnswer === 'string') {
                updateSearchMatches(
                  regexp,
                  recentAnswer,
                  `${question.questionId}-archive-${aIndex}-right-ques`,
                  finalResult,
                  1
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
            regexp,
            question.questionText,
            `${question.questionId}-approval-${approval.ApprovalSectionId}-left-ques`,
            finalResult,
            1
          );

          // searching in answer
          if (Array.isArray(question.answers) && question.answers.length > 0) {
            const recentAnswer =
              question.answers[question.answers.length - 1].answer;
            // if multiple answer
            if (Array.isArray(recentAnswer)) {
              recentAnswer.forEach(answerChunk => {
                updateSearchMatches(
                  regexp,
                  answerChunk,
                  `${question.questionId}-approval-${approval.ApprovalSectionId}-left-ques`,
                  finalResult,
                  1
                );
              });
            } else if (typeof recentAnswer === 'string') {
              updateSearchMatches(
                regexp,
                recentAnswer,
                `${question.questionId}-approval-${approval.ApprovalSectionId}-left-ques`,
                finalResult,
                1
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
            regexp,
            question.questionText,
            `${question.questionId}-approval-${approval.ApprovalSectionId}-right-ques`,
            finalResult,
            1
          );

          // searching in answer
          if (Array.isArray(question.answers) && question.answers.length > 0) {
            const recentAnswer =
              question.answers[question.answers.length - 1].answer;
            // if multiple answer
            if (Array.isArray(recentAnswer)) {
              recentAnswer.forEach(answerChunk => {
                updateSearchMatches(
                  regexp,
                  answerChunk,
                  `${question.questionId}-approval-${approval.ApprovalSectionId}-right-ques`,
                  finalResult,
                  1
                );
              });
            } else if (typeof recentAnswer === 'string') {
              updateSearchMatches(
                regexp,
                recentAnswer,
                `${question.questionId}-approval-${approval.ApprovalSectionId}-right-ques`,
                finalResult,
                1
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
  regexp,
  inputText,
  index,
  finalResult,
  tab,
  vTab = null
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
        inputText,
        vTab
      });
    });
  } else {
    finalResult.count++;
    finalResult.results.push({
      tab,
      searchIndex: index,
      vTab
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

export function extractTextFromProseMirrorJSON(data, results = []) {
  if (typeof data === 'object' && Array.isArray(data.content)) {
    data.content.forEach(type => extractTextFromProseMirrorJSON(type, results));
  } else if (data.type && data.type === 'text') {
    results.push(data.text);
    return;
  }
  return results;
}
