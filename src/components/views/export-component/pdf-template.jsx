/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-return-assign */
import {
  getFilteredQuestion,
  headFields,
  PT_SECTION,
  SPECIALITY_SECTION,
  CORE_TEAM,
  QC_SECTION,
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
import jsPDF from 'jspdf';
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
import FooterHead from '../../../../img/footerHead.png';
import Logo from '../../../../img/iqvia-main-logo.png';
import Border from '../../../../img/borders.png';
import ProximaNova from '../../../../fonts/ProximaNova-Regular.otf';

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
        return formattedAnswer.htmlExport;
      }
      if (formattedAnswer?.html) {
        return formattedAnswer?.html;
      }
    }
    return (lastAnswer && lastAnswer.answer.toString()) || '';
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
    *{
    font-family: ProximaNova-Regular !important;    
    border-collapse: collapse !important;
    
    
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
 .table {
  width: 480px !important;
  height: auto;
}
tr {    
  border-top: 1px solid #000 !important;
  border-left: 1px solid #000 !important;
  border-right: 1px solid #000 !important;
  height: auto;
}
td {    
  border-top: 1px solid #000 !important;
  border-left: 1px solid #000 !important;
  border-right: 1px solid #000 !important;
  border-bottom: 1px solid #000 !important;
  height: auto;
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
.table tr:last-child{
    border-bottom: 1px solid #000 !important;
    border-right: 1px solid #000 !important;
}
.notesTable tr{
    border-bottom: none;
}
.notesTable tr:last-child{
    border-bottom: 1px solid #000 !important;
    border-right: 1px solid #000 !important;
}
.table td, .table th{
    padding: 5px;
}
.table tr td:nth-child(2){
    border-left: 1px solid #000 !important;
}
.proposalTeam tr:first-child, .questionTable tr:first-child, .questionToCustomerTable tr:first-child, .notesTable tr:first-child{
    background: #00A3E0;
    color:#fff;
}
.questionTable tr td {
  width: 50% !important;
  border-right: 1px solid #000 !important;
}

.notesTable ul li{
  padding-left: 5px;
  // margin-top: 5px;
}
.proposalTeam td {
  width: 50% !important;
}
.questionToCustomerTable tr td {
    width: 50% !important;
}
li ul li{
  list-style-type: disc;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 5px;
}
.questionToCustomerTable li {
    // padding-bottom: 5px
}
ul ul {
  display: block;
  list-style-type: disc;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 5px;
}
.public-DraftStyleDefault-ul li {
  list-style-type: disc !important;
}
ul {
  display: block;
  list-style-type: disc;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.headerInfo tr td:first-child{
    background: #00A3E0;
    color:#fff;
    font-weight: bold
}
.questionTable tr td:first-child{
    background: #EEEEEE;
}
.blueColorText{
    color: #00A3E0;
    font-family:Helvetica;
    font-size: 8px;
}
// .notesData p{
  // margin-top: 0.75em;
  // margin-bottom: 0.75em;
// } 
#pdfbody {
  display: block;
  margin: 8px;
}
#pdfbody .public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR {
    margin-left: 5px;
}
#pdfbody .public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR {
    margin-left: 10px;
    list-style-type: disc !important;
}
#pdfbody .public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR {
    margin-left: 15px;
}
#pdfbody .public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR {
    margin-left: 20px;
}
#pdfbody .public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR {
    margin-left: 25px;
}
#pdfbody .MuiGrid-root{
    display:none;
}
#pdfbody .MuiFormControl-root{
    padding:5px;
    border: 1px solid #000 !important;
    border-top: none;
}

