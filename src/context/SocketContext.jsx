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
  updatePriceModelerEstimateAction
} from '../redux/actions/proposal-actions';
import { updateProposalNotesFromWebSocket } from '../redux/actions/notepad-actions';
import { setNotification } from '../redux/actions/notification-actions';
import { getUserName, getUserEmail, getUserId } from '../SessionHandler';
import { REFRESH_WEBSOCKET_CONNECTION } from '../constants/app';
import { UBUILD, DASHBOARD } from '../routes';

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
    if (
      socket?.current?.readyState !== WebSocket.OPEN &&
      socket?.current?.readyState !== WebSocket.CONNECTING &&
      socket?.current?.readyState !== 1
    ) {
      return false;
    }
    return true;
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  };

  /**
   * Function called after bid creation completed
   */
  const refreshOpportunity = (id, bidNo) => {
    props.getOpportunityInfo(id, bidNo, true);
  };

  /**
   * Initiates connection only if socket is not connected
   */
  const initiateConnection = () => {
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
        setProposalAnswerDatafromSocket,
        setNotApplicableQuestionFromSocket,
        setPriceModelerRecalculationStatus,
        updatePriceModelerEstimate
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
            if (updateProposalDetail) updateProposalDetail(data.data);
            break;
          case 'SWITCH_TEMPLATE_IN_PROGRESS':
            if (setSwitchInProgress) setSwitchInProgress(true);
            if (updateSwitchTempStatus) updateSwitchTempStatus('progress');
            break;
          case 'SWITCH_TEMPLATE_COMPLETED':
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
          case 'QUESTIONS':
            // Get list of questions already locked by other users
            getQuestionLockDetails(data);
            break;
          case 'COST_ESTIMATE_CALCULATING':
            setPriceModelerRecalculationStatus(true);
            break;
          case 'COST_ESTIMATE_UPDATE':
            updatePriceModelerEstimate(data.data);
            break;
          default:
            break;
        }
      });

      // On Close
      newSocket.onclose = event => {
        console.log('Socket onClose');
        clearInterval(refreshInterval);
      };
      // On Error
      newSocket.onerror = event => {
        console.log('Socket onerror');
      };
      socket.current = newSocket;
    }
  };

  /**
   * Waits for Socket connection to establish before executing the callback
   * Retries connection every two second
   */
  const waitForSocketConnection = callback => {
    setTimeout(() => {
      if (isSocketConnected()) {
        if (callback instanceof Function) {
          callback();
        }
      } else {
        waitForSocketConnection(callback);
      }
    }, 2000);
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
    clearTimeout(timer);
    currentQuestionToLock = questionId;
    timer = setTimeout(() => {
      clearTimeout(timer);
      questionLock(questionId, null);
      currentQuestionToLock = undefined;
    }, 1000);
  };

  const updateSocketOppId = (oppId, proposalId) => {
    currentOppNo.set(oppId);
    waitForSocketConnection(() =>
      sendUpdateConnection(oppId, proposalId, null)
    );
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

  const naQuestionUpdateWrapper = (questionId, status) => {
    waitForSocketConnectionMinInterval(() =>
      naQuestionUpdate(questionId, status, null)
    );
  };

  const questionLockDetailsWrapper = () => {
    waitForSocketConnectionMinInterval(() => questionLockDetails(null));
  };

  const refreshSocketConnection = () => {
    waitForSocketConnection(() => refreshConnection(null));
  };

  const disconnectSocket = () => {
    if (isSocketConnected()) {
      socket?.current?.send(
        JSON.stringify({
          action: '$disconnect',
          body: {}
        })
      );
      clearInterval(refreshInterval);
    }
  };

  /**
   * Tries to initiate the websocket conection every 3 sec
   */
  const keepSocketAlive = () => {
    setInterval(() => {
      initiateConnection();
    }, 3000);
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
        naQuestionUpdateWrapper
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
  setProposalAnswerDatafromSocket: setProposalAnswerDatafromSocket,
  setNotApplicableQuestionFromSocket: setNotApplicableQuestionFromSocket,
  setPriceModelerRecalculationStatus: setPriceModelerRecalculationStatusAction,
  updatePriceModelerEstimate: updatePriceModelerEstimateAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketContextProvider);
