/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-return-assign */
import {
  getFilteredQuestion,
  headFields,
  PT_SECTION,
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
import Split from 'react-split';
import {
  pdf,
  Document,
  Page,
  View,
  StyleSheet,
  Text,
  Font,
  Image,
  Link as HtmlLink
} from '@react-pdf/renderer';
// import './AnnotationLayer.css';
import React from 'react';
import Html from 'react-pdf-html';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { constant, isString } from 'lodash';
import ProximaNova from '../../../../fonts/ProximaNova-Regular.otf';
import ProximaNovaBold from '../../../../fonts/Proxima Nova Alt Bold.otf';
import ProximaNovaBoldItalic from '../../../../fonts/Proxima-Nova-Bold-It.otf';
import ProximaNovaItalic from '../../../../fonts/Proxima-Nova-Reg-It.otf';
import moment from 'moment';
import { generateHTML } from '@tiptap/core';
import Link from '@tiptap/extension-link';
import HighLight from '@tiptap/extension-highlight';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Mention from '@tiptap/extension-mention';
import TextAlign from '@tiptap/extension-text-align';
import OrderedList from '@tiptap/extension-text-align';
import FooterHead from '../../../../img/footerHead.png';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Logo from '../../../../img/iqvia-main-logo.png';
import Border from '../../../../img/border.png';

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
  body: {
    width: '485px',
    minHeight: '60vh',
    display: 'grid',
    fontFamily: 'ProximaNova'
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
    fontFamily: 'ProximaNova',
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
function topHeading(details) {
  return `<h1 class="mainTitle"><em>${details['CRM #'] ||
    ''}</em> Opportunity Overview</h1>`;
}
const Footers = proposalDetails => (
  <div>
    <div fixed style={styles.footer}>
      <p
        style={{
          fontSize: '10px',
          fontweight: 'bold',
          color: '#00A3E0',
          marginBottom: 5,
          borderBottom: '1px solid #CCC'
        }}
      >
        † Unity has provided this answer but not validated by user on proposal
        team.{' '}
      </p>
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
        <p style={{ flex: 1, fontSize: '8px', color: '#999' }}>
          Exported from Unity on {dateNow()}
        </p>
        <p
          style={{
            flex: 1,
            fontSize: '8px',
            pAlign: 'right',
            color: '#999'
          }}
        >
          div up-to-date Unity record here:
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
        <p style={{ flex: 1, fontSize: '8px', color: '#999' }}>by {userName}</p>
        <p
          style={{
            flex: 1,
            fontSize: '8px',
            pAlign: 'right',
            color: '#999'
          }}
        >
          {getUnityLink(proposalDetails)}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 0 }}>
        <p style={{ flex: 0, fontSize: '8px', color: '#999' }} />
        <p
          style={{
            flex: 1,
            fontSize: '8px',
            pAlign: 'right',
            color: '#999'
          }}
        >
          Copyright © {yearNow} IQVIA. All Rights Reserved. Confidential and
          Proprietary.
        </p>
      </div>
    </div>
  </div>
);
function getStyled() {
  return `<style>
  *{
    font-family: ProximaNova !important;
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
body{
    padding: 50px;
    font-size: 10px;
    font-family: ProximaNova
}
table {
  width:480px;
  height: auto;
}
tr {    
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  height: auto;
}
td {    
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
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
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
}
.notesTable tr{
    border-bottom: none;
}
.notesTable tr:last-child{
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
}
.table td, .table th{
    padding: 5px;
}
.table tr td:nth-child(2){
    border-left: 1px solid #000;
}
.proposalTeam tr:first-child, .questionTable tr:first-child, .questionToCustomerTable tr:first-child, .notesTable tr:first-child{
    background: #00A3E0;
    color:#fff;
}
.questionTable tr td {
  width: 50%;
  border-right: 1px solid #000;
}
.notesTable tr td {
  width: 100%;
  border-right: 1px solid #000;
}
.notesTable >ul>li{
  padding-left: 5px;
}
.proposalTeam td {
  width: 50%;
}
.questionToCustomerTable tr td {
    width: 50%;
}
ul li{
  padding-left: 5px;
}
.questionToCustomerTable li {
    padding-bottom: 5px
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
.footerWrapper{
    display:flex;
    justify-content:space-between
}
.footerWrapper td {
    color: #EEEEEE,
    font-size:7px,
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
[data-block="true"] {
    padding-bottom:10px;
}
li {
  align-items: flex-start;
}
.questionTable ol,ul,p{
  margin-top:0px !important;
  margin-bottom:5px !important;
}
.notesTable p{
  margin-top: 0px !important;
  margin-bottom:3px !important;
}
li > ul > li {
  list-style-type: &#x26AC !important; 
      margin-left:-1em; 
  }</style>`;
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
      question =>
        shouldInclude(question) &&
        question.section.sectionName === PT_SECTION &&
        CORE_TEAM[question.questionText]
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
    html += `<table class="proposalTeam table marginTop20">`;
    html += `<tr>`;
    html += `<th> Core Team Members </th>`;
    html += `<th> Name</th>`;
    html += `</tr>`;
    coreTeamQuestions.forEach(question => {
      const { questionText, answers } = question;
      const extraNewLines = getExtraLines(questionText, getLastAnswer(answers));
      html += `<tr>`;
      html += `<td>${questionText} ${extraNewLines}</td>`;
      html += `<td>${checkFormattedAnswer(answers)} ${extraNewLines}</td>`;
      html += `</tr>`;
    });
    html += `</table>`;
    html += `<table class="proposalTeam table">`;
    html += `<tr>`;
    html += `<th> Specialty Team Members </th>`;
    html += `<th> Name</th>`;
    html += `</tr>`;
    otherTeamQuestions.forEach(question => {
      const { questionText, answers } = question;
      const extraNewLines = getExtraLines(questionText, getLastAnswer(answers));
      html += `<tr>`;
      html += `<td>${questionText} ${extraNewLines}</td>`;
      html += `<td>${checkFormattedAnswer(answers)} ${extraNewLines}</td>`;
      html += `</tr>`;
    });
    html += `</table>`;
  } catch (error) {
    console.log('Error in getProposalTeamsRows');
  }
  return html;
}
function questionTables(proposalQuestions) {
  // Array<Table of each section>
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
  ordereredSections.forEach(section => {
    html += `<table class="questionTable table marginTop20">`;
    html += `<tr>`;
    html += `<th> ${section} </th>`;
    html += `<th> </th>`;
    html += `</tr>`;
    sections[section]
      .sort((a, b) => a.questionOrder - b.questionOrder)
      .forEach(question => {
        const questionHTML = question.questionHTML || question.questionText;
        const extraNewLines = getExtraLines(
          getLastAnswerHtml(question.answers),
          questionHTML
        );
        html += `<tr>`;
        html += `<td> ${questionHTML} ${extraNewLines}</td>`;
        html += `<td> ${formatDate(
          checkFormattedAnswer(question.answers),
          question.answerConfiguration
        )} <span class="blueColorText">${
          getUnityPredicatedText(question.answers)
            ? getUnityPredicatedText(question.answers)
            : ''
        }</span>${extraNewLines}</td>`;
        html += `</tr>`;
      });
    html += `</table>`;
  });
  return html;
}
function getQuestionToCustomerRows(questions) {
  let html = ``;
  let questionsToCustomer = questions
    .filter(
      question =>
        shouldInclude(question) && question.section.sectionName === QC_SECTION
    )
    .sort((a, b) => a.questionOrder - b.questionOrder);
  if (!questionsToCustomer.length)
    questionsToCustomer = [
      { questionText: 'Question 1' },
      { questionText: 'Question 2' },
      { questionText: 'Question 3' },
      { questionText: 'Question 4' }
    ];
  html += `<table class="questionToCustomerTable table marginTop20">`;
  html += `<tr>`;
  html += `<th> ${QC_SECTION} </th>`;
  html += `</tr>`;
  try {
    questionsToCustomer.forEach((question, index) => {
      const { questionText } = question;
      console.log('question :>> ', question);
      const extraNewLines = getExtraLines(
        getLastAnswerHtml(question?.answers),
        questionText
      );
      html += `<tr>`;
      html += `<td> ${questionText} ${extraNewLines}</td>`;
      html += `<td> ${formatDate(
        checkFormattedAnswer(question.answers),
        question.answerConfiguration
      )} <span class="blueColorText">${
        getUnityPredicatedText(question.answers)
          ? getUnityPredicatedText(question.answers)
          : ''
      }</span>${extraNewLines}</td>`;
    });
    html += `</tr>`;
  } catch (error) {
    console.log('Error in getQuestionToCustomerRows');
  }
  html += `</table>`;
  console.log('111111111111 :>> ', html);
  return html;
}

