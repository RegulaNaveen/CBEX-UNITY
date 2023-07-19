/* eslint-disable react/prop-types */
import React, { createContext, useRef, useEffect } from 'react';
import { Map } from 'immutable'; // NOSONAR
import { connect } from 'react-redux';
import { SOCKET_URL } from '../constants/api';
import {
  UpdateNewBid,
  getOpportunity,
  updateAnswerFromWebSocket,
  updateProposalDetailFromWebSocket,
  updateSwitchTempStatusFromWebSocket,
  updateSwitchInProgress,
  updateQuestionLockByUser,
  updateQuestionUnlockByUser,
  getQuestionLockDetailsAll,
  setProposalAnswerDatafromSocket,
  setNotApplicableQuestionFromSocket,
  setPriceModelerRecalculationStatusAction,
  updatePriceModelerEstimateAction,
  editProposalQuestionfromSocket,
  deleteProposalQuestionFromSocket,
  setProposalQuestionFromSocket,
  widgetUpdate,
  updateNextMilestone,
  updateDashboardProposal,
  updateCustomNameAction,
  updateOpportunityDashboardProposal
} from '../redux/actions/proposal-actions';
import {
  updateDashboardBid,
  syncDashboardOpportunity
} from '../redux/actions/proposals-actions';
import { updateProposalNotesFromWebSocket } from '../redux/actions/notepad-actions';
import { setNotification } from '../redux/actions/notification-actions';
import { getUserName, getUserEmail, getUserId } from '../SessionHandler';
import { REFRESH_WEBSOCKET_CONNECTION } from '../constants/app';
import { UBUILD, DASHBOARD } from '../routes';
import {
  onApprovalSectionDuplicatingAction,
  onApprovalSectionDuplicatedAction,
  onApprovalSectionDeletedAction,
  onApprovalSectionDeletingAction
} from '../redux/actions/approval-actions';
import { updateFavourite } from '../redux/actions/sso-auth-actions';

const currentOppNo = {
  get: localStorage.getItem('oppNo') || null,
  set: value => localStorage.setItem('oppNo', value)
};
// Exporting Context
export const SocketContext = createContext();

