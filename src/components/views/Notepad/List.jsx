import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'apollo-react/components/Typography';
import classNames from 'classnames';
import Note from './Note';

function List({ notes }) {
  return (
    <div
      className={classNames({ list: true, 'justify-center': notes.size === 0 })}
    >
      {notes.size === 0 && (
        <Typography variant="body2" style={{ textAlign: 'center' }}>
          No Data to show
        </Typography>
      )}
      {notes.map(note => {
        return (
          <Note
            userName={note.get('userName')}
            date={note.get('date')}
            section={note.get('section')}
            userRole={note.get('userRole')}
            content={note.get('content')}
          />
        );
      })}
    </div>
  );
}

List.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default List;
