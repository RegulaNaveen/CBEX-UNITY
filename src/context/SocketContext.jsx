import React, { createContext, useState, useRef } from 'react';
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

// Exporting Context
export const SocketContext = createContext();

const SocketContextProvider = props => {
  const socket = useRef(null);
  const [OppId, setOppId] = useState(null);

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
   * Initiates connection only if socket is not connected
   */
  const initiateConnection = () => {
    if (!isSocketConnected()) {
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
      };

      const {
        addNewBid,
        getOpportunityInfo,
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
            getOpportunityInfo(OppId, true);
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
        if (event.reason === 'Going away') {
          initiateConnection();
        }
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

  const sendUpdateConnection = oppId => {
    socket?.current?.send(
      JSON.stringify({
        action: 'UPDATE_CONNECTION',
        body: { oppId }
      })
    );
  };

  const updateSocketOppId = oppId => {
    setOppId(oppId);
    waitForSocketConnection(() => sendUpdateConnection(oppId));
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
