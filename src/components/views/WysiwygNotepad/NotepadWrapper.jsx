import React, { useEffect, useState } from 'react';
import * as Y from 'yjs';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { IndexeddbPersistence } from 'y-indexeddb';
import { websocketNotesApi } from '../../../api/notepad';
import { WebsocketProvider } from '../../../context/y-websocket';
import { NOTES_SOCKET_URL } from '../../../constants/api';
import WysiwygNotepad from '.';
import { getSelectedBid } from '../../../redux/selectors';

const NotepadWrapper = ({ trackEvent }) => {
  const selectedBid = useSelector(getSelectedBid);

  const [ydoc, setYdoc] = useState(new Y.Doc());
  const [wsInstance, setWsInstance] = useState(undefined);
  const [proposalIdState, setProposalIdState] = useState(undefined);

  const createNewNotesSocketConnection = proposalId => {
    const storedValue = `doc-${proposalId}`;
    if (proposalId) {
      const provider = new IndexeddbPersistence(storedValue, ydoc);
      const wsProvider = new WebsocketProvider(
        NOTES_SOCKET_URL,
        `?=${storedValue}&`,
        ydoc
      );
      setWsInstance(wsProvider);
      provider.on('synced', () => {
        console.log('content from the database is loaded');
      });
    }
  };

  const triggerWebsocketNotesApi = async proposalId => {
    websocketNotesApi(proposalId);
    if (!wsInstance) {
      createNewNotesSocketConnection(proposalId);
    } else {
      await wsInstance.destroy();
      await setWsInstance(undefined);
      await setYdoc(new Y.Doc());
      createNewNotesSocketConnection(proposalId);
    }
    setProposalIdState(proposalId);
  };
  useEffect(() => {
    const newProposalID = selectedBid.get('id');
    if (proposalIdState !== newProposalID) {
      triggerWebsocketNotesApi(newProposalID);
    }
  }, [selectedBid]);

  useEffect(() => {
    return () => {
      if (wsInstance) {
        wsInstance.destroy();
        setWsInstance(undefined);
        setYdoc(new Y.Doc());
        setProposalIdState(undefined);
      }
    };
  }, [wsInstance]);

  return (
    <>
      {wsInstance ? (
        <WysiwygNotepad
          key={proposalIdState}
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
