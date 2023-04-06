/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import jwt_decode from 'jwt-decode';
import { cloneDeep, isArray, isEmpty, isString } from 'lodash';
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

const getFullProposalTeamString = proposalUsers => {
  if (!isArray(proposalUsers)) return '';
  let proposalTeamStr = ``;

  proposalUsers?.map(({ userName, userEmail }) => {
    proposalTeamStr += userName ? `<a href=${userEmail}>${userName}</a>, ` : ``;
  });

  return proposalTeamStr;
};

const getQuestionsForTheCustomer = questions => {
  let html = '<ul>';

  questions
    ?.sort((a, b) => a.questionOrder - b.questionOrder)
    ?.map(questionData => {
      console.log({ questionData });
      if (
        questionData?.isCustomQuestion &&
        questionData.section.sectionName ===
          'Questions_for_the_Customer_left_panel'
      ) {
        const answer = getAnswer(questionData.answers);

        html += `<li>${questionData.questionHTML}</li>`;
        if (
          answer &&
          questionData.answers[questionData.answers.length - 1]?.answer?.trim()
        )
          html += `<ul><li>${answer}</li></ul>`;
      }
    });
  html += '</ul>';

  return html;
};

/**
 * @returns {string[]}
 */
function updateEventSubjectBody(str, data) {
  const { proposalDetail, proposalUsers, proposalQuestions } = data;
  const obj = {
    '[opportunity_number]': proposalDetail['CRM #'],
    '[line_of_business]': proposalDetail['Line of business'],
    '[customer]': proposalDetail['Customer'],
    '[product_name]': proposalDetail['Product name'],
    '[therapeutic_area]': proposalDetail['Therapeutic area'],
    '[protocol_number]': proposalDetail['Protocol number'],
    '[bid_no]': proposalDetail['bidNo'],
    '[unity_link]': `<a href=${window.location.href}>${window.location.href}</a>`,
    '[todays_date]': `${formatTheDate(new Date())}`,
    '[full_proposal_team]': getFullProposalTeamString(proposalUsers),
    '[questions_for_the_customers]': getQuestionsForTheCustomer(
      proposalQuestions
    )
  };
  for (const key in obj) {
    if (str.includes(key)) {
      str = str.replaceAll(key, obj[key]);
    }
  }

  return str;
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
  return userName.split(' ')[0].charAt(0) + userName.split(' ')[1].charAt(0);
}

function getUserName(userName, lastChangedInBid) {
  if (userName === 'AnswerPulledFromSalesforce') return 'Salesforce Answer';
  if (userName === 'UnityPredictedAnswer') return 'Unity Predicted Answer';
  if (userName === 'CarryForwardAnswer') {
    if (lastChangedInBid) return `Answer derived from bid ${lastChangedInBid}`;
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
  getApprovalCount
};
