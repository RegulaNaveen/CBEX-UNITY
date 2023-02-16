import React, { useEffect, useState, useContext } from 'react';
import Plus from 'apollo-react-icons/Plus';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'apollo-react/components/Link';
import Autocomplete from '../../../common/atoms/inputs/AutoComplete';
import Grid from 'apollo-react/components/Grid';
import SFAnswerValidationWrapper from '../../../common/SFAnswerValidationWrapper';
import SystemIntegrations from '../../../common/SystemIntegrations/SystemIntegrations';
import {
  getQuestion,
  selectSections,
  selectFilteredSections,
  selectIsQuestionsFilterEnabled,
  isSetQuestionLoading,
  getSelectedBid
} from '../../../../redux/selectors';
import {
  getUserEmail,
  getUserId,
  getUserName
} from '../../../../SessionHandler';
import setProposalAnswerData from '../../../../redux/actions/proposal-actions';
import QuestionsSectionMapping from '../QuestionsSectionMapping';
import CollapsibleList from '../../../common/CollapsibleList';
import AddQuestionModalComponent from '../../../views/modals/AddQuestionModal';
import { SocketContext } from '../../../../context/SocketContext';

const AnswerInput = () => {
  const [showModal, setShowModal] = useState(false);
  const sections = useSelector(selectSections);
  const isSetQuestionLoadingData = useSelector(isSetQuestionLoading);
  const isQuestionsFiltersEnabled = useSelector(selectIsQuestionsFilterEnabled);
  const filteredSections = useSelector(selectFilteredSections);
  const allSections = isQuestionsFiltersEnabled ? filteredSections : sections;
  const selectedBid = useSelector(getSelectedBid);
  const isCurrentBid = selectedBid.get('isCurrent');
  const socketContext = useContext(SocketContext);
  const allFlags = useSelector((state) => state.proposal.get('eventflag'));
  const { questionLockWrapper, questionUnlockWrapper } = socketContext;
  let answerValue = '';
  let checkSFAnswer = [];
  let currentSFAnswer;
  const proposalTeam = [];
  const questionData = Object.keys(proposalTeam[0].questions).map((item) => {
    return proposalTeam[0]?.questions[item];
  });
  console.log('keys', questionData);

  const getUserData = () => ({
    name: getUserName(),
    email: getUserEmail(),
    role: getUserId()
  });

  const isQuestionLocked = () => {
    return (
      questionData?.questionLockInfo && questionData?.questionLockInfo?.userInfo
    );
  };
  const isQuestionLockedByOther = () => {
    return (
      isQuestionLocked() &&
      getUserEmail() !== questionData?.questionLockInfo?.userInfo
    );
  };

  const checkDisableFlag = () => {
    if (isQuestionLockedByOther() || !isCurrentBid || !allFlags.proposalTeamTab)
      return true;

    return false;
  };

  // const inputProps = {
  //   question,
  //   userData: getUserData(),
  //   socketContext,
  //   checkDisableFlag,
  //   setShowLoader,
  //   questionIndex
  // };
  allSections.map((item) => {
    if (item.get('sectionName') === 'Proposal Team') {
      proposalTeam.push(item.toJS());
      checkSFAnswer.push(item.toJS().checkSfAnswer);
    }
    console.log('proposalTeam', proposalTeam);
  });

  useEffect(() => {
    if (showModal) {
      setTimeout(() => setShowModal(false), 1000);
    }
  }, [isSetQuestionLoadingData]);

  const onCloseAddModal = () => {
    setShowModal((prev) => !prev);
  };

  //   handlePropsalChange = (textValue, lastValue, reason) => {
  //     try {
  //       setProposalAnswerData(
  //         context,
  //         proposalId,
  //         questionId,
  //         textValue,
  //         userData
  //       ).then(() => {
  //         const [deletedVal] = xor(
  //           textValue?.trim() ? textValue?.trim().split(',') : [],
  //           lastValue?.trim() ? lastValue?.trim().split(',') : []
  //         );
  //         const [deletedEmail] = String(deletedVal).match(
  //           /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
  //         );
  //         if (reason === 'remove-option' && deletedEmail) {
  //           setAnswerLoading(questionId, true);
  //           const { sectionName, sectionOrder } = section.toJS();
  //           deleteProposalUser(
  //             proposalId,
  //             deletedEmail,
  //             sectionOrder,
  //             sectionName
  //           ).then(() => {
  //             setAnswerLoading(questionId, false);
  //           });
  //         }
  //       });
  //       this.trackMatomoEventSubmitAnswer(textValue);
  //     } catch (error) {
  //       console.log('error :>> ', error);
  //     }
  //   };
  return (
    <>
      <Grid>
        {Object.keys(proposalTeam[0].questions).map((item) => {
          return (
            <>
              <p className="proposal-team-title">
                {proposalTeam[0].questions[item].questionText}
              </p>
              <Grid className="proposal-team-answer">
                <Autocomplete
                  sectionName={proposalTeam[0].sectionName}
                  onFocus={() => {
                    // call question lock
                    questionLockWrapper(
                      proposalTeam[0].questions[item].questionId
                    );
                    // this.setSelectRow(true);
                  }}
                  onBlur={() => {
                    questionUnlockWrapper(
                      proposalTeam[0].questions[item].questionId
                    );

                    // this.setSelectRow(false);
                  }}
                  // onChange={handlePropsalChange}
                  text={answerValue}
                  disabled={checkDisableFlag()}
                />
              </Grid>
              <Grid>
                {/* <SystemIntegrations
                checkSfAnswer={checkSFAnswer}
                sficon={sficon}
                destinationArray={destinationArray}
                answers={answers}
                gridColRatio={gridColRatio}
                integrationmatch={integrationmatch}
                integrationvalidation={integrationvalidation}
                priceModelerIntegration={priceModelerIntegration}
                answeronhistory={this.displayAnswerOnHistory}
                answerdate={answerDate}
                isAnswerPredicted={isAnswerPredicted}
                isAnswered={this.isAnswered}
                lastAnswer={lastAnswer}
                iconColor={iconColor}
                loading={loading}
                NaLoading={NaLoading}
                showNaCheckbox={showNaCheckbox}
                isNotepadOpen={isNotepadOpen}
                changeIcon={changeIcon}
                isCurrentBid={isCurrentBid}
                sfObject={sfObject}
                answer={answerValue}
                answerText={answerText}
                handleVerifyPredictedAnsClick={
                  this.handleVerifyPredictedAnsClick
                }
                hasDifferentSFanswer={hasDifferentSFanswer}
                disabled={integrationLocked}
                /> */}
              </Grid>
            </>
          );
        })}
      </Grid>
      <div className="add-question">
        <Link
          style={{ borderBottom: 'none' }}
          onClick={() => setShowModal(true)}
          size="small"
        >
          <Plus fontSize="extraSmall" />
          <span style={{ verticalAlign: 'top' }}> Add New Question</span>
        </Link>
      </div>
      {showModal && <AddQuestionModalComponent onClose={onCloseAddModal} />}
    </>
  );
};
export default AnswerInput;
