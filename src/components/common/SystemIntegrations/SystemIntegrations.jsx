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
import isEmpty from 'lodash-es/isEmpty';
import Grid from 'apollo-react/components/Grid';
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
  answerText,
  isNotepadOpen,
  handleVerifyPredictedAnsClick
}) => {
  const gridColRatio = isNotepadOpen ? [10, 2] : [10, 2];
  const SalesForceCondition = () => {
    if (
      sficon !== 'n/a' &&
      isEmpty(checkSfAnswer) === false &&
      hasDifferentSFanswer === false
    ) {
      return (
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
        >
          <div>
            <Incoming
              style={{ fill: '#9E54B0', height: '28px' }}
              className="integration-icon"
            />
          </div>
        </Tooltip>
      );
    }
    if (
      sficon !== 'n/a' &&
      isEmpty(sficon) === false &&
      isEmpty(checkSfAnswer) === false
    ) {
      return hasDifferentSFanswer === true ? (
        <Incoming
          className="integration-icon"
          style={{ fill: '#9e54b0', height: '28px', opacity: '50%' }}
        />
      ) : (
        <Incoming
          className="integration-icon"
          style={{ fill: '#b7b7b7', height: '28px' }}
        />
      );
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
                  __html: `<p><b>Destination</b><br>Qvidian</p>`
                }}
              />
            ) : null
          }
          placement="top"
        >
          <Outgoing style={{ fill: '#00c221', height: '28px' }} className="integration-icon" />
        </Tooltip>
      );
    }
    if (integrationvalidation === true) {
      return lastAnswer?.toJS().answer?.toString().trim().length > 0 ? (
        <Tooltip
          variant="light"
          title={
            <div
              dangerouslySetInnerHTML={{
                __html: `<p><b>Destination</b><br>Qvidian</p>`
              }}
            />
          }
          placement="top"
        >
          <div>
            <Outgoing
              style={{ fill: '#00c221', height: '28px' }}
              className="integration-icon"
            />
          </div>
        </Tooltip>
      ) : (
        <Outgoing style={{ fill: '#b7b7b7', height: '28px' }} className="integration-icon" />
      );
    }
  };

  const CalendarCondition = () => {
    if (answerdate === 'Not Answered' && !isAnswerPredicted) {
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
      >
        <Calendar style={{ color: '#b7b7b7' }} className="integration-icon" /></IconButton>
      );
    }
    if (
      isAnswerPredicted &&
      !loading &&
      !isAnswered(lastAnswer, isAnswerPredicted)
    ) {
      return (
        <Tooltip variant="light" title="Unity Predicted Answer" placement="top">
          <IconButton
            disabled={!isCurrentBid}
            style={{ justifyContent: 'start', height: '0' }}
          >
            <CalendarCheck
              fontSize="22px"
              style={{ color: '#015ff1' }}
              className="integration-icon"
              onClick={() => handleVerifyPredictedAnsClick(lastAnswer)}
            />
          </IconButton>
        </Tooltip>
      );
    }
    if (
      isAnswered(lastAnswer, isAnswerPredicted) &&
      !loading &&
      changeIcon === '#00c221'
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
          >
        <CalendarCheck
          className="answered2 integration-icon"
          style={{ marginLeft: '0px', color: '#00c221' }}
        /></IconButton>
      );
    }
    if (
      !isAnswered(lastAnswer, isAnswerPredicted) &&
      !loading &&
      changeIcon === '#b7b7b7'
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
          >
        <CalendarCheck
          style={{ color: '#b7b7b7' }}
          className="integration-icon"
        /></IconButton>
      );
    }
    if (lastAnswer?.toJS().answer?.toString().trim().length > 0 < 1) {
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
          >
        <CalendarCheck
          className="answered"
          style={{ marginLeft: '0px', color: '#b7b7b7' }}
        /></IconButton>
      );
    }
    return (<IconButton
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
    >
     <CalendarCheck
         className="answered1 integration-icon"
        style={{ marginLeft: '0px', color: '#00c221' }}
      /></IconButton>
    );
  };

  return (
    <Grid
      item
      xs={gridColRatio[1]}
      className={
        hasDifferentSFanswer && isCurrentBid
          ? 'validation-wrapper-integration'
          : 'no-integration'
      }
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex' }}>
          {SalesForceCondition()}
          {QvidianValidation()}
          {CalendarCondition()}
        </div>
        <div>
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
