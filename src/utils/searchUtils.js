import moment from 'moment';
import {
  shouldShowQuestion,
  shouldShowSection
} from '../components/screens/Approvals/utils';
import {
  shouldShowSection as customTabShouldShowSection,
  shouldShowQuestion as customTabShouldShowQuestion
} from '../components/screens/UnityTabs/utils';
import { DEFAULT_TABS_LEN, NOTEPAD_UI_ID } from '../constants/app';

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
  unityTabFilters,
  questionsForCustomersEnabled,
  allTabs,
  filteredQuestionsMap,
  sectionsUnfiltered,
  allFlags
}) {
  let finalResult = {
    count: 0,
    results: []
  };
  const regexp = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  let verticalTabSearched = false;

  // search in active tab
  if (activeTab <= allTabs.length - 1) {
    searchInTab({
      tabId: allTabs[activeTab].tabId,
      tabIndex: activeTab,
      tabName: allTabs[activeTab].tabName,
      finalResult,
      regexp,
      sections:
        activeTab >= 0 && activeTab < DEFAULT_TABS_LEN
          ? sections
          : allTabs[activeTab].sections,
      isQuestionsFilterEnabled,
      approvals,
      filteredQuestionsMap,
      approvalFilters,
      unityTabFilters,
      sectionsUnfiltered,
      allFlags
    });
    if (activeTab !== 1) {
      if (questionsForCustomersEnabled) {
        searchInQuestionsForCustomer(
          finalResult,
          regexp,
          sectionsUnfiltered,
          allTabs[activeTab].tabName,
          activeTab
        );
      }
      searchInNotepad(
        finalResult,
        regexp,
        notepadData,
        allTabs[activeTab].tabName,
        activeTab
      );
      searchInProposalTeam(
        finalResult,
        regexp,
        sectionsUnfiltered,
        allTabs[activeTab].tabName,
        activeTab
      );
      searchInKeyMilestone(
        finalResult,
        regexp,
        sectionsUnfiltered,
        allTabs[activeTab].tabName,
        activeTab
      );
      verticalTabSearched = true;
    }

    // search in other tabs starting from tab 1
    allTabs
      .map((tab, tabIndex) => ({
        ...tab,
        tabIndex
      }))
      .filter((tab, tabIndex) => tabIndex !== activeTab)
      .forEach(tab => {
        searchInTab({
          tabId: tab.tabId,
          tabIndex: tab.tabIndex,
          tabName: tab.tabName,
          finalResult,
          regexp,
          sections: tab.tabIndex < DEFAULT_TABS_LEN ? sections : tab.sections,
          isQuestionsFilterEnabled,
          approvals,
          filteredQuestionsMap,
          approvalFilters,
          unityTabFilters,
          sectionsUnfiltered,
          allFlags
        });
        if (tab.tabIndex !== 1 && !verticalTabSearched) {
          if (questionsForCustomersEnabled) {
            searchInQuestionsForCustomer(
              finalResult,
              regexp,
              sectionsUnfiltered,
              tab.tabName,
              tab.tabIndex
            );
          }
          searchInNotepad(
            finalResult,
            regexp,
            notepadData,
            tab.tabName,
            tab.tabIndex
          );
          searchInProposalTeam(
            finalResult,
            regexp,
            sectionsUnfiltered,
            tab.tabName,
            tab.tabIndex
          );
          searchInKeyMilestone(
            finalResult,
            regexp,
            sectionsUnfiltered,
            allTabs[activeTab].tabName,
            activeTab
          );
          verticalTabSearched = true;
        }
      });
  }

  return finalResult;
}

