import React from 'react';
import Question from '../../../common/Question';

const QuestionContainer = ({ item, setQuestionToDisplayHistory }) => {
  const {
    questionId,
    sfField,
    proposalId,
    // proposalDetail={proposalDetail},
    isNotApplicable,
    milestoneCond,
    NaLoading,
    currentSFAnswer,
    sficon,
    milestone,
    lastAns,
    qvicon,
    answers,
    loading,
    sfObject,
    questionHint,
    questionHintJSON,
    questionHTML,
    sectionName,
    events,
    questionText,
    questionJSON,
    isCustomQuestion,
    notApplicable,
    isSetQuestionLoadingData,
    // questionData,
    section,
    milestoneNew,
    allSections,
    answerConfiguration,
    // questionLockInfo,
    roleNames,
    visible,
    // setQuestionToDisplayHistory,
    hasDifferentSFanswer,
    qvidianIntegration,
    bidAnswerCopy,
    latestAnsweredBidNo,
    questionDataDestinations
  } = item;
  return (
    <div>
      <Question
        key={questionId}
        sfField={sfField}
        proposalId={proposalId}
        questionId={questionId}
        // proposalDetail={proposalDetail}
        isNotApplicable={isNotApplicable}
        milestoneCond={milestoneCond}
        NaLoading={NaLoading}
        currentSFanswer={currentSFAnswer}
        sficon={sficon}
        milestone={milestone}
        lastAns={lastAns}
        qvicon={qvicon}
        answers={answers}
        loading={loading}
        sfObject={sfObject}
        questionHint={questionHint}
        questionHintJSON={questionHintJSON}
        questionHTML={questionHTML}
        sectionName={sectionName}
        events={events}
        questionText={questionText}
        questionJSON={questionJSON}
        isCustomQuestion={isCustomQuestion}
        notApplicable={notApplicable}
        isSetQuestionLoadingData={isSetQuestionLoadingData}
        // questionData={questionData}
        section={section}
        milestoneNew={milestoneNew}
        allSections={allSections}
        answerConfiguration={answerConfiguration}
        // questionLockInfo={questionLockInfo}
        roleNames={roleNames}
        visible={visible}
        setQuestionToDisplayHistory={setQuestionToDisplayHistory}
        hasDifferentSFanswer={hasDifferentSFanswer}
        qvidianIntegration={qvidianIntegration}
        bidAnswerCopy={bidAnswerCopy}
        latestAnsweredBidNo={latestAnsweredBidNo}
        questionDataDestinations={questionDataDestinations}
      />
    </div>
  );
};

export default QuestionContainer;
