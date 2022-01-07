import jwt_decode from 'jwt-decode';
import { cloneDeep } from 'lodash';
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
  if (userName === 'AnswerPulledFromSalesforce')
    return 'SA';
  if (userName === 'UnityPredictedAnswer')
    return 'UA';
  return userName.split(' ')[0].charAt(0) + userName.split(' ')[1].charAt(0);
}

function getUserName(userName) {
  if (userName === 'AnswerPulledFromSalesforce')
    return 'Salesforce Answer';
  if (userName === 'UnityPredictedAnswer')
    return 'Unity Predicted Answer';
  return userName;
}
function handleLocationChange (event){
  if(localStorage.getItem('unsaved-change') === 'true'){
    let response = confirm('You have some unsaved changes do you still want to redirect?');
    if(!response)
      event.preventDefault();
  }
};
export {
  getCountriesNameForCode,
  getCountryOptions,
  isUserUbuildAdmin,
  logLobDetails,
  rearrangeDiff,
  getUserInitials,
  getUserName,
  handleLocationChange
};
