import {
  shouldShowQuestion,
  shouldShowSection
} from '../components/screens/Approvals/utils';
import { NOTEPAD_UI_ID } from '../constants/app';

/**
 * function to find search results with query string
 * @param {*} questions
 * @param {*} sections
 * @param {*} approvals
 * @param {*} notepadData
 * @param {*} activeTab
 * @param {string} query
 */
export async function getSearchResults({
  query,
  questions,
  sections,
  approvals,
  notepadData,
  activeTab,
  isQuestionsFilterEnabled,
  approvalFilters,
  questionsForCustomersEnabled
}) {
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
  if (activeTab === 0) {
    searchInStrategyDevelopment(
      finalResult,
      regexp,
      sections,
      isQuestionsFilterEnabled
    );
    if (questionsForCustomersEnabled) {
      searchInQuestionsForCustomer(finalResult, regexp, sections);
    }
    searchInNotepad(finalResult, regexp, notepadData);
    searchInApprovals(
      finalResult,
      regexp,
      filteredQuestionsMap,
      approvals,
      approvalFilters
    );
  } else if (activeTab === 2) {
    searchInApprovals(
      finalResult,
      regexp,
      filteredQuestionsMap,
      approvals,
      approvalFilters
    );
    if (questionsForCustomersEnabled) {
      searchInQuestionsForCustomer(finalResult, regexp, sections);
    }
    searchInNotepad(finalResult, regexp, notepadData);
    searchInStrategyDevelopment(
      finalResult,
      regexp,
      sections,
      isQuestionsFilterEnabled
    );
  } else {
    if (questionsForCustomersEnabled) {
      searchInQuestionsForCustomer(finalResult, regexp, sections);
    }
    searchInNotepad(finalResult, regexp, notepadData);
    searchInStrategyDevelopment(
      finalResult,
      regexp,
      sections,
      isQuestionsFilterEnabled
    );
    searchInApprovals(
      finalResult,
      regexp,
      filteredQuestionsMap,
      approvals,
      approvalFilters
    );
  }

  return finalResult;
}

