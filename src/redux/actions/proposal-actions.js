// @flow
import { isEmpty, cloneDeep, uniqBy } from 'lodash';
import { fromJS, Map } from 'immutable';
import { REDUX_TYPES } from '../../constants';
import type { Dispatch, ThunkAction } from './action-types';
import {
  getProposalInfo,
  setProposalAnswer,
  getQuestionSectionInfo,
  getAnswerTypes,
  getRoles,
  setProposalQuestionData,
  getProposalInfoUpdated,
  getProposlBoxId,
  getValidatedProposalData,
  editProposalQuestionData,
  deleteProposalQuestionData,
  getOpportunityInfo
} from '../../api/proposal';
import { getQuestionsFilters, selectProposalQuestions } from '../selectors';
import { getUniqueMilestones } from '../selectors/proposal';
import { getProposalIdlist } from '../../utils/utils';
import { fetchNotes } from './notepad-actions';

const {
  PROPOSAL_INFO,
  PROPOSAL_INFO_LOADING,
  PROPOSAL_INFO_ERROR,
  PROPOSAL_ANSWER,
  PROPOSAL_ANSWER_LOADING,
  PROPOSAL_ANSWER_ERROR,
  QUESTION_SECTION_INFO,
  QUESTION_SECTION_LOADING,
  QUESTION_SECTION_ERROR,
  ANSWER_TYPES_INFO,
  ANSWER_TYPES_LOADING,
  ANSWER_TYPES_ERROR,
  ROLES_INFO,
  ROLES_LOADING,
  ROLES_ERROR,
  PROPOSAL_SET_QUESTION,
  PROPOSAL_SET_QUESTION_LOADING,
  PROPOSAL_SET_QUESTION_ERROR,
  PROPOSAL_BOX_ID,
  PROPOSAL_BOX_ID_LOADING,
  PROPOSAL_BOX_ID_ERROR,
  UPDATE_MODIFIED_QUESTION,
  ON_FETCHING_VALIDATED_PROPOSAL_DATA,
  VALIDATED_PROPOSAL_DATA,
  VALIDATED_PROPOSAL_DATA_ERROR,
  ON_APPLY_QUESTIONS_FILTER,
  ON_QUESTIONS_FILTERED,
  RESET_QUESTIONS_FILTER,
  CLEAR_QUESTIONS_FILTER,
  EXPAND_ALL_SECTIONS,
  SET_EDIT_QUESTION_DATA,
  PROPOSAL_EDIT_QUESTION,
  PROPOSAL_DELETE_QUESTION,
  OPPORTUNITY_INFO,
  UPDATE_BOX_BIDS,
  CHANGE_BID
} = REDUX_TYPES.PROPOSAL;

export type ProposalInfo = {};

export const getProposal = (id: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: PROPOSAL_INFO_LOADING, payload: {} });

    try {
      const data = await getProposalInfo(id);
      // Extracting unique milestone values from Proposal Questions
      const milestones = getUniqueMilestones(data.proposalQuestions);
      dispatch({ type: PROPOSAL_INFO, payload: { ...data, milestones } });

      return data;
    } catch (err) {
      dispatch({ type: PROPOSAL_INFO_ERROR, payload: err });
    }
  };
};

export const getProposalByID = (id: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: PROPOSAL_INFO_LOADING, payload: {} });
    try {
      const data = await getProposalInfo(id);
      return data;
    } catch (err) {
      dispatch({ type: PROPOSAL_INFO_ERROR, payload: err });
      throw err;
    }
  };
};

export const setProposalAnswerData = (
  proposalId: string,
  questionId: string,
  answer: string,
  userData: Object
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    dispatch({
      type: PROPOSAL_ANSWER_LOADING,
      payload: { questionId, loading: true }
    });
    let questionsFilter = getQuestionsFilters(getState());

    try {
      const { data } = await setProposalAnswer(
        proposalId,
        questionId,
        answer,
        userData
      );

      if (Array.isArray(data.answers)) {
        dispatch({
          type: PROPOSAL_ANSWER,
          payload: {
            data: data.answers,
            questionId,
            hasDifferentSFanswer: data.hasDifferentSFanswer || false
          }
        });
      } else {
        dispatch({
          type: PROPOSAL_ANSWER,
          payload: {
            data,
            questionId,
            hasDifferentSFanswer: data.hasDifferentSFanswer || false
          }
        });
      }

      const { modifiedQuestions } = data;
      if (!isEmpty(modifiedQuestions)) {
        modifiedQuestions.forEach(question => {
          dispatch({ type: UPDATE_MODIFIED_QUESTION, payload: { question } });
        });
      }
      dispatch(onQuestionsFilterApplied(questionsFilter));
      dispatch({
        type: PROPOSAL_ANSWER_LOADING,
        payload: { questionId, loading: false }
      });
    } catch (err) {
      dispatch({ type: PROPOSAL_ANSWER_ERROR, payload: { questionId, err } });
    }
  };
};

