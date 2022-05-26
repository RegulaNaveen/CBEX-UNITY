import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import debounce from 'lodash/debounce';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { selectNotes } from '../../../redux/selectors';

/**
 * @defaultNote should be in RichText JSON type i.e {block:[],entityMap:{}}
 */
const ApolloNotepad = ({ notes = null }) => {
  const emptyTextBlock = {
    blocks: [
      {
        key: '55bda',
        text: 'Initial data',
        type: 'unstyled',
        depth: 0,
        entityRanges: [],
        data: {}
      }
    ],
    entityMap: {}
  };
  const [noteText, setNoteText] = useState(emptyTextBlock);

  const initialEditorState = EditorState.createEmpty();
  const [editorState, setEditorState] = useState(initialEditorState);

  useEffect(() => {
    if (notes.size > 0) {
      const newNotes = JSON.parse(notes.get(0).toJS().noteText);
      setNoteText(newNotes);
      setEditorState(EditorState.createWithContent(convertFromRaw(newNotes)));
    }
  }, [notes]);

  let isFirstLoad = true;
  const handleNotesChange = debounce(value => {
    setNoteText(value);
    console.log({ isFirstLoad, time: new Date(), value });
    // This function should not save data to db on first load
    if (!isFirstLoad) {
      // TODO Save data to db
      console.log('Save data to DB');
    }
    isFirstLoad = false;
  }, 2000);

  return (
    <div>
      <p>{JSON.stringify(noteText)}</p>
      <RichTextEditor
        spellCheck={true}
        onChange={setNoteText}
        defaultValue={noteText}
      />
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};

const mapStateToProps = state => ({
  notes: selectNotes(state)
});
export default connect(mapStateToProps)(ApolloNotepad);