//shouldShowSection(sectionId, tabId);
export function searchInTab({
  tabId,
  tabIndex,
  tabName,
  finalResult,
  regexp,
  sections,
  isQuestionsFilterEnabled,
  approvals,
  filteredQuestionsMap,
  approvalFilters,
  unityTabFilters,
  allFlags
}) {
  // do nothing on timeline, documents tabs
  if (tabIndex === 1 || tabIndex === 3) {
    return;
  }
  if (tabIndex === 2) {
    searchInApprovals(
      finalResult,
      regexp,
      filteredQuestionsMap,
      approvals,
      approvalFilters,
      allFlags
    );
    return;
  }
  // searching sections
  Object.keys(sections)
    .sort(
      (key1, key2) =>
        sections[key1]['sectionOrder'] - sections[key2]['sectionOrder']
    )
    .filter(
      section =>
        sections[section].sectionName !==
          'Questions_for_the_Customer_left_panel' &&
        sections[section].sectionName !==
          'Key Milestones & Deliverable Timelines' &&
        sections[section].sectionName !== 'Proposal Team'
    )
    .forEach(sectionKey => {
      const section = sections[sectionKey];
      const questions = section['questions'];
      if (tabIndex >= DEFAULT_TABS_LEN) {
        if (!customTabShouldShowSection(section.sectionId, tabId)) {
          return;
        }
      }
      const filteredQuestions = Object.keys(questions).filter(questionKey => {
        if (tabIndex >= DEFAULT_TABS_LEN) {
          return (
            questions[questionKey]['active'] &&
            questions[questionKey]['visible'] &&
            customTabShouldShowQuestion(
              questions[questionKey],
              unityTabFilters,
              allFlags
            )
          );
        } else {
          return (
            questions[questionKey]['visible'] &&
            (questions[questionKey]['active'] ||
              questions[questionKey]['isCustomQuestion']) &&
            (!questions[questionKey]['notApplicable'] ||
              isQuestionsFilterEnabled) &&
            !questions[questionKey]['questionApproval']
          );
        }
      });

      if (filteredQuestions.length > 0) {
        // searching in sectionName
        updateSearchMatches({
          regexp,
          inputText: section.sectionName,
          index: sectionKey,
          finalResult,
          tab: tabIndex,
          vTab: null,
          tabName,
          sectionName: section.sectionName
        });

        // searching questions
        filteredQuestions
          .filter(questionKey => {
            const question = questions[questionKey];
            return (
              question['visible'] &&
              (question['active'] || question['isCustomQuestion']) &&
              (tabIndex >= DEFAULT_TABS_LEN
                ? true
                : !question['questionApproval'])
            );
          })
          .forEach(questionKey => {
            const question = questions[questionKey];
            // searching in questionText
            if (question['questionText']) {
              updateSearchMatches({
                regexp,
                inputText: question['questionText'],
                index: questionKey,
                finalResult,
                tab: tabIndex,
                vTab: null,
                tabName,
                sectionName: section.sectionName
              });
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
                  updateSearchMatches({
                    regexp,
                    inputText: answerChunk,
                    index: questionKey,
                    finalResult,
                    tab: tabIndex,
                    vTab: null,
                    tabName,
                    sectionName: section.sectionName
                  });
                });
              } else if (typeof recentAnswer === 'string') {
                if (question.answerConfiguration.type === 'proposal_team') {
                  const newAnswer = [];
                  recentAnswer.split(',').forEach(answer => {
                    const split_array = answer.split('(');
                    if (split_array && split_array.length > 0) {
                      newAnswer.push(split_array[0].trim());
                    }
                  });
                  newAnswer.forEach(answerChunk => {
                    updateSearchMatches({
                      regexp,
                      inputText: answerChunk,
                      index: questionKey,
                      finalResult,
                      tab: tabIndex,
                      vTab: null,
                      tabName,
                      sectionName: section.sectionName
                    });
                  });
                } else if (question.answerConfiguration.type === 'date') {
                  updateSearchMatches({
                    regexp,
                    inputText: moment(recentAnswer).isValid()
                      ? moment(recentAnswer).format('DD-MMM-YYYY')
                      : recentAnswer,
                    index: questionKey,
                    finalResult,
                    tab: tabIndex,
                    vTab: null,
                    tabName,
                    sectionName: section.sectionName
                  });
                } else {
                  updateSearchMatches({
                    regexp,
                    inputText: recentAnswer,
                    index: questionKey,
                    finalResult,
                    tab: tabIndex,
                    vTab: null,
                    tabName,
                    sectionName: section.sectionName
                  });
                }
              }
            }
          });
      }
    });
}

