import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as Y from 'yjs';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import Chip from 'apollo-react/components/Chip';
import StatusExclamation from 'apollo-react-icons/StatusExclamation';
import { IndexeddbPersistence } from 'y-indexeddb';
import { websocketNotesApi } from '../../../api/notepad';
import { WebsocketProvider } from '../../../context/y-websocket';
import { NOTES_SOCKET_URL } from '../../../constants/api';
import WysiwygNotepad from '.';
import { getSelectedBid } from '../../../redux/selectors';

const HeaderMessage = props => {
  const modalRoot = document.getElementById('notepad-interrupt');
  return ReactDOM.createPortal(props.children, modalRoot);
};

const NotepadWrapper = ({ trackEvent }) => {
  const selectedBid = useSelector(getSelectedBid);

  const [ydoc, setYdoc] = useState(new Y.Doc());
  const [wsInstance, setWsInstance] = useState(undefined);
  const [proposalIdState, setProposalIdState] = useState(undefined);
  const [showNetworkChip, setShowNetworkChip] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const createNewNotesSocketConnection = proposalId => {
    const storedValue = `doc-${proposalId}`;
    if (proposalId) {
      const provider = new IndexeddbPersistence(storedValue, ydoc);
      const wsProvider = new WebsocketProvider(
        NOTES_SOCKET_URL,
        `?=${storedValue}&`,
        ydoc
      );
      wsProvider.on('status', event => {
        console.log('wsProvider', event);
        if (event.status === 'connected') {
          setShowNetworkChip(false);
          console.log('connected: How to sync with ws provider', wsProvider);
          console.log('db', provider);
        }
        if (event.status === 'disconnected') {
          setShowNetworkChip(true);
        }
      });

      setWsInstance(wsProvider);
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

  // Network Latency
  useEffect(() => {
    // Update network status
    const handleStatusChange = async () => {
      if (!window.navigator.onLine) {
        setShowNetworkChip(true);
        return setIsOnline(false);
      }

      // avoid CORS errors with a request to your own origin
      const url = new URL(window.location.origin);

      // random value to prevent cached responses
      url.searchParams.set(
        'rand',
        Math.random()
          .toString(36)
          .substring(2, 15)
      );

      try {
        const response = await fetch(url.toString(), { method: 'HEAD' });
        return setIsOnline(response.ok);
      } catch {
        setShowNetworkChip(true);
        return setIsOnline(false);
      }
    };

    // online status
    window.addEventListener('online', handleStatusChange);

    // offline status
    window.addEventListener('offline', handleStatusChange);

    // clean up after this effect for performance improvement
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);

  const handleClose = () => {
    setShowNetworkChip(false);
  };

  return (
    <>
      {!isOnline && showNetworkChip && (
        <HeaderMessage>
          <Chip
            color="white"
            label="Network Interruptions: This may prevent your work from autosaving"
            icon={<StatusExclamation style={{ color: 'red' }} />}
            onDelete={handleClose}
          />
        </HeaderMessage>
      )}
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
