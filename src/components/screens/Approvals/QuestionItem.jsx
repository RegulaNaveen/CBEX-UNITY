import React from 'react';
import Grid from 'apollo-react/components/Grid';
import Box from 'apollo-react/components/Box';
import CalendarIcon from './CalendarIcon';
import QuestionLabel from './QuestionLabel';

const QuestionItem = ({ question }) => {
  return question ? (
    <Box mt={2}>
      <QuestionLabel questionLabel={question?.questionText || ''} />
      <Grid container spacing={2}>
        <Grid item xs={11}>
          question item
        </Grid>
        <Grid item xs={1}>
          <CalendarIcon />
        </Grid>
      </Grid>
    </Box>
  ) : (
    <></>
  );
};

export default QuestionItem;