export function searchInApprovals(
  finalResult,
  regexp,
  questionsMap,
  approvals,
  approvalFilters,
  allFlags
) {
  // searching approvals
  approvals.forEach(approval => {
    if (!shouldShowSection(approval.ApprovalSectionId)) {
      return;
    }
    // searching in approvalTitle
    if (approval.ApprovalSectionTitle) {
      updateSearchMatches({
        regexp,
        inputText: approval.ApprovalSectionTitle,
        index: approval.ApprovalSectionId,
        finalResult,
        tab: 2,
        vTab: null,
        tabName: 'Approvals',
        sectionName: approval.ApprovalSectionTitle
      });
    }

    // searching archivedData
    if (
      Array.isArray(approval.ArchivedData) &&
      approval.ArchivedData.length > 0
    ) {
      approval.ArchivedData.forEach((archive, aIndex) => {
        // searching in approvalTitle but not in 0 index
        if (archive.section_title && aIndex !== 0) {
          updateSearchMatches({
            regexp,
            inputText: archive.section_title,
            index: `${archive.section_id}-archive-${aIndex}-section-title`,
            finalResult,
            tab: 2,
            vTab: null,
            tabName: 'Approvals',
            sectionName: approval.ApprovalSectionTitle
          });
        }
        archive.section_left_questions
          .filter(
            question =>
              question['active'] &&
              question['visible'] &&
              shouldShowQuestion(question, approvalFilters, allFlags)
          )
          .forEach(question => {
            updateSearchMatches({
              regexp,
              inputText: question.questionText,
              index: `${question.questionId}-archive-${aIndex}-left-ques`,
              finalResult,
              tab: 2,
              vTab: null,
              tabName: 'Approvals',
              sectionName: approval.ApprovalSectionTitle
            });

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
                  updateSearchMatches({
                    regexp,
                    inputText: answerChunk,
                    index: `${question.questionId}-archive-${aIndex}-left-ques`,
                    finalResult,
                    tab: 2,
                    vTab: null,
                    tabName: 'Approvals',
                    sectionName: approval.ApprovalSectionTitle
                  });
                });
              } else if (typeof recentAnswer === 'string') {
                if (question.answerConfiguration.type === 'proposal_team') {
                  const newAnswer = [];
                  recentAnswer.split(',').forEach(answer => {
                    const split_array = answer.split('(');
                    if (split_array && split_array.length > 0) {
                      newAnswer.push(split_array[0].trim());
                    }
                  });
                  newAnswer.forEach(answerChunk => {
                    updateSearchMatches({
                      regexp,
                      inputText: answerChunk,
                      index: `${question.questionId}-archive-${aIndex}-left-ques`,
                      finalResult,
                      tab: 2,
                      vTab: null,
                      tabName: 'Approvals',
                      sectionName: approval.ApprovalSectionTitle
                    });
                  });
                } else if (question.answerConfiguration.type === 'date') {
                  updateSearchMatches({
                    regexp,
                    inputText: moment(recentAnswer).isValid()
                      ? moment(recentAnswer).format('DD-MMM-YYYY')
                      : recentAnswer,
                    index: `${question.questionId}-archive-${aIndex}-left-ques`,
                    finalResult,
                    tab: 2,
                    vTab: null,
                    tabName: 'Approvals',
                    sectionName: approval.ApprovalSectionTitle
                  });
                } else {
                  updateSearchMatches({
                    regexp,
                    inputText: recentAnswer,
                    index: `${question.questionId}-archive-${aIndex}-left-ques`,
                    finalResult,
                    tab: 2,
                    vTab: null,
                    tabName: 'Approvals',
                    sectionName: approval.ApprovalSectionTitle
                  });
                }
              }
            }
          });

        archive.section_right_questions
          .filter(
            question =>
              question['active'] &&
              question['visible'] &&
              shouldShowQuestion(question, approvalFilters, allFlags)
          )
          .forEach(question => {
            updateSearchMatches({
              regexp,
              inputText: question.questionText,
              index: `${question.questionId}-archive-${aIndex}-right-ques`,
              finalResult,
              tab: 2,
              vTab: null,
              tabName: 'Approvals',
              sectionName: approval.ApprovalSectionTitle
            });

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
                  updateSearchMatches({
                    regexp,
                    inputText: answerChunk,
                    index: `${question.questionId}-archive-${aIndex}-right-ques`,
                    finalResult,
                    tab: 2,
                    vTab: null,
                    tabName: 'Approvals',
                    sectionName: approval.ApprovalSectionTitle
                  });
                });
              } else if (typeof recentAnswer === 'string') {
                if (question.answerConfiguration.type === 'proposal_team') {
                  const newAnswer = [];
                  recentAnswer.split(',').forEach(answer => {
                    const split_array = answer.split('(');
                    if (split_array && split_array.length > 0) {
                      newAnswer.push(split_array[0].trim());
                    }
                  });
                  newAnswer.forEach(answerChunk => {
                    updateSearchMatches({
                      regexp,
                      inputText: answerChunk,
                      index: `${question.questionId}-archive-${aIndex}-right-ques`,
                      finalResult,
                      tab: 2,
                      vTab: null,
                      tabName: 'Approvals',
                      sectionName: approval.ApprovalSectionTitle
                    });
                  });
                } else if (question.answerConfiguration.type === 'date') {
                  updateSearchMatches({
                    regexp,
                    inputText: moment(recentAnswer).isValid()
                      ? moment(recentAnswer).format('DD-MMM-YYYY')
                      : recentAnswer,
                    index: `${question.questionId}-archive-${aIndex}-right-ques`,
                    finalResult,
                    tab: 2,
                    vTab: null,
                    tabName: 'Approvals',
                    sectionName: approval.ApprovalSectionTitle
                  });
                } else {
                  updateSearchMatches({
                    regexp,
                    inputText: recentAnswer,
                    index: `${question.questionId}-archive-${aIndex}-right-ques`,
                    finalResult,
                    tab: 2,
                    vTab: null,
                    tabName: 'Approvals',
                    sectionName: approval.ApprovalSectionTitle
                  });
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
        return (
          question && shouldShowQuestion(question, approvalFilters, allFlags)
        );
      }).forEach(questionId => {
        const question = questionsMap[questionId];
        if (question) {
          updateSearchMatches({
            regexp,
            inputText: question.questionText,
            index: `${question.questionId}-approval-${approval.ApprovalSectionId}-left-ques`,
            finalResult,
            tab: 2,
            vTab: null,
            tabName: 'Approvals',
            sectionName: approval.ApprovalSectionTitle
          });

          // searching in answer
          if (Array.isArray(question.answers) && question.answers.length > 0) {
            const recentAnswer =
              question.answers[question.answers.length - 1].answer;
            // if multiple answer
            if (Array.isArray(recentAnswer)) {
              recentAnswer.forEach(answerChunk => {
                updateSearchMatches({
                  regexp,
                  inputText: answerChunk,
                  index: `${question.questionId}-approval-${approval.ApprovalSectionId}-left-ques`,
                  finalResult,
                  tab: 2,
                  vTab: null,
                  tabName: 'Approvals',
                  sectionName: approval.ApprovalSectionTitle
                });
              });
            } else if (typeof recentAnswer === 'string') {
              if (question.answerConfiguration.type === 'proposal_team') {
                const newAnswer = [];
                recentAnswer.split(',').forEach(answer => {
                  const split_array = answer.split('(');
                  if (split_array && split_array.length > 0) {
                    newAnswer.push(split_array[0].trim());
                  }
                });
                newAnswer.forEach(answerChunk => {
                  updateSearchMatches({
                    regexp,
                    inputText: answerChunk,
                    index: `${question.questionId}-approval-${approval.ApprovalSectionId}-left-ques`,
                    finalResult,
                    tab: 2,
                    vTab: null,
                    tabName: 'Approvals',
                    sectionName: approval.ApprovalSectionTitle
                  });
                });
              } else if (question.answerConfiguration.type === 'date') {
                updateSearchMatches({
                  regexp,
                  inputText: moment(recentAnswer).isValid()
                    ? moment(recentAnswer).format('DD-MMM-YYYY')
                    : recentAnswer,
                  index: `${question.questionId}-approval-${approval.ApprovalSectionId}-left-ques`,
                  finalResult,
                  tab: 2,
                  vTab: null,
                  tabName: 'Approvals',
                  sectionName: approval.ApprovalSectionTitle
                });
              } else {
                updateSearchMatches({
                  regexp,
                  inputText: recentAnswer,
                  index: `${question.questionId}-approval-${approval.ApprovalSectionId}-left-ques`,
                  finalResult,
                  tab: 2,
                  vTab: null,
                  tabName: 'Approvals',
                  sectionName: approval.ApprovalSectionTitle
                });
              }
            }
          }
        }
      });
    }
    if (Array.isArray(approval.ApprovalSectionRightQuestions)) {
      approval.ApprovalSectionRightQuestions.filter(questionId => {
        const question = questionsMap[questionId];
        return (
          question && shouldShowQuestion(question, approvalFilters, allFlags)
        );
      }).forEach(questionId => {
        const question = questionsMap[questionId];
        if (question) {
          updateSearchMatches({
            regexp,
            inputText: question.questionText,
            index: `${question.questionId}-approval-${approval.ApprovalSectionId}-right-ques`,
            finalResult,
            tab: 2,
            vTab: null,
            tabName: 'Approvals',
            sectionName: approval.ApprovalSectionTitle
          });

          // searching in answer
          if (Array.isArray(question.answers) && question.answers.length > 0) {
            const recentAnswer =
              question.answers[question.answers.length - 1].answer;
            // if multiple answer
            if (Array.isArray(recentAnswer)) {
              recentAnswer.forEach(answerChunk => {
                updateSearchMatches({
                  regexp,
                  inputText: answerChunk,
                  index: `${question.questionId}-approval-${approval.ApprovalSectionId}-right-ques`,
                  finalResult,
                  tab: 2,
                  vTab: null,
                  tabName: 'Approvals',
                  sectionName: approval.ApprovalSectionTitle
                });
              });
            } else if (typeof recentAnswer === 'string') {
              if (question.answerConfiguration.type === 'proposal_team') {
                const newAnswer = [];
                recentAnswer.split(',').forEach(answer => {
                  const split_array = answer.split('(');
                  if (split_array && split_array.length > 0) {
                    newAnswer.push(split_array[0].trim());
                  }
                });
                newAnswer.forEach(answerChunk => {
                  updateSearchMatches({
                    regexp,
                    inputText: answerChunk,
                    index: `${question.questionId}-approval-${approval.ApprovalSectionId}-right-ques`,
                    finalResult,
                    tab: 2,
                    vTab: null,
                    tabName: 'Approvals',
                    sectionName: approval.ApprovalSectionTitle
                  });
                });
              } else if (question.answerConfiguration.type === 'date') {
                updateSearchMatches({
                  regexp,
                  inputText: moment(recentAnswer).isValid()
                    ? moment(recentAnswer).format('DD-MMM-YYYY')
                    : recentAnswer,
                  index: `${question.questionId}-approval-${approval.ApprovalSectionId}-right-ques`,
                  finalResult,
                  tab: 2,
                  vTab: null,
                  tabName: 'Approvals',
                  sectionName: approval.ApprovalSectionTitle
                });
              } else {
                updateSearchMatches({
                  regexp,
                  inputText: recentAnswer,
                  index: `${question.questionId}-approval-${approval.ApprovalSectionId}-right-ques`,
                  finalResult,
                  tab: 2,
                  vTab: null,
                  tabName: 'Approvals',
                  sectionName: approval.ApprovalSectionTitle
                });
              }
            }
          }
        }
      });
    }
  });
}