export const getQuestionSection = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: QUESTION_SECTION_LOADING,
      payload: {}
    });
    try {
      const data = await getQuestionSectionInfo();
      dispatch({
        type: QUESTION_SECTION_INFO,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: QUESTION_SECTION_ERROR,
        payload: err
      });
    }
  };
};

export const getAnswerTypesInfo = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: ANSWER_TYPES_LOADING,
      payload: {}
    });
    try {
      const data = await getAnswerTypes();
      dispatch({
        type: ANSWER_TYPES_INFO,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: ANSWER_TYPES_ERROR,
        payload: err
      });
    }
  };
};

export const getRolesInfo = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: ROLES_LOADING,
      payload: {}
    });
    try {
      const data = await getRoles();
      dispatch({
        type: ROLES_INFO,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: ROLES_ERROR,
        payload: err
      });
    }
  };
};

export const setProposalQuestion = (
  proposalId: string,
  questionData: Object
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_SET_QUESTION_LOADING,
      payload: {}
    });
    try {
      const data = await setProposalQuestionData(proposalId, questionData);
      dispatch({ type: PROPOSAL_SET_QUESTION, payload: data });
    } catch (err) {
      dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
    }
  };
};

export const getProposalUpdated = (id: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_INFO_LOADING,
      payload: {}
    });
    try {
      const data = await getProposalInfoUpdated(id);
      dispatch({
        type: PROPOSAL_INFO,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: PROPOSAL_INFO_ERROR,
        payload: err
      });
    }
  };
};

export const onGetProposalBoxId = (id: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: PROPOSAL_BOX_ID_LOADING, payload: {} });
    try {
      const { data } = await getProposlBoxId(id);
      const { BoxId: boxId } = data.proposal.proposalDetails;
      dispatch({ type: PROPOSAL_BOX_ID, payload: { boxId } });
    } catch (error) {
      dispatch({
        type: PROPOSAL_BOX_ID_ERROR,
        payload: { error: error.error }
      });
    }
  };
};

export const onGetValidatedProposalDetails = (
  id: string
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: ON_FETCHING_VALIDATED_PROPOSAL_DATA, payload: {} });

    try {
      const { data } = await getValidatedProposalData(id);
      dispatch({ type: VALIDATED_PROPOSAL_DATA, payload: { data } });
    } catch (error) {
      dispatch({
        type: VALIDATED_PROPOSAL_DATA_ERROR,
        payload: { error }
      });
    }
  };
};

function applyMyUserRoleFilter(questions) {
  const role = localStorage.getItem('userRole');
  let filteredQuestions = cloneDeep(questions);
  if (role) {
    filteredQuestions = fromJS(filteredQuestions)
      .filter(question => {
        const assignedRoles = question.get('roleNames', []);
        return assignedRoles.includes(role);
      })
      .toJS();
  }
  return filteredQuestions;
}

function applyUnAnsweredFilter(questions) {
  const role = localStorage.getItem('userRole');
  let filteredQuestions = cloneDeep(questions);
  if (role) {
    filteredQuestions = fromJS(filteredQuestions)
      .filter(val => {
        let Answer = val.get('answers', []);
        Answer = Answer.toJS();
        return (
          (Answer &&
            Answer.length &&
            !Boolean(String(Answer[Answer.length - 1].answer).trim().length)) ||
          !Boolean(Answer.length) ||
          (Answer &&
            Answer.length &&
            Answer[Answer.length - 1].userName === 'UnityPredictedAnswer')
        );
      })
      .toJS();
  }
  return filteredQuestions;
}

function applyAnsweredFilter(questions) {
  const role = localStorage.getItem('userRole');
  let filteredQuestions = cloneDeep(questions);
  if (role) {
    filteredQuestions = fromJS(filteredQuestions)
      .filter(question => {
        let Answer = question.get('answers', []);
        Answer = Answer.toJS();
        return (
          Answer &&
          Answer.length &&
          String(Answer[Answer.length - 1].answer).trim().length > 0 &&
          Answer[Answer.length - 1].userName !== 'UnityPredictedAnswer'
        );
      })
      .toJS();
  }
  return filteredQuestions;
}

function applyInterestedPartyFilter(questions) {
  const role = localStorage.getItem('userRole');
  let filteredQuestions = cloneDeep(questions);
  if (role) {
    filteredQuestions = fromJS(filteredQuestions)
      .filter(question => {
        const interestedParties = question.get('interestedParties', []);
        return interestedParties.includes(role);
      })
      .toJS();
  }
  return filteredQuestions;
}

function applyMilestoneFilter(questions, milestone) {
  let filteredQuestions = cloneDeep(questions);
  if (milestone) {
    filteredQuestions = fromJS(filteredQuestions)
      .filter(question => {
        const questionMilestone = question.get('milestone');
        return questionMilestone === milestone;
      })
      .toJS();
  }
  return filteredQuestions;
}

