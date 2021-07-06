import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Grid from 'apollo-react/components/Grid';
import IconButton from 'apollo-react/components/IconButton';
import Close from 'apollo-react-icons/Close';
import TextField from 'apollo-react/components/TextField';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import Button from 'apollo-react/components/Button';
import Box from 'apollo-react/components/Box';
import { Map } from 'immutable';

function NoteLabel({ onClose }) {
  return (
    <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <p className="label">Proposal Notes</p>
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'end' }}>
          <IconButton size="small" onClick={onClose}>
            <Close fontSize="extraSmall" />
          </IconButton>
        </Grid>
      </Grid>
  )
}

function ReadNote({ note, onClose }) {
  return (
    <div className="read-note">
      <NoteLabel onClose={onClose} />
      <Grid container>
        <Grid item xs={12} className="note-view">
          <p className="note">
            { note.get('noteText') }
          </p>
        </Grid>
      </Grid>
    </div>
  )
}

function EditNoteForm({
  sections,
  values,
  handleSubmit,
  handleChange,
  setFieldValue,
  onClose
}) {

  function handleSectionChange(e) {
    e.preventDefault();
    e.stopPropagation();
    setFieldValue('section', e.target.value);
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={1} className="textarea-container">
        <Grid item xs={12}>
          <TextField
            name="note"
            label={<NoteLabel onClose={onClose} />}
            placeholder="Enter notes here..."
            value={values.note}
            onChange={handleChange}
            sizeAdjustable
            fullWidth
            margin="none"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item xs={9}>
          <Select
            name="section"
            label="Section (Optional)"
            placeholder="Select"
            value={values.section}
            onChange={handleSectionChange}
            fullWidth
            margin="dense"
            size="small"
          >
            {sections.valueSeq().map((section, idx) => (
              <MenuItem
                key={`section-${idx}`}
                value={section.get('sectionName')}
              >
                {section.get('sectionName')}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs>
          <Box mb={1}>
            <Button
              variant="primary"
              size="small"
              type="submit"
              disabled={values.note.trim().length === 0}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

function EditNote({
  sections,
  onEdit,
  readOnly,
  note,
  onClose
}) {
  if (readOnly) {
    return (
      <ReadNote note={note} onClose={onClose} />
    );
  }

  let sectionValue = note.get('section');
  sectionValue = sectionValue ? sectionValue.get('sectionName')  : '';

  const FormikedEditNoteForm = withFormik({
    mapPropsToValues: () => ({
      note: note.get('noteText'),
      section: sectionValue
    }),
    handleSubmit: values => {
      onEdit(note.merge(Map({ noteText: values.note, section: values.section })));
    },
    displayName: 'EditNoteForm'
  })(EditNoteForm);
  return (
    <div className="edit-note">
      <FormikedEditNoteForm sections={sections} onClose={onClose} />
    </div>
  );
}

EditNoteForm.propTypes = {
  sections: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired
};

EditNote.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  sections: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  note: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

EditNote.defaultProps = {
  onEdit: () => {}
}

export default EditNote;
