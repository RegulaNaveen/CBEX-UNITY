import ChevronDown from 'apollo-react-icons/ChevronDown';
import ChevronRight from 'apollo-react-icons/ChevronRight';
import React, { useState, useEffect } from 'react';
import { neutral8 } from 'apollo-react/colors';
import IconButton from 'apollo-react/components/IconButton';
import Table, {
  compareStrings,
  createStringSearchFilter
} from 'apollo-react/components/Table';
import Tooltip from 'apollo-react/components/Tooltip';
import Typography from 'apollo-react/components/Typography';
import Header from './Header';
import Button from 'apollo-react/components/Button';
import { DEFAULT, EMAIL_TEMPLATES } from '../../../../constants/app';
import EmailClick from 'apollo-react-icons/EmailClick';
import Rocket from '../../../../../img/rocket.svg';
import TextField from 'apollo-react/components/TextField';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'apollo-react/components/Loader';
import {
  getProposalDetails,
  getSelectedBid,
  selectSections
} from '../../../../redux/selectors';
import { generateEmailTemplateEmail } from '../../../../utils/emailUtils';
import { updateEventSubjectBody } from '../../../../utils/utils';
import { isMap } from 'lodash';
import {
  getOpportunityData,
  selectActiveTeamQuestions,
  selectProposalQuestions
} from '../../../../redux/selectors/proposal';
import processRecipientRule from '../../../../utils/processRecipientRule';
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import ANSWER_TYPES from '../../../../constants/answerTypes';
import {
  selectAutoNavigatedToCurrentResult,
  selectCurrentSearchResult
} from '../../../../redux/selectors/search';
import { autoNavigationCompletedAction } from '../../../../redux/actions/search-actions';
import classNames from 'classnames';

