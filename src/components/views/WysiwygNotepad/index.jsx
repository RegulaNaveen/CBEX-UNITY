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
import { updateNote } from '../../../redux/actions/notepad-actions';

const WysiwygNotepad = ({
  notes = null,
  selectedBid,
  userName,
  userEmail,
  userRole,
  updateNote
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
    } else {
      setEditorState(initialEditorState);
    }
  }, [notes]);

  // unmount
  useEffect(
    () => () => {
      console.log('WYSIWYG Unmount');
      setEditorState(initialEditorState);
    },
    []
  );

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
    }, 1000),
    [notes, selectedBid, notesId, userEmail, userName, userRole]
  );

  const onEditorsChange = useCallback(
    updatedEditorState => {
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
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorsChange}
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'fontFamily',
            'list',
            'textAlign',
            'colorPicker',
            'link',
            'embedded',
            'emoji',
            'image',
            'remove',
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
  userRole: getUserRole(state)
});

const mapDispatchToProps = {
  updateNote: updateNote
};

export default connect(mapStateToProps, mapDispatchToProps)(WysiwygNotepad);
