import { renderToString } from 'react-dom/server';
import ReactHtmlParser from 'react-html-parser';
import {
  Document,
  StyleSheet,
  Image,
  Link as HtmlLink
} from '@react-pdf/renderer';
import React from 'react';
import Html from 'react-pdf-html';
import { isEmpty, isEqual, isString } from 'lodash';
import moment from 'moment';
import { generateHTML } from '@tiptap/core';
import Link from '@tiptap/extension-link';
import HighLight from '@tiptap/extension-highlight';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Mention from '@tiptap/extension-mention';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import OrderedList from '@tiptap/extension-text-align';
import Logo from '../../../../img/iqvia-hd-logo.png';
import OpportunityLinker from '../WysiwygNotepad/OpportunityLinker';
import {
  getFilteredQuestion,
  headFields,
  PT_SECTION,
  CORE_TEAM,
  QC_SECTION,
  QC_SECTION_LEFT_PANEL,
  getLastAnswer,
  getUnityPredicatedText,
  dateNow,
  userName,
  yearNow,
  getUnityLink,
  formatDate,
  shouldInclude,
  getLastAnswerHtml
} from './word-template';
import '../../../../fonts/ProximaNova-Regular-normal';
import '../../../../fonts/Proxima-Nova-Alt-Bold-bold';
import '../../../../fonts/Proxima-Nova-Bold-It-bolditalic';
import '../../../../fonts/Proxima-Nova-Reg-It-italic';
import { savePDF } from '../../../api/proposal';

