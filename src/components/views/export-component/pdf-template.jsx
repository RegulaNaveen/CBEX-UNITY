/* eslint-disable prefer-template */
/* eslint-disable no-else-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-return-assign */

import { renderToString } from 'react-dom/server';
import ReactHtmlParser from 'react-html-parser';
import {
  Document,
  Page,
  View,
  StyleSheet,
  Text,
  Image,
  Link as HtmlLink
} from '@react-pdf/renderer';
import React from 'react';
import Html from 'react-pdf-html';
import { isString } from 'lodash';
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
    const lastAnswer = answers[answers.length - 1];
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
function getExtraLines(t1, t2) {
  const contentLength = Math.max(t1.length, t2.length);
  const paddingAnswerCell = parseInt(contentLength / 230);
  return new Array(paddingAnswerCell + 2 || 2).fill('<br>').join('');
}
function getStyled() {
  return `<style>
  html {
    -webkit-print-color-adjust: exact;
  }
  FONTCHANGE
  body {
    font-family: ProximaNova-Regular !important;
    font-size: 10px;
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
    font-size: 10px;
    color: #fff;
    font-weight: bold;
    background-color: #00A3E0;
    padding:5px;
    word-break: break-word;
    border-bottom: 1px solid #000;
    }
    #resp-table-header {
      display: table-cell;
      font-size: 10px;
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
        question.section.sectionName === PT_SECTION &&
        question.questionId === 'Proposal Team-P0C'
    )
    .sort((a, b) => a.questionOrder - b.questionOrder);
  const otherTeamQuestions = questions
    .filter(
      question =>
        shouldInclude(question) &&
        question.section.sectionName === PT_SECTION &&
        !CORE_TEAM[question.questionText] &&
        question.questionId !== 'Proposal Team-P0C'
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
      const { questionText, answers } = question;
      html += `<div class="resp-table-row">`;
      html += `<div class="table-header-cell">${questionText}</div>`;
      const coreTeamQuestionsAnswer = checkFormattedAnswer(answers);
      let coreTeamQuestionsEmail = getEmailID(coreTeamQuestionsAnswer);
      let emailLink = '';
      if (coreTeamQuestionsEmail) {
        const name = coreTeamQuestionsAnswer.substring(
          0,
          coreTeamQuestionsAnswer.indexOf('(')
        );
        let tempEmail = String(coreTeamQuestionsEmail[0]).trim();
        emailLink = `<a href="mailto:${tempEmail}">${name}</a>`;
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
      const { questionText, answers } = question;
      html += `<div class="resp-table-row">`;
      html += `<div class="table-header-cell">${questionText} </div>`;
      const otherTeamQuestionsAnswer = checkFormattedAnswer(answers);
      let otherTeamQuestionsAnswerEmail = getEmailID(otherTeamQuestionsAnswer);
      let otherTeamQuestionsemailLink = '';
      if (otherTeamQuestionsAnswerEmail) {
        const nameOther = otherTeamQuestionsAnswer.substring(
          0,
          otherTeamQuestionsAnswer.indexOf('(')
        );
        let tempEmailOther = String(otherTeamQuestionsAnswerEmail[0]).trim();
        // otherTeamQuestionsemailLink = `<p><span data-type="mention" style="color:blue" data-id=${String(
        //   tempEmailOther
        // ).toUpperCase()} data-label=${String(
        //   nameOther
        // ).toUpperCase()}>${tempEmailOther}</span>
        // <br/><br/></p>`;
        otherTeamQuestionsemailLink = `<a href="mailto:${tempEmailOther}">${nameOther}</a>`;
      }
      html += `<div class="table-header-cell">${otherTeamQuestionsemailLink}</div>`;
      html += `</div>`;
    });
    html += `</div>`;
  } catch (error) {
    console.log('Error in getProposalTeamsRows');
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
        const questionHTML = question.questionHTML || question.questionText;
        html += `<div class="resp-table-row">`;
        html += `<div class="table-header-cell"> ${questionHTML} </div>`;
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
      let questionsToCustomerRightSection = allQuestions
        .filter(
          question =>
            shouldInclude(question) &&
            question.section.sectionName === QC_SECTION
        )
        .sort((a, b) => a.questionOrder - b.questionOrder);
      questionsToCustomerRightSection.forEach(question => {
        const { questionText } = question;
        html += `<div class="resp-table-row">`;
        html += `<div class="table-header-cell"> ${questionText}</div>`;
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
          const questionHTML = question.questionHTML || question.questionText;
          const questionType = question?.answerConfiguration?.type;

          const questionTypeValidation =
            questionType === 'picklist-lookup' ? 'word-spacing:1px' : '';
          html += `<div class="resp-table-row">`;
          html += `<div class="table-header-cell"> ${questionHTML}</div>`;
          html += `<div class="table-header-cell" style=${questionTypeValidation}> ${formatDate(
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
    }
  });
  return html;
}

function getNotesRows(notes, editor) {
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
    const noteText = editor.getJSON();
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
        })
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
  fileName
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
         ${filterState.includesNotes ? getNotesRows(notes, editor) : ''}
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
  console.log('opt :>> ', string);
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
  fileName
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
          fileName
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
    fileName
  } = content;
  const filteredQuestions = getFilteredQuestion(proposalQuestions, filterState);
  return MyDoc(
    proposalDetails,
    proposalQuestions,
    filteredQuestions,
    notes,
    filterState,
    editor,
    fileName
  );
}