export function searchInNotepad(
  finalResult,
  regexp,
  notepadData,
  tabName,
  tab
) {
  // searching in notepad
  if (notepadData.length > 0) {
    updateSearchMatches({
      regexp,
      inputText: notepadData.join(''),
      index: NOTEPAD_UI_ID,
      finalResult,
      tab,
      vTab: 1,
      tabName
    });
  }
}

export function searchInQuestionsForCustomer(
  finalResult,
  regexp,
  sections,
  tabName,
  tab
) {
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
            updateSearchMatches({
              regexp,
              inputText: question['questionText'],
              index: questionKey,
              finalResult,
              tab,
              vTab: 0,
              tabName
            });
          }
          // searching in answer
          if (Array.isArray(question.answers) && question.answers.length > 0) {
            let recentAnswer =
              question.answers[question.answers.length - 1].answer;
            // if multiple answer
            if (Array.isArray(recentAnswer)) {
              recentAnswer.forEach(answerChunk => {
                updateSearchMatches({
                  regexp,
                  inputText: answerChunk,
                  index: questionKey,
                  finalResult,
                  tab,
                  vTab: 0,
                  tabName
                });
              });
            } else if (typeof recentAnswer === 'string') {
              updateSearchMatches({
                regexp,
                inputText: recentAnswer,
                index: questionKey,
                finalResult,
                tab,
                vTab: 0,
                tabName
              });
            }
          }
        });
      }
    });
}

