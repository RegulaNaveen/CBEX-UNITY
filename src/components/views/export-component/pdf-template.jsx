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
import getRenderedSize from 'react-rendered-size';
import FooterHead from '../../../../img/footerHead.png';
import Logo from '../../../../img/iqvia-hd-logo.png';
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
function getStyled() {
  return `<style>

body {
  font-family: ProximaNova-Regular !important;
  font-size: 10px;
  word-spacing: 1px;
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
    font-size: 8px;
}
  li ul li{
    display: block;
    list-style-type: disc !important;
  }
  ul li {
    display: block;
    list-style-type: disc !important;
  }
  ul ul {
    
    display: block;
    list-style-type: disc !important;
  }
  ul {
    list-style-type: disc !important;
  }
#resp-table {
  width: 493px;
  height: auto;
  display: table;
  border: 1px solid #000;
  border-bottom: 0px;
  }
  .breaking-it {
    padding-top: 130px;
  }
  #resp-table-caption{
    display: table-cell;
    text-align: center;
    font-size: 10px;
    color: #fff;
    font-weight: bold;
    background-color: #00A3E0;
    padding:5px;
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
  }
  .table-header-cell {
    display: table-cell;
    padding: 10px;
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
      // html += `<div class="table-header-cell"></div>`;
      html += `</div>`;
      // size += getRenderedSize(<div>{html}</div>).height;
      // if (size > 1050) {
      //   size = 0;
      //   html += `<div class="breaking-it"></div>`;
      // }
      // console.log(size, 'sze');
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
        emailLink = `<p><span data-type="mention" style="color:blue;" data-id="${String(
          tempEmail
        ).toUpperCase()}" data-label="${String(
          name
        ).toUpperCase()}">${tempEmail}</span></p>`;
      }
      html += `<div class="table-header-cell">${emailLink}</div>`;
      html += `</div>`;
      // size += getRenderedSize(<div>{html}</div>).height;
      // if (size > 950) {
      //   size = 0;
      //   html += `<div class="breaking-it"></div>`;
      // }
      // console.log(size, 'sze');
    });
    html += `</div>`;
    html += `<div id="resp-table" class="proposalTeam table marginTop20">`;
    html += `<div class="resp-table-row">`;
    html += `<div id="resp-table-header"> Specialty Team Members </div>`;
    html += `<div id="resp-table-header"> Name</div>`;
    html += `</div>`;
    otherTeamQuestions.forEach(question => {
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
        otherTeamQuestionsemailLink = `<p><span data-type="mention" style="color:blue" data-id=${String(
          tempEmailOther
        ).toUpperCase()} data-label=${String(
          nameOther
        ).toUpperCase()}>${nameOther}<p style="opacity: 0.0; padding-left">${tempEmailOther}</p></span> 
        </p>`;
      }
      html += `<div class="table-header-cell">${otherTeamQuestionsemailLink}</div>`;
      html += `</div>`;
      // size += getRenderedSize(<div>{html}</div>).height;
      // if (size > 950) {
      //   size = 0;
      //   html += `<div class="breaking-it"></div>`;
      // }
      // console.log(size, 'sze');
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
        // size += getRenderedSize(<div>{html}</div>).height;
        // if (size > 950) {
        //   size = 0;
        //   html += `<div class="breaking-it"></div>`;
        // }
        // console.log(size, 'sze');
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
        // size += getRenderedSize(<div>{html}</div>).height;
        // if (size > 950) {
        //   size = 0;
        //   html += `<div class="breaking-it"></div>`;
        // }
        // console.log(size, 'sze');
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
          // size += getRenderedSize(<div>{html}</div>).height;
          // if (size > 950) {
          //   size = 0;
          //   html += `<div class="breaking-it"></div>`;
          // }
          // console.log(size, 'sze');
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
      // size += getRenderedSize(<div>{html}</div>).height;
      // if (size > 950) {
      //   size = 0;
      //   html += `<div class="breaking-it"></div>`;
      // }
      // console.log(size, 'sze');
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
  <div id="page" style="width: 493px;"> <div style="width: 493px;"><div style="width: 493px;">  <div style="margin-bottom: 5px;width: 493px;"><div style="font-size:14px;color:#00a3e0;font-family:inherit;font-weight:700;width: 493px;display: flex;">  <p style="font-style:italic;display: flex; margin: 0px !important;">${proposalDetails[
    'CRM #'
  ] || ' '}${'&nbsp'}
   Opportunity Overview</p>
</div></div>${getHeaderInfoRows(proposalDetails)}
         ${getProposalTeamsRows(questions)}
         ${questionTables(questions, filteredQuestions)}
         ${getNotesRows(notes, editor)}
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
  });
  foundArray.forEach(item => {
    const indexFoundArray = fetchedElementArray.indexOf(item);
    for (k; k < 7; k++) {
      if (fetchedElementArray[indexFoundArray + k].match(/[^>](.+?)<\//gi)) {
        const splitText = fetchedElementArray[indexFoundArray + k].split('<');
        if (
          JSON.stringify(fetchedElementArray[indexFoundArray]).match(
            'line-through'
          ) &&
          JSON.stringify(fetchedElementArray[indexFoundArray]).match(
            'underline'
          )
        ) {
          extractStyles = `<s><u>${splitText[0]}</u></s><${splitText[1]}`;
          fetchedElementArray[indexFoundArray + k] = extractStyles;
          return fetchedElementArray;
        } else if (
          JSON.stringify(fetchedElementArray[indexFoundArray]).match(
            'line-through'
          )
        ) {
          extractStyles = `<s>${splitText[0]}</s><${splitText[1]}`;
          fetchedElementArray[indexFoundArray + k] = extractStyles;
          return fetchedElementArray;
        } else if (
          JSON.stringify(fetchedElementArray[indexFoundArray]).match(
            'underline'
          )
        ) {
          extractStyles = `<u>${splitText[0]}</u><${splitText[1]}`;
          fetchedElementArray[indexFoundArray + k] = extractStyles;
          return fetchedElementArray;
        }
      }
    }
  });
  let appendedString = '';
  fetchedElementArray.forEach(value => (appendedString += value));
  string = appendedString;
  // const dom = new DOMParser().parseFromString(string, 'text/html');
  // const stringArray = dom.getElementById('pdfbody').outerHTML;
  const stringArray = string.split(/(<\/div>)/g);
  console.log(stringArray, 'asaara');
  let newSize = 0;
  stringArray.forEach(item => {
    newSize += getRenderedSize(<div>{item}</div>).height;
    if (newSize > 800) {
      item = item + `<div class="breaking-it"></div>`;
      console.log(item, 'itm');
      newSize = 0;
    }
  });
  console.log(newSize, 'newSize');
  const pdfa = new jsPDF('p', 'pt', 'a4');
  pdfa.html(string, {
    callback(pdfa2) {
      const pageCount = pdfa2.internal.getNumberOfPages();
      for (let i = 0; i <= pageCount; i += 1) {
        pdfa2.setPage(i);
        pdfa2.addImage(image, 'PNG', 403, 20, 143, 60);
        pdfa2.addImage(Border, 'PNG', 50, 80, 493, 1);
        pdfa.setFont('ProximaNova-Regular');
        pdfa2.setTextColor(0, 163, 224);
        pdfa2.setFontSize(8);
        pdfa2.text(
          '† Unity has provided this answer but not validated by user on proposal team.',
          50,
          752,
          { align: 'left' }
        );
        pdfa2.addImage(FooterHead, 'PNG', 50, 755, 493, 1);
        pdfa2.setTextColor(153, 153, 153);
        pdfa2.setFontSize(8);
        pdfa2.text(`Exported from Unity on ${dateNow()}`, 50, 770, {
          align: 'left'
        });
        pdfa2.text(`by ${userName}`, 50, 780, {
          align: 'left'
        });
        pdfa2.text(`View up-to-date Unity record here:`, 543, 770, {
          align: 'right'
        });
        pdfa2.text(`${getUnityLink(proposalDetails)}`, 543, 780, {
          align: 'right'
        });
        pdfa2.text(
          ` Copyright © ${yearNow} IQVIA. All Rights Reserved. Confidential and Proprietary.`,
          543,
          790,
          {
            align: 'right'
          }
        );
        pdfa2.text(` ${i}`, 297.5, 810, {
          align: 'center'
        });
      }
      pdfa2.save(fileName);
    },
    margin: [100, 50, 100, 50]
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
