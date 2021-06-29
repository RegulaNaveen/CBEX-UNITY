import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map, fromJS } from 'immutable';
import AddNote from './AddNote';
import List from './List';
import { getUserName, getUserRole } from '../../../SessionHandler';
import { selectNotes } from '../../../redux/selectors';
import { addNote } from '../../../redux/actions/notepad-actions';

function Notepad({ sections, notes, add }) {
  function handleOnAddNote(note) {
    add(
      Map(
        fromJS({
          userName: getUserName(),
          date: new Date(),
          section: note.section,
          userRole: getUserRole(),
          content: note.note
        })
      )
    );
  }

  return (
    <div className="notepad">
      <List notes={notes} />
      <AddNote sections={sections} onAddNote={handleOnAddNote} />
    </div>
  );
}

Notepad.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  add: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  notes: selectNotes(state)
});

export default connect(mapStateToProps, { add: addNote })(Notepad);
