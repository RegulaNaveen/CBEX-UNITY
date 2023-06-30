import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsQuestionsFilterEnabled } from '../../redux/selectors';
import Question from './Question';

const CollapsibleQuestionMapping = ({
  questions,
  milestone,
  title,
  setQuestionToDisplayHistory,
  isNotepadOpen
}) => {
  const isQuestionsFiltersEnabled = useSelector(selectIsQuestionsFilterEnabled);
  return questions.valueSeq().map(questionConfig => {
    let visible =
      questionConfig.get('visible', true) &&
      (questionConfig.get('active', true) ||
        questionConfig.get('isCustomQuestion', true)) &&
      (!questionConfig.get('notApplicable') || isQuestionsFiltersEnabled) &&
      !questionConfig.get('questionApproval', false); // Check should the question be visible only in the approval section
    console.log(
      'destination info here is',
      questionConfig.get('questionDataDestinations')
    );
    return (
      (visible || typeof visible === 'undefined') && (
        <Question
          questionData={questionConfig}
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
          qvidianIntegration={questionConfig.get('integration')}
          currentSFanswer={questionConfig.get('currentSFanswer')}
          section={questionConfig.get('section')}
          sfObject={questionConfig.get('sfObject')}
          sfField={questionConfig.get('sfField')}
          sectionName={title}
          setQuestionToDisplayHistory={setQuestionToDisplayHistory}
          loading={questionConfig.get('loading', false)}
          NaLoading={questionConfig.get('NaLoading', false)}
          questionHint={questionConfig.get('questionHint', '')}
          questionHintHTML={questionConfig.get('questionHintHTML', '')}
          questionHintJSON={questionConfig.get('questionHintJSON')}
          roleNames={questionConfig.get('roleNames')}
          isCustomQuestion={questionConfig.get('isCustomQuestion')}
          questionLockInfo={questionConfig.get('questionLockInfo')}
          hasDifferentSFanswer={questionConfig.get('hasDifferentSFanswer')}
          isNotepadOpen={isNotepadOpen}
          events={questionConfig.get('events') || {}}
          isNotApplicable={questionConfig.get('notApplicable')}
          bidAnswerCopy={questionConfig.get('bidAnswerCopy', false)}
          latestAnsweredBidNo={questionConfig.get('latestAnsweredBidNo', null)}
          questionDataDestinations={questionConfig.get(
            'questionDataDestinations'
          )}
        />
      )
    );
  });
};

export default CollapsibleQuestionMapping;