function filterGroup(
  filteredQuestions,
  allQuestions,
  logic,
  filterCallback,
  filterName = ''
) {
  if (logic === 'AND') {
    return uniqBy(filterCallback(allQuestions), 'questionId');
  } else {
    return uniqBy(
      [...filteredQuestions, ...filterCallback(allQuestions, filterName)],
      'questionId'
    );
  }
}

export function onQuestionsFilterApplied(questionsFilter) {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: ON_APPLY_QUESTIONS_FILTER,
      payload: { questionsFilter }
    });

    let filteredQuestions = cloneDeep(selectProposalQuestions(state));

    questionsFilter.entrySeq().forEach(([groupName, group]) => {
      let withinGroupFilteredQuestions = [];
      // Set the logic for current filter Group
      let logic = group.get('logic');
      let considerGroup = false;

      group.entrySeq().forEach(([filterName, filter]) => {
        // Do not process for logic key or the filter is not checked
        if (filterName === 'logic' || !filter.get('checked')) return;

        considerGroup = true;

        switch (filterName) {
          case 'myUserRole':
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyMyUserRoleFilter
            );
            break;
          case 'answered':
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyAnsweredFilter
            );
            break;
          case 'unanswered':
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyUnAnsweredFilter
            );
            break;
          case 'interestedParty':
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyInterestedPartyFilter
            );
            break;
          default:
            withinGroupFilteredQuestions = filterGroup(
              withinGroupFilteredQuestions,
              filteredQuestions,
              logic,
              applyMilestoneFilter,
              filterName
            );
            break;
        }
      });

      if (considerGroup) filteredQuestions = withinGroupFilteredQuestions;

      considerGroup = false;
    });

    dispatch({
      type: ON_QUESTIONS_FILTERED,
      payload: { filteredQuestions }
    });
  };
}

export function onApplyQuestionsFilter(
  filterName = null,
  checked = false,
  groupName
) {
  return async (dispatch, getState) => {
    const state = getState();
    let questionsFilter = getQuestionsFilters(state);
    if (filterName && groupName) {
      questionsFilter = questionsFilter.setIn(
        [groupName, filterName, 'checked'],
        checked
      );
    }
    dispatch(onQuestionsFilterApplied(questionsFilter));
  };
}

export function resetQuestionsFilterAction() {
  return async dispatch => {
    dispatch({ type: RESET_QUESTIONS_FILTER });
  };
}

export function clearQuestionsFilterAction() {
  return async (dispatch, getState) => {
    let questionsFilter = getQuestionsFilters(getState());
    questionsFilter = questionsFilter.map(group => {
      return group.map(filter => {
        if (typeof filter === 'string') return filter;

        return filter.set('checked', false);
      });
    });
    dispatch({ type: CLEAR_QUESTIONS_FILTER, payload: { questionsFilter } });
  };
}

export function expandAllSectionsAction(expand = false) {
  return async dispatch => {
    dispatch({ type: EXPAND_ALL_SECTIONS, payload: expand });
  };
}

export function setEditQuestionData(data = {}) {
  return async dispatch => {
    dispatch({ type: SET_EDIT_QUESTION_DATA, payload: data });
  };
}

export const editProposalQuestion = (
  proposalId: string,
  questionId: string,
  questionData: Object
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_SET_QUESTION_LOADING,
      payload: {}
    });
    try {
      const data = await editProposalQuestionData(
        proposalId,
        questionId,
        questionData
      );
      dispatch({ type: PROPOSAL_EDIT_QUESTION, payload: data });
    } catch (err) {
      dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
    }
  };
};

export const deleteProposalQuestion = (
  proposalId: string,
  questionId: string
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_SET_QUESTION_LOADING,
      payload: {}
    });
    try {
      const data = await deleteProposalQuestionData(proposalId, questionId);

      dispatch({ type: PROPOSAL_DELETE_QUESTION, payload: questionId });
    } catch (err) {
      dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
    }
  };
};

export const getOpportunity = (id: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: PROPOSAL_INFO_LOADING, payload: {} });

    try {
      const data = await getOpportunityInfo(id);
      // fetch notes for current bid
      for (let proposal of data) {
        if (proposal.isCurrent) {
          dispatch(fetchNotes(proposal.proposal.proposalId));
          break;
        }
      }

      dispatch({ type: OPPORTUNITY_INFO, payload: data });
      dispatch({
        type: UPDATE_BOX_BIDS,
        payload: getProposalIdlist(data)
      });
    } catch (err) {
      dispatch({ type: PROPOSAL_INFO_ERROR, payload: err });
    }
  };
};

export const changeBid = bid => {
  return dispatch => {
    dispatch({
      type: CHANGE_BID,
      payload: bid
    });
    dispatch(fetchNotes(bid.bidId));
  };
};