li > ul > li {
  list-style-type: disc !important;
}
</style>`;
}
function getHeaderInfoRows(details) {
  let html = `<table class="table headerInfo">`;
  try {
    for (let key in headFields) {
      let value = details[key] || '';
      if (key === 'Bid due date') value = moment(value).format('DD-MMM-YYYY');
      html += `<tr>`;
      html += `<td>${headFields[key]}</td>`;
      html += `<td>${value.toString()}</td>`;
      // html += `<td></td>`;
      html += `</tr>`;
    }
  } catch (error) {
    console.log('Error in getHeaderInfoRows');
  }
  html += `</table>`;
  return html;
}
function getProposalTeamsRows(questions) {
  const coreTeamQuestions = questions
    .filter(
      (question) =>
        (shouldInclude(question) &&
          question.section.sectionName === PT_SECTION &&
          CORE_TEAM[question.questionText]) ||
        (question.section.sectionName === SPECIALITY_SECTION &&
          question.questionText === 'Medical Strategy Lead')
    )
    .sort((a, b) => a.questionOrder - b.questionOrder);
  const otherTeamQuestions = questions
    .filter(
      (question) =>
        shouldInclude(question) &&
        question.section.sectionName === PT_SECTION &&
        !CORE_TEAM[question.questionText]
    )
    .sort((a, b) => a.questionOrder - b.questionOrder);
  let html = ``;
  try {
    html += `<table class="proposalTeam table marginTop20">`;
    html += `<tr>`;
    html += `<th> Core Team Members </th>`;
    html += `<th> Name</th>`;
    html += `</tr>`;
    coreTeamQuestions
      ? coreTeamQuestions.forEach((question) => {
          console.log(question, 'question core team');
          const { questionText, answers } = question;
          const extraNewLines = getExtraLines(
            questionText,
            getLastAnswer(answers)
          );
          html += `<tr>`;
          html += `<td>${questionText} </td>`;
          html += `<td>${checkFormattedAnswer(answers)} </td>`;
          html += `</tr>`;
        })
      : (html += `<tr>`);
    html += `<td>${questionText} </td>`;
    html += `<td>${checkFormattedAnswer(answers)} </td>`;
    html += `</tr>`;
    html += `</table>`;
    html += `<table class="proposalTeam table">`;
    html += `<tr>`;
    html += `<th> Specialty Team Members </th>`;
    html += `<th> Name</th>`;
    html += `</tr>`;
    otherTeamQuestions.forEach((question) => {
      const { questionText, answers } = question;
      const extraNewLines = getExtraLines(questionText, getLastAnswer(answers));
      html += `<tr>`;
      html += `<td>${questionText} </td>`;
      html += `<td>${checkFormattedAnswer(answers)} </td>`;
      html += `</tr>`;
    });
    html += `</table>`;
  } catch (error) {
    console.log('Error in getProposalTeamsRows');
  }
  return html;
}
function questionTables(allQuestions, proposalQuestions) {
  // Array<Table of each section>
  let html = ``;
  // Remove not visible questions
  let questions = proposalQuestions
    .filter((question) => {
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
  questions.forEach((question) => {
    try {
      let section = question.section.sectionName || '';
      if (section === 'Questions_for_the_Customer_left_panel')
        section = 'Questions for the Customer';
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
  ordereredSections.forEach((section) => {
    if (section === QC_SECTION) {
      html += `<table class="questionTable table marginTop20">`;
      html += `<tr>`;
      html += `<th> ${section} </th>`;
      html += `<th> </th>`;
      html += `</tr>`;

      sections[section]
        .sort((a, b) => a.questionOrder - b.questionOrder)
        .forEach((question) => {
          const questionHTML = question.questionHTML || question.questionText;

          html += `<tr>`;
          html += `<td> ${questionHTML} </td>`;
          html += `<td> ${formatDate(
            checkFormattedAnswer(question.answers),
            question.answerConfiguration
          )} <span class="blueColorText">${
            getUnityPredicatedText(question.answers)
              ? getUnityPredicatedText(question.answers)
              : ''
          }</span></td>`;
          html += `</tr>`;
        });

      let questionsToCustomerRightSection = allQuestions
        .filter(
          (question) =>
            shouldInclude(question) &&
            question.section.sectionName === QC_SECTION
        )
        .sort((a, b) => a.questionOrder - b.questionOrder);
      questionsToCustomerRightSection.forEach((question) => {
        const { questionText } = question;
        html += `<tr>`;
        html += `<td> ${questionText}</td>`;
        html += `<td class="spacing-left"> ${formatDate(
          checkFormattedAnswer(question.answers),
          question.answerConfiguration
        )} <span class="blueColorText">${
          getUnityPredicatedText(question.answers)
            ? getUnityPredicatedText(question.answers)
            : ''
        }</span></td>`;
        html += `</tr>`;
      });
      html += `</table>`;
    } else {
      html += `<table class="questionTable table marginTop20">`;
      html += `<tr>`;
      html += `<th> ${section} </th>`;
      html += `<th> </th>`;
      html += `</tr>`;
      sections[section]
        .sort((a, b) => a.questionOrder - b.questionOrder)
        .forEach((question) => {
          const questionHTML = question.questionHTML || question.questionText;
          html += `<tr>`;
          html += `<td> ${questionHTML} </td>`;
          html += `<td> ${formatDate(
            checkFormattedAnswer(question.answers),
            question.answerConfiguration
          )} <span class="blueColorText">${
            getUnityPredicatedText(question.answers)
              ? getUnityPredicatedText(question.answers)
              : ''
          }</span></td>`;
          html += `</tr>`;
        });
      html += `</table>`;
    }
  });
  return html;
}

function getNotesRows(notes, editor) {
  let html = ``;
  html += `<table style="width: 480px !important;" class="notesTable table marginTop20">`;
  html += `<tr>`;
  html += `<th>General Notes</th>`;
  html += `</tr>`;
  html += `</table>`;
  let data = ``;
  data += `<table class="notesData" style="width: 480px !important;"><tr><td style="border:1px solid black;padding:20px">`;
  try {
    const noteText = editor.getJSON();
    // console.log(noteText, 'noteText');
    // console.log('notepad html', editor.getHTML());
    const str = editor.getHTML();
    // console.log(str, 'string');
    // str.replaceAll(' ', '&nbsp;');
    try {
      // console.log('noteText pdf', noteText);
      data += generateHTML(noteText, [
        StarterKit,
        Link,
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
            style: `color:blue;`
          },
          renderLabel({ options, node }) {
            return `${node.attrs.id}`;
          }
        })
      ]);
      // console.log('ddata', data);
      data += `</td></tr></table>`;
      html += data;
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
  <div id="page" style="width: 480px !important;"> <div style="width: 480px !important;"><div style="width: 480px !important;">
  <div style="width: 200px;"><div style="font-size:14px;color:#00a3e0;font-family:ProximaNova-Regular;font-weight:700;width: 250px;display: flex;">      
  <p style="font-style:italic;display: flex; "font-size:14px !important;">${proposalDetails[
    'CRM #'
  ] || ' '}${'&nbsp'}
  </p>Opportunity Overview
</div></div>${getHeaderInfoRows(proposalDetails)}
         ${getProposalTeamsRows(questions)}
         ${questionTables(questions, filteredQuestions)}
         ${getNotesRows(notes, editor)}
      </div>   </div></div>    `;
  // this is added to handle , some data having unclosed span tag.
  const SpanExp = /[^<]\/span>/g;
  if (html.match(SpanExp)) html = html?.replace(SpanExp, '</span>');
  const Prints = () => (
    <html lang="en">
      <body id="pdfbody">{ReactHtmlParser(html)}</body>
    </html>
  );
  const image = Logo;
  let string = renderToString(<Prints />);
  const emailExp = /([(][a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+[)])/gi;
  if (string.match(emailExp)) {
    const matched = string?.match(emailExp);
    if (matched)
      for (let mail = 0; mail < matched.length; mail += 1) {
        const matchEmail = new RegExp(matched[mail], 'g');
        if (string?.match(matchEmail))
          string = string?.replace(
            matched[mail],
            ` <span style="color: #000 !important0FF">${matched[mail]}</p>`
          );
      }
  }
  let extractStyles;
  let k = 0;
  let fetchedElementArray = string.split(/(>)/g);
  fetchedElementArray.filter((value) => {
    if (value.match(/text-decoration:(.*?)"/g)) {
      let foundArray = value;
      console.log(foundArray, 'array found');
      const indexFoundArray = fetchedElementArray.indexOf(foundArray);
      for (k; k < 7; k++) {
        if (fetchedElementArray[indexFoundArray + k].match(/^(.+?)<\//g)) {
          const splitText = fetchedElementArray[indexFoundArray + k].split('<');
          if (
            foundArray.match('line-through') &&
            foundArray.match('underline')
          ) {
            extractStyles = `<u><s>${splitText[0]}</s></u><${splitText[1]}`;
          } else if (foundArray.match('line-through')) {
            extractStyles = `<s>${splitText[0]}</s><${splitText[1]}`;
          } else if (foundArray.match('underline')) {
            extractStyles = `<u>${splitText[0]}</u><${splitText[1]}`;
          }
          fetchedElementArray[indexFoundArray + k] = extractStyles;
        }
      }
    }
  });
  console.log(string, 'stafhafal');
  const pdfa = new jsPDF({
    compress: true,
    orientation: 'p',
    unit: 'pt',
    format: 'a4'
  });
  pdfa.html(string, {
    callback(pdfa2) {
      const pageCount = pdfa2.internal.getNumberOfPages();
      for (let i = 0; i <= pageCount; i += 1) {
        pdfa2.setPage(i);
        pdfa2.addImage(image, 'PNG', 400, 20, 143, 60);
        pdfa2.addImage(Border, 'PNG', 50, 80, 500, 0);
        pdfa2.setTextColor(0, 163, 224);
        pdfa.setFontSize(8);
        pdfa2.text(
          '† Unity has provided this answer but not validated by user on proposal team.',
          50,
          782,
          { align: 'left' }
        );
        pdfa2.addImage(FooterHead, 'PNG', 50, 785, 500, 0);
        pdfa2.setTextColor(153, 153, 153);
        pdfa2.setFontSize(8);
        pdfa2.text(`Exported from Unity on ${dateNow()}`, 50, 800, {
          align: 'left'
        });
        pdfa2.text(`by ${userName}`, 50, 810, {
          align: 'left'
        });
        pdfa2.text(`View up-to-date Unity record here:`, 550, 800, {
          align: 'right'
        });
        pdfa2.text(`${getUnityLink(proposalDetails)}`, 550, 810, {
          align: 'right'
        });
        pdfa2.text(
          ` Copyright © ${yearNow} IQVIA. All Rights Reserved. Confidential and Proprietary.`,
          550,
          820,
          {
            align: 'right'
          }
        );
      }
      pdfa2.save(fileName);
    },
    margin: [90, 50, 90, 50],
    autoPaging: 'text'
  });
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
      {' '}
      <Page>
        {' '}
        <View>
          {' '}
          <Image></Image>{' '}
        </View>{' '}
        <View>
          {' '}
          <View>
            {' '}
            <Text>
              {' '}
              <Text> {proposalDetails['CRM #'] || ''} </Text> Opportunity
              Overview
            </Text>{' '}
          </View>{' '}
          <Html
            collapse={false} // this will preserve whitespace
            renderers={{
              p: ({ style, children }) => {
                if (children != '') {
                  return <View>{children}</View>;
                } else {
                  return <View></View>;
                }
              },
              tr: ({ style, children }) => <View>{children}</View>,
              a: ({ style, element, children }) => {
                return (
                  <HtmlLink href={element.attrs.href}>
                    {' '}
                    <Text>{children}</Text>{' '}
                  </HtmlLink>
                );
              },
              mark: ({ style, children }) => {
                return <Text>{children}</Text>;
              },
              div: ({ style, children, element }) => {
                const { _attrs } = element;
                if (
                  _attrs &&
                  _attrs.class &&
                  _attrs.class.includes(
                    'public-DraftStyleDefault-block public-DraftStyleDefault-ltr'
                  )
                ) {
                  return <Text>{children}</Text>;
                }
                return <View>{children}</View>;
              }
            }}
          >
            {' '}
            {getHtml(
              proposalDetails,
              questions,
              filteredQuestions,
              notes,
              filterState,
              editor,
              fileName
            )}
          </Html>{' '}
        </View>{' '}
        <View>
          {' '}
          <Text> </Text>{' '}
          <View>
            {' '}
            <Text> Exported from Unity on {dateNow()}</Text>{' '}
            <Text> View up-to-date Unity record here:</Text>{' '}
          </View>{' '}
          <View>
            {' '}
            <Text> by {userName}</Text>{' '}
            <Text> {getUnityLink(proposalDetails)}</Text>{' '}
          </View>{' '}
          <View>
            {' '}
            <Text></Text>{' '}
            <Text>
              {' '}
              Copyright © {yearNow} IQVIA. All Rights Reserved. Confidential and
              Proprietary.
            </Text>{' '}
          </View>{' '}
        </View>{' '}
      </Page>{' '}
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
