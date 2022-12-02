import React from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import Grid from 'apollo-react/components/Grid';
import QuestionItem from './QuestionItem';

const SectionFreezed = ({ archivedData }) => {
  return (
    !isEmpty(archivedData) &&
    archivedData
      .reverse()
      .map(
        ({
          id,
          section_left_questions: leftQues,
          section_right_questions: rightQues,
          section_title: title
        }) => {
          return (
            <Grid container className="approval-ques" key={id}>
              <Grid item xs={12} className="approval-sec-title">
                {title}
              </Grid>
              <Grid item xs={8} className="approval-ques-left">
                {!isEmpty(leftQues) &&
                  leftQues.map(item => {
                    if (
                      item.visible &&
                      (item.active || item.isCustomQuestion)
                    ) {
                      return (
                        <QuestionItem
                          question={item}
                          approvalSectionTitle={title}
                          key={item.questionId}
                          disabled
                          isQuesFreezed
                        />
                      );
                    }
                    return null;
                  })}
              </Grid>
              <Grid item xs={4} className="approval-ques-right">
                {!isEmpty(rightQues) &&
                  rightQues.map(item => {
                    if (
                      item.visible &&
                      (item.active || item.isCustomQuestion)
                    ) {
                      return (
                        <QuestionItem
                          question={item}
                          approvalSectionTitle={title}
                          key={item.questionId}
                          disabled
                          isQuesFreezed
                        />
                      );
                    }
                    return null;
                  })}
              </Grid>
              <hr />
            </Grid>
          );
        }
      )
  );
};

SectionFreezed.propTypes = {
  archivedData: PropTypes.array.isRequired
};

export default SectionFreezed;
