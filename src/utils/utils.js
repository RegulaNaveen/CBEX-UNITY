/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import jwt_decode from 'jwt-decode';
import { cloneDeep, isArray, isEmpty, isString } from 'lodash';
import ANSWER_TYPES from '../constants/answerTypes';
import { DEFAULT } from '../constants/app';
import CountryMap from '../constants/country.json';
import { UBUILD_ADMIN } from '../constants/types';
import { formatTheDate } from './DateUtils';

/**
 *
 * @param {string[]} countryCodes
 * @returns {string[]}
 */
function getCountriesNameForCode(countryCodes) {
  const countryNames = Object.values(CountryMap);
  return countryCodes.map(countryCode => {
    if (countryNames.includes(countryCode.trim())) {
      return countryCode;
    }
    if (CountryMap[countryCode]) {
      return CountryMap[countryCode];
    }
    return countryCode;
  });
}

/**
 * @returns {string[]}
 */
function getCountryOptions() {
  return Object.values(CountryMap);
}

const getAnswer = ans => {
  try {
    const lastAnswer = ans[ans.length - 1];
    let formattedAnswer;
    if (lastAnswer?.formattedAnswer) {
      if (isString(lastAnswer?.formattedAnswer)) {
        try {
          formattedAnswer = JSON.parse(lastAnswer?.formattedAnswer);
        } catch {
          return (lastAnswer && lastAnswer.answer.toString()) || '';
        }
      } else formattedAnswer = lastAnswer?.formattedAnswer;
      if (formattedAnswer?.htmlExport) {
        return formattedAnswer.htmlExport;
      }
      if (formattedAnswer?.html) {
        return formattedAnswer?.html;
      }
    }

    return (lastAnswer && lastAnswer.answer.toString()) || '';
  } catch (error) {
    console.log(error);
    return '';
  }
};

const getFullProposalTeamString = (updateField, questions) => {
  const relevantQuestions = questions?.filter(
    q =>
      q.visible &&
      (q.active || q.isCustomQuestion) &&
      q.section.sectionName === 'Proposal Team'
  );
  const isSubjectUpdate = updateField === 'subject';

  const uniqueNames = new Set(); // to keep track of unique names

  const result = relevantQuestions
    ?.flatMap(q => (q?.answers?.slice(-1)[0]?.answer || '')?.split(','))
    .map(answer => {
      const [name, email] = answer?.trim()?.split('(');
      const emailWithoutParenthesis = email?.replace(')', '');
      const uniqueName = isSubjectUpdate
        ? name?.trim()?.replace(/\s*\([^)]*\)/g, '')
        : emailWithoutParenthesis
        ? `<a href="https://outlook.office.com/mail/deeplink/compose?to=${emailWithoutParenthesis}">${name?.trim()}</a>`
        : name?.trim();

      if (!uniqueNames.has(uniqueName)) {
        uniqueNames.add(uniqueName);
        return uniqueName;
      }
      return null;
    })
    .filter(answer => answer)
    .join(', ');

  return result;
};

const handleAnswerTypes = (answerConfiguration, answers, updateField) => {
  switch (answerConfiguration?.type) {
    case ANSWER_TYPES.TEXT: {
      return updateField === 'body'
        ? getAnswer(answers)
        : answers?.slice(-1)[0]?.answer ?? '';
    }
    default:
      return answers?.slice(-1)[0]?.answer?.toString() ?? '';
  }
};

const replaceAnswerToQuestionsPlaceholders = (
  eventBodyStr,
  questions,
  updateField
) => {
  let updatedEventBodyStr = eventBodyStr;

  const relevantQuestions = questions?.filter(q => q.visible && q.active);

  relevantQuestions.forEach(
    ({ questionText, questionId, answers, answerConfiguration }) => {
      const regexPlaceholders = new RegExp(
        `\\[${questionText
          ?.toLowerCase()
          ?.replace(/[^\w\s]/gi, '')
          ?.replace(/\s+/g, '_')}:${questionId}\\]`,
        'gi'
      );

      if (answers?.length) {
        const answer = handleAnswerTypes(
          answerConfiguration,
          answers,
          updateField
        );

        updatedEventBodyStr = updatedEventBodyStr.replace(
          regexPlaceholders,
          answer
        );
      }
    }
  );

  if (updateField === 'body') {
    const regexPlaceholdersNotResolved = /\[(.*?)]/gi;
    updatedEventBodyStr = updatedEventBodyStr.replace(
      regexPlaceholdersNotResolved,
      match => `<span style="color:#f00">${match}</span>`
    );
  }
  return updatedEventBodyStr;
};

const getQuestionsForTheCustomer = (questions, updateField) => {
  const isSubjectUpdate = updateField === 'subject';
  const relevantQuestions = questions
    ?.filter(
      q =>
        q.isCustomQuestion &&
        q.section.sectionName === 'Questions_for_the_Customer_left_panel'
    )
    ?.sort((a, b) => a.questionOrder - b.questionOrder);
  return isSubjectUpdate
    ? relevantQuestions
        ?.map(
          q =>
            `${q.questionText ?? ''} \r\n${q.answers?.slice(-1)[0]?.answer ??
              ''} \r\n`
        )
        .join('')
    : `<ul>${relevantQuestions
        ?.map(
          q =>
            `<li>${q.questionHTML}</li>${
              getAnswer(q.answers)
                ? `<ul><li>${getAnswer(q.answers)}</li></ul>`
                : ''
            }`
        )
        .join('')}</ul>`;
};

