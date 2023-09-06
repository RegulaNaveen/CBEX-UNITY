import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Typography from 'apollo-react/components/Typography';
import { useSelector } from 'react-redux';
import Link from 'apollo-react/components/Link';
import Plus from 'apollo-react-icons/Plus';
import { isEmpty, xor, isString, has, isObject } from 'lodash';
import { List, fromJS } from 'immutable';
import classNames from 'classnames';
import AddQuestionModalComponent from '../../../views/modals/AddQuestionModal';
import AnswerInput from './AnswerInput';
import Question from '../../../common/Question';
import {
  selectSections,
  selectFilteredSections,
  selectIsQuestionsFilterEnabled,
  isSetQuestionLoading,
  getSelectedBid,
  getShowNaCheckbox,
  getEditQuestionData
} from '../../../../redux/selectors';
import AnswerHistory from '../../../views/modals/AnswerHistory';
import Statement from '../../../common/Statement';

const CustomModal = props => {
  const modalRoot = document.getElementById('modal-wrapper');
  return ReactDOM.createPortal(props.children, modalRoot);
};

function ProposalTeam() {
  const [showModal, setShowModal] = useState(false);
  const isSetQuestionLoadingData = useSelector(isSetQuestionLoading);
  const selectedBid = useSelector(getSelectedBid);
  const isCurrentBid = selectedBid.get('isCurrent');
  const isQuestionsFiltersEnabled = useSelector(selectIsQuestionsFilterEnabled);
  const filteredSections = useSelector(selectFilteredSections);
  const sections = useSelector(selectSections);
  const allSections = sections;
  const showNaCheckbox = useSelector(state => getShowNaCheckbox(state));
  const [selectedQuestionForHistory, setSelectedQuestionForHistory] = useState(
    ''
  );
  const [isHistoryModalShown, setIsHistoryModalShown] = useState(false);
  const editQuestionsData = useSelector(getEditQuestionData);
  const proposalTeam = [];
  let questionData;
  const wholeData = [];

  allSections.map(item => {
    if (item.get('sectionName') === 'Proposal Team') {
      proposalTeam.push(item.toJS());
    }
  });
  // eslint-disable-next-line no-unused-expressions
  !isEmpty(proposalTeam[0]) &&
    Object.keys(proposalTeam[0]?.questions).map(item => {
      const proposalTeamData = proposalTeam[0].questions[item];
      questionData = fromJS(proposalTeamData);
      const { proposalId } = proposalTeamData;
      const { proposalDetail } = proposalTeam[0];
      const { notApplicable } = proposalTeamData;
      let milestoneCond = false;
      const NaLoading = questionData?.NaLoading;
      let currentSFAnswer;
      if (proposalTeamData?.active && proposalTeamData?.visible) {
        let lastAnswer;
        currentSFAnswer = fromJS(proposalTeamData?.currentSFanswer);
        const sficon = proposalTeamData?.sfField;
        const { sfField } = proposalTeamData;
        const milestone = fromJS(proposalTeamData?.milestone);
        const milestoneNew = fromJS(proposalTeamData?.milestoneNew);
        const lastAns = isString(lastAnswer) ? lastAnswer : '';
        const answerConfiguration = fromJS(
          proposalTeamData?.answerConfiguration
        );
        const roleNames = fromJS(proposalTeamData?.roleNames);
        if (milestoneNew && !isEmpty(milestoneNew)) {
          milestoneCond = true;
        }
        const qvicon = proposalTeamData.questionId;
        const answers = fromJS(proposalTeamData?.answers);
        const loading = proposalTeamData.loading ?? false;
        const { sfObject } = proposalTeamData;
        const section = proposalTeamData?.section;
        const questionText = proposalTeamData?.questionText;
        const questionId = proposalTeamData?.questionId;
        const questionHint = proposalTeamData?.questionHint;
        const questionHintJSON = proposalTeamData?.questionHintJSON;
        const questionHTML = proposalTeamData?.questionHTML;
        const sectionName = section?.sectionName;
        const qvidianIntegration = proposalTeamData?.integration;
        const events = proposalTeamData?.events || {};
        const questionJSON = proposalTeamData?.questionJSON;
        const isCustomQuestion = proposalTeamData?.isCustomQuestion;
        const questionLockInfo = fromJS(
          proposalTeam[0].questions[item].questionLockInfo
        );
        const hasDifferentSFanswer = proposalTeamData?.hasDifferentSFanswer;
        const visible =
          proposalTeamData?.visible &&
          (proposalTeamData?.active || proposalTeamData?.isCustomQuestion) &&
          (!proposalTeamData?.notApplicable || isQuestionsFiltersEnabled) &&
          !proposalTeamData?.questionApproval;
        const questionDataDestinations =
          proposalTeamData?.questionDataDestinations;
        wholeData.push({
          questionId: questionId,
          proposalId: proposalId,
          sfField: sfField,
          qvidianIntegration: qvidianIntegration,
          proposalDetail: proposalDetail,
          isNotApplicable: notApplicable,
          milestoneCond: milestoneCond,
          NaLoading: NaLoading,
          currentSFAnswer: currentSFAnswer,
          sficon: sficon,
          milestone: milestone,
          lastAns: lastAns,
          qvicon: qvicon,
          answers: answers,
          loading: loading,
          sfObject: sfObject,
          questionHint: questionHint,
          questionHintJSON: questionHintJSON,
          questionHTML: questionHTML,
          sectionName: sectionName,
          events: events,
          questionText: questionText,
          questionJSON: questionJSON,
          isCustomQuestion: isCustomQuestion,
          isSetQuestionLoadingData: isSetQuestionLoadingData,
          questionData: questionData,
          section: section,
          milestoneNew: milestoneNew,
          allSections: allSections,
          answerConfiguration: answerConfiguration,
          roleNames: roleNames,
          questionLockInfo: questionLockInfo,
          visible: visible,
          hasDifferentSFanswer: hasDifferentSFanswer,
          bidAnswerCopy: proposalTeamData.bidAnswerCopy,
          bidType: proposalTeamData.bidType,
          latestAnsweredBidNo: proposalTeamData.latestAnsweredBidNo,
          questionDataDestinations: questionDataDestinations
        });
      }
    });

  useEffect(() => {
    allSections.map(items => {
      if (items.get('sectionName') === 'Proposal Team') {
        proposalTeam.push(items.toJS());
      }
    });
  }, [allSections, sections, filteredSections]);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => setShowModal(false), 1000);
    }
  }, [isSetQuestionLoadingData]);

  useEffect(() => {
    if (editQuestionsData.size > 0) {
      setShowModal(true);
    }
  }, [editQuestionsData]);

  const setQuestionToDisplayHistory = (selectedAnswer: string) => {
    const questionHistory = allSections
      .valueSeq()
      .find(sections => sections.getIn(['questions', selectedAnswer]))
      .getIn(['questions', selectedAnswer]);
    setSelectedQuestionForHistory(questionHistory);
    setIsHistoryModalShown(true);
  };

  const closeAnswerHistoryModal = () => {
    setIsHistoryModalShown(false);
  };

  const onCloseAddModal = () => {
    setShowModal(prev => !prev);
  };
  return (
    <>
      <div id="proposal-team-left-section">
        <div>
          <Typography
            style={{
              margin: '15px 0',
              fontSize: '20px',
              color: '#000000',
              fontWeight: 600,
              lineHeight: 1.04
            }}
          >
            Team
          </Typography>
          <hr className="divider-hr-proposal-team" />
        </div>

        <div
          className={classNames('proposal-team-wrapper-container', {
            'padding-Na': showNaCheckbox
          })}
        >
          {wholeData?.map(items => {
            if (items.answerConfiguration.get('type') === 'statement')
              return (
                (items.visible || typeof items.visible === 'undefined') && (
                  <Statement
                    key={items.questionId}
                    ismilestoneavailable={items.milestone}
                    milestone={items.milestone}
                    milestoneNew={items.milestoneNew}
                    questionId={items.questionId}
                    questionText={items.questionText}
                    questionJSON={items.questionJSON}
                    sectionName={items.sectionName}
                    questionHint={items.questionHint}
                    questionHintJSON={items.questionHintJSON}
                    // isNotepadOpen={items.isNotepadOpen}
                  />
                )
              );
            else
              return (
                (items.visible || typeof items.visible === 'undefined') && (
                  <Question
                    key={items.questionId}
                    sfField={items.sfField}
                    proposalId={items.proposalId}
                    questionId={items.questionId}
                    proposalDetail={items.proposalDetail}
                    isNotApplicable={items.isNotApplicable}
                    milestoneCond={items.milestoneCond}
                    NaLoading={items.NaLoading}
                    currentSFanswer={items.currentSFAnswer}
                    sficon={items.sficon}
                    milestone={items.milestone}
                    lastAns={items.lastAns}
                    qvicon={items.qvicon}
                    answers={items.answers}
                    loading={items.loading}
                    sfObject={items.sfObject}
                    questionHint={items.questionHint}
                    questionHintJSON={items.questionHintJSON}
                    questionHTML={items.questionHTML}
                    sectionName={items.sectionName}
                    events={items.events}
                    questionText={items.questionText}
                    questionJSON={items.questionJSON}
                    isCustomQuestion={items.isCustomQuestion}
                    notApplicable={items.notApplicable}
                    isSetQuestionLoadingData={isSetQuestionLoadingData}
                    questionData={items.questionData}
                    section={items.section}
                    milestoneNew={items.milestoneNew}
                    allSections={allSections}
                    answerConfiguration={items.answerConfiguration}
                    questionLockInfo={items.questionLockInfo}
                    roleNames={items.roleNames}
                    visible={items.visible}
                    setQuestionToDisplayHistory={setQuestionToDisplayHistory}
                    hasDifferentSFanswer={items.hasDifferentSFanswer}
                    qvidianIntegration={items.qvidianIntegration}
                    bidAnswerCopy={items.bidAnswerCopy}
                    bidType={items.bidType}
                    latestAnsweredBidNo={items.latestAnsweredBidNo}
                    questionDataDestinations={items.questionDataDestinations}
                  />
                )
              );
          })}
        </div>
        <hr className="divider-hr-proposal-team" />
        <div className="proposal-team-btn-wrapper">
          <Link
            style={{ borderBottom: 'none' }}
            onClick={() => setShowModal(true)}
            size="small"
            disabled={!isCurrentBid}
          >
            <Plus
              className="plus-icon-add-new-question"
              fontSize="extraSmall"
            />
            <span style={{ verticalAlign: 'top' }}> Add New Question</span>
          </Link>
        </div>
      </div>
      {showModal && (
        <CustomModal>
          <AddQuestionModalComponent
            onClose={onCloseAddModal}
            currentsection={'Proposal Team' || ''}
          />
        </CustomModal>
      )}
      {isHistoryModalShown && (
        <CustomModal>
          <AnswerHistory
            question={selectedQuestionForHistory}
            closeModal={closeAnswerHistoryModal}
          />
        </CustomModal>
      )}
    </>
  );
}

export default ProposalTeam;
