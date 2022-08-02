import React, { createContext, useState } from 'react';
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

// Exporting Context
export const SocketContext = createContext();

const SocketContextProvider = props => {
  const [socket, setSocket] = useState(null);
  const [OppId, setOppId] = useState(null);

  const initiateConnection = () => {
    console.log('initiateSocketConnection');
    if (!socket) {
      console.log('createSocket');
      const newSocket = new WebSocket(SOCKET_URL);

      newSocket.onopen = event => {
        console.log('Socket Connected', event);
      };
      console.log('Adding listeners to socket');
      const {
        addNewBid,
        getOpportunityInfo,
        updateAnswerAction,
        updateProposalDetail,
        updateProposalNotes,
        updateSwitchTempStatus,
        setSwitchInProgress
      } = props;

      // On Message Recieve
      newSocket.addEventListener('message', async response => {
        const data = JSON.parse(response.data);
        console.log('data.event:', data.event);
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
      setSocket(newSocket);
    }
  };

  const updateSocketOppId = oppId => {
    setOppId(oppId);
    if (socket) {
      socket.send(
        JSON.stringify({
          action: 'ADD_OPPORTUNITY',
          body: { oppId }
        })
      );
    }
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.send(
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
        setSocket,
        initiateConnection,
        updateSocketOppId,
        disconnectSocket
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
  setSwitchInProgress: updateSwitchInProgress
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketContextProvider);
