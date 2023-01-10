import React, { useEffect, useState } from 'react';
import * as Y from 'yjs';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { websocketNotesApi } from '../../../api/notepad';
import { WebsocketProvider } from '../../../context/y-websocket';
import { NOTES_SOCKET_URL } from '../../../constants/api';
import WysiwygNotepad from '.';
import { getSelectedBid } from '../../../redux/selectors';

const NotepadWrapper = ({ trackEvent }) => {
  const selectedBid = useSelector(getSelectedBid);

  const [ydoc, setYdoc] = useState(new Y.Doc());
  const [wsInstance, setWsInstance] = useState(undefined);
  const [proposalIdState, setProposalIdState] = useState(
    selectedBid.get('id', '')
  );
  const createNewNotesSocketConnection = proposalId => {
    const storedValue = `doc-${proposalId}`;
    if (proposalId) {
      const wsProvider = new WebsocketProvider(
        NOTES_SOCKET_URL,
        `?=${storedValue}&`,
        ydoc
      );
      setWsInstance(wsProvider);
    }
  };

  const triggerWebsocketNotesApi = async proposalId => {
    // if (prevProposalId !== thisProposalId) {
    await websocketNotesApi(proposalId);
    // initial load case
    if (proposalId) {
      if (!wsInstance) {
        createNewNotesSocketConnection(proposalId);
      }
    } else {
      if (wsInstance) wsInstance.destroy();
      setYdoc(new Y.Doc());
      createNewNotesSocketConnection(proposalId);
    }
    // }
  };
  useEffect(() => {
    triggerWebsocketNotesApi(proposalIdState);
    return () => {
      if (wsInstance) wsInstance.destroy();
    };
  }, [wsInstance]);
  useEffect(() => {
    setProposalIdState(selectedBid.get('id'));
  }, [selectedBid]);

  return (
    <>
      {wsInstance ? (
        <WysiwygNotepad
          selectedBid={selectedBid}
          trackEvent={trackEvent}
          wsInstance={wsInstance}
          ydoc={ydoc}
          proposalId={proposalIdState}
        />
      ) : (
        <Loader
          type="TailSpin"
          color="#297DFD"
          width={30}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        />
      )}
    </>
  );
};

export default NotepadWrapper;
