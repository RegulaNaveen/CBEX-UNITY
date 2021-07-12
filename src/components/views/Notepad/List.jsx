import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'apollo-react/components/Typography';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import Note from './Note';

function List({ notes, onShowAll, onEdit }) {
  function handleShowAllClick(index) {
    onShowAll(notes.get(index));
  }

  function handleOnEditClick(index) {
    onEdit(notes.get(index));
  }

  return (
    <div
      className={classNames({ list: true, 'justify-center': notes.size === 0 })}
    >
      {notes.size === 0 && (
        <Typography variant="body2" style={{ textAlign: 'center' }}>
          No Notes Available
        </Typography>
      )}
      {notes.map((note, idx) => {
        return (
          <Note
            key={uuidv4()}
            index={idx}
            userName={note.getIn(['createdBy', 'userName'], '')}
            date={note.get('createdAt')}
            section={note.getIn(['section', 'sectionName'], '')}
            userRole={note.getIn(['createdBy', 'userRole'])}
            content={note.get('noteText')}
            onShowAll={handleShowAllClick}
            onEdit={handleOnEditClick}
          />
        );
      })}
    </div>
  );
}

List.propTypes = {
  notes: PropTypes.object.isRequired,
  onShowAll: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default List;