const styles = StyleSheet.create({
  page: {
    paddingBottom: '18vh',
    width: '500px',
    marginBottom: '20px',
    marginLeft: '50px',
    marginRight: '50px'
  },
  header: {
    width: '500px',
    height: '10vh', // As per your page layout
    borderBottom: `1px solid #00A3E0`,
    marginBottom: '20px',
    marginLeft: '50px',
    marginRight: '50px',
    justifyContent: 'flex-end'
  },
  li: {
    lineHeight: '5px'
  },
  ol: {
    lineHeight: '5px'
  },
  imgLogo: {
    width: '143px',
    height: '60px',
    alignSelf: 'flex-end'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '485px',
    height: '15vh', //As per your page layout
    marginTop: '20px',
    marginLeft: '50px',
    marginRight: '50px'
  },
  footerText: {
    color: `#999`,
    fontSize: `7px`
  },
  heading: {
    paddingLeft: '60px',
    marginBottom: '-40px',
    width: '200px',
    display: 'grid'
  },
  headingText: {
    fontSize: '14px',
    color: `#00A3E0`,
    fontFamily: 'Proxima-Nova-Regular',
    fontWeight: 700
  },
  tr: {
    height: 'auto'
  },
  td: {
    height: 'auto'
  }
});
function checkFormattedAnswer(answers) {
  try {
    let lastAnswer = answers[answers.length - 1];
    let formattedAnswer;
    if (lastAnswer?.formattedAnswer) {
      if (isString(lastAnswer?.formattedAnswer)) {
        try {
          formattedAnswer = JSON.parse(lastAnswer?.formattedAnswer);
        } catch {
          return (lastAnswer && lastAnswer.answer.toString()) || '';
        }
      } else formattedAnswer = lastAnswer?.formattedAnswer;
      if (formattedAnswer?.htmlExport) {
        return formattedAnswer?.htmlExport;
      }
      if (formattedAnswer?.html) {
        return formattedAnswer?.html;
      }
    }
    return (
      (lastAnswer && lastAnswer.answer.toString())?.replace(/,/g, ', ') || ''
    );
  } catch (error) {
    console.log(error);
    return '';
  }
}
function getStyled() {
  return `<style>
  html {
    -webkit-print-color-adjust: exact;
  }
  body {
    font-family: ProximaNova-Regular !important;
    font-size: 13px;
  }
  li span {
    vertical-align:middle;
  }  
h1{
    font-size: 20px;
    margin: 5px;
}
h2{
    font-size: 17px;
    margin: 3px;
}
h3{
    font-size: 15px;
    margin: 2px;
}

.marginTop50 {
    margin-top:50px
}
.marginTop20 {
    margin-top:20px
}
.marginTop30 {
    margin-top:30px
}
.notesTable tr{
    border-bottom: none;
}
.blueColorText{
    color: #00A3E0;
    font-family:Helvetica;
    font-size: 10px;
}
ol {
  padding-inline-start: 10px !important;
}
ul {
  padding-inline-start: 10px !important;
}
 #resp-table {
  width: 100%;
  height: auto;
  display: table;
  border: 1px solid #000;
  border-bottom: 0px;
  }
  .notesData p {
    display: block;
    margin-block-start: 3px;
      margin-block-end: 3px;
  } 
  .notesTable #resp-table-header {
    border-bottom: 0px;
}
  #resp-table-caption{
    display: table-cell;
    text-align: center;
    font-size: 13px;
    color: #fff;
    font-weight: bold;
    background-color: #00A3E0;
    padding:5px;
    word-break: break-word;
    border-bottom: 1px solid #000;
    }
    #resp-table-header {
      display: table-cell;
      font-size: 13px;
      background-color: #00A3E0;
      color: #fff;
      font-weight: bold;
      width: 50%;
      text-align: center;
      padding: 5px;
      border-bottom: 1px solid #000;
  }
  .table-header-cell {
    display: table-cell;
    padding: 5px;
    text-align: left;
    vertical-align: middle;
    width: 50%;
    height: auto;
    border-bottom: 1px solid #000;
    word-break: break-word;
}
.table-header-cell:nth-child(odd) {
  background-color: #EEEEEE;
  border-right: 1px solid #000;
}
* {
  text-rendering: geometricprecision !important;
}
* { -webkit-font-smoothing: antialiased; }
        #resp-table-body{
          display: table-row-group;
          }
          .resp-table-row{
            display: table-row;
            }
            .table-body-cell{
              display: table-cell;
              }
              .headerInfo .table-header-cell:nth-child(odd) {
                border-right: 1px solid #000;
                background-color: #00A3E0;
                color: #fff;
                font-weight: bold;
                width: 30% !important;
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
          .MuiGrid-root{
              display:none;
          }
          .MuiFormControl-root{
              padding:5px;
              border: 1px solid #000;
              border-top: none;
          }
      
            [data-block=true] {
              margin-left: 1px;
          }
      
</style>`;
}
let size = 30;
function getHeaderInfoRows(details) {
  let html = `<div id="resp-table" class="table headerInfo">`;
  try {
    for (let key in headFields) {
      let value = details[key] || '';
      if (key === 'Bid due date') value = moment(value).format('DD-MMM-YYYY');
      html += `<div class="resp-table-row">`;
      html += `<div class="table-header-cell">${headFields[key]}</div>`;
      html += `<div class="table-header-cell">${value.toString()}</div>`;
      html += `</div>`;
    }
  } catch (error) {
    console.log('Error in getHeaderInfoRows');
  }
  html += `</div>`;
  return html;
}
function getProposalTeamsRows(questions) {
  const coreTeamQuestions = questions
    .filter(
      question =>
        shouldInclude(question) &&
        CORE_TEAM[question.questionText] &&
        question.section.sectionName === PT_SECTION
    )
    .sort((a, b) => a.questionOrder - b.questionOrder);
  const otherTeamQuestions = questions
    .filter(
      question =>
        shouldInclude(question) &&
        question.section.sectionName === PT_SECTION &&
        !CORE_TEAM[question.questionText]
    )
    .sort((a, b) => a.questionOrder - b.questionOrder);
  let html = ``;
  try {
    html += `<div id="resp-table" class="proposalTeam table marginTop20">`;
    html += `<div class="resp-table-row">`;
    html += `<div id="resp-table-header"> Core Team Members </div>`;
    html += `<div id="resp-table-header"> Name </div>`;
    html += `</div>`;
    const getEmailID = str => {
      return String(str).match(
        /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
      );
    };
    coreTeamQuestions.forEach(question => {
      const { questionText, answers, questionHTML } = question;
      html += `<div class="resp-table-row">`;
      html += `<div class="table-header-cell">${questionHTML}</div>`;
      const coreTeamQuestionsAnswer = checkFormattedAnswer(answers);
      let emailLink = '';
      let otherTeamArray;
      if (coreTeamQuestionsAnswer) {
        otherTeamArray = coreTeamQuestionsAnswer.split(',');
      }
      let Arrayedanother = [];
      otherTeamArray?.forEach(item => {
        const nameArray = item.substring(0, item.indexOf('('));
        const emailId = getEmailID(item);
        return emailId !== null
          ? Arrayedanother.push({ name: nameArray, email: emailId })
          : Arrayedanother.push({ name: item });
      });
      if (Arrayedanother.length > 0) {
        Arrayedanother.forEach((item, index) => {
          const commaHandle = index + 1 === Arrayedanother.length ? '' : ', ';
          emailLink += item?.email
            ? `<a href=mailto:${item?.email !== null ? item?.email[0] : ''}>${
                item.name
              }</a>${Arrayedanother.length > 1 ? commaHandle : ''}`
            : `${item?.name} ${Arrayedanother.length > 1 ? commaHandle : ''}`;
        });
      }
      html += `<div class="table-header-cell">${emailLink}</div>`;
      html += `</div>`;
    });
    html += `</div>`;
    html += `<div id="resp-table" class="proposalTeam table marginTop20">`;
    html += `<div class="resp-table-row">`;
    html += `<div id="resp-table-header"> Specialty Team Members </div>`;
    html += `<div id="resp-table-header"> Name</div>`;
    html += `</div>`;
    otherTeamQuestions.forEach((question, index) => {
      const { questionText, answers, questionHTML } = question;
      html += `<div class="resp-table-row">`;
      html += `<div class="table-header-cell">${questionHTML} </div>`;
      const otherTeamQuestionsAnswer = checkFormattedAnswer(answers);
      let otherTeamArray;
      if (otherTeamQuestionsAnswer) {
        otherTeamArray = otherTeamQuestionsAnswer.split(',');
      }
      let Arrayedanother = [];
      otherTeamArray?.forEach(item => {
        const nameArray = item.substring(0, item.indexOf('('));
        const emailId = getEmailID(item);
        return emailId !== null
          ? Arrayedanother.push({ name: nameArray, email: emailId })
          : Arrayedanother.push({ name: item });
      });
      let otherTeamQuestionsemailLink = '';
      if (Arrayedanother.length > 0) {
        Arrayedanother.forEach((item, index2) => {
          const commaHandle = index2 + 1 === Arrayedanother.length ? '' : ', ';
          otherTeamQuestionsemailLink += item?.email
            ? `<a href=mailto:${item?.email !== null ? item?.email[0] : ''}>${
                item.name
              }</a>${Arrayedanother.length > 1 ? commaHandle : ''}`
            : `${item?.name} ${Arrayedanother.length > 1 ? commaHandle : ''}`;
        });
      }
      html += `<div class="table-header-cell">${otherTeamQuestionsemailLink}</div>`;
      html += `</div>`;
    });
    html += `</div>`;
  } catch (error) {
    console.log('Error in getProposalTeamsRows', error);
  }
  return html;
}
function questionTables(allQuestions, proposalQuestions) {
  // Array<div id="resp-table" of each section>
  let html = ``;
  // Remove not visible questions
  let questions = proposalQuestions
    .filter(question => {
      return (
        shouldInclude(question) &&
        question.section.sectionName !== PT_SECTION &&
        question.section.sectionName !== QC_SECTION
      );
    })
    .sort((a, b) => {
      return a.section.sectionOrder - b.section.sectionOrder;
    });
  // Section map
  const sections = {};
  let ordereredSections = [];
  // Populate the section map
  questions.forEach(question => {
    try {
      let section = question.section.sectionName || '';
      if (section === 'Questions_for_the_Customer_left_panel') {
        section = 'Questions for the Customer';
      }
      if (sections[section]) {
        sections[section].push(question);
      } else {
        sections[section] = [question];
        ordereredSections.push(section);
      }
    } catch (error) {
      console.log('Error while mapping Sections');
    }
  });
  ordereredSections = ordereredSections.filter(
    v => v !== 'Questions for the Customer'
  );
  ordereredSections.unshift('Questions for the Customer');
  ordereredSections.forEach(section => {
    if (section === QC_SECTION) {
      html += `<div id="resp-table" class="questionTable table marginTop20">`;
      html += `<div class="resp-table-row">`;
      html += `<div id="resp-table-caption" style="word-spacing: 1px"> ${section}  </div>`;
      html += `<div id="resp-table-caption"></div>`;
      html += `</div>`;
      let questionsToCustomerLeftSection = allQuestions
        .filter(
          question =>
            shouldInclude(question) &&
            question.section.sectionName === QC_SECTION_LEFT_PANEL
        )
        .sort((a, b) => a.questionOrder - b.questionOrder);
      questionsToCustomerLeftSection.forEach(question => {
        console.log('question html', questionHTML);
        const temporalDivElement = document.createElement('div');
        temporalDivElement.innerHTML = question.questionHTML;

        if (question.questionText.length > 1) {
          html += `<div class="resp-table-row">`;
          html += `<div class="table-header-cell"> ${question.questionHTML} </div>`;
          html += `<div class="table-header-cell"> ${formatDate(
            checkFormattedAnswer(question.answers),
            question.answerConfiguration
          )} <span class="blueColorText">${
            getUnityPredicatedText(question.answers)
              ? getUnityPredicatedText(question.answers)
              : ''
          }</span></div>`;
          html += `</div>`;
        }
      });
      let questionsToCustomerRightSection = allQuestions
        .filter(
          question =>
            shouldInclude(question) &&
            question.section.sectionName === QC_SECTION
        )
        .sort((a, b) => a.questionOrder - b.questionOrder);
      questionsToCustomerRightSection.forEach(question => {
        const { questionText, questionHTML } = question;
        html += `<div class="resp-table-row">`;
        html += `<div class="table-header-cell"> ${questionHTML}</div>`;
        html += `<div class="table-header-cell"> ${formatDate(
          checkFormattedAnswer(question.answers),
          question.answerConfiguration
        )} <span class="blueColorText">${
          getUnityPredicatedText(question.answers)
            ? getUnityPredicatedText(question.answers)
            : ''
        }</span></div>`;
        html += `</div>`;
      });
      html += `</div>`;
    } else {
      html += `<div id="resp-table" class="questionTable table marginTop20">`;
      html += `<div class="resp-table-row">`;
      html += `<div id="resp-table-caption" style="word-spacing: 1px"> ${section} </div>`;
      html += `<div id="resp-table-caption"></div>`;
      html += `</div>`;
      sections[section]
        .sort((a, b) => a.questionOrder - b.questionOrder)
        .forEach(question => {
          const { answers, questionHTML } = question;

          const temporalDivElement = document.createElement('div');
          temporalDivElement.innerHTML = question.questionHTML;

          const questionType = question?.answerConfiguration?.type;
          const getEmailID = str => {
            return String(str).match(
              /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
            );
          };
          const questionTypeValidation =
            questionType === 'picklist-lookup' ? 'word-spacing:1px' : '';
          if (question.questionText.length > 1) {
            html += `<div class="resp-table-row">`;
            html += `<div class="table-header-cell"> ${questionHTML}</div>`;
            html += `<div class="table-header-cell"  style=${questionTypeValidation}> ${formatDate(
              checkFormattedAnswer(question.answers),
              question.answerConfiguration
            )} <span class="blueColorText">${
              getUnityPredicatedText(question.answers)
                ? getUnityPredicatedText(question.answers)
                : ''
            }</span></div>`;
            html += `</div>`;
          }
        });
      html += `</div>`;
    }
  });
  return html;
}

