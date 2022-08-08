/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-this-in-sfc */
import Calendar from 'apollo-react-icons/Calendar';
import CalendarCheck from 'apollo-react-icons/CalendarCheck';
import IconButton from 'apollo-react/components/IconButton';
import React from 'react';
import Loader from 'apollo-react/components/Loader';
import Tooltip from 'apollo-react/components/Tooltip';
import { Outgoing, Incoming } from '../../svg';

const SystemIntegrations = ({
  checkSfAnswer,
  sficon,
  integrationmatch,
  integrationvalidation,
  answeronhistory,
  answerdate,
  isAnswerPredicted,
  isAnswered,
  lastAnswer,
  loading,
  changeIcon,
  isCurrentBid,
  sfObject,
  hasDifferentSFanswer,
  answerText
}) => {
  let calendarlogic1 = false;
  let calendarlogic2 = false;
  calendarlogic1 =
    isAnswerPredicted &&
    !loading &&
    !isAnswered(lastAnswer, isAnswerPredicted) &&
    !loading;
  calendarlogic2 = answerdate === 'Not Answered' && !isAnswerPredicted;
  const SalesForceCondition = () => {
    if (
      sficon !== 'n/a' &&
      _.isEmpty(checkSfAnswer) !== true &&
      hasDifferentSFanswer === false
    ) {
      return (
        <Tooltip
          variant="light"
          title={
            sficon !== 'n/a' ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: `<p><b>Source</b><br>${sfObject}<br>Salesforce</p>`
                }}
              />
            ) : null
          }
          placement="top"
        >
          <div>
            <Incoming style={{ fill: '#9E54B0' }} />
          </div>
        </Tooltip>
      );
    }
    if (sficon !== 'n/a' && _.isEmpty(checkSfAnswer) === true) {
      return <Incoming style={{ fill: '#b7b7b7' }} />;
    }
  };
  const QvidianValidation = () => {
    if (integrationvalidation === true && changeIcon === '#00c221') {
      return (
        <Tooltip
          variant="light"
          title={
            integrationmatch ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: `<p><b>Destination</b><br>${integrationmatch}<br>Qvidian</p>`
                }}
              />
            ) : null
          }
          placement="top"
        >
          <div className="outgoing-integration">
            <Outgoing
              className="outgoing-integration"
              style={{ fill: '#00c221' }}
            />
          </div>
        </Tooltip>
      );
    }
    if (integrationvalidation === true) {
      return answerText?.toString().trim().length < 1 ? (
        <Outgoing style={{ fill: '#b7b7b7' }} />
      ) : (
        <Tooltip
          variant="light"
          title={
            integrationmatch ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: `<p><b>Destination</b><br>${integrationmatch}<br>Qvidian</p>`
                }}
              />
            ) : null
          }
          placement="top"
        >
          <div className="outgoing-integration">
            <Outgoing style={{ fill: '#00c221' }} />
          </div>
        </Tooltip>
      );
    }
  };

  const CalendarCondition = () => {
    if (answerdate === 'Not Answered' && !isAnswerPredicted) {
      return (
        <Calendar style={{ color: '#b7b7b7' }} onClick={answeronhistory} />
      );
    }
    if (
      calendarlogic1 &&
      calendarlogic2 === false &&
      answerText?.toString().trim().length < 1
    ) {
      return (
        <Tooltip variant="light" title="Unity Predicted Answer" placement="top">
          <div disabled={!isCurrentBid} style={{ height: '0px', width: '0px' }}>
            <CalendarCheck
              fontSize="22px"
              style={{ color: '#015ff1' }}
              onClick={() => this.handleVerifyPredictedAnsClick(lastAnswer)}
            />
          </div>
        </Tooltip>
      );
    }
    if (
      isAnswered(lastAnswer, isAnswerPredicted) &&
      !loading &&
      changeIcon === '#00c221'
    ) {
      return (
        <div>
          <CalendarCheck
            className="answered"
            style={{ marginLeft: '6px', color: '00c221' }}
            onClick={answeronhistory}
          />
        </div>
      );
    }
    if (
      !isAnswered(lastAnswer, isAnswerPredicted) &&
      !loading &&
      changeIcon === '#b7b7b7'
    ) {
      return (
        <CalendarCheck style={{ color: '#b7b7b7' }} onClick={answeronhistory} />
      );
    }
    if (answerText?.toString().trim().length < 1) {
      return (
        <div>
          <CalendarCheck
            className="answered"
            style={{ marginLeft: '6px', color: '#b7b7b7' }}
            onClick={answeronhistory}
          />
        </div>
      );
    }
    return (
      <div>
        <CalendarCheck
          className="answered"
          style={{ marginLeft: '6px', color: '00c221' }}
          onClick={answeronhistory}
        />
      </div>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            textAlign: 'center',
            outline: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer'
          }}
          className="integration-buttons"
        >
          {SalesForceCondition()}
        </div>
        <div
          style={{
            textAlign: 'center',
            outline: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer'
          }}
          className="integration-buttons"
        >
          {' '}
          {QvidianValidation()}
        </div>
        <IconButton
          style={{
            textAlign: 'center',
            outline: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            color: '#297dfd',
            cursor: 'pointer',
            height: '24px',
            width: '24px'
          }}
          type="button"
          className="integration-buttons"
        >
          {CalendarCondition()}
        </IconButton>{' '}
      </div>
      <div>
        {loading ? (
          <span
            style={{
              marginLeft: '6px',
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
  );
};

export default SystemIntegrations;
