import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import Grid from 'apollo-react/components/Grid';
import TextField from 'apollo-react/components/TextField';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import Button from 'apollo-react/components/Button';
import Box from 'apollo-react/components/Box';
import { v4 as uuidv4 } from 'uuid';

function AddNoteForm({
  sections,
  values,
  handleSubmit,
  handleChange,
  setFieldValue
}) {
  function handleSectionChange(e) {
    e.preventDefault();
    e.stopPropagation();
    setFieldValue('section', e.target.value);
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            name="note"
            label="Proposal Notes"
            placeholder="Enter notes here..."
            value={values.note}
            onChange={handleChange}
            multiline
            sizeAdjustable
            minHeight={130}
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
            {sections.valueSeq().map(section => (
              <MenuItem key={uuidv4()} value={section.get('sectionName')}>
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
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

function AddNote({ sections, onAddNote }) {
  const FormikedAddNoteForm = withFormik({
    mapPropsToValues: () => ({
      note: '',
      section: ''
    }),
    handleSubmit: values => {
      onAddNote(values);
    },
    displayName: 'AddNoteForm'
  })(AddNoteForm);
  return (
    <div className="add-note">
      <FormikedAddNoteForm sections={sections} />
    </div>
  );
}

AddNoteForm.propTypes = {
  sections: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired
};

AddNote.propTypes = {
  sections: PropTypes.object.isRequired,
  onAddNote: PropTypes.func.isRequired
};

export default AddNote;
