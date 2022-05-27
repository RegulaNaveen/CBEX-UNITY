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

const WysiwygNotepad = ({
  notes = null,
  selectedBid,
  userName,
  userEmail,
  userRole
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
      notesId: notesId || 'uuidv4()',
      noteText: JSON.stringify(noteText),
      createdBy: { userEmail, userName, userRole },
      section: null,
      isNoteV2: true
    };
  };

  const initialEditorState = EditorState.createEmpty();
  const [editorState, setEditorState] = useState(initialEditorState);
  const [notesId, setNotesId] = useState('');

  useEffect(() => {
    if (notes.size > 0) {
      const newNotes = JSON.parse(notes.get(0).toJS().noteText);
      setNotesId(notes.get(0).toJS().notesId);
      setEditorState(EditorState.createWithContent(convertFromRaw(newNotes)));
    }
  }, [notes]);

  const memoizedSaveDB = useCallback(
    debounce(noteText => {
      // TODO Save data to db
      const proposalId = selectedBid.get('id');
      const noteSaveReqBody = constructNoteV2(
        proposalId,
        notesId,
        noteText,
        userEmail,
        userName,
        userRole
      );
      console.log({ noteSaveReqBody });
    }, 2000),
    [notes, selectedBid, notesId, userEmail, userName, userRole]
  );

  const onEditorsChange = useCallback(
    updatedEditorState => {
      console.log('onEditorsChange rerendered');
      setEditorState(updatedEditorState);
      const updatedNoteText = convertToRaw(
        updatedEditorState.getCurrentContent()
      );
      memoizedSaveDB(updatedNoteText);
    },
    [memoizedSaveDB]
  );

  return (
    <div>
      <Editor editorState={editorState} onEditorStateChange={onEditorsChange} />
    </div>
  );
};

const mapStateToProps = state => ({
  notes: selectNotes(state),
  selectedBid: getSelectedBid(state),
  userName: getUserName(state),
  userEmail: getUserEmail(state),
  userRole: getUserRole(state)
});
export default connect(mapStateToProps)(WysiwygNotepad);
