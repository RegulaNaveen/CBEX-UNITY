import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { v4 as uuidv4 } from 'uuid';
import {
  selectNotes,
  getSelectedBid,
  getUserName,
  getUserEmail,
  getUserRole,
  getProposalDetails
} from '../../../redux/selectors';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { updateNote, fetchNotes } from '../../../redux/actions/notepad-actions';
import 'draft-js/dist/Draft.css';

const jsonDP = require('jsondiffpatch');

const WysiwygNotepad = ({
  notes = null,
  selectedBid,
  userName,
  userEmail,
  userRole,
  updateNote,
  fetchNotes,
  proposalDetails
}) => {
  const emptyTextBlock = {
    blocks: [
      {
        key: uuidv4(),
        text: '...',
        type: 'unstyled',
        depth: 0,
        entityRanges: [],
        data: {}
      }
    ],
    entityMap: {}
  };
  const constructNoteV2 = (
    proposalId,
    notesId,
    noteText = emptyTextBlock, // non stringified block data i.e as returned from Editor {block:[], entityMap:{}}
    userEmail = '',
    userName = '',
    userRole = ''
  ) => {
    return {
      proposalId,
      notesId: notesId || uuidv4(),
      noteText: JSON.stringify(noteText),
      createdBy: { userEmail, userName, userRole },
      section: null,
      isNoteV2: true,
      oppNo: proposalDetails['CRM #']
    };
  };

  const initialEditorState = EditorState.createEmpty();
  const [editorState, setEditorState] = useState(initialEditorState);
  const [notesId, setNotesId] = useState('');

  useEffect(() => {
    if (!notes.isFromSocket) {
      if (notes.size > 0) {
        const newNotes =
          typeof notes.get(0).toJS().noteText !== 'object'
            ? JSON.parse(notes.get(0).toJS().noteText)
            : notes.get(0).toJS().noteText;

        setNotesId(notes.get(0).toJS().notesId);
        setEditorState(EditorState.createWithContent(convertFromRaw(newNotes)));
      } else {
        setEditorState(initialEditorState);
      }
    } else {
      const raw = convertToRaw(editorState.getCurrentContent());
      const delta = jsonDP.diff(raw, JSON.parse(notes.get(0).toJS().noteText));
      if (!delta) {
        console.log('no change found in notes from socket so returned');
        return;
      }
      const nextContentState = convertFromRaw(jsonDP.patch(raw, delta));
      const stateWithContent = EditorState.createWithContent(nextContentState);
      const currentSelection = editorState.getSelection();
      try {
        const stateWithContentAndSelection = EditorState.forceSelection(
          stateWithContent,
          currentSelection
        );
        setEditorState(stateWithContentAndSelection);
      } catch (e) {
        console.log('error occured in force selection', e);
        setEditorState(stateWithContent);
      }
    }
  }, [notes, selectedBid]);

  const fetchLatestNotes = () => {
    const proposalId = selectedBid.get('id', '');
    if (proposalId) fetchNotes(proposalId);
  };

  useEffect(() => {
    fetchLatestNotes();
    return () => {
      console.log('WYSIWYG Unmount');
      setEditorState(initialEditorState);
    };
  }, []);

  const memoizedSaveDB = useCallback(
    debounce(noteText => {
      const proposalId = selectedBid.get('id');
      const noteSaveReqBody = constructNoteV2(
        proposalId,
        notesId,
        noteText,
        userEmail,
        userName,
        userRole
      );

      updateNote(proposalId, noteSaveReqBody);
    }, 100),
    [notes, selectedBid, notesId, userEmail, userName, userRole]
  );

  const onEditorsChange = useCallback(
    updatedEditorState => {
      const raw = convertToRaw(editorState.getCurrentContent());
      const updatedRaw = convertToRaw(updatedEditorState.getCurrentContent());
      const delta = jsonDP.diff(raw, updatedRaw);
      setEditorState(updatedEditorState);
      if (!delta) {
        console.log('no change found in notes after key event');
        return;
      }
      memoizedSaveDB(updatedRaw);
    },

    [editorState, memoizedSaveDB]
  );

  const onhandlePastedText = (
    text: string,
    html?: string,
    editorState: EditorState
  ) => {};

  return (
    <Editor
      key="draft_editor"
      editorState={editorState}
      onEditorStateChange={onEditorsChange}
      handlePastedText={onhandlePastedText}
      toolbar={{
        options: [
          'inline',
          // 'blockType',
          // 'fontSize',
          // 'fontFamily',
          'list',
          // 'textAlign',
          // 'colorPicker',
          // 'link',
          // 'embedded',
          // 'emoji',
          // 'image',
          // 'remove',
          'history'
        ]
      }}
    />
  );
};

const mapStateToProps = state => ({
  notes: selectNotes(state),
  selectedBid: getSelectedBid(state),
  userName: getUserName(state),
  userEmail: getUserEmail(state),
  userRole: getUserRole(state),
  proposalDetails: getProposalDetails(state)
});

const mapDispatchToProps = {
  updateNote,
  fetchNotes
};

export default connect(mapStateToProps, mapDispatchToProps)(WysiwygNotepad);
