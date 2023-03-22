/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-this-in-sfc */
import Calendar from 'apollo-react-icons/Calendar';
import CalendarCheck from 'apollo-react-icons/CalendarCheck';
import IconButton from 'apollo-react/components/IconButton';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'apollo-react/components/Loader';
import Tooltip from 'apollo-react/components/Tooltip';
import isEmpty from 'lodash/isEmpty';
import Grid from 'apollo-react/components/Grid';
import indeterminate from '../../../../img/Indeterminate.svg';
import { Outgoing, Incoming, CalendarWithNum } from '../../svg';

const SystemIntegrations = ({
  checkSfAnswer,
  sficon,
  destinationArray,
  integrationvalidation,
  answeronhistory,
  answerdate,
  isAnswerPredicted,
  isAnswered,
  lastAnswer,
  loading,
  changeIcon,
  isCurrentBid,
  hasDifferentSFanswer,
  isNotepadOpen,
  disabled,
  answers,
  bidAnswerCopy = false,
  latestAnsweredBidNo = null
}) => {
  const answer = answers.reverse();
  const [latestSfAnswer, setLatestSfAnswer] = useState(false);
  const [
    canShowCarryForwardIndication,
    setCanShowCarryForwardIndication
  ] = useState(false);

  const allFlags = useSelector(state => state.proposal.get('eventflag'));

  useEffect(() => {
    if (
      answers?.get(0)?.get('userName') === 'AnswerPulledFromSalesforce' &&
      !isEmpty(answers?.get(0)?.get('answer'))
    ) {
      setLatestSfAnswer(true);
    } else {
      setLatestSfAnswer(false);
    }
  }, [answers?.get(0)?.get('answer')]);

  useEffect(() => {
    let willShowCarryForwardIndication = canShowCarryForwardIndication;
    if (Object.keys(allFlags).length > 0) {
      if (allFlags['carryForwardAnswerFlag']) {
        willShowCarryForwardIndication = true;
      } else {
        willShowCarryForwardIndication = false;
      }

      if (willShowCarryForwardIndication !== canShowCarryForwardIndication) {
        setCanShowCarryForwardIndication(willShowCarryForwardIndication);
      }
    }
  }, [allFlags]);

  const gridColRatio = isNotepadOpen ? [10, 2] : [11, 1];
  const SalesForceCondition = () => {
    if (
      (sficon !== 'n/a' && isEmpty(checkSfAnswer) === false) ||
      latestSfAnswer
    ) {
      return hasDifferentSFanswer === false ? (
        <Tooltip
          variant="light"
          title={
            sficon !== 'n/a' ? (
              <p>
                <b>Source</b>
                <br />
                CRM
              </p>
            ) : null
          }
          placement="top"
          tabIndex={-1}
        >
          <div>
            <Incoming
              style={{ fill: '#9E54B0', height: '28px' }}
              className="integration-icon"
            />
          </div>
        </Tooltip>
      ) : (
        <Tooltip
          variant="light"
          title={
            sficon !== 'n/a' ? (
              <p>
                <b>Source</b>
                <br />
                CRM
              </p>
            ) : null
          }
          placement="top"
          tabIndex={-1}
        >
          <div>
            <Incoming
              className="integration-icon"
              style={{ fill: '#9e54b0', height: '28px', opacity: '50%' }}
            />
          </div>
        </Tooltip>
      );
    }
    if (
      sficon !== 'n/a' &&
      isEmpty(sficon) === false &&
      isEmpty(checkSfAnswer) === true
    ) {
      return hasDifferentSFanswer === true ? (
        <Tooltip
          variant="light"
          title={
            sficon !== 'n/a' ? (
              <p>
                <b>Source </b>
                <br />
                CRM
              </p>
            ) : null
          }
          placement="top"
          tabIndex={-1}
        >
          <div>
            <Incoming
              className="integration-icon"
              style={{ fill: '#9e54b0', height: '28px', opacity: '50%' }}
            />
          </div>
        </Tooltip>
      ) : (
        <Tooltip
          variant="light"
          title={
            sficon !== 'n/a' ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: `<p><b>Source</b><br>CRM</p>`
                }}
              />
            ) : null
          }
          placement="top"
          tabIndex={-1}
        >
          <div>
            <Incoming
              className="integration-icon1"
              style={{ fill: '#b7b7b7', height: '28px' }}
            />
          </div>
        </Tooltip>
      );
    }
    if (isEmpty(sficon)) return null;
  };

  const QvidianValidation = () => {
    if (integrationvalidation === true && changeIcon === '#00c221') {
      return (
        <Tooltip
          variant="light"
          title={
            integrationvalidation ? (
              <p>
                <b>
                  {destinationArray?.length > 1
                    ? 'Destinations'
                    : 'Destination'}
                </b>
                <br />
                {destinationArray.map(item => {
                  return (
                    <p>
                      {item}
                      <br />
                    </p>
                  );
                })}
              </p>
            ) : (
              ''
            )
          }
          placement="top"
          tabIndex={-1}
        >
          <div>
            <Outgoing
              style={{ fill: '#00c221', height: '28px' }}
              className="integration-icon"
            />
          </div>
        </Tooltip>
      );
    }
    if (integrationvalidation === true) {
      return lastAnswer
        ?.toJS()
        .answer?.toString()
        .trim().length > 0 ? (
        <Tooltip
          variant="light"
          title={
            integrationvalidation ? (
              <p>
                <b>
                  {destinationArray?.length > 1
                    ? 'Destinations'
                    : 'Destination'}
                </b>
                <br />
                {destinationArray.map(item => {
                  return (
                    <p>
                      {item}
                      <br />
                    </p>
                  );
                })}
              </p>
            ) : (
              ''
            )
          }
          placement="top"
          tabIndex={-1}
        >
          <div>
            <Outgoing
              style={{ fill: '#00c221', height: '28px' }}
              className="integration-icon"
            />
          </div>
        </Tooltip>
      ) : (
        <Tooltip
          variant="light"
          title={
            integrationvalidation ? (
              <p>
                <b>
                  {destinationArray?.length > 1
                    ? 'Destinations'
                    : 'Destination'}
                </b>
                <br />
                {destinationArray.map(item => {
                  return (
                    <p>
                      {item}
                      <br />
                    </p>
                  );
                })}
              </p>
            ) : (
              ''
            )
          }
          placement="top"
          tabIndex={-1}
        >
          <div className="wrap-integration">
            <Outgoing
              style={{ fill: '#b7b7b7', height: '28px' }}
              className="integration-icon"
            />
          </div>
        </Tooltip>
      );
    }
  };

  const CalendarCondition = () => {
    // calculate to show carry forward indication icon only if flag is enabled
    if (canShowCarryForwardIndication) {
      let showCarryForwardIndication = false;
      if (bidAnswerCopy && latestAnsweredBidNo !== null) {
        showCarryForwardIndication = true;
      }

      if (showCarryForwardIndication) {
        return (
          <Tooltip
            variant="light"
            title={`Answer derived from bid ${latestAnsweredBidNo}`}
            placement="top"
            tabIndex={-1}
          >
            <span>
              <IconButton
                style={{
                  height: '24px',
                  width: '24px',
                  paddingLeft: '0px',
                  paddingRight: '0px'
                }}
                onClick={answeronhistory}
                className="bluecalendar"
                tabIndex={-1}
              >
                <CalendarWithNum number={latestAnsweredBidNo} />
              </IconButton>
            </span>
          </Tooltip>
        );
      }
    }

    if (
      (answerdate === 'Not Answered' && !isAnswerPredicted) ||
      (lastAnswer
        ?.toJS()
        .answer?.toString()
        .trim().length < 1 &&
        answer?.get(1)?.get('userName') === 'UnityPredictedAnswer')
    ) {
      return (
        <IconButton
          style={{
            textAlign: 'center',
            outline: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            color: '#297dfd',
            cursor: 'pointer',
            width: '24px',
            height: '24px'
          }}
          type="button"
          onClick={answeronhistory}
          className="integration-buttons"
          tabIndex={-1}
        >
          <Calendar style={{ color: '#b7b7b7' }} className="integration-icon" />
        </IconButton>
      );
    }
    if (
      isAnswerPredicted &&
      !loading &&
      !isEmpty(lastAnswer?.get('answer')) &&
      !isAnswered(lastAnswer, isAnswerPredicted)
    ) {
      return (
        <Tooltip
          variant="light"
          title={
            disabled ? 'Question locked by user' : 'Unity Predicted Answer'
          }
          placement="top"
          tabIndex={-1}
        >
          <span>
            <IconButton
              disabled={disabled}
              style={{
                height: '24px',
                width: '24px',
                paddingLeft: '0px',
                paddingRight: '0px'
              }}
              className="bluecalendar"
              tabIndex={-1}
            >
              <CalendarCheck
                fontSize="22px"
                style={{ color: '#015ff1' }}
                className="integration-icon"
                onClick={answeronhistory}
              />
            </IconButton>
          </span>
        </Tooltip>
      );
    }
    if (
      isAnswered(lastAnswer, isAnswerPredicted) &&
      !loading &&
      changeIcon === '#00c221' &&
      answer?.get(1)?.get('userName') !== 'UnityPredictedAnswer'
    ) {
      return (
        <IconButton
          style={{
            textAlign: 'center',
            outline: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            color: '#297dfd',
            cursor: 'pointer',
            width: '24px',
            height: '24px'
          }}
          type="button"
          onClick={answeronhistory}
          className="integration-buttons"
          tabIndex={-1}
        >
          <CalendarCheck
            className="answered2 integration-icon"
            style={{ marginLeft: '0px', color: '#00c221' }}
          />
        </IconButton>
      );
    }
    if (
      !isAnswered(lastAnswer, isAnswerPredicted) &&
      !loading &&
      changeIcon === '#b7b7b7' &&
      answer?.get(1)?.get('userName') !== 'UnityPredictedAnswer'
    ) {
      return (
        <IconButton
          style={{
            textAlign: 'center',
            outline: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            color: '#297dfd',
            cursor: 'pointer',
            width: '24px',
            height: '24px'
          }}
          type="button"
          onClick={answeronhistory}
          className="integration-buttons"
          tabIndex={-1}
        >
          <img
            src={indeterminate}
            alt="indeterminate"
            className="integration-icon"
          />
        </IconButton>
      );
    }
    if (
      lastAnswer
        ?.toJS()
        .answer?.toString()
        .trim().length < 1 &&
      answer?.get(1)?.get('userName') !== 'UnityPredictedAnswer'
    ) {
      return (
        <IconButton
          style={{
            textAlign: 'center',
            outline: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            color: '#297dfd',
            cursor: 'pointer',
            width: '24px',
            height: '24px'
          }}
          type="button"
          onClick={answeronhistory}
          className="integration-buttons"
          tabIndex={-1}
        >
          <img src={indeterminate} alt="indeterminate" className="answered" />
        </IconButton>
      );
    }
    return (
      <IconButton
        style={{
          textAlign: 'center',
          outline: 'none',
          border: 'none',
          backgroundColor: 'transparent',
          color: '#297dfd',
          cursor: 'pointer',
          width: '24px',
          height: '24px'
        }}
        type="button"
        onClick={answeronhistory}
        className="integration-buttons"
        tabIndex={-1}
      >
        <CalendarCheck
          className="answered1 integration-icon"
          style={{ marginLeft: '0px', color: '#00c221' }}
        />
      </IconButton>
    );
  };

  return (
    <Grid
      item
      xs={gridColRatio[1]}
      className={`actions-grid-item ${
        hasDifferentSFanswer && isCurrentBid
          ? 'validation-wrapper-integration'
          : 'no-integration'
      }`}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div style={{ display: 'flex' }}>
          {SalesForceCondition()}
          {QvidianValidation()}
          {CalendarCondition()}
        </div>
        <div style={{ display: 'flex', height: '20px', width: '24px' }}>
          {loading ? (
            <span
              style={{
                marginLeft: '0px',
                marginTop: '6px',
                position: 'relative',
                top: '15px'
              }}
            >
              <Loader
                isInner
                size={20}
                style={{
                  width: '20px',
                  height: '20px'
                }}
              />
            </span>
          ) : null}
        </div>
      </div>
    </Grid>
  );
};

export default SystemIntegrations;
