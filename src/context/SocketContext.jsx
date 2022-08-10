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
  updateSwitchInProgress
} from '../redux/actions/proposal-actions';
import { updateProposalNotesFromWebSocket } from '../redux/actions/notepad-actions';
import { setNotification } from '../redux/actions/notification-actions';
import { getUserName, getUserEmail, getUserId } from '../SessionHandler';

const userName = getUserName();
const userEmail = getUserEmail();
const userId = getUserId();
const currentOppNo = {
  get: localStorage.getItem('oppNo') || null,
  set: value => localStorage.setItem('oppNo', value)
};

// Exporting Context
export const SocketContext = createContext();

const SocketContextProvider = props => {
  const socket = useRef(null);

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
  const sendUpdateConnection = (oppId, ws) => {
    try {
      if (!ws) {
        ws = socket.current;
      }
      ws.send(
        JSON.stringify({
          action: 'UPDATE_CONNECTION',
          body: { oppId }
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Function called after bid creation completed
   */
  const refreshOpportunity = () => {
    props.getOpportunityInfo(currentOppNo.get, true);
  };

  /**
   * Initiates connection only if socket is not connected
   */
  const initiateConnection = () => {
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
        }
        if (currentOppNo.get) {
          sendUpdateConnection(currentOppNo.get, newSocket);
        }
      };

      const {
        addNewBid,
        updateAnswerAction,
        updateProposalDetail,
        updateProposalNotes,
        updateSwitchTempStatus,
        setSwitchInProgress,
        updateNotification
      } = props;

      // On Message Recieve
      newSocket.addEventListener('message', async response => {
        const data = JSON.parse(response.data);

        switch (data.event) {
          case 'IN_PROGRESS':
            addNewBid(data.data);
            break;
          case 'COMPLETED':
            refreshOpportunity();
            break;
          case 'PROPOSAL_NOTE_UPDATE':
            if (updateProposalNotes) updateProposalNotes(data.data);
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
          default:
            break;
        }
      });

      // On Close
      newSocket.onclose = event => {
        console.log('Socket onClose');
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

  const updateSocketOppId = oppId => {
    currentOppNo.set(oppId);
    waitForSocketConnection(() => sendUpdateConnection(oppId, null));
  };

  const disconnectSocket = () => {
    if (isSocketConnected()) {
      socket?.current?.send(
        JSON.stringify({
          action: '$disconnect',
          body: {}
        })
      );
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
        isSocketConnected
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
  updateNotification: setNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketContextProvider);
