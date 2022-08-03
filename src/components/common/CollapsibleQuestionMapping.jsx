import React from 'react';
import Question from './Question';

const CollapsibleQuestionMapping = ({
  questions,
  milestone,
  title,
  setQuestionToDisplayHistory,
  isNotepadOpen
}) => {
  return questions.valueSeq().map(questionConfig => {
    const visible =
      questionConfig.get('visible', true) &&
      (questionConfig.get('active', true) ||
        questionConfig.get('isCustomQuestion', true));

    return (
      (visible || typeof visible === 'undefined') && (
        <Question
          key={questionConfig.get('questionId')}
          ismilestoneavailable={milestone}
          milestone={questionConfig.get('milestone')}
          milestoneNew={questionConfig.get('milestoneNew')}
          questionId={questionConfig.get('questionId')}
          proposalId={questionConfig.get('proposalId')}
          answers={questionConfig.get('answers')}
          questionText={questionConfig.get('questionText')}
          questionHTML={questionConfig.get('questionHTML')}
          questionJSON={questionConfig.get('questionJSON')}
          answerConfiguration={questionConfig.get('answerConfiguration')}
          section={questionConfig.get('section')}
          sfObject={questionConfig.get('sfObject')}
          sfField={questionConfig.get('sfField')}
          sectionName={title}
          setQuestionToDisplayHistory={setQuestionToDisplayHistory}
          loading={questionConfig.get('loading', false)}
          questionHint={questionConfig.get('questionHint', '')}
          questionHintHTML={questionConfig.get('questionHintHTML', '')}
          questionHintJSON={questionConfig.get('questionHintJSON')}
          roleNames={questionConfig.get('roleNames')}
          isCustomQuestion={questionConfig.get('isCustomQuestion')}
          hasDifferentSFanswer={questionConfig.get('hasDifferentSFanswer')}
          isNotepadOpen={isNotepadOpen}
        />
      )
    );
  });
};

export default CollapsibleQuestionMapping;