function getNotesRows(notes, notepadJSON) {
  let html = ``;
  html += `<div id="resp-table" class="notesTable table marginTop20">`;
  html += `<div class="resp-table-row">`;
  html += `<div id="resp-table-header">General Notes</div>`;
  html += `</div>`;
  html += `</div>`;
  let data = ``;
  const getEmailID = str => {
    return String(str).match(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
    );
  };
  data += `<div id="resp-table" class="notesData" style="border-bottom: 1px solid #000;"><div class="resp-table-row"><div class="notes-ol" style="padding: 15px;">`;
  try {
    const noteText = notepadJSON?.noteJson;
    try {
      data += generateHTML(noteText, [
        StarterKit,
        Link.configure({
          autolink: true,
          linkOnPaste: false,
          validate: href => /^https?:\/\// || /^www?:\/\//.test(href),
          protocols: ['ftp', 'mailto'],
          HTMLAttributes: {
            class: 'my-custom-class'
          }
        }),
        HighLight,
        Subscript,
        Superscript,
        Underline,
        OrderedList.configure({
          itemTypeName: 'listItem'
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph', 'OrderedList', 'listItem', 'Text'],
          alignments: ['left', 'center', 'right', 'justify']
        }),
        Mention.configure({
          HTMLAttributes: {
            style: `color:blue;`,
            class: 'mention'
          },
          renderLabel({ options, node }) {
            return `breakemail${node.attrs.id}"starttag${node.attrs.label}closetag`;
          }
        }),
        OpportunityLinker
      ]);
      data += `</div></div></div>`;
      html += data;
      html = html.replaceAll('breakemail', '<a href="mailto:');
      html = html.replaceAll('starttag', '">');
      html = html.replaceAll('closetag', '</a>');
      return html;
    } catch (err) {
      console.log('pdf notes error', err);
    }
  } catch (error) {
    console.log('Error in getNotesRows');
  }
  return html;
}
function getHtml(
  proposalDetails,
  questions,
  filteredQuestions,
  notes,
  filterState,
  editor,
  fileName,
  notepadJSON
) {
  let html = ` 
  ${getStyled()}
  <div id="page" style="width: 100%;"> <div style="width: 100%;"><div style="width: 100%;">  <div style="margin-bottom: 5px;width: 100%;"><div style="font-size:14px;color:#00a3e0;font-family:inherit;font-weight:700;width: 100%;display: flex;">  <p style="font-style:italic;display: flex; margin: 0px !important;">${proposalDetails[
    'CRM #'
  ] || ' '}${'&nbsp'}
   Opportunity Overview</p>
</div></div>${getHeaderInfoRows(proposalDetails)}
         ${getProposalTeamsRows(questions)}
         ${questionTables(questions, filteredQuestions)}
         ${filterState.includesNotes ? getNotesRows(notes, notepadJSON) : ''}
      </div>   </div></div>    `;
  // this is added to handle , some data having unclosed span tag.
  const SpanExp = new RegExp('([^<])/span>', 'g');
  if (html.match(SpanExp)) {
    // const expression = html?.match(SpanExp)?.split('/');
    html = html?.replaceAll(SpanExp, `$1</span>`);
  }
  const Prints = () => (
    <html lang="en">
      <body id="pdfbody">{ReactHtmlParser(html)}</body>
    </html>
  );
  const image = Logo;
  const time = dateNow();
  let string = renderToString(<Prints />);
  const extraStyleExp = new RegExp(
    'style="color:red;border:2px solid red"',
    'g'
  );
  string = string?.replaceAll(extraStyleExp, '');
  const extraStyleGreenExp = new RegExp(
    'style="color:green;border:2px solid green"',
    'g'
  );
  string = string?.replaceAll(extraStyleGreenExp, '');
  const alignRight = new RegExp('class="DraftEditor-alignRight"', 'g');
  string = string?.replaceAll(
    alignRight,
    'class="DraftEditor-alignRight" style="text-align: end;"'
  );
  const rightAlign = new RegExp('class="DraftEditor-alignCenter"', 'g');
  string = string?.replaceAll(
    rightAlign,
    'class="DraftEditor-alignCenter" style="text-align: center;"'
  );
  const url = getUnityLink(proposalDetails);
  const oppId = proposalDetails['CRM #'];
  savePDF(string, url, userName, time, oppId, fileName);
}
const MyDoc = (
  proposalDetails,
  questions,
  filteredQuestions,
  notes,
  filterState,
  editor,
  fileName,
  notepadJSON
) => {
  return (
    <Document>
      <Html
        collapse={false} // this will preserve whitespace
      >
        {getHtml(
          proposalDetails,
          questions,
          filteredQuestions,
          notes,
          filterState,
          editor,
          fileName,
          notepadJSON
        )}
      </Html>
    </Document>
  );
};
export function createPdf(content) {
  let {
    data: { proposalQuestions, proposalDetails },
    notes,
    filterState,
    editor,
    fileName,
    notepadJSON
  } = content;
  const filteredQuestions = getFilteredQuestion(proposalQuestions, filterState);
  return MyDoc(
    proposalDetails,
    proposalQuestions,
    filteredQuestions,
    notes,
    filterState,
    editor,
    fileName,
    notepadJSON
  );
}
