import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'apollo-react/components/Typography';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import Card from 'apollo-react/components/Card';
import Note from './Note';

function List({ notes, onShowAll, onEdit, selectedtitle }) {
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
        if (
          selectedtitle &&
          note.getIn(['section', 'sectionName'], '') == selectedtitle
        ) {
          return (
            <div
              className="card"
              id={`notepad-${String(
                note.getIn(['section', 'sectionName'], '')
              ).toLocaleLowerCase()}`}
              key={uuidv4()}
              style={{
                width: 'auto',
                gridTemplateRows: 'auto',
                marginBottom: 16
              }}
            >
              <Note
                index={idx}
                userName={note.getIn(['createdBy', 'userName'], '')}
                date={note.get('createdAt')}
                section={note.getIn(['section', 'sectionName'], '')}
                userRole={note.getIn(['createdBy', 'userRole'])}
                content={note.get('noteText')}
                onShowAll={handleShowAllClick}
                onEdit={handleOnEditClick}
                textstyle={{ paddinTop: 5, paddingRight: 5 }}
              />
            </div>
          );
        }
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
