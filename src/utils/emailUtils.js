function getProposalTeamUsers(questions = []) {
  let answers = new Set();
  try {
    questions
      .filter(
        question =>
          question.section && question.section.sectionName === 'Proposal Team'
      )
      .forEach(question => {
        if (question.answers.length > 0) {
          const recentAnswer =
            question.answers[question.answers.length - 1].answer;
          recentAnswer.split(',').forEach(user => {
            const foundMail = user.match(/[a-zA-Z\w]*\((.*)\)/);
            if (foundMail !== null && foundMail[1]) {
              answers.add(foundMail[1]);
            }
          });
        }
      });
  } catch (e) {
    console.log(
      '[emailUtils] Error in retrieving users from proposal team section',
      e
    );
  }
  return Array.from(answers);
}

export function generateApprovalEmailInfo(
  approvalSection,
  allQuestions,
  proposalDetails = {}
) {
  let emailSubject = '';
  const emailHead = `<html>
    <head>
    <style>
        #approval-email-content {
            max-width: 720px;
            padding: 16px;
            font-size: inherit;
        }
        p {
            margin: 8px 0;
        }
        table {
            border-spacing: 0;
            margin: 16px 0;
        }
        table td, table th{
            padding: 5px;
            border: 1px solid #000000;
            text-align: left;
        }
        table thead tr{
            background: #00A3E0;
            color:#fff;
        }
        table tbody td {
            border-top: none;
        }
        .summary-table tbody tr:first-child td {
            border-top: 1px solid #000000;
        }
        table tr td:first-child{
            background: #EEEEEE;
        }
        table tr th:first-child, td:first-child {
            border-right: none;
        }
        .summary-table td:first-child{
            background: #00A3E0;
            color: #FFFFFF;
            min-width: 150px;
            font-weight: bold;
        }
        .summary-table td:not(:first-child) {
            width: 100%;
        }
        .public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR {
            margin-left: 5px;
        }
        .public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR {
            margin-left: 10px;
        }
        .public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR {
            margin-left: 15px;
        }
        .public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR {
            margin-left: 20px;
        }
        .public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR {
            margin-left: 25px;
        }
 </style>
    </head><body>`;
  const emailFoot = `
    </body>
    </html>`;
  let emailBody = '';
  let questionsForThisApproval = [];
  let toUsers = [];
  let ccUsers = [];
  let approvalQuestionIds = [];
  try {
    if (
      Array.isArray(approvalSection.ApprovalSectionLeftQuestions) &&
      approvalSection.ApprovalSectionLeftQuestions.length > 0
    ) {
      approvalQuestionIds = approvalQuestionIds.concat(
        approvalSection.ApprovalSectionLeftQuestions
      );
    }
    if (
      Array.isArray(approvalSection.ApprovalSectionRightQuestions) &&
      approvalSection.ApprovalSectionRightQuestions.length > 0
    ) {
      approvalQuestionIds = approvalQuestionIds.concat(
        approvalSection.ApprovalSectionRightQuestions
      );
    }
    toUsers = getProposalTeamUsers(allQuestions);
    if (approvalQuestionIds.length > 0) {
      questionsForThisApproval = allQuestions.filter(question =>
        approvalQuestionIds.includes(question.questionId)
      );
      ccUsers = getProposalTeamUsers(questionsForThisApproval);
      ccUsers = ccUsers.filter(user => !toUsers.includes(user));
    }
    const decisionQuestion = questionsForThisApproval.find(
      question => question.questionText === 'Decision'
    );
    let decisionAnswer = false;
    if (decisionQuestion && decisionQuestion.answers.length > 0) {
      decisionAnswer =
        decisionQuestion.answers[decisionQuestion.answers.length - 1].answer;
    }
    // find decision answer
    emailSubject = `${decisionAnswer ? decisionAnswer + ': ' : ''}${
      approvalSection.ApprovalSectionTitle
    } for ${proposalDetails['Customer'] || ''} ${proposalDetails['Phase'] ||
      ''} ${proposalDetails['Therapeutic area'] ||
      ''} (Opportunity ${proposalDetails['CRM #'] || ''} Bid ${proposalDetails[
      'bidNo'
    ] || ''})`;
    emailBody = `<div id="approval-email-content">
    <p>Hello,</p>`;
    emailBody += `<p>Below is a summary of the ${
      approvalSection.ApprovalSectionTitle
    }${decisionAnswer ? ' - ' + decisionAnswer : ''}:</p>`;
    emailBody += `<table class="summary-table">
    <tbody>
      <tr><td>Customer</td><td>${proposalDetails['Customer'] || ''}</td></tr>
      <tr><td>Protocol Title</td><td>${proposalDetails['Product name'] ||
        ''}</td></tr>
      <tr><td>Indication</td><td>${proposalDetails['Verbatim indication'] ||
        ''}</td></tr>
      <tr><td>Phase</td><td>${proposalDetails['Phase'] || ''}</td></tr>
      <tr><td>Bid Number</td><td>${proposalDetails['bidNo'] || ''}</td></tr>
      <tr><td>Due Date</td><td>${proposalDetails['Bid due date'] ||
        ''}</td></tr>
    </tbody></table>`;
    emailBody += `<table><thead>`;
    emailBody += `<tr><th>${approvalSection.ApprovalSectionTitle}</th><th></th></tr></thead><tbody>`;

    questionsForThisApproval.forEach((question, qIndex) => {
      let answerHTML =
        question.answers.length > 0
          ? (question.answers[question.answers.length - 1].formattedAnswer &&
              question.answers[question.answers.length - 1].formattedAnswer
                .htmlExport) ||
            `<p>${question.answers[question.answers.length - 1].answer}</p>`
          : '';
      answerHTML = answerHTML.replace(
        /data-[a-zA-Z0-9-]*=\"[a-zA-Z0-9-]*\"/g,
        ''
      );
      emailBody += `<tr>
        <td>${question.questionText}</td>
        <td>${answerHTML}</td>
        </tr>`;
    });

    emailBody += `</tbody></table>`;
    emailBody += `<br /><p>Additional and/or historical information on this opportunity can be viewed in <a target="_blank" href="${window.location.href}"> Unity</a></p></div>`;
  } catch (e) {
    console.log(
      '[emailUtils] Error in creating email body for a approval section',
      e
    );
  }
  return {
    subject: emailSubject,
    to: toUsers,
    cc: ccUsers,
    body: emailHead + emailBody + emailFoot
  };
}

export function generateApprovalEmailURL(subject = '', to = [], cc = []) {
  return `https://outlook.office.com/?path=/mail/action/compose&to=${to.join(
    ','
  )}&subject=${subject}&cc=${cc.join(
    ','
  )}&body=Unity%20has%20copied%20the%20approval%20section%20details%20to%20your%20clipboard.%20Press%20Control%20%2B%20V%20to%20paste%20the%20content%20to%20include%20it%20in%20your%20mail%20and%20share%20it%20with%20your%20team.&online=1`;
}
