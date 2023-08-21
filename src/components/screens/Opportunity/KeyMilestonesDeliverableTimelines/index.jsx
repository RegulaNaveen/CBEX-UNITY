import React, { useEffect, useState } from 'react';
import Header from './Header';
import ReactDOM from 'react-dom';
import {
  selectSections,
  selectIsQuestionsFilterEnabled,
  selectFilteredSections,
  isSetQuestionLoading,
  getSelectedBid,
  getEditQuestionData,
  getShowNaCheckbox
} from '../../../../redux/selectors';
import Link from 'apollo-react/components/Link';
import Plus from 'apollo-react-icons/Plus';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { isEmpty, xor, isString, has, isObject } from 'lodash';
import { List, fromJS } from 'immutable';
import AnswerHistory from '../../../views/modals/AnswerHistory';
import QuestionContainer from './QuestionContainer';
import AddQuestionModalComponent from '../../../views/modals/AddQuestionModal';

const CustomModal = props => {
  const modalRoot = document.getElementById('modal-wrapper');
  return ReactDOM.createPortal(props.children, modalRoot);
};

const KeyMilestoneDeliverableTimelines = () => {
  const sections = useSelector(selectSections);
  const isQuestionsFiltersEnabled = useSelector(selectIsQuestionsFilterEnabled);
  const filteredSections = useSelector(selectFilteredSections);
  const isSetQuestionLoadingData = useSelector(isSetQuestionLoading);
  const selectedBid = useSelector(getSelectedBid);
  const isCurrentBid = selectedBid.get('isCurrent');
  const [selectedQuestionForHistory, setSelectedQuestionForHistory] = useState(
    ''
  );
  const [isHistoryModalShown, setIsHistoryModalShown] = useState(false);
  const editQuestionsData = useSelector(getEditQuestionData);
  const [showModal, setShowModal] = useState(false);
  const showNaCheckbox = useSelector(state => getShowNaCheckbox(state));
  const allSections = sections;
  const KeyMilestone = [];
  const wholeData = [];
  let questionData;
  allSections.map(item => {
    if (item.get('sectionName') === 'Key Milestones & Deliverable Timelines') {
      KeyMilestone.push(item.toJS());
    }
  });

  if (!isEmpty(KeyMilestone[0])) {
    Object.keys(KeyMilestone[0]?.questions).forEach(item => {
      const KeyMilestoneData = KeyMilestone[0].questions[item];
      questionData = fromJS(KeyMilestoneData);

      const { proposalId } = KeyMilestoneData;
      const proposalDetail = KeyMilestoneData.proposalDetail;
      const { notApplicable } = KeyMilestoneData;
      const NaLoading = KeyMilestoneData?.NaLoading;

      if (KeyMilestoneData?.active && KeyMilestoneData?.visible) {
        let lastAnswer;
        let milestoneCond = false;
        let currentSFAnswer = fromJS(KeyMilestoneData?.currentSFanswer);
        const sficon = KeyMilestoneData?.sfField;
        const { sfField } = KeyMilestoneData;
        const milestone = fromJS(KeyMilestoneData?.milestone);
        const milestoneNew = fromJS(KeyMilestoneData?.milestoneNew);
        const lastAns = isString(lastAnswer) ? lastAnswer : '';
        const answerConfiguration = fromJS(
          KeyMilestoneData?.answerConfiguration
        );
        const roleNames = fromJS(KeyMilestoneData?.roleNames);
        if (milestoneNew && !isEmpty(milestoneNew)) {
          milestoneCond = true;
        }
        const qvicon = KeyMilestoneData.questionId;
        const answers = fromJS(KeyMilestoneData?.answers);
        const loading = KeyMilestoneData.loading ?? false;
        const { sfObject } = KeyMilestoneData;
        const section = KeyMilestoneData?.section;
        const questionText = KeyMilestoneData?.questionText;
        const questionId = KeyMilestoneData?.questionId;
        const questionHint = KeyMilestoneData?.questionHint;
        const questionHintJSON = KeyMilestoneData?.questionHintJSON;
        const questionHTML = KeyMilestoneData?.questionHTML;
        const sectionName = section?.sectionName;
        const qvidianIntegration = KeyMilestoneData?.integration;
        const events = KeyMilestoneData?.events || {};
        const questionJSON = KeyMilestoneData?.questionJSON;
        const isCustomQuestion = KeyMilestoneData?.isCustomQuestion;
        const questionLockInfo = fromJS(KeyMilestoneData.questionLockInfo);

        const hasDifferentSFanswer = KeyMilestoneData?.hasDifferentSFanswer;
        const visible =
          KeyMilestoneData?.visible &&
          (KeyMilestoneData?.active || KeyMilestoneData?.isCustomQuestion) &&
          (!KeyMilestoneData?.notApplicable || isQuestionsFiltersEnabled) &&
          !KeyMilestoneData?.questionApproval;
        const questionDataDestinations =
          KeyMilestoneData?.questionDataDestinations;

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
          bidAnswerCopy: KeyMilestoneData.bidAnswerCopy,
          latestAnsweredBidNo: KeyMilestoneData.latestAnsweredBidNo,
          questionDataDestinations: questionDataDestinations
        });
      }
    });
  }

  const setQuestionToDisplayHistory = (selectedAnswer: string) => {
    const questionHistory = allSections
      .valueSeq()
      .find(sections => sections.getIn(['questions', selectedAnswer]))
      .getIn(['questions', selectedAnswer]);
    setSelectedQuestionForHistory(questionHistory);
    setIsHistoryModalShown(true);
  };

  const onCloseAddModal = () => {
    setShowModal(prev => !prev);
  };

  const closeAnswerHistoryModal = () => {
    setIsHistoryModalShown(false);
  };

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

  return (
    <>
      {/* <div id="key-milestone-wrapper"> */}
        <div id="key-milestone-left-section">
          <div className="key-milestone-header">
            <Header />
          </div>
          <div
            className={classNames('key-milestone-wrapper-container', {
              'padding-Na': showNaCheckbox
            })}
          >
            {wholeData?.map(items => {
              return (
                (items.visible || typeof items.visible === 'undefined') && (
                  <QuestionContainer
                    key={items.questionId}
                    item={items}
                    setQuestionToDisplayHistory={setQuestionToDisplayHistory}
                  />
                )
              );
            })}
          </div>
          <hr className="key-milestone-divider-hr" />
          <div className="add-question-link">
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
      {/* </div> */}
      {showModal && (
        <CustomModal>
          <AddQuestionModalComponent
            onClose={onCloseAddModal}
            currentsection={'Key Milestones & Deliverable Timelines' || ''}
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
};

export default KeyMilestoneDeliverableTimelines;