export function searchInApprovals(
  finalResult,
  regexp,
  questionsMap,
  approvals,
  approvalFilters
) {
  // searching approvals
  approvals.forEach(approval => {
    if (!shouldShowSection(approval.ApprovalSectionId)) {
      return;
    }
    // searching in approvalTitle
    if (approval.ApprovalSectionTitle) {
      updateSearchMatches(
        regexp,
        approval.ApprovalSectionTitle,
        approval.ApprovalSectionId,
        finalResult,
        2
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
            2
          );
        }
        archive.section_left_questions
          .filter(
            question =>
              question['active'] &&
              question['visible'] &&
              shouldShowQuestion(question, approvalFilters)
          )
          .forEach(question => {
            updateSearchMatches(
              regexp,
              question.questionText,
              `${question.questionId}-archive-${aIndex}-left-ques`,
              finalResult,
              2
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
                    2
                  );
                });
              } else if (typeof recentAnswer === 'string') {
                if (question.section.sectionName === 'Proposal Team') {
                  const newAnswer = [];
                  recentAnswer.split(',').forEach(answer => {
                    const split_array = answer.split('(');
                    if (split_array && split_array.length > 0) {
                      newAnswer.push(split_array[0].trim());
                    }
                  });
                  newAnswer.forEach(answerChunk => {
                    updateSearchMatches(
                      regexp,
                      answerChunk,
                      `${question.questionId}-archive-${aIndex}-left-ques`,
                      finalResult,
                      2
                    );
                  });
                } else {
                  updateSearchMatches(
                    regexp,
                    recentAnswer,
                    `${question.questionId}-archive-${aIndex}-left-ques`,
                    finalResult,
                    2
                  );
                }
              }
            }
          });

        archive.section_right_questions
          .filter(
            question =>
              question['active'] &&
              question['visible'] &&
              shouldShowQuestion(question, approvalFilters)
          )
          .forEach(question => {
            updateSearchMatches(
              regexp,
              question.questionText,
              `${question.questionId}-archive-${aIndex}-right-ques`,
              finalResult,
              2
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
                    2
                  );
                });
              } else if (typeof recentAnswer === 'string') {
                if (question.section.sectionName === 'Proposal Team') {
                  const newAnswer = [];
                  recentAnswer.split(',').forEach(answer => {
                    const split_array = answer.split('(');
                    if (split_array && split_array.length > 0) {
                      newAnswer.push(split_array[0].trim());
                    }
                  });
                  newAnswer.forEach(answerChunk => {
                    updateSearchMatches(
                      regexp,
                      answerChunk,
                      `${question.questionId}-archive-${aIndex}-right-ques`,
                      finalResult,
                      2
                    );
                  });
                } else {
                  updateSearchMatches(
                    regexp,
                    recentAnswer,
                    `${question.questionId}-archive-${aIndex}-right-ques`,
                    finalResult,
                    2
                  );
                }
              }
            }
          });
      });
    }

    // searching active section questions
    if (Array.isArray(approval.ApprovalSectionLeftQuestions)) {
      approval.ApprovalSectionLeftQuestions.filter(questionId => {
        const question = questionsMap[questionId];
        return question && shouldShowQuestion(question, approvalFilters);
      }).forEach(questionId => {
        const question = questionsMap[questionId];
        if (question) {
          updateSearchMatches(
            regexp,
            question.questionText,
            `${question.questionId}-approval-${approval.ApprovalSectionId}-left-ques`,
            finalResult,
            2
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
                  2
                );
              });
            } else if (typeof recentAnswer === 'string') {
              if (question.section.sectionName === 'Proposal Team') {
                const newAnswer = [];
                recentAnswer.split(',').forEach(answer => {
                  const split_array = answer.split('(');
                  if (split_array && split_array.length > 0) {
                    newAnswer.push(split_array[0].trim());
                  }
                });
                newAnswer.forEach(answerChunk => {
                  updateSearchMatches(
                    regexp,
                    answerChunk,
                    `${question.questionId}-approval-${approval.ApprovalSectionId}-left-ques`,
                    finalResult,
                    2
                  );
                });
              } else {
                updateSearchMatches(
                  regexp,
                  recentAnswer,
                  `${question.questionId}-approval-${approval.ApprovalSectionId}-left-ques`,
                  finalResult,
                  2
                );
              }
            }
          }
        }
      });
    }
    if (Array.isArray(approval.ApprovalSectionRightQuestions)) {
      approval.ApprovalSectionRightQuestions.filter(questionId => {
        const question = questionsMap[questionId];
        return question && shouldShowQuestion(question, approvalFilters);
      }).forEach(questionId => {
        const question = questionsMap[questionId];
        if (question) {
          updateSearchMatches(
            regexp,
            question.questionText,
            `${question.questionId}-approval-${approval.ApprovalSectionId}-right-ques`,
            finalResult,
            2
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
                  2
                );
              });
            } else if (typeof recentAnswer === 'string') {
              if (question.section.sectionName === 'Proposal Team') {
                const newAnswer = [];
                recentAnswer.split(',').forEach(answer => {
                  const split_array = answer.split('(');
                  if (split_array && split_array.length > 0) {
                    newAnswer.push(split_array[0].trim());
                  }
                });
                newAnswer.forEach(answerChunk => {
                  updateSearchMatches(
                    regexp,
                    answerChunk,
                    `${question.questionId}-approval-${approval.ApprovalSectionId}-right-ques`,
                    finalResult,
                    2
                  );
                });
              } else {
                updateSearchMatches(
                  regexp,
                  recentAnswer,
                  `${question.questionId}-approval-${approval.ApprovalSectionId}-right-ques`,
                  finalResult,
                  2
                );
              }
            }
          }
        }
      });
    }
  });
}

export function searchInStrategyDevelopment(
  finalResult,
  regexp,
  sections,
  isQuestionsFiltersEnabled,
  approvalFilters
) {
  // searching sections
  Object.keys(sections)
    .sort(
      (key1, key2) =>
        sections[key1]['sectionOrder'] - sections[key2]['sectionOrder']
    )
    .filter(
      section =>
        sections[section].sectionName !==
        'Questions_for_the_Customer_left_panel'
    )
    .forEach(sectionKey => {
      const section = sections[sectionKey];
      const questions = section['questions'];
      const filteredQuestions = Object.keys(questions).filter(
        questionKey =>
          questions[questionKey]['visible'] &&
          (questions[questionKey]['active'] ||
            questions[questionKey]['isCustomQuestion']) &&
          (!questions[questionKey]['notApplicable'] ||
            isQuestionsFiltersEnabled) &&
          !questions[questionKey]['questionApproval']
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
                  const newAnswer = [];
                  recentAnswer.split(',').forEach(answer => {
                    const split_array = answer.split('(');
                    if (split_array && split_array.length > 0) {
                      newAnswer.push(split_array[0].trim());
                    }
                  });
                  newAnswer.forEach(answerChunk => {
                    updateSearchMatches(
                      regexp,
                      answerChunk,
                      questionKey,
                      finalResult,
                      0
                    );
                  });
                } else {
                  updateSearchMatches(
                    regexp,
                    recentAnswer,
                    questionKey,
                    finalResult,
                    0
                  );
                }
              }
            }
          });
      }
    });
}