/**
 * @returns {string[]}
 */
function updateEventSubjectBody(
  str,
  { proposalDetail, proposalQuestions },
  updateField
) {
  const obj = {
    '[opportunity_number]': proposalDetail['CRM #'],
    '[line_of_business]': proposalDetail['Line of business'],
    '[customer]': proposalDetail['Customer'],
    '[product_name]': proposalDetail['Product name'],
    '[therapeutic_area]': proposalDetail['Therapeutic area'],
    '[protocol_number]': proposalDetail['Protocol number'],
    '[bid_no]': proposalDetail['bidNo'],
    '[unity_link]':
      updateField === 'body'
        ? `<a href=${window.location.href}>${window.location.href}</a>`
        : `${window.location.href}`,
    '[todays_date]': `${formatTheDate(new Date())}`,
    '[full_proposal_team]': getFullProposalTeamString(
      updateField,
      proposalQuestions
    ),
    '[questions_for_the_customers]': getQuestionsForTheCustomer(
      proposalQuestions,
      updateField
    )
  };

  Object.keys(obj).forEach(key => {
    if (str.includes(key)) {
      str = str.replaceAll(key, obj[key]);
    }
  });

  return replaceAnswerToQuestionsPlaceholders(
    str,
    proposalQuestions,
    updateField
  );
}

function isUserUbuildAdmin() {
  if (!localStorage.getItem('id_token')) return false;

  const idToken = localStorage.getItem('id_token');
  const decoded = jwt_decode(idToken);
  if (
    decoded &&
    Array.isArray(decoded['cognito:groups']) &&
    decoded['cognito:groups'].includes(UBUILD_ADMIN)
  ) {
    return true;
  }
  return false;
}

function getLineOfBusinessAsPerLogic(
  lobMapping,
  salesForceLob,
  salesForceIsIqviaBiotech,
  salesForceLobIsFSP
) {
  let finalLOB = '';
  lobMapping.forEach(function(data) {
    if (finalLOB !== '') return false;
    const { name } = data;
    data.values.forEach(d => {
      if (finalLOB !== '') return false;
      if (
        d.isBiotech === salesForceIsIqviaBiotech &&
        d.isFSP === salesForceLobIsFSP &&
        d.value === salesForceLob
      ) {
        finalLOB = name;
      }
    });
  });
  return finalLOB;
}