const SocketContextProvider = props => {
  const socket = useRef(null);
  let refreshInterval = null;
  /**
   * Checks for socket connection
   */
  const isSocketConnected = () => {
    try {
      if (
        socket?.current?.readyState !== WebSocket.OPEN &&
        socket?.current?.readyState !== WebSocket.CONNECTING &&
        socket?.current?.readyState !== 1
      ) {
        return false;
      }
      return true;
    } catch (error) {
      console.log('isSocketConnected error :>> ', error);
    }
  };

  /**
   * Update socket's oppId when user switches Opportunity in the tool
   */
  const sendUpdateConnection = (oppId, proposalId, ws) => {
    try {
      if (!ws) {
        ws = socket.current;
      }
      ws.send(
        JSON.stringify({
          action: 'UPDATE_CONNECTION',
          body: {
            oppId,
            proposalId: typeof proposalId === 'object' ? '' : proposalId
          }
        })
      );
    } catch (error) {
      console.log('sendUpdateConnection err', error);
    }
  };

  /**
   * Refresh socket's connection
   */
  const refreshConnection = ws => {
    try {
      if (!ws) {
        ws = socket.current;
      }
      ws.send(
        JSON.stringify({
          action: 'REFRESH',
          body: 'REFRESH'
        })
      );
    } catch (error) {
      console.log('refreshConnection', error);
    }
  };

  /**
   *  Question Lock
   */
  const questionLock = (questionId, ws) => {
    try {
      if (!ws) {
        ws = socket.current;
      }
      ws.send(
        JSON.stringify({
          action: 'QUESTION',
          body: { event: 'QUESTION_LOCK', data: { questionId } }
        })
      );
    } catch (error) {
      console.log('questionLock', error);
    }
  };

  /**
   *
   * @param {*} questionId
   * @param {*} status
   * @param {*} ws
   */
  const naQuestionUpdate = (questionId, naStatus, ws) => {
    try {
      if (!ws) {
        ws = socket.current;
      }
      ws.send(
        JSON.stringify({
          action: 'QUESTION',
          body: {
            event: 'QUESTION_NA_UPDATE',
            data: {
              naStatus,
              questionId
            }
          }
        })
      );
    } catch (error) {
      console.log('naQuestionUpdate', error);
    }
  };
  /**
   *  Question answerUpdate
   */
  const questionAnswerUpdate = (questionId, answer, ws) => {
    try {
      if (!ws) {
        ws = socket.current;
      }
      ws.send(
        JSON.stringify({
          action: 'QUESTION',
          body: {
            event: 'QUESTION_ANSWER_UPDATE',
            data: {
              latestAnswer: answer,
              questionId
            }
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateFavourite = (
    oppNumber,
    favourite,
    favouriteUpdatedDate,
    proposalDetails,
    ws
  ) => {
    try {
      if (!ws) {
        ws = socket.current;
      }
      ws.send(
        JSON.stringify({
          action: 'FAVOURITE',
          body: {
            event: 'FAVOURITE',
            data: {
              oppNumber,
              favourite,
              favouriteUpdatedDate,
              ...proposalDetails
            }
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateDashboardFromSF = (proposalObj, ws) => {
    try {
      if (!ws) {
        ws = socket.current;
      }
      let data = {
        proposalId: proposalObj.proposalId,
        proposalDetails: proposalObj.proposalDetails
      };
      if (proposalObj?.newBid) {
        data = {
          proposalId: proposalObj.proposalId,
          proposalDetails: proposalObj.proposalDetails,
          newBid: true
        };
      }
      if (proposalObj?.bidStatusKey) {
        data = {
          bidStatusKey: proposalObj.bidStatusKey,
          bidStopStatus: proposalObj.bidStopStatus,
          proposalId: proposalObj.proposalId,
          proposalDetails: proposalObj.proposalDetails
        };
      }
      ws.send(
        JSON.stringify({
          action: 'SF_PROPOSAL_DETAIL_UPDATE',
          body: {
            event: 'SF_PROPOSAL_DETAIL_UPDATE',
            fromSF: true,
            data: data
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateCustomName = (oppNumber, customName, ws) => {
    try {
      if (!ws) {
        ws = socket.current;
      }
      ws.send(
        JSON.stringify({
          action: 'CUSTOM_NAME_UPDATE',
          body: {
            event: 'CUSTOM_NAME_UPDATE',
            data: {
              oppNumber,
              customName
            }
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateDashboardProposalCard = (oppNumber, sfField, answer, ws) => {
    try {
      if (!ws) {
        ws = socket.current;
      }
      ws.send(
        JSON.stringify({
          action: 'SF_PROPOSAL_DETAIL_UPDATE',
          body: {
            event: 'SF_PROPOSAL_DETAIL_UPDATE',
            data: {
              oppNumber,
              sfField,
              answer
            }
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addQuestion = (questionData, ws) => {
    try {
      if (!ws) {
        ws = socket.current;
      }
      ws.send(
        JSON.stringify({
          action: 'QUESTION',
          body: {
            event: 'ADD_QUESTION',
            data: {
              questionData
            }
          }
        })
      );
    } catch (error) {
      console.log('addQuestion', error);
    }
  };

  const questionTextUpdate = (questionData, ws) => {
    try {
      if (!ws) {
        ws = socket.current;
      }
      ws.send(
        JSON.stringify({
          action: 'QUESTION',
          body: {
            event: 'QUESTION_TEXT_UPDATE',
            data: {
              questionData
            }
          }
        })
      );
    } catch (error) {
      console.log('questionAnswerUpdate', error);
    }
  };

  const questionDelete = (questionId, ws) => {
    try {
      if (!ws) {
        ws = socket.current;
      }
      ws.send(
        JSON.stringify({
          action: 'QUESTION',
          body: {
            event: 'QUESTION_DELETE',
            data: {
              questionId
            }
          }
        })
      );
    } catch (error) {
      console.log('questionDelete', error);
    }
  };

  /**
   *  Question unLock
   */
  const questionUnlock = (questionId, answer, ws) => {
    try {
      if (!ws) {
        ws = socket.current;
      }
      ws.send(
        JSON.stringify({
          action: 'QUESTION',
          body: {
            event: 'QUESTION_UNLOCK',
            data: {
              questionId
            },
            clientQuestionId: questionId
          }
        })
      );
    } catch (error) {
      console.log('questionUnlock', error);
    }
  };
  /**
   *  Get ALL Question Lock Details
   */
  const questionLockDetails = ws => {
    try {
      if (!ws) {
        ws = socket.current;
      }
      ws.send(
        JSON.stringify({
          action: 'QUESTION',
          body: { event: 'QUESTIONS' }
        })
      );
    } catch (error) {
      console.log('questionLockDetails', error);
    }
  };

  /**
   * Function called after bid creation completed
   */
  const refreshOpportunity = (id, bidNo) => {
    try {
      props.getOpportunityInfo(id, bidNo, true);
    } catch (error) {
      console.log('error refreshOpportunity :>> ', error);
    }
  };

  /**
   * Initiates connection only if socket is not connected
   */
  const initiateConnection = () => {
    try {
      const userName = getUserName();
      const userEmail = getUserEmail();
      const userId = getUserId();
      // return if userInfo is null
      if (!userId && !userEmail && !userName) {
        console.log('Socket not initiated: User not logged in');
        return;
      }

      if (!isSocketConnected()) {
        console.log('Initiating new socket connection');
        const newSocket = new WebSocket(SOCKET_URL);

        newSocket.onopen = event => {
          if (newSocket) {
            newSocket.send(
              JSON.stringify({
                action: 'CONNECT',
                body: { data: { userId, userEmail, userName } }
              })
            );

            const location = window.location?.pathname;

            if (![UBUILD, DASHBOARD].includes(location)) {
              setTimeout(() => {
                sendUpdateConnection(
                  localStorage.getItem('oppNo'),
                  localStorage.getItem('proposalId'),
                  newSocket
                );
              }, 1000);
            }

            refreshInterval = setInterval(() => {
              refreshSocketConnection();
            }, [REFRESH_WEBSOCKET_CONNECTION]);
          }
        };

        const {
          addNewBid,
          updateAnswerAction,
          updateProposalDetail,
          updateProposalNotes,
          updateSwitchTempStatus,
          setSwitchInProgress,
          updateNotification,
          updateQuestionLock,
          updateQuestionUnlock,
          getQuestionLockDetails,
          updateDashboardData,
          setProposalAnswerDatafromSocket,
          setNotApplicableQuestionFromSocket,
          setPriceModelerRecalculationStatus,
          updatePriceModelerEstimate,
          editProposalQuestionfromSocket,
          deleteProposalQuestionFromSocket,
          setProposalQuestionFromSocket,
          onApprovalSectionDuplicating,
          onApprovalSectionDuplicated,
          onApprovalSectionDeleting,
          onApprovalSectionDeleted,
          widgetUpdate,
          updateFavouriteAction,
          updateNextMilestoneAction,
          updateCustomNameAction,
          syncdashboard,
          syncBidDashboard,
          updateDetailPage
        } = props;

        // On Message Recieve
        newSocket.addEventListener('message', async response => {
          const data = JSON.parse(response.data);

          switch (data.event) {
            case 'IN_PROGRESS':
              addNewBid(data.data);
              break;
            case 'COMPLETED':
              refreshOpportunity(
                data.oppId,
                data.data.proposal.proposalDetails.bidNo
              );
              break;
            case 'ANSWER_UPDATE':
              if (updateAnswerAction) updateAnswerAction(data.data);
              break;
            case 'PROPOSAL_DETAIL_UPDATE':
              if (updateProposalDetail) {
                updateProposalDetail(data);
                updateDashboardFromSF(data.data);
              }
              break;
            case 'SWITCH_TEMPLATE_IN_PROGRESS':
              if (setSwitchInProgress) setSwitchInProgress(true);
              if (updateSwitchTempStatus) updateSwitchTempStatus('progress');
              break;
            case 'SWITCH_TEMPLATE_COMPLETED':
              console.log('SWITCH_TEMPLATE_COMPLETED');
              if (updateSwitchTempStatus) updateSwitchTempStatus('success');
              break;
            case 'SWITCH_TEMPLATE_ERROR':
              if (setSwitchInProgress) setSwitchInProgress(false);
              if (updateSwitchTempStatus) updateSwitchTempStatus('error');
              break;
            case 'IN_APP_NOTIFICATION_RECEIVED':
              updateNotification();
              break;
            case 'QUESTION_LOCK':
              // Question locked by a user
              updateQuestionLock(data);
              break;
            case 'QUESTION_UNLOCK':
              // Question unlocked by a user

              updateQuestionUnlock(data);

              break;
            case 'QUESTION_ANSWER_UPDATE':
              // update question answer how it is done in action
              if (data.data.latestAnswer) {
                const questionId = Array.isArray(data.data.latestAnswer)
                  ? data.data.latestAnswer[data.data.latestAnswer.length - 1]
                      .questionId
                  : data.data.latestAnswer.questionId;
                setProposalAnswerDatafromSocket(
                  questionId,
                  data.data.latestAnswer
                );
              }
              break;
            case 'QUESTION_NA_UPDATE':
              // update question answer how it is done in action
              if (data.data) {
                setNotApplicableQuestionFromSocket(
                  data.data.questionId,
                  data.data.naStatus
                );
              }
              break;
            case 'QUESTION_TEXT_UPDATE':
              if (data.data.questionData) {
                editProposalQuestionfromSocket(data.data.questionData);
              }
              break;

            case 'QUESTION_DELETE':
              if (data.data.questionId) {
                deleteProposalQuestionFromSocket(data.data.questionId);
              }
              break;

            case 'ADD_QUESTION':
              if (data.data.questionData) {
                setProposalQuestionFromSocket(data.data.questionData);
              }
              break;

            case 'QUESTIONS':
              // Get list of questions already locked by other users
              getQuestionLockDetails(data);
              break;

            case 'APPROVALS_DUPLICATING':
              onApprovalSectionDuplicating(data.data);
              break;

            case 'APPROVALS_DUPLICATED':
              onApprovalSectionDuplicated(data.data);
              break;

            case 'APPROVALS_DELETING':
              onApprovalSectionDeleting(data.data);
              break;

            case 'APPROVALS_DELETED':
              onApprovalSectionDeleted(data.data);
              break;

            case 'COST_ESTIMATE_CALCULATING':
              setPriceModelerRecalculationStatus(true);
              break;
            case 'COST_ESTIMATE_UPDATE':
              updatePriceModelerEstimate(data.data);
              break;
            case 'WIDGET_UPDATE':
              const { proposalId, typeOfWidget } = data.data;
              widgetUpdate(proposalId, typeOfWidget);

            case 'FAVOURITE':
              const { oppNumber, favourite, favouriteUpdatedDate } = data.data;
              updateFavouriteAction(
                oppNumber,
                favourite,
                favouriteUpdatedDate,
                data.data
              );
              break;
            case 'BID_UPDATE_DASHBOARD':
              syncBidDashboard(data);
              break;
            case 'SF_PROPOSAL_DETAIL_UPDATE':
              updateDashboardData(data);
              break;
            case 'OPPORTUNITY_UPDATE_DASHBOARD':
              syncdashboard(data);
              updateDetailPage(data);
              break;
            case 'NEXT_MILESTONE_UPDATE':
              console.log('socket data', data);
              const { nextMilestone } = data.data;
              updateNextMilestoneAction(data.oppId, nextMilestone);
              break;

            case 'CUSTOM_NAME_UPDATE':
              const { customName } = data.data;
              updateCustomNameAction(data.data.oppNumber, customName);
              break;
            default:
              break;
          }
        });

        // On Close
        newSocket.onclose = event => {
          console.log('Socket onClose', event);
          clearInterval(refreshInterval);
        };
        // On Error
        newSocket.onerror = event => {
          console.log('Socket onerror', event);
        };
        socket.current = newSocket;
      }
    } catch (err) {
      console.log('initiateConnection error', err);
    }
  };

  /**
   * Waits for Socket connection to establish before executing the callback
   * Retries connection every two second
   */
  const waitForSocketConnection = callback => {
    try {
      setTimeout(() => {
        if (isSocketConnected()) {
          if (callback instanceof Function) {
            callback();
          }
        } else {
          waitForSocketConnection(callback);
        }
      }, 2000);
    } catch (error) {
      console.log('waitForSocketConnection error :>> ', error);
    }
  };

  const waitForSocketConnectionMinInterval = callback => {
    setTimeout(() => {
      if (isSocketConnected()) {
        if (callback instanceof Function) {
          callback();
        }
      } else {
        waitForSocketConnectionMinInterval(callback);
      }
    }, 100);
  };
  let timer;
  let currentQuestionToLock;
  /**
   *
   * @param {*} clear to remove the timer
   * function to set timer for auto unlock and auto save
   */
  const resetLockTimer = questionId => {
    try {
      clearTimeout(timer);
      currentQuestionToLock = questionId;
      timer = setTimeout(() => {
        clearTimeout(timer);
        questionLock(questionId, null);
        currentQuestionToLock = undefined;
      }, 1000);
    } catch (error) {
      console.log('resetLockTimer error :>> ', error);
    }
  };

  const updateSocketOppId = (oppId, proposalId) => {
    try {
      currentOppNo.set(oppId);
      waitForSocketConnection(() =>
        sendUpdateConnection(oppId, proposalId, null)
      );
    } catch (error) {
      console.log('updateSocketOppId error :>> ', error);
    }
  };

  const approvalDuplicating = data => {
    try {
      const ws = socket.current;
      ws.send(
        JSON.stringify({
          action: 'APPROVALS',
          body: {
            event: 'APPROVALS_DUPLICATING',
            data
          }
        })
      );
    } catch (error) {
      console.error('Error in Approval duplicating', error);
    }
  };

  const approvalDuplicated = data => {
    try {
      const ws = socket.current;
      ws.send(
        JSON.stringify({
          action: 'APPROVALS',
          body: {
            event: 'APPROVALS_DUPLICATED',
            data
          }
        })
      );
    } catch (error) {
      console.error('Error in Approval duplicated', error);
    }
  };

  const approvalDeleting = data => {
    try {
      const ws = socket.current;
      ws.send(
        JSON.stringify({
          action: 'APPROVALS',
          body: {
            event: 'APPROVALS_DELETING',
            data
          }
        })
      );
    } catch (error) {
      console.error('Error in Approval deletion', error);
    }
  };

  const approvalDeleted = data => {
    try {
      const ws = socket.current;
      ws.send(
        JSON.stringify({
          action: 'APPROVALS',
          body: {
            event: 'APPROVALS_DELETED',
            data
          }
        })
      );
    } catch (error) {
      console.error('Error in Approval deleted', error);
    }
  };

  const questionLockWrapper = questionId => {
    waitForSocketConnectionMinInterval(() => resetLockTimer(questionId));
  };
  const questionUnlockWrapper = (questionId, answer) => {
    waitForSocketConnectionMinInterval(() => {
      if (currentQuestionToLock === questionId) clearTimeout(timer);
      questionUnlock(questionId, answer, null);
    });
  };

  const questionAnswerUpdateWrapper = (questionId, answer) => {
    waitForSocketConnectionMinInterval(() =>
      questionAnswerUpdate(questionId, answer, null)
    );
  };

  const updateFavouriteWrapper = (
    oppNo,
    favourite,
    favouriteUpdatedDate,
    proposalDetails
  ) => {
    waitForSocketConnectionMinInterval(() =>
      updateFavourite(
        oppNo,
        favourite,
        favouriteUpdatedDate,
        proposalDetails,
        null
      )
    );
  };

  const updateCustomNameWrapper = (oppNo, customName) => {
    waitForSocketConnectionMinInterval(() =>
      updateCustomName(oppNo, customName, null)
    );
  };

  const updateDashboardSFValueWrapper = (oppNo, sfField, answer) => {
    waitForSocketConnectionMinInterval(() =>
      updateDashboardProposalCard(oppNo, sfField, answer, null)
    );
  };

  const addQuestionWrapper = questionData => {
    waitForSocketConnectionMinInterval(() => addQuestion(questionData, null));
  };

  const questionTextUpdateWrapper = questionData => {
    waitForSocketConnectionMinInterval(() =>
      questionTextUpdate(questionData, null)
    );
  };

  const questionDeleteWrapper = questionId => {
    waitForSocketConnectionMinInterval(() => questionDelete(questionId, null));
  };

  const naQuestionUpdateWrapper = (questionId, status) => {
    waitForSocketConnectionMinInterval(() =>
      naQuestionUpdate(questionId, status, null)
    );
  };

  const questionLockDetailsWrapper = () => {
    waitForSocketConnectionMinInterval(() => questionLockDetails(null));
  };

  // Approval's Questions - duplicating - socket message wrapper
  // info - sectionId, duplicating(bool)
  const approvalSectionDuplicatingWrapper = data => {
    waitForSocketConnectionMinInterval(() => approvalDuplicating(data));
  };

  // Approval's Questions - duplicate update - socket message wrapper
  // info - sectionId
  const approvalSectionDuplicatedWrapper = data => {
    waitForSocketConnectionMinInterval(() => approvalDuplicated(data));
  };

  // Approval's Questions - deleting - socket message wrapper
  // info - sectionId, deleting(bool)
  const approvalSectionDeletingWrapper = data => {
    waitForSocketConnectionMinInterval(() => approvalDeleting(data));
  };

  // Approval's Questions - delete update - socket message wrapper
  // info - sectionId
  const approvalSectionDeletedWrapper = data => {
    waitForSocketConnectionMinInterval(() => approvalDeleted(data));
  };

  const refreshSocketConnection = () => {
    waitForSocketConnection(() => refreshConnection(null));
  };

  const disconnectSocket = () => {
    try {
      if (isSocketConnected()) {
        socket?.current?.send(
          JSON.stringify({
            action: '$disconnect',
            body: {}
          })
        );
        clearInterval(refreshInterval);
      }
    } catch (error) {
      console.log('disconnectSocket error :>> ', error);
    }
  };

  /**
   * Tries to initiate the websocket conection every 3 sec
   */
  const keepSocketAlive = () => {
    try {
      setInterval(() => {
        initiateConnection();
      }, 3000);
    } catch (error) {
      console.log('keepSocketAlive error :>> ', error);
    }
  };

  useEffect(() => {
    keepSocketAlive();
  });

  return (
    <SocketContext.Provider
      value={{
        socket,
        initiateConnection,
        updateSocketOppId,
        disconnectSocket,
        isSocketConnected,
        questionLockWrapper,
        questionUnlockWrapper,
        questionLockDetailsWrapper,
        questionAnswerUpdateWrapper,
        naQuestionUpdateWrapper,
        questionTextUpdateWrapper,
        questionDeleteWrapper,
        addQuestionWrapper,
        approvalSectionDuplicatingWrapper,
        approvalSectionDuplicatedWrapper,
        approvalSectionDeletingWrapper,
        approvalSectionDeletedWrapper,
        updateFavouriteWrapper,
        updateCustomNameWrapper,
        updateDashboardSFValueWrapper
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};

const mapStateToProps = (state: Map) => ({});

const mapDispatchToProps = {
  addNewBid: UpdateNewBid,
  getOpportunityInfo: getOpportunity,
  updateAnswerAction: updateAnswerFromWebSocket,
  updateProposalDetail: updateProposalDetailFromWebSocket,
  updateProposalNotes: updateProposalNotesFromWebSocket,
  updateSwitchTempStatus: updateSwitchTempStatusFromWebSocket,
  setSwitchInProgress: updateSwitchInProgress,
  updateNotification: setNotification,
  updateQuestionLock: updateQuestionLockByUser,
  updateQuestionUnlock: updateQuestionUnlockByUser,
  getQuestionLockDetails: getQuestionLockDetailsAll,
  updateDashboardData: updateDashboardProposal,
  setProposalAnswerDatafromSocket: setProposalAnswerDatafromSocket,
  setNotApplicableQuestionFromSocket: setNotApplicableQuestionFromSocket,
  setPriceModelerRecalculationStatus: setPriceModelerRecalculationStatusAction,
  updatePriceModelerEstimate: updatePriceModelerEstimateAction,
  editProposalQuestionfromSocket: editProposalQuestionfromSocket,
  deleteProposalQuestionFromSocket: deleteProposalQuestionFromSocket,
  setProposalQuestionFromSocket: setProposalQuestionFromSocket,
  onApprovalSectionDuplicating: onApprovalSectionDuplicatingAction,
  onApprovalSectionDuplicated: onApprovalSectionDuplicatedAction,
  onApprovalSectionDeleting: onApprovalSectionDeletingAction,
  onApprovalSectionDeleted: onApprovalSectionDeletedAction,
  widgetUpdate,
  updateFavouriteAction: updateFavourite,
  updateNextMilestoneAction: updateNextMilestone,
  updateCustomNameAction,
  syncBidDashboard: updateDashboardBid,
  syncdashboard: syncDashboardOpportunity,
  updateDetailPage: updateOpportunityDashboardProposal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketContextProvider);