export function searchInNotepad(finalResult, regexp, notepadData) {
  // searching in notepad
  if (notepadData.length > 0) {
    updateSearchMatches(
      regexp,
      notepadData.join(''),
      NOTEPAD_UI_ID,
      finalResult,
      null,
      1 // vertical tab index of Notepad
    );
  }
}

export function searchInQuestionsForCustomer(finalResult, regexp, sections) {
  Object.keys(sections)
    .filter(
      section =>
        sections[section].sectionName ===
        'Questions_for_the_Customer_left_panel'
    )
    .forEach(sectionKey => {
      const section = sections[sectionKey];
      const questions = section['questions'];

      if (Object.keys(questions).length > 0) {
        // searching questions
        Object.keys(questions).forEach(questionKey => {
          const question = questions[questionKey];
          // searching in questionText
          if (question['questionText']) {
            updateSearchMatches(
              regexp,
              question['questionText'],
              questionKey,
              finalResult,
              null,
              0
            );
          }
          // searching in answer
          if (Array.isArray(question.answers) && question.answers.length > 0) {
            let recentAnswer =
              question.answers[question.answers.length - 1].answer;
            // if multiple answer
            if (Array.isArray(recentAnswer)) {
              recentAnswer.forEach(answerChunk => {
                updateSearchMatches(
                  regexp,
                  answerChunk,
                  questionKey,
                  finalResult,
                  null,
                  0
                );
              });
            } else if (typeof recentAnswer === 'string') {
              updateSearchMatches(
                regexp,
                recentAnswer,
                questionKey,
                finalResult,
                null,
                0
              );
            }
          }
        });
      }
    });
}

export function updateSearchMatches(
  regexp,
  inputText,
  index,
  finalResult,
  tab = null,
  vTab = null
) {
  let matchIndex = 0;
  for (const result of inputText.matchAll(regexp)) {
    finalResult.count++;
    finalResult.results.push({
      tab,
      searchIndex: index,
      inputText,
      vTab,
      startIndex: result['index'],
      endIndex: result['index'] + result[0].length,
      matchIndex
    });

    matchIndex++;
  }
}

// strategy function for adding highlight decorator to draftjs editor
// commented following function to keep it for reference in future
// export function highlightQueryStrategy(
//   contentBlock,
//   callback,
//   contentState,
//   query
// ) {
//   findWithRegex(new RegExp(query, 'gi'), contentBlock, callback);
// }

// function findWithRegex(regex, contentBlock, callback) {
//   const text = contentBlock.getText();
//   let matchArr, start;
//   while ((matchArr = regex.exec(text)) !== null) {
//     start = matchArr.index;
//     callback(start, start + matchArr[0].length);
//   }
// }

export function extractTextFromProseMirrorJSON(
  data,
  results = [],
  prefix = null
) {
  if (prefix !== null) {
    results.push(prefix);
  }
  if (typeof data === 'object' && Array.isArray(data.content)) {
    data.content.forEach((content, index) => {
      if (content.type === 'listItem') {
        extractTextFromProseMirrorJSON(content, results, '  ');
      } else if (index !== 0 && content.type === 'paragraph') {
        extractTextFromProseMirrorJSON(content, results, '  ');
      } else {
        extractTextFromProseMirrorJSON(content, results);
      }
    });
  } else if (typeof data === 'object' && data.type === 'mention') {
    if (data.attrs && data.attrs.label) {
      results.push(data.attrs.label);
    }
    return;
  } else if (data.type && data.type === 'text') {
    results.push(data.text);
    return;
  }
  return results;
}