function logLobDetails(record) {
  try {
    const { proposal } = record;
    let concludedLob;
    if (proposal.lobLogic) {
      concludedLob = getLineOfBusinessAsPerLogic(
        JSON.parse(proposal.lobLogic || ''),
        proposal.proposalDetails['Line of business'],
        proposal.proposalDetails['Is this IQVIA Biotech'],
        proposal.proposalDetails.IsFsp
      );
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * function to rearrange diff'ed answers from diff js library
 */

const getApprovalCount = (approvals, proposalQuestions) => {
  try {
    const finalapproval = [];
    return new Promise(resolve => {
      let approvalCount = 0;
      if (approvals.length) {
        // eslint-disable-next-line array-callback-return
        approvals.map(v => {
          if (
            v.ApprovalSectionLeftQuestions.length ||
            v.ApprovalSectionRightQuestions.length
          ) {
            const arr = [
              ...v.ApprovalSectionLeftQuestions,
              ...v.ApprovalSectionRightQuestions
            ];
            const uniqueQuestionID = new Set();
            const extendedSet = new Set([...uniqueQuestionID, ...arr]);
            const res = proposalQuestions.some(
              c => c.active && extendedSet.has(c.questionId)
            );
            if (res) {
              approvalCount += 1;
              finalapproval.push(v);
            }
          }
        });
      }
      resolve({ approvalCount, finalapproval });
    });
  } catch (error) {
    console.log(`error in getApprovalCount`, error);
  }
};

function rearrangeDiff(diffAnswers) {
  let rearrangedDiffAnswers = [];
  let subAdditionDiffAnswers = [];
  let subRemovedDiffAnswers = [];

  diffAnswers.forEach(answer => {
    const newAnswer = cloneDeep(answer);
    newAnswer.value = `${newAnswer.value.trim()} `;
    if (answer.added) {
      subAdditionDiffAnswers.push(newAnswer);
      return;
    }
    if (answer.removed) {
      subRemovedDiffAnswers.push(newAnswer);
      return;
    }
    if (answer.value.trim().length == 0) {
      return;
    }
    rearrangedDiffAnswers = rearrangedDiffAnswers.concat(
      subRemovedDiffAnswers,
      subAdditionDiffAnswers,
      [cloneDeep(answer)]
    );
    subRemovedDiffAnswers = [];
    subAdditionDiffAnswers = [];
  });

  if (subRemovedDiffAnswers.length > 0 || subAdditionDiffAnswers.length > 0) {
    rearrangedDiffAnswers = rearrangedDiffAnswers.concat(
      subRemovedDiffAnswers,
      subAdditionDiffAnswers
    );
    subRemovedDiffAnswers = [];
    subAdditionDiffAnswers = [];
  }

  return rearrangedDiffAnswers;
}

function getUserInitials(userName, lastChangedInBid) {
  if (userName === 'AnswerPulledFromSalesforce') return 'SA';
  if (userName === 'UnityPredictedAnswer') return 'UA';
  if (userName === 'CarryForwardAnswer') {
    if (lastChangedInBid) return `B${lastChangedInBid}`;
    return 'B';
  }

  return userName
    ?.split(' ')
    ?.map(n => n[0].toUpperCase())
    ?.join('');
}

function getUserName(userName, lastChangedInBid, answerEmpty = false) {
  if (userName === 'AnswerPulledFromSalesforce') return 'Salesforce Answer';
  if (userName === 'UnityPredictedAnswer') return 'Unity Predicted Answer';
  if (userName === 'CarryForwardAnswer') {
    if (lastChangedInBid) {
      if (answerEmpty) {
        return `Answer not derived from bid ${lastChangedInBid}`;
      }
      return `Answer derived from bid ${lastChangedInBid}`;
    }
    return 'Answer derived from bid';
  }
  return userName;
}

function getProposalIdlist(data = []) {
  const sortProposalsByDateDesc = (i, j) => {
    const fallBackValue = 0; // keeps original order
    try {
      const firstItem = Date.parse(i?.proposal?.proposalDate) || fallBackValue;
      const secondItem = Date.parse(j?.proposal?.proposalDate) || fallBackValue;
      return secondItem - firstItem;
    } catch (error) {
      console.error('sortProposalsByDateDesc', error);
      return fallBackValue;
    }
  };
  const sortedData = data.sort(sortProposalsByDateDesc);
  return sortedData.map(d => {
    return {
      proposalId: d.proposal.proposalId,
      boxId: d.proposal.proposalDetails.boxId,
      bidNo: d.proposal.proposalDetails['bidNo'] || ''
    };
  });
}

function checkNonEditableFields(PreField, sfField, sfObject) {
  return PreField.some(
    el => el.sfField === sfField && el.sfObject === sfObject
  );
}

const saveDataInMatomo = (trackEvent, data) => {
  const { category, action, name, customDimensions } = data;
  trackEvent({
    category: category,
    action: action,
    name: name,
    customDimensions: customDimensions
  });
};

const throttle = (func, delay) => {
  // Previously called time of the function
  let prev = 0;
  return (...args) => {
    // Current called time of the function
    let now = new Date().getTime();

    // Logging the difference between previously
    // called and current called timings

    // If difference is greater than delay call
    // the function again.
    if (now - prev > delay) {
      prev = now;

      // "..." is the spread operator here
      // returning the function with the
      // array of arguments
      return func(...args);
    }
  };
};

/**
 * Get Error Message from response
 */
export function getErrorMessage(error) {
  if (error.response) {
    let msg = error.response.data.message;
    const isErr400 = error.response.status === 400;
    const isErr404 = error.response.status === 404;
    if (isErr400 && isEmpty(msg)) msg = DEFAULT.ERROR_400;
    if (isErr404 && isEmpty(msg)) msg = DEFAULT.ERROR_404;
    if (!isErr400 && !isErr404 && isEmpty(msg)) msg = DEFAULT.REQUEST_FAILED;
    return msg;
  }
  return 'Unexpected error occurred';
}

const createMatomoObj = (proposalDetails, userEmail, userRole, action) => {
  const matamoObj = {};
  matamoObj.category = `Proposal Detail (CRM#:${proposalDetails['CRM #']})`;
  matamoObj.action = `Event: Notepad ${proposalDetails['CRM #']}`;
  matamoObj.name = `Notepad: ${action}`;
  matamoObj.customDimensions = [
    {
      id: 1,
      value: JSON.stringify({
        proposalDetails,
        userEmail,
        userRole
      })
    }
  ];
  return matamoObj;
};

const getNextMilestone = milestones => {
  if (Array.isArray(milestones) && milestones.length > 0) {
    let sortedMilestones = milestones.sort((milestoneA, milestoneB) => {
      let diff = 0;
      try {
        diff =
          moment(milestoneA.date, 'DD-MMM-YYYY').valueOf() -
          moment(milestoneB.date, 'DD-MMM-YYYY').valueOf();
      } catch (e) {
        console.error('[Utils.getNextMilestone] Error in parsing date', e);
      }
      return diff;
    });
    return sortedMilestones[0].name;
  }
  return '';
};

export {
  getCountriesNameForCode,
  getCountryOptions,
  isUserUbuildAdmin,
  logLobDetails,
  rearrangeDiff,
  getUserInitials,
  getUserName,
  getProposalIdlist,
  checkNonEditableFields,
  updateEventSubjectBody,
  saveDataInMatomo,
  throttle,
  createMatomoObj,
  getApprovalCount,
  getNextMilestone
};