function getNotesRows(notes, editor) {
  let html = ``;
  html += `<table class="notesTable table marginTop20">`;
  html += `<tr>`;
  html += `<th>General Notes</th>`;
  html += `</tr>`;
  html += `</table>`;
  let data = ``;
  data += `<table><tr><td style="border:1px solid black;padding:10px">`;
  try {
    const noteText = editor.getJSON();
    // console.log(noteText, 'noteText');
    // console.log('notepad html', editor.getHTML());
    // const str = editor.getHTML();
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
  editor
) {
  let html = ` 
  ${getStyled()}
  <div id="page" style="
      width: 500px;">
            <div style="
            width: 500px;">
              <div style="width: 500px;">
      <div style="
      margin-bottom: 5px;
      width: 200px;">
    <div style="font-size:14px;color:#00a3e0;font-family:inherit;font-weight:700;width: 250px;display: flex;">
      <p style="font-style:italic;display: flex; margin: 0px !important;">
${proposalDetails['CRM #'] || ' '}${'&nbsp'}
</p>
Opportunity Overview
</div>
</div>
         ${getHeaderInfoRows(proposalDetails)}
         ${getProposalTeamsRows(questions)}
         ${questionTables(filteredQuestions)}
         ${getQuestionToCustomerRows(questions)}
         ${getNotesRows(notes, editor)}
      </div>
   </div>
</div>
  
    `;

  // this is added to handle , some data having unclosed span tag.
  const SpanExp = /[^<]\/span>/g;
  if (html.match(SpanExp)) html = html?.replace(SpanExp, '</span>');

  const Prints = () => (
    <html>
      <body>{ReactHtmlParser(html)}</body>
    </html>
  );
  const image = Logo;
  let string = renderToString(<Prints />);

  const emailExp = /([(][a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+[)])/gi;
  if (string.match(emailExp)) {
    const matched = string?.match(emailExp);
    console.log(matched, 'mtched');
    if (matched)
      for (let mail = 0; mail <= matched.length; mail += 1) {
        const matchEmail = new RegExp(matched[mail], 'g');
        console.log(matchEmail, 'memail');
        if (string?.match(matchEmail))
          string = string?.replace(
            matched[mail],
            ` <p style="color: #0000FF">${matched[mail]}</p>`
          );
      }
  }
  if (string.match('<li'))
    string = string?.replaceAll('<li', '<li style="list-style-type: disc"');
  let extractStyles;
  let k = 0;
  let fetchedElementArray = string.split(/(>)/g);
  fetchedElementArray.filter(value => {
    if (value.match(/text-decoration:(.*?)"/g)) {
      let foundArray = value;
      let indexFoundArray = fetchedElementArray.indexOf(foundArray);
      for (k; k < 7; k++) {
        if (fetchedElementArray[indexFoundArray + k].match(/^(.+?)<\//g)) {
          const splitText = fetchedElementArray[indexFoundArray + k].split('<');
          if (
            JSON.stringify(foundArray).match('line-through') &&
            JSON.stringify(foundArray).match('underline')
          ) {
            console.log('undeline + linethourhg');
            extractStyles = `<u><s>${splitText[0]}</s></u><${splitText[1]}`;
          } else if (JSON.stringify(foundArray).match('line-through')) {
            console.log('+ linethourhg');
            extractStyles = `<s>${splitText[0]}</s><${splitText[1]}`;
          } else if (JSON.stringify(foundArray).match('underline')) {
            console.log('undeline');
            extractStyles = `<u>${splitText[0]}</u><${splitText[1]}`;
          }
          fetchedElementArray[indexFoundArray + k] = extractStyles;
          console.log(fetchedElementArray, 'farray');
          // let appendedString = '';
          // fetchedElementArray.forEach(value => (appendedString += value));
          // string = appendedString;
        }
      }
    }
  });
  console.log(string, 'lstr');
  const pdfa = new jsPDF('p', 'pt', 'a4');
  pdfa.html(string, {
    callback(pdfa2) {
      const pageCount = pdfa2.internal.getNumberOfPages();
      for (let i = 0; i <= pageCount; i += 1) {
        pdfa2.setPage(i);
        pdfa2.addImage(image, 'PNG', 400, 20, 143, 60);
        pdfa2.addImage(Border, 'PNG', 50, 80, 500, 0);
        pdfa2.setTextColor(0, 163, 224);
        pdfa.setFontSize(12);
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
      pdfa2.save('savev');
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
  editor
) => {
  return (
    <Document>
      <Page wrap style={styles.page}>
        <View fixed style={styles.header}>
          <Image src={Logo} style={styles.imgLogo}></Image>
        </View>
        <View style={styles.body}>
          <View style={styles.heading}>
            <Text style={styles.headingText}>
              <Text style={{ fontStyle: 'italic' }}>
                {proposalDetails['CRM #'] || ''}{' '}
              </Text>
              Opportunity Overview
            </Text>
          </View>
          <Html
            collapse={false} // this will preserve whitespace
            style={{ fontSize: 10 }}
            renderers={{
              p: ({ style, children }) => {
                if (children != '') {
                  return <View style={style}>{children}</View>;
                } else {
                  return <View style={{ height: 18 }}></View>;
                }
              },
              tr: ({ style, children }) => (
                <View style={style}>{children}</View>
              ),
              a: ({ style, element, children }) => {
                return (
                  <HtmlLink style={style} href={element.attrs.href}>
                    <Text>{children}</Text>
                  </HtmlLink>
                );
              },
              mark: ({ style, children }) => {
                return <Text style={style}>{children}</Text>;
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
                  return <Text style={style}>{children}</Text>;
                }
                return <View style={style}>{children}</View>;
              }
            }}
          >
            {getHtml(
              proposalDetails,
              questions,
              filteredQuestions,
              notes,
              filterState,
              editor
            )}
          </Html>
        </View>
        <View fixed style={styles.footer}>
          <Text
            style={{
              fontSize: '10px',
              fontweight: 'bold',
              color: `#00A3E0`,
              marginBottom: 5,
              borderBottom: '1px solid #CCC'
            }}
          >
            † Unity has provided this answer but not validated by user on
            proposal team.{' '}
          </Text>
          <View
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}
          >
            <Text style={{ flex: 1, fontSize: '8px', color: '#999' }}>
              Exported from Unity on {dateNow()}
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: '8px',
                textAlign: 'right',
                color: '#999'
              }}
            >
              View up-to-date Unity record here:
            </Text>
          </View>
          <View
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}
          >
            <Text style={{ flex: 1, fontSize: '8px', color: '#999' }}>
              by {userName}
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: '8px',
                textAlign: 'right',
                color: '#999'
              }}
            >
              {getUnityLink(proposalDetails)}
            </Text>
          </View>
          <View
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 0 }}
          >
            <Text style={{ flex: 0, fontSize: '8px', color: '#999' }}></Text>
            <Text
              style={{
                flex: 1,
                fontSize: '8px',
                textAlign: 'right',
                color: '#999'
              }}
            >
              Copyright © {yearNow} IQVIA. All Rights Reserved. Confidential and
              Proprietary.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export function createPdf(content) {
  let {
    data: { proposalQuestions, proposalDetails },
    notes,
    filterState,
    editor
  } = content;
  const filteredQuestions = getFilteredQuestion(proposalQuestions, filterState);
  return pdf(
    MyDoc(
      proposalDetails,
      proposalQuestions,
      filteredQuestions,
      notes,
      filterState,
      editor
    )
  ).toBlob();
}
