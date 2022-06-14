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
  getUserRole
} from '../../../redux/selectors';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { updateNote, fetchNotes } from '../../../redux/actions/notepad-actions';
import 'draft-js/dist/Draft.css';
import { getProposalDetails } from '../../../redux/selectors';
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
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
    console.log('notes changed< Rerendered', notes);
    console.log({ selectedBid: selectedBid.get('id') });
    if (!notes.isFromSocket) {
      if (notes.size > 0) {
        const newNotes =
          typeof notes.get(0).toJS().noteText !== 'object'
            ? JSON.parse(notes.get(0).toJS().noteText)
            : notes.get(0).toJS().noteText;

        setNotesId(notes.get(0).toJS().notesId);
        setEditorState(EditorState.createWithContent(convertFromRaw(newNotes)));

        // const stateWithContent = EditorState.createWithContent(
        //   convertFromRaw(newNotes)
        // );
        // const currentSelection = editorState.getSelection();
        // const stateWithContentAndSelection = EditorState.forceSelection(
        //   stateWithContent,
        //   currentSelection
        // );
        // setEditorState(stateWithContentAndSelection);
      } else {
        setEditorState(initialEditorState);
      }
      setIsReadOnly(!selectedBid.get('isCurrent'));
    } else {
      // latest notes content received from server
      // console.log(
      //   notes.get(0).toJS().noteText,
      //   'latest notes content received from server',
      //   editorState.getCurrentContent()
      // );
      // const stateWithContent = EditorState.createWithContent(c)

      const raw = convertToRaw(editorState.getCurrentContent());
      const delta = jsonDP.diff(raw, JSON.parse(notes.get(0).toJS().noteText));
      if (!delta) {
        console.log('no change found so returned');
        return;
      }
      const nextContentState = convertFromRaw(jsonDP.patch(raw, delta));
      const stateWithContent = EditorState.createWithContent(nextContentState);
      const currentSelection = editorState.getSelection();
      const stateWithContentAndSelection = EditorState.forceSelection(
        stateWithContent,
        currentSelection
      );
      setEditorState(stateWithContentAndSelection);
      // setEditorState(EditorState.push(editorState, stateWithContent));
    }
  }, [notes, selectedBid]);

  // unmount
  useEffect(
    () => () => {
      console.log('WYSIWYG Unmount');
      setEditorState(initialEditorState);
    },
    []
  );

  const fetchLatestNotes = () => {
    const proposalId = selectedBid.get('id', '');
    if (proposalId) fetchNotes(proposalId);
  };

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
      // if (
      //   updatedEditorState.getCurrentContent() ===
      //   editorState.getCurrentContent()
      // ) {
      //   console.log('No changes found in content');
      // } else {
      setEditorState(updatedEditorState);
      const updatedNoteText = convertToRaw(
        updatedEditorState.getCurrentContent()
      );
      memoizedSaveDB(updatedNoteText);
      // }
    },

    [editorState, memoizedSaveDB]
  );

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorsChange}
        readOnly={isReadOnly}
        // onBlur={e => fetchLatestNotes()}
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
    </div>
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
