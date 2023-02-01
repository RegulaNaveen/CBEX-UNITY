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
import jsPDF from 'jspdf';
import { isString } from 'lodash';
import moment from 'moment';
import html2pdf from 'html2pdf.js';
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
function getStyled() {
  return `<style>

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
ul li{
  padding-left: 5px;
}
.blueColorText{
    color: #00A3E0;
    font-family:Helvetica;
    font-size: 10px;
}
 .public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR {
  margin-left: 10px;
  list-style-type: disc !important;
}
li {
  align-items: flex-start;
}
  li ul li{
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 5px;
  }
  ul ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 5px;
  }
  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
#resp-table {
  width: 480px;
  height: auto;
  display: table;
  border: 1px solid #000;
  border-bottom: 0px;
  }
  #resp-table-caption{
    display: table-cell;
    text-align: center;
    font-size: 12px;
    color: #fff;
    font-weight: bold;
    background-color: #00A3E0;
    padding:5px;
    }
    #resp-table-header {
      display: table-cell;
      font-size: 12px;
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
    word-break: break-all;
}
.table-header-cell:nth-child(odd) {
  background-color: #EEEEEE;
  border-right: 1px solid #000;
}
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
            }
            .notes-ol ol {
              padding-left: 15px;
          }

</style>`;
}
function getHeaderInfoRows(details) {
  let html = `<div id="resp-table" class="table headerInfo">`;
  try {
    for (let key in headFields) {
      let value = details[key] || '';
      if (key === 'Bid due date') value = moment(value).format('DD-MMM-YYYY');
      html += `<div class="resp-table-row">`;
      html += `<div class="table-header-cell">${headFields[key]}</div>`;
      html += `<div class="table-header-cell">${value.toString()}</div>`;
      // html += `<div class="table-header-cell"></div>`;
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
      const extraNewLines = getExtraLines(questionText, getLastAnswer(answers));
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
        // emailLink = `<p><span data-type="mention" style="color:blue;" data-id="${String(
        //   tempEmail
        // ).toUpperCase()}" data-label="${String(
        //   name
        // ).toUpperCase()}">${tempEmail}</span></p>`;
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
    otherTeamQuestions.forEach(question => {
      const { questionText, answers } = question;
      const extraNewLines = getExtraLines(questionText, getLastAnswer(answers));
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
      html += `<div id="resp-table-caption"> ${section} </div>`;
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
        const extraNewLines = getExtraLines(
          getLastAnswerHtml(question.answers),
          questionHTML
        );
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
        const extraNewLines = getExtraLines(
          getLastAnswerHtml(question?.answers),
          questionText
        );
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
      html += `<div id="resp-table-caption"> ${section} </div>`;
      html += `<div id="resp-table-caption"></div>`;
      html += `</div>`;
      sections[section]
        .sort((a, b) => a.questionOrder - b.questionOrder)
        .forEach(question => {
          const questionHTML = question.questionHTML || question.questionText;
          const extraNewLines = getExtraLines(
            getLastAnswerHtml(question.answers),
            questionHTML
          );
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
  data += `<div id="resp-table" style="border-bottom: 1px solid #000;"><div class="resp-table-row"><div class="notes-ol" style="padding: 10px;">`;
  try {
    const noteText = editor.getJSON();
    try {
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
      data += `</div></div></div>`;
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
  <div id="page" style="width: 500px;"> <div style="width: 500px;"><div style="width: 500px;">  <div style="margin-bottom: 5px;width: 200px;"><div style="font-size:14px;color:#00a3e0;font-family:inherit;font-weight:700;width: 250px;display: flex;">  <p style="font-style:italic;display: flex; margin: 0px !important;">${proposalDetails[
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

  // const BrackExp = /[\(\)']+/g;
  const BrackExp = /\([^(]\/span>/g;
  if (html.match(BrackExp)) html = html?.replace(BrackExp, '</span> ');

  const Prints = () => (
    <html lang="en">
      <body id="pdfbody">{ReactHtmlParser(html)}</body>
    </html>
  );
  const image = Logo;
  let string = renderToString(<Prints />);
  // const emailExp = /([(][a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+[)])/gi;
  // if (string.match(emailExp)) {
  //   const matched = string?.match(emailExp);
  //   if (matched)
  //     for (let mail = 0; mail < matched.length; mail += 1) {
  //       const matchEmail = new RegExp(matched[mail], 'g');
  //       if (string?.match(matchEmail))
  //         string = string?.replace(
  //           matched[mail],
  //           ` <span style="color: #0000FF">${matched[mail]}</p>`
  //         );
  //     }
  // }
  let extractStyles;
  let k = 0;
  let fetchedElementArray = string.split(/(>)/g);
  let foundArray = [];
  fetchedElementArray.filter(value => {
    if (value.match(/text-decoration:(.*?)"/g)) {
      foundArray.push(value);
    }
    foundArray.forEach(item => {
      const indexFoundArray = fetchedElementArray.indexOf(item);
      const currentIndex = item;
      for (k; k < 7; k++) {
        if (fetchedElementArray[indexFoundArray + k].match(/^(.+?)<\//)) {
          const splitText = fetchedElementArray[indexFoundArray + k].split('<');
          if (
            currentIndex.match('line-through') &&
            currentIndex.match('underline')
          ) {
            extractStyles = `<u><s>${splitText[0]}</s></u><${splitText[1]}`;
            fetchedElementArray[indexFoundArray + k] = extractStyles;
          } else if (currentIndex.match('line-through')) {
            extractStyles = `<s>${splitText[0]}</s><${splitText[1]}`;
            fetchedElementArray[indexFoundArray + k] = extractStyles;
          } else if (currentIndex.match('underline')) {
            extractStyles = `<u>${splitText[0]}</u><${splitText[1]}`;
            fetchedElementArray[indexFoundArray + k] = extractStyles;
          }
          let appendedString = '';
          fetchedElementArray.forEach(value => (appendedString += value));
          string = appendedString;
        }
      }
    });
  });
  // console.log('string :>> ', string);
  const opt = {
    // margin: 1,
    filename: fileName,
    enableLinks: true,
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'pt', format: 'a4', orientation: 'p', compress: true }
  };
  html2pdf()
    .set(opt)
    .from(string)
    .save();
  // pdfa.setFont('ProximaNova-Regular');
  // pdfa.setFontSize(12);
  // pdfa.html(string, {
  //   callback(pdfa2) {
  //     const pageCount = pdfa2.internal.getNumberOfPages();
  //     for (let i = 0; i <= pageCount; i += 1) {
  //       pdfa2.setPage(i);
  //       pdfa2.addImage(image, 'PNG', 400, 20, 143, 60);
  //       pdfa2.addImage(Border, 'PNG', 50, 80, 500, 0);
  //       pdfa2.setTextColor(0, 163, 224);
  //       pdfa.setFontSize(8);
  //       pdfa2.text(
  //         '† Unity has provided this answer but not validated by user on proposal team.',
  //         50,
  //         782,
  //         { align: 'left' }
  //       );
  //       pdfa2.addImage(FooterHead, 'PNG', 50, 785, 500, 0);
  //       pdfa2.setTextColor(153, 153, 153);
  //       pdfa2.setFontSize(8);
  //       pdfa2.text(`Exported from Unity on ${dateNow()}`, 50, 800, {
  //         align: 'left'
  //       });
  //       pdfa2.text(`by ${userName}`, 50, 810, {
  //         align: 'left'
  //       });
  //       pdfa2.text(`View up-to-date Unity record here:`, 550, 800, {
  //         align: 'right'
  //       });
  //       pdfa2.text(`${getUnityLink(proposalDetails)}`, 550, 810, {
  //         align: 'right'
  //       });
  //       pdfa2.text(
  //         ` Copyright © ${yearNow} IQVIA. All Rights Reserved. Confidential and Proprietary.`,
  //         550,
  //         820,
  //         {
  //           align: 'right'
  //         }
  //       );
  //       pdfa2.text(` ${i}`, 270, 830, {
  //         align: 'center'
  //       });
  //     }
  //     pdfa2.save(fileName);
  //   },
  //   margin: [90, 50, 90, 50]
  // });
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
      <Page wrap style={styles.page}>
        {' '}
        <View fixed style={styles.header}>
          {' '}
          <Image src={Logo} style={styles.imgLogo}></Image>{' '}
        </View>{' '}
        <View style={styles.body}>
          {' '}
          <View style={styles.heading}>
            {' '}
            <Text style={styles.headingText}>
              {' '}
              <Text style={{ fontStyle: 'italic' }}>
                {' '}
                {proposalDetails['CRM #'] || ''}{' '}
              </Text>{' '}
              Opportunity Overview
            </Text>{' '}
          </View>{' '}
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
                    {' '}
                    <Text>{children}</Text>{' '}
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
        <View fixed style={styles.footer}>
          {' '}
          <Text
            style={{
              fontSize: '10px',
              fontweight: 'bold',
              color: `#00A3E0`,
              marginBottom: 5,
              borderBottom: '1px solid #CCC'
            }}
          >
            {' '}
            † Unity has provided this answer but not validated by user on
            proposal team.{' '}
          </Text>{' '}
          <View
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}
          >
            {' '}
            <Text style={{ flex: 1, fontSize: '8px', color: '#999' }}>
              {' '}
              Exported from Unity on {dateNow()}
            </Text>{' '}
            <Text
              style={{
                flex: 1,
                fontSize: '8px',
                textAlign: 'right',
                color: '#999'
              }}
            >
              {' '}
              View up-to-date Unity record here:
            </Text>{' '}
          </View>{' '}
          <View
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}
          >
            {' '}
            <Text style={{ flex: 1, fontSize: '8px', color: '#999' }}>
              {' '}
              by {userName}
            </Text>{' '}
            <Text
              style={{
                flex: 1,
                fontSize: '8px',
                textAlign: 'right',
                color: '#999'
              }}
            >
              {' '}
              {getUnityLink(proposalDetails)}
            </Text>{' '}
          </View>{' '}
          <View
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 0 }}
          >
            {' '}
            <Text
              style={{ flex: 0, fontSize: '8px', color: '#999' }}
            ></Text>{' '}
            <Text
              style={{
                flex: 1,
                fontSize: '8px',
                textAlign: 'right',
                color: '#999'
              }}
            >
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