const EmailTemplates = () => {
  const { emailTemplatesList, isLoadingEmailTemplates } = useSelector(
    state => state.emailTemplates
  );
  const [expandedRows, setExpandedRows] = useState([]);
  const selectedBid = useSelector(getSelectedBid);
  const { id: proposalId } = useSelector(state =>
    state.proposal.get('selectedBid')
  )?.toJS();
  const isCurrentBid = selectedBid.get('isCurrent');
  const sections = useSelector(selectSections);
  const allSections = sections || [];
  const proposalDetail = useSelector(getProposalDetails);
  const opportunityData = useSelector(getOpportunityData);
  const proposalQuestions = useSelector(selectProposalQuestions);
  const proposalTeamQuestions = useSelector(selectActiveTeamQuestions);
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const autoNavigatedToCurrentResult = useSelector(
    selectAutoNavigatedToCurrentResult
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!autoNavigatedToCurrentResult && currentSearchResult) {
      if (
        emailTemplatesList
          .filter(emailTemplate => {
            return (
              emailTemplate.EmailTemplateOpportunityTypes &&
              emailTemplate.EmailTemplateOpportunityTypes.length > 0 &&
              typeof emailTemplate.EmailTemplateOpportunityTypes === 'string' &&
              emailTemplate.EmailTemplateOpportunityTypes.split(',').includes(
                selectedBid.toJS().opportunityType
              )
            );
          })
          .map(template => template.EmailTemplateId)
          .includes(currentSearchResult.searchIndex)
      ) {
        // allow others to collapse before scrollIntoView
        setTimeout(() => {
          if (document.getElementById(currentSearchResult.searchIndex)) {
            document
              .getElementById(currentSearchResult.searchIndex)
              .scrollIntoView({
                behaviour: 'smooth',
                block: 'center',
                inline: 'nearest'
              });
          }
          dispatch(autoNavigationCompletedAction());
        }, 0);
      }
    }
  }, [emailTemplatesList, currentSearchResult, autoNavigatedToCurrentResult]);

  const handleToggleRow = EmailTemplateId => {
    setExpandedRows(expandedRows =>
      expandedRows.includes(EmailTemplateId)
        ? expandedRows.filter(id => id !== EmailTemplateId)
        : [...expandedRows, EmailTemplateId]
    );
  };

  const ExpandCell = ({
    row: { EmailTemplateId, handleToggleRow, expanded },
    row
  }) => {
    return (
      <div
        id={EmailTemplateId}
        className={classNames({
          'search-highlight':
            currentSearchResult &&
            currentSearchResult.searchIndex === EmailTemplateId
        })}
      >
        <IconButton
          data-testid="expand-cell"
          id="expand"
          size="small"
          onClick={() => handleToggleRow(EmailTemplateId)}
        >
          {expanded ? <ChevronDown /> : <ChevronRight />}
        </IconButton>
      </div>
    );
  };

  const Cell = ({ row, column }) => {
    if (column.accessor === 'EmailTemplateDescription' && !row.expanded) {
      return (
        <Tooltip subtitle={row[column.accessor]} placement="top">
          <div
            className={classNames({
              'search-highlight':
                currentSearchResult &&
                currentSearchResult.searchIndex === row.EmailTemplateId
            })}
          >
            {row[column.accessor]}
          </div>
        </Tooltip>
      );
    }
    return (
      <div
        className={classNames({
          'search-highlight':
            currentSearchResult &&
            currentSearchResult.searchIndex === row.EmailTemplateId,
          activeRow: row.expanded
        })}
      >
        {row[column.accessor]}
      </div>
    );
  };

  const TextFieldFilter = ({ accessor, filters, updateFilterValue }) => {
    return (
      <TextField
        value={filters[accessor]}
        name={accessor}
        onChange={updateFilterValue}
        maxWidth={160}
        margin="none"
        size="small"
        style={{ marginTop: 10 }}
      />
    );
  };

  const columns = [
    {
      header: '',
      accessor: 'expand',
      customCell: ExpandCell
    },
    {
      header: 'Template',
      accessor: 'EmailTemplateName',
      customCell: Cell,
      sortFunction: compareStrings,
      filterFunction: createStringSearchFilter('EmailTemplateName'),
      filterComponent: TextFieldFilter
    },
    {
      header: 'Summary',
      accessor: 'EmailTemplateDescription',
      customCell: Cell,
      sortFunction: compareStrings,
      filterFunction: createStringSearchFilter('EmailTemplateDescription'),
      filterComponent: TextFieldFilter
    }
  ];

  const getRolesAndEmails = (values, proposalTeamQues) => {
    return (
      values &&
      values.map(item => {
        if (item.Type === 'Email') return item.Value;
        return (
          proposalTeamQues.find(ques => ques.questionId === item.Value)
            ?.questionText || ''
        );
      })
    );
  };

  const getEmailsTooltipInfo = rowInfo => {
    const availableProposalTeamQuestions = proposalTeamQuestions?.filter(
      question =>
        question.opportunityType
          .split(',')
          .includes(selectedBid.toJS().opportunityType)
    );
    return rowInfo?.map((item, index) => {
      if (item.Type == 'EmailGroup') {
        return (
          <span key={index}>
            <Tooltip
              data-testid="tooltip-btn"
              title={EMAIL_TEMPLATES.EMAILS_IN_THIS_GROUP}
              subtitle={getRolesAndEmails(
                item?.GroupValues,
                proposalTeamQuestions
              )}
              placement="top"
            >
              <span>
                {index !== 0 && <span>, </span>}
                {item?.GroupName}
              </span>
            </Tooltip>
          </span>
        );
      } else if (item.Type == 'Role') {
        const proposalTeamQuestion = availableProposalTeamQuestions.find(
          question =>
            question.questionText.toLowerCase() === item.Value.toLowerCase()
        );
        if (proposalTeamQuestion && proposalTeamQuestion?.email.length) {
          return (
            <span key={index}>
              <Tooltip
                data-testid="tooltip-btn"
                title={EMAIL_TEMPLATES.EMAILS_IN_THIS_GROUP}
                subtitle={proposalTeamQuestion?.email.join(',')}
                placement="top"
              >
                <span>
                  {index !== 0 && <span>, </span>}
                  {proposalTeamQuestion?.questionText}
                </span>
              </Tooltip>
            </span>
          );
        } else {
          return (
            <span>
              {index !== 0 && <span>, </span>}
              {proposalTeamQuestion?.questionText}
            </span>
          );
        }
      } else {
        return (
          <span key={index}>
            {index !== 0 && <span>, </span>}
            {item?.Value}
          </span>
        );
      }
    });
  };

  const processRole = (value, tempQuestion) => {
    const data = [];
    const question = tempQuestion.find(
      question => question.questionId === value.Value
    );
    if (question) {
      const answer = question.answers;
      if (answer && answer.length) {
        const lastAnswerTO = answer[answer.length - 1];
        const answerData = lastAnswerTO.answer;
        if (answerData && answerData.length) {
          try {
            const splitToEmail = answerData?.split(',');
            if (Array.isArray(splitToEmail)) {
              for (let i = 0; i < splitToEmail.length; i++) {
                const breakEmail = splitToEmail[i].split('(');
                let parseEmail = breakEmail[1].substring(
                  0,
                  breakEmail[1].length - 1
                );
                data.push(parseEmail);
              }
            }
          } catch (error) {
            console.log('error', error);
          }
        }
      }
    }
    return data;
  };

  const processGroup = (value, tempQuestion) => {
    const data = [];
    const groupValue = value.GroupValues;
    if (groupValue && Array.isArray(groupValue) && groupValue.length) {
      groupValue.forEach(item => {
        if (item.Type === 'Email') {
          data.push(item.Value);
        }
        if (item.Type === 'Role') {
          const result = processRole(item, tempQuestion);
          data.push(...result);
        }
      });
    }
    return data;
  };

  const handleSendEmailClick = async row => {
    let EmailTemplateTORolesAnswer = [];
    let EmailTemplateCCRoleAnswer = [];
    let tempQuestion = [];
    let ProposalTeamQuestion = allSections.filter(
      item => item.get('sectionName') === 'Proposal Team'
    );
    ProposalTeamQuestion = ProposalTeamQuestion.getIn([
      'Proposal Team',
      'questions'
    ]);
    ProposalTeamQuestion = ProposalTeamQuestion?.toJS() || {};
    for (const key in ProposalTeamQuestion) {
      tempQuestion.push(ProposalTeamQuestion[key]);
    }
    const {
      RecipientRuleToAnswer,
      RecipientRuleCCAnswer
    } = processRecipientRule(
      row?.EmailTemplateRecipientRule,
      proposalQuestions
    );

    if (RecipientRuleToAnswer && RecipientRuleToAnswer.length) {
      RecipientRuleToAnswer.forEach(value => {
        if (value && value.Type === 'Email') {
          EmailTemplateTORolesAnswer.push(value.Value);
        }
        if (value.Type === 'Role') {
          const roleResult = processRole(value, tempQuestion);
          EmailTemplateTORolesAnswer.push(...roleResult);
        }
        if (value.Type === 'EmailGroup') {
          const groupResult = processGroup(value, tempQuestion);
          EmailTemplateTORolesAnswer.push(...groupResult);
        }
      });
    }
    if (RecipientRuleCCAnswer && RecipientRuleCCAnswer.length) {
      RecipientRuleCCAnswer.forEach(value => {
        if (value && value.Type === 'Email') {
          EmailTemplateCCRoleAnswer.push(value.Value);
        }
        if (value.Type === 'Role') {
          const roleResult = processRole(value, tempQuestion);
          EmailTemplateCCRoleAnswer.push(...roleResult);
        }
        if (value.Type === 'EmailGroup') {
          const groupResult = processGroup(value, tempQuestion);
          EmailTemplateCCRoleAnswer.push(...groupResult);
        }
      });
    }

    if (row?.EmailTemplateTO && row?.EmailTemplateTO?.length) {
      row.EmailTemplateTO.forEach(value => {
        if (value && value.Type === 'Email') {
          EmailTemplateTORolesAnswer.push(value.Value);
        }
        if (value.Type === 'Role') {
          const roleResult = processRole(value, tempQuestion);
          EmailTemplateTORolesAnswer.push(...roleResult);
        }
        if (value.Type === 'EmailGroup') {
          const groupResult = processGroup(value, tempQuestion);
          EmailTemplateTORolesAnswer.push(...groupResult);
        }
      });
    }
    if (row?.EmailTemplateCC && row?.EmailTemplateCC?.length) {
      row.EmailTemplateCC.forEach(value => {
        if (value && value.Type === 'Email') {
          EmailTemplateCCRoleAnswer.push(value.Value);
        }
        if (value.Type === 'Role') {
          const result = processRole(value, tempQuestion);
          EmailTemplateCCRoleAnswer.push(...result);
        }
        if (value.Type === 'EmailGroup') {
          const groupResult = processGroup(value, tempQuestion);
          EmailTemplateCCRoleAnswer.push(...groupResult);
        }
      });
    }
    EmailTemplateTORolesAnswer = [...new Set(EmailTemplateTORolesAnswer)];
    EmailTemplateCCRoleAnswer = [...new Set(EmailTemplateCCRoleAnswer)];

    const placeholderData = {
      proposalDetail,
      proposalUsers:
        isMap(opportunityData) &&
        opportunityData?.toJS()[`${proposalId}`]?.proposalUsers,
      proposalQuestions
    };
    const subject = row?.EmailTemplateSubject || '';
    const updatedSubject = updateEventSubjectBody(
      subject,
      placeholderData,
      'subject'
    );
    const subjectStr = encodeURIComponent(
      updatedSubject.replace(new RegExp('\\n', 'g'), ' ')
    );
    const updatedBody = updateEventSubjectBody(
      row.EmailTemplateBody,
      placeholderData,
      'body'
    );
    if (updatedBody) {
      const blob = new Blob([updatedBody], { type: 'text/html' });
      const clipboardItem = new window.ClipboardItem({ 'text/html': blob });
      await navigator.clipboard.write([clipboardItem]);
    }

    window.open(
      generateEmailTemplateEmail(
        subjectStr,
        EmailTemplateTORolesAnswer,
        EmailTemplateCCRoleAnswer,
        updatedBody
      )
    );
  };

  const getQuestion = questionId => {
    const question = proposalQuestions.find(
      question => question.questionId === questionId
    );
    return question?.questionText;
  };

  const renderRecipientRuleQuestionAnswers = group => {
    return group.map(groupItem => {
      return groupItem.RecipientRules.map(item => {
        switch (item.RecipientRuleAnswerType) {
          case ANSWER_TYPES.TEXT:
          case ANSWER_TYPES.NUMBER:
          case ANSWER_TYPES.YES_NO:
            return (
              <div className="recipient-answers">
                <p>{getQuestion(item.QuestionId)}</p>
                <ul>
                  {item.RecipientRuleAnswer.map(answer => {
                    return <li>{answer}</li>;
                  })}
                </ul>
              </div>
            );
          case ANSWER_TYPES.DATE:
            return (
              <div className="recipient-answers">
                <p>{getQuestion(item.QuestionId)}</p>
                <ul>
                  <li>{item.RecipientRuleAnswer}</li>
                </ul>
              </div>
            );
          case ANSWER_TYPES.CHECKBOX:
          case ANSWER_TYPES.SELECT:
          case ANSWER_TYPES.SELECT_LOOKUP:
          case ANSWER_TYPES.RADIO:
          case ANSWER_TYPES.MULTI_SELECT:
          case ANSWER_TYPES.MULTI_SELECT_LOOKUP:
            return (
              <div className="recipient-answers">
                <p>{getQuestion(item.QuestionId)}</p>
                <div>
                  <ul>
                    {item.RecipientRuleAnswer.map(answer => {
                      return <li>{answer.Value}</li>;
                    })}
                  </ul>
                </div>
              </div>
            );
          default:
            return;
        }
      });
    });
  };

  const DetailRow = ({ row }) => {
    return (
      <div className="detailed-row">
        <Accordion>
          <AccordionSummary>
            <Typography
              style={{ fontWeight: 600, color: neutral8, fontSize: 14 }}
            >
              {EMAIL_TEMPLATES.PARAMETERS}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              style={{ fontSize: 13, color: '#999999', marginTop: 10 }}
              variant="body2"
            >
              {EMAIL_TEMPLATES.EMAIL_TEXT}
            </Typography>
            <div style={{ fontSize: 14 }}>
              <div style={{ marginBottom: 4 }}>
                <b>{EMAIL_TEMPLATES.TO}: </b>
                {row.EmailTemplateTO &&
                  getEmailsTooltipInfo(row.EmailTemplateTO)}
                <div>
                  {row?.EmailTemplateRecipientRule?.RecipientRuleGroups?.map(
                    group => getEmailsTooltipInfo(group.RecipientRuleToAnswer)
                  )}
                </div>
              </div>
              <div style={{ marginBottom: 4 }}>
                <b>{EMAIL_TEMPLATES.CC}: </b>
                {row.EmailTemplateCC &&
                  getEmailsTooltipInfo(row.EmailTemplateCC)}
                {row?.EmailTemplateRecipientRule?.RecipientRuleGroups?.map(
                  group => getEmailsTooltipInfo(group.RecipientRuleCCAnswer)
                )}
              </div>
            </div>
            <div>
              {row?.EmailTemplateRecipientRule?.RecipientRuleGroups &&
                renderRecipientRuleQuestionAnswers(
                  row?.EmailTemplateRecipientRule?.RecipientRuleGroups
                )}
            </div>
          </AccordionDetails>
        </Accordion>
        <div className="email-button">
          <Button
            data-testid="email-btn"
            variant="primary"
            icon={<EmailClick fontSize="extraSmall" />}
            style={{ marginRight: 10 }}
            className="email-btn"
            onClick={() => {
              handleSendEmailClick(row);
            }}
          >
            {DEFAULT.EMAIL}
          </Button>
        </div>
      </div>
    );
  };

  const ExpandableRow = ({ row, ...rest }) => <DetailRow row={row} {...rest} />;

  return (
    <>
      <div id="email-template-tab">
        <div
          className={
            !isCurrentBid
              ? 'email-template-panel disabled'
              : 'email-template-panel'
          }
        >
          {isLoadingEmailTemplates && (
            <Loader
              isInner
              size={20}
              style={{
                width: '20px',
                height: '20px'
              }}
            />
          )}
          {emailTemplatesList && emailTemplatesList.length > 0 && (
            <Table
              title={EMAIL_TEMPLATES.EMAIL_TEMPLATES_TITLE}
              columns={columns}
              rows={emailTemplatesList
                .filter(emailTemplate => {
                  return (
                    emailTemplate.EmailTemplateOpportunityTypes &&
                    emailTemplate.EmailTemplateOpportunityTypes.length > 0 &&
                    typeof emailTemplate.EmailTemplateOpportunityTypes ===
                      'string' &&
                    emailTemplate.EmailTemplateOpportunityTypes.split(
                      ','
                    ).includes(selectedBid.toJS().opportunityType)
                  );
                })
                .map(row => ({
                  ...row,
                  handleToggleRow,
                  expanded: expandedRows.includes(row.EmailTemplateId)
                }))}
              ExpandableComponent={ExpandableRow}
              rowId="EmailTemplateId"
              initialSortOrder="asc"
              initialSortedColumn="EmailTemplateName"
              rowsPerPage={'All'}
            />
          )}
          {!emailTemplatesList.length && !isLoadingEmailTemplates && (
            <div className="no-data">
              <img
                src={Rocket}
                alt={EMAIL_TEMPLATES.NOEMAIL_TEMPLATES_AVAIABLE_TEXT}
              />
              <Typography variant="body2" style={{ marginTop: 10 }}>
                {EMAIL_TEMPLATES.NOEMAIL_TEMPLATES_AVAIABLE_TEXT}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default EmailTemplates;
