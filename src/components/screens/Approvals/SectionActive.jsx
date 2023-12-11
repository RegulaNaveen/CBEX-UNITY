import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import Grid from 'apollo-react/components/Grid';
import SwitchItem from './SwitchItem';
import ActionButtons from './ActionButtons';
import { getSelectedBid, getQuestion } from '../../../redux/selectors';
import Link from 'apollo-react/components/Link';
import Plus from 'apollo-react-icons/Plus';
import AddQuestionModalComponent from '../../views/modals/AddQuestionModal';
import { shouldShowQuestion } from './utils';
import { getProposalQuestions } from '../../../redux/selectors/proposal';
const SectionActive = ({
  ApprovalSectionId,
  ApprovalSectionTitle = '',
  ApprovalSectionLeftQuestions: leftQues = [],
  ApprovalSectionRightQuestions: rightQues = [],
  setIsAllActiveDisplayed
}) => {
  const { id: proposalId, isCurrent, isEditable } = useSelector(
    getSelectedBid
  )?.toJS();
  console.log('isEditable', isEditable, isCurrent);
  const selectedBidIsCurrent = !!isCurrent || !!isEditable;
  const approvalFilters = useSelector(state => state.approvals.filters);
  const flags = useSelector(state => state.proposal.get('eventflag'));
  const questions = useSelector(getProposalQuestions);
  const questionsMap = questions.reduce((acc, question) => {
    acc[question.questionId] = question;
    return acc;
  }, {});
  // Stores the hash of visible questions
  // Used to decide the visibility of a section
  const [questionVisibility, setQuestionVisibility] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [direction, setDirection] = useState();
  const isAllQuestionsVisible = useMemo(() => {
    const valuesArr = Object.values(questionVisibility) || [];
    if (valuesArr.length > 0 && valuesArr.every(i => i === false)) {
      return false;
    }
    return true;
  }, [questionVisibility]);
  const updateQuestionVisibility = (questionId, value) => {
    setQuestionVisibility(i => {
      return { ...i, [questionId]: value };
    });
  };
  useEffect(() => {
    setIsAllActiveDisplayed(isAllQuestionsVisible);
  }, [isAllQuestionsVisible]);
  const onAddQuestion = value => {
    setDirection(value);
    setShowModal(true);
  };

  const onClose = () => {
    if (showModal) setShowModal(false);
  };
  let leftQuestions = [];
  let RightQuestion = [];
  let duplicateDisable = false;

  if (leftQues && leftQues.length) {
    leftQuestions = leftQues
      .map(item => {
        const questionObj = questionsMap[item];
        return questionObj;
      })
      .filter(
        value => value && value?.answerConfiguration?.type !== 'statement'
      );
    leftQuestions = leftQuestions.filter(value => {
      const isShowQuestion = shouldShowQuestion(value, approvalFilters, flags);
      return isShowQuestion;
    });
    leftQuestions = leftQuestions.every(value => value.isCustomQuestion);
  }

  if (rightQues && rightQues.length) {
    RightQuestion = rightQues
      .map(item => {
        const questionObj = questionsMap[item];
        return questionObj;
      })
      .filter(
        value => value && value?.answerConfiguration?.type !== 'statement'
      );
    RightQuestion = RightQuestion.filter(value => {
      const isShowQuestion = shouldShowQuestion(value, approvalFilters, flags);
      return isShowQuestion;
    });
  }

  if (!RightQuestion.length && leftQuestions) {
    duplicateDisable = true;
  }

  return (
    <Grid container className="approval-ques">
      <Grid item xs={12} className="approval-sec-title">
        {ApprovalSectionTitle}
      </Grid>
      <Grid item xs={8} className="approval-ques-left">
        {!isEmpty(leftQues) &&
          leftQues.map(item => (
            <SwitchItem
              questionId={item}
              approvalSectionTitle={ApprovalSectionTitle}
              key={item}
              disabled={!selectedBidIsCurrent}
              updateQuestionVisibility={updateQuestionVisibility}
              highlightQuestionId={`${item}-approval-${ApprovalSectionId}-left-ques`}
            />
          ))}
        {isCurrent && (
          <>
            <div className="add-question">
              <Link
                style={{ borderBottom: 'none' }}
                //onClick={() => onAddQuestion(title)}
                size="small"
                onClick={() => onAddQuestion('left')}
              >
                <Plus
                  className="plus-icon-add-new-question"
                  fontSize="extraSmall"
                />
                <span style={{ verticalAlign: 'top' }}> Add New Question</span>
              </Link>
            </div>
          </>
        )}
      </Grid>
      <Grid item xs={4} className="approval-ques-right">
        {!isEmpty(rightQues) &&
          rightQues.map(item => (
            <SwitchItem
              questionId={item}
              approvalSectionTitle={ApprovalSectionTitle}
              key={item}
              disabled={!selectedBidIsCurrent}
              updateQuestionVisibility={updateQuestionVisibility}
              highlightQuestionId={`${item}-approval-${ApprovalSectionId}-right-ques`}
            />
          ))}
      </Grid>

      <Grid item xs={12} className="approval-ques-actions">
        <ActionButtons
          sectionId={ApprovalSectionId}
          proposalId={proposalId}
          selectedBidIsCurrent={selectedBidIsCurrent}
          duplicateDisable={duplicateDisable}
        />
      </Grid>
      {showModal && (
        <AddQuestionModalComponent
          onClose={onClose}
          currentsection={ApprovalSectionTitle}
          tabFlag="Approvals"
          tabId={ApprovalSectionId}
          direction={direction}
        />
      )}
    </Grid>
  );
};

SectionActive.propTypes = {
  ApprovalSectionId: PropTypes.string.isRequired,
  ApprovalSectionTitle: PropTypes.string.isRequired,
  ApprovalSectionLeftQuestions: PropTypes.array.isRequired,
  ApprovalSectionRightQuestions: PropTypes.array.isRequired,
  setIsAllActiveDisplayed: PropTypes.func.isRequired
};

export default SectionActive;
