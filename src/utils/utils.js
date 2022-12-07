import jwt_decode from 'jwt-decode';
import { cloneDeep, isEmpty } from 'lodash';
import { DEFAULT } from '../constants/app';
import CountryMap from '../constants/country.json';
import { UBUILD_ADMIN } from '../constants/types';

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

/**
 * @returns {string[]}
 */
function updateEventSubjectBody(str, data) {
  const obj = {
    '[opportunity_number]': data['CRM #'],
    '[line_of_business]': data['Line of business'],
    '[customer]': data['Customer'],
    '[product_name]': data['Product name'],
    '[therapeutic_area]': data['Therapeutic area'],
    '[protocol_number]': data['Protocol number'],
    '[bid_no]': data['bidNo']
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
      console.log('--------------------');
      console.log(
        `Logic from U-BUILD: Line Of Business = ${d.value} AND Is BioTech = ${d.isBiotech} AND FSP = ${d.isFSP}`
      );
      console.log(
        `Values from  SalesForce:  Line of Business = ${salesForceLob} AND Is BioTech = ${salesForceIsIqviaBiotech} AND FSP = ${salesForceLobIsFSP}`
      );
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
    console.log('########## Starting the Logic Evaluation ##########');
    if (proposal.lobLogic) {
      concludedLob = getLineOfBusinessAsPerLogic(
        JSON.parse(proposal.lobLogic || ''),
        proposal.proposalDetails['Line of business'],
        proposal.proposalDetails['Is this IQVIA Biotech'],
        proposal.proposalDetails.IsFsp
      );
    }
    console.log(
      'Concluded LOB: ',
      concludedLob || 'N/A - Not filtering question.'
    );
    console.log('########## Ending the Logic Evaluation ##########');
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

function getUserInitials(userName) {
  if (userName === 'AnswerPulledFromSalesforce') return 'SA';
  if (userName === 'UnityPredictedAnswer') return 'UA';
  return userName.split(' ')[0].charAt(0) + userName.split(' ')[1].charAt(0);
}

function getUserName(userName) {
  if (userName === 'AnswerPulledFromSalesforce') return 'Salesforce Answer';
  if (userName === 'UnityPredictedAnswer') return 'Unity Predicted Answer';
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
  console.log(`trackEvent`, trackEvent);
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