export function searchInKeyMilestone(
  finalResult,
  regexp,
  sections,
  tabName,
  tab
) {
  Object.keys(sections)
    .filter(
      section =>
        sections[section].sectionName ===
        'Key Milestones & Deliverable Timelines'
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
            updateSearchMatches({
              regexp,
              inputText: question['questionText'],
              index: questionKey,
              finalResult,
              tab,
              vTab: 3,
              tabName
            });
          }
          // searching in answer
          if (Array.isArray(question.answers) && question.answers.length > 0) {
            let recentAnswer =
              question.answers[question.answers.length - 1].answer;
            // if multiple answer
            if (Array.isArray(recentAnswer)) {
              recentAnswer.forEach(answerChunk => {
                updateSearchMatches({
                  regexp,
                  inputText: answerChunk,
                  index: questionKey,
                  finalResult,
                  tab,
                  vTab: 3,
                  tabName
                });
              });
            } else if (typeof recentAnswer === 'string') {
              updateSearchMatches({
                regexp,
                inputText: recentAnswer,
                index: questionKey,
                finalResult,
                tab,
                vTab: 3,
                tabName
              });
            }
          }
        });
      }
    });
}

export function searchInProposalTeam(
  finalResult,
  regexp,
  sections,
  tabName,
  tab
) {
  Object.keys(sections)
    .filter(section => sections[section].sectionName === 'Proposal Team')
    .forEach(sectionKey => {
      const section = sections[sectionKey];
      const questions = section['questions'];
      const filteredQuestions = Object.keys(questions).filter(questionKey => {
        return (
          questions[questionKey]['visible'] &&
          (questions[questionKey]['active'] ||
            questions[questionKey]['isCustomQuestion']) &&
          (!questions[questionKey]['notApplicable'] ||
            isQuestionsFilterEnabled) &&
          !questions[questionKey]['questionApproval']
        );
      });

      if (filteredQuestions.length > 0) {
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
              updateSearchMatches({
                regexp,
                inputText: question['questionText'],
                index: questionKey,
                finalResult,
                tab,
                vTab: 2,
                tabName
              });
            }
            // searching in answer
            if (
              Array.isArray(question.answers) &&
              question.answers.length > 0
            ) {
              let recentAnswer =
                question.answers[question.answers.length - 1].answer;
              const newAnswer = [];
              recentAnswer.split(',').forEach(answer => {
                const split_array = answer.split('(');
                if (split_array && split_array.length > 0) {
                  newAnswer.push(split_array[0].trim());
                }
              });
              newAnswer.forEach(answerChunk => {
                updateSearchMatches({
                  regexp,
                  inputText: answerChunk,
                  index: questionKey,
                  finalResult,
                  tab,
                  vTab: 2,
                  tabName
                });
              });
            }
          });
      }
    });
}

export function updateSearchMatches({
  regexp,
  inputText,
  index,
  finalResult,
  tab = null,
  vTab = null,
  tabName = '',
  sectionName = null
}) {
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
      matchIndex,
      tabName,
      sectionName
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
