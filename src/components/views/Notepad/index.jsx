import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Loader from 'apollo-react/components/Loader';
import AddNote from './AddNote';
import ReadEditNote from './ReadEditNote';
import List from './List';
import {
  getUserName,
  getUserRole,
  getUserEmail
} from '../../../SessionHandler';
import {
  selectNotes,
  selectIsFetchingNotes,
  selectIsAddingNote,
  selectNotepadMode
} from '../../../redux/selectors';
import {
  addNote,
  updateNote,
  changeMode
} from '../../../redux/actions/notepad-actions';
import { REDUX_TYPES } from '../../../constants';

const { MODE_DEFAULT, MODE_EDIT, MODE_READ } = REDUX_TYPES.NOTEPAD;

function Notepad({
  sections,
  notes,
  add,
  update,
  id,
  fetchingNotes,
  addingNote,
  mode,
  change,
  selectedtitle
}) {
  const [selectedNote, setSelectedNote] = useState(Map());

  function handleOnAddNote(note) {
    let newNote = Map().set('noteText', note.note).set('createdBy', {
      userName: getUserName(),
      userRole: getUserRole(),
      userEmail: getUserEmail()
    });
    if (note.section.length > 0) {
      newNote = newNote.set(
        'section',
        sections
          .get(`${note.section}`)
          .filter((s, skey) => ['sectionOrder', 'sectionName'].includes(skey))
      );
    }
    add(id, newNote);
  }

  function handleShowAll(note) {
    setSelectedNote(note);
    change(MODE_READ);
  }

  function handleEditNoteClick(note) {
    setSelectedNote(note);
    change(MODE_EDIT);
  }

  function handleNoteEdit(editedNote) {
    let newEditedNote = editedNote;
    if (newEditedNote.get('section').length > 0) {
      newEditedNote = newEditedNote.set(
        'section',
        sections
          .get(newEditedNote.get('section'))
          .filter((s, skey) => ['sectionOrder', 'sectionName'].includes(skey))
      );
      newEditedNote = newEditedNote
        .filter((note, noteKey) =>
          ['notesId', 'noteText', 'section', 'createdBy'].includes(noteKey)
        )
        .toJS();
    } else {
      newEditedNote = newEditedNote
        .filter((note, noteKey) =>
          ['notesId', 'noteText', 'createdBy'].includes(noteKey)
        )
        .toJS();
    }
    update(id, newEditedNote);
  }

  if (fetchingNotes) {
    return (
      <div
        className="notepad"
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Loader isInner />
        <p className="loading-msg">Loading Notes</p>
      </div>
    );
  }

  if (addingNote) {
    return (
      <div
        className="notepad"
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Loader isInner />
        <p className="loading-msg">Uploading Note</p>
      </div>
    );
  }

  return (
    <div className="notepad">
      {mode === MODE_DEFAULT && (
        <>
          <List
            notes={notes}
            onShowAll={handleShowAll}
            onEdit={handleEditNoteClick}
            selectedtitle={selectedtitle}
          />
          <AddNote sections={sections} onAddNote={handleOnAddNote} />
        </>
      )}
      {mode === MODE_READ && (
        <>
          <ReadEditNote
            note={selectedNote}
            readOnly
            sections={sections}
            onClose={() => change(MODE_DEFAULT)}
          />
        </>
      )}
      {mode === MODE_EDIT && (
        <>
          <ReadEditNote
            note={selectedNote}
            readOnly={false}
            onEdit={handleNoteEdit}
            sections={sections}
            onClose={() => change(MODE_DEFAULT)}
          />
        </>
      )}
    </div>
  );
}

Notepad.propTypes = {
  sections: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired,
  add: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  fetchingNotes: PropTypes.bool.isRequired,
  addingNote: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  selectedtitle: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  notes: selectNotes(state),
  fetchingNotes: selectIsFetchingNotes(state),
  addingNote: selectIsAddingNote(state),
  mode: selectNotepadMode(state)
});

const mapDispatchToProps = {
  add: addNote,
  update: updateNote,
  change: changeMode
};

export default connect(mapStateToProps, mapDispatchToProps)(Notepad);
