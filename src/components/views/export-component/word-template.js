/* eslint-disable camelcase */
import {
  Document,
  Paragraph,
  Table,
  TextRun,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
  convertInchesToTwip,
  BorderStyle,
  SectionType,
  TableLayoutType,
  Header,
  Footer,
  AlignmentType,
  ImageRun,
  ExternalHyperlink
} from 'docx';

import { DocxSerializer, defaultNodes, defaultMarks } from 'prosemirror-docx';

import { cloneDeep, has, isObject, isString } from 'lodash';
import moment from 'moment-timezone';
import { API } from '../../../constants';
import {
  applyAnsweredFilter,
  applyinterestedPartiesFilter,
  applyMileStonesFilter,
  applyMyUserRoleFilter,
  applyNotApplicableFilter,
  applyUnAnsweredFilter
} from './filter-util';

export const themeBlue = '00A3E0';
export const themeGrey = 'EEEEEE';
export const DEFAULT_FONT = 'Arial';
export const PT_SECTION = 'Proposal Team';
export const QC_SECTION = 'Questions for the Customer';
export const QC_SECTION_LEFT_PANEL = 'Questions_for_the_Customer_left_panel';

const questionCellWidth50 = {
  size: convertInchesToTwip(3.1),
  type: WidthType.DXA
};
const questionCellWidth100 = {
  size: convertInchesToTwip(6.2),
  type: WidthType.DXA
};
const questionCellWidth25 = {
  size: convertInchesToTwip(1.55),
  type: WidthType.DXA
};
const questionCellWidth75 = {
  size: convertInchesToTwip(4.65),
  type: WidthType.DXA
};
const questionCellWidth40 = {
  size: convertInchesToTwip(2.48),
  type: WidthType.DXA
};
const questionCellWidth60 = {
  size: convertInchesToTwip(3.72),
  type: WidthType.DXA
};
const zone = moment.tz.guess();
export const userName = localStorage ? localStorage.getItem('userName') : '';
export const dateNow = () =>
  `${moment().format('DD-MMM-YYYY HH:mm:ss')} ${moment()
    .tz(zone)
    .zoneAbbr()}`;
export const yearNow = moment().format('YYYY');

export const headFields = {
  Customer: 'Customer',
  'Protocol number': 'Protocol Title',
  'Verbatim indication': 'Indication',
  Phase: 'Phase',
  bidNo: 'Bid Number',
  'Bid due date': 'Due Date'
};
export const CORE_TEAM = {
  'Proposal Developer': 'PD',
  'Business Developer': 'BD',
  TSL: 'TSL',
  'Medical Advisor': 'Medical Advisor',
  'Medical Strategy Lead': 'Medical Strategy Lead',
  'Project Lead': 'Project Leadership',
  Clinical: 'Clinical DS&B',
  'Clinical DS&B': 'Clinical DS&B',
  'Analytics Strategy Lead': 'Analytics Strategy Lead'
};
const cellMargin5P = {
  left: convertInchesToTwip(0.1),
  right: convertInchesToTwip(0.05),
  top: convertInchesToTwip(0.05),
  bottom: convertInchesToTwip(0.05)
};

function topHeading(details) {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: details['CRM #'] || '',
          color: themeBlue,
          size: 28,
          bold: true,
          italics: true,
          font: DEFAULT_FONT
        }),
        new TextRun({
          text: ' Opportunity Overview',
          color: themeBlue,
          size: 28,
          bold: true,
          font: DEFAULT_FONT
        })
      ],
      spacing: { after: 500 }
    })
  ];
}
export function getLastAnswer(answers) {
  try {
    const lastAnswer = answers[answers.length - 1];
    return (lastAnswer && lastAnswer?.answer.toString()) || '';
  } catch (error) {
    console.log(error);
    return '';
  }
}

export function getLastAnswerHtml(answers) {
  try {
    const lastAnswer = answers[answers.length - 1];
    return (lastAnswer && lastAnswer?.formattedAnswer?.html) || '';
  } catch (error) {
    console.log(error);
    return '';
  }
}

export function getFormattedTextStyles(styleMaps, index) {
  let styleId = '';
  const styles = {
    bold: false,
    italics: false,
    strike: false,
    font: DEFAULT_FONT
  };
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const styleMap of styleMaps) {
      const { start, end, style: key } = styleMap;
      if (start <= index && index <= end) {
        if (key === 'BOLD') {
          styles.bold = true;
          styleId += '(b)';
        }
        if (key === 'ITALIC') {
          styles.italics = true;
          styleId += '(i)';
        }
        if (key === 'STRIKETHROUGH') {
          styles.strike = true;
          styleId += '(s)';
        }
        if (key === 'UNDERLINE') {
          styles.underline = {};
          styleId += '(u)';
        }
        if (key.includes('fontSize')) {
          // eslint-disable-next-line radix
          styles.size = parseInt(key.slice(key.length - 4, key.length - 2));
          styleId += '(fs)';
        }
        if (key.includes('color')) {
          styles.color = key.slice(key.length - 6, key.length);
          styleId += '(fc)';
        }
        if (key.includes('backgroundColor')) {
          styles.shading = {
            fill: key.slice(key.length - 6, key.length),
            type: ShadingType.CLEAR,
            color: 'auto'
          };
          styleId += '(bc)';
        }
      }
    }
  } catch (error) {
    console.log('Error while Setting style object');
  }
  return { styles, styleId };
}

function getFormattedTextCells(paras) {
  return new TableCell({
    children: [...paras],
    // width: questionCellWidth100,
    margins: cellMargin5P,
    width: questionCellWidth50,
    borders: {
      top: { color: 'FFFFFF' },
      left: { color: 'FFFFFF' },
      right: { color: 'FFFFFF' },
      bottom: { color: 'FFFFFF' }
    }
  });
}

function parseJson(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}

function isContainFormattedAnswer(lastAnswerJS) {
  const formattedAnswer =
    has(lastAnswerJS, 'formattedAnswer') && lastAnswerJS.formattedAnswer;
  const parseFormattedData =
    !formattedAnswer || isObject(formattedAnswer)
      ? formattedAnswer
      : parseJson(formattedAnswer);

  if (parseFormattedData && parseFormattedData.value) return true;
  return false;
}

function getFormattedTextRows(formatedTextBlocks) {
  let textBlocks;
  if (isString(formatedTextBlocks)) textBlocks = JSON.parse(formatedTextBlocks);
  else textBlocks = formatedTextBlocks;
  const paras = [];
  const rows = [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('')],
          shading: {
            type: ShadingType.CLEAR,
            color: 'auto'
          },
          width: questionCellWidth50,
          borders: {
            top: { color: 'FFFFFF' },
            left: { color: 'FFFFFF' },
            right: { color: 'FFFFFF' },
            bottom: { color: 'FFFFFF' }
          }
        })
      ]
    })
  ];
  try {
    const { entityMap } = textBlocks.value;
    let mentions = [];
    let offset = 0;
    textBlocks.value.blocks.forEach(block => {
      const texts = [];
      let { text, inlineStyleRanges, type, depth, entityRanges } = block;
      if (Array.isArray(entityRanges) && entityRanges.length > 0) {
        entityRanges = entityRanges.reverse();
        entityRanges.forEach(entity => {
          if (
            entityMap &&
            entityMap[entity.key] &&
            entityMap[entity.key]['data'] &&
            entityMap[entity.key]['data']['email']
          ) {
            mentions.push({
              start: offset + entity.offset,
              end: offset + entity.offset + entity.length,
              email: entityMap[entity.key]['data']['email'] || ''
            });
          }
        });
      }
      const listType = type.includes('list-item')
        ? { bullet: { level: depth } }
        : {};
      const styleMap = [];
      inlineStyleRanges.forEach(range => {
        const { style, offset, length } = range;
        styleMap.push({ start: offset, end: offset + length - 1, style });
      });

      let lastStyleId = '';
      let lastText = '';
      let lastStyle = {};
      mentions = mentions.sort((a, b) => a.start - b.start);
      const mentionsStartList = mentions.map(m => m.start);
      for (let i = 0; i < text.length; i++) {
        const { styles, styleId } = getFormattedTextStyles(styleMap, i);
        const mentionIndex = mentionsStartList.findIndex(m => m === i + offset);
        if (mentionIndex > -1) {
          if (lastText.length > 0) {
            texts.push(
              new TextRun({
                ...{ text: lastText },
                ...styles
              })
            );
            lastText = '';
          }
          texts.push(
            new ExternalHyperlink({
              children: [
                new TextRun({
                  text: text.slice(i, mentions[mentionIndex].end - offset),
                  font: DEFAULT_FONT,
                  size: 15,
                  color: themeBlue,
                  style: 'Hyperlink'
                })
              ],
              link: `mailto:${mentions[mentionIndex].email}`
            })
          );
          i = mentions[mentionIndex].end - offset - 1;
          continue;
        }
        if (styleId === lastStyleId) {
          lastText += text[i];
        } else {
          texts.push(
            new TextRun({
              ...{ text: lastText },
              ...lastStyle
            })
          );
          lastText = text[i];
        }
        lastStyleId = styleId;
        lastStyle = styles;

        if (text.length - 1 === i) {
          texts.push(
            new TextRun({
              ...{ text: lastText },
              ...styles
            })
          );
        }
      }

      paras.push(
        new Paragraph({
          ...{
            children: texts
          },
          ...listType
        })
      );
      offset += text.length;
    });

    rows.push(
      new TableRow({
        children: [getFormattedTextCells(paras)],
        cantSplit: false
      })
    );

    return rows;
  } catch (error) {
    console.log('Error while formatting the notes');
    return rows;
  }
}

function getFormattedTextTable(formatedTextBlocks) {
  return new TableCell({
    children: [
      new Table({
        rows: getFormattedTextRows(formatedTextBlocks),
        layout: TableLayoutType.AUTOFIT
      })
    ],
    width: questionCellWidth50,
    margins: cellMargin5P
  });
}

export function formatDate(answer, config) {
  try {
    if (answer === 'N/A' && config && config.type === 'date') return 'N/A';

    if (answer && config && config.type === 'date')
      return moment(answer).format('DD-MMM-YYYY');
  } catch (error) {
    console.log('Error in formatDate');
  }
  return answer;
}
export function getUnityPredicatedText(answers) {
  try {
    return answers[answers.length - 1].userName === 'UnityPredictedAnswer'
      ? '†'
      : '';
  } catch (error) {
    return '';
  }
}
function getquestionHTMLCell(questionHTML) {
  return new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: questionHTML,
            font: DEFAULT_FONT
          })
        ]
      })
    ],
    width: questionCellWidth50,
    shading: {
      fill: themeGrey,
      type: ShadingType.CLEAR,
      color: 'auto'
    },
    margins: cellMargin5P
  });
}
function getAnswerCell(answer, unityPredicted = '', width = null) {
  let upText = unityPredicted ? ` ${unityPredicted}` : '';
  return new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: answer,
            font: DEFAULT_FONT
          }),
          new TextRun({
            text: upText,
            font: DEFAULT_FONT,
            color: themeBlue,
            size: 15
          })
        ]
      })
    ],
    width: width || questionCellWidth50,
    margins: cellMargin5P
  });
}
function getSectionNameCell(section, width = null) {
  return new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: section,
            bold: true,
            color: 'FFFFFF',
            font: DEFAULT_FONT
          })
        ]
      })
    ],
    shading: {
      fill: themeBlue,
      type: ShadingType.CLEAR,
      color: 'auto'
    },
    width: width || questionCellWidth50,
    margins: cellMargin5P
  });
}
function emptyCell() {
  return new TableCell({
    children: [new Paragraph('')],
    shading: {
      fill: themeBlue,
      type: ShadingType.CLEAR,
      color: 'auto'
    },
    width: questionCellWidth50,
    borders: {
      left: {
        color: themeBlue,
        style: BorderStyle.NONE,
        size: 0
      }
    }
  });
}
function questionTables(proposalQuestions) {
  // Array<Table of each section>
  const tables = [];
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
    const rows = [];
    rows.push(
      new TableRow({
        children: [getSectionNameCell(section), emptyCell()]
      })
    );

    sections[section]
      .sort((a, b) => a.questionOrder - b.questionOrder)
      .forEach(question => {
        const questionHTML = question.questionHTML || '';
        rows.push(
          isContainFormattedAnswer(
            question?.answers[question?.answers.length - 1]
          )
            ? new TableRow({
                children: [
                  getquestionHTMLCell(questionHTML),
                  getFormattedTextTable(
                    question?.answers[question?.answers.length - 1]
                      .formattedAnswer
                  )
                ]
              })
            : new TableRow({
                children: [
                  getquestionHTMLCell(questionHTML),
                  getAnswerCell(
                    formatDate(
                      getLastAnswer(question.answers),
                      question.answerConfiguration
                    ),
                    getUnityPredicatedText(question.answers)
                  )
                ]
              })
        );
      });

    tables.push(
      new Table({
        rows,
        layout: TableLayoutType.FIXED
      })
    );
    tables.push(
      new Paragraph({
        text: '',
        spacing: { after: 100 }
      })
    );
  });
  return tables;
}
export function getStyle(styleMaps, index) {
  let styleId = '';
  let styles = {
    bold: false,
    italics: false,
    strike: false,
    font: DEFAULT_FONT
  };
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const styleMap of styleMaps) {
      const { start, end, style: key } = styleMap;
      if (start <= index && index <= end) {
        if (key === 'BOLD') {
          styles.bold = true;
          styleId += '(b)';
        }
        if (key === 'ITALIC') {
          styles.italics = true;
          styleId += '(i)';
        }
        if (key === 'STRIKETHROUGH') {
          styles.strike = true;
          styleId += '(s)';
        }
        if (key === 'UNDERLINE') {
          styles.underline = {};
          styleId += '(u)';
        }
        /*
                if ( key.includes('fontsize')){
                    styles.size = parseInt(key.slice(key.length-2, key.length))
                    styleId += '(fs)'
                } 
                if ( key.includes('color')){
                    styles.color = key.slice(key.length-6, key.length);
                    styleId += '(fc)'
                }
                if ( key.includes('backgroundColor')){
                    styles.shading = {
                        fill: key.slice(key.length-6, key.length),
                        type: ShadingType.CLEAR,
                        color: "auto",
                    }
                    styleId += '(bc)'
                }
                */
      }
    }
  } catch (error) {
    console.log('Error while Setting style object');
  }
  return { styles, styleId };
}

function getNoteRows(editor) {
  const nodeSerializer = {
    ...defaultNodes,
    hardBreak: defaultNodes.hard_break,
    codeBlock: defaultNodes.code_block,
    orderedList: defaultNodes.bullet_list,
    listItem: defaultNodes.bullet_list,
    bulletList: defaultNodes.bullet_list,
    horizontalRule: defaultNodes.horizontal_rule,
    mention: (state, node) => {
      const email = new TextRun({
        text: node.attrs.id,
        color: '0047AB'
      });
      state.text(email);
    }
  };

  const markSerializer = {
    ...defaultMarks,
    strike: defaultMarks.strikethrough,
    bold: defaultMarks.strong,
    subscript: defaultMarks.subscript,
    superscript: defaultMarks.superscript,
    underline: defaultMarks.underline,
    smallcaps: defaultMarks.smallcaps,
    allcaps: defaultMarks.allcaps,
    italic: defaultMarks.em,
    highlight: defaultMarks.highlight
  };

  const docxSerializer = new DocxSerializer(nodeSerializer, markSerializer);
  const wordDocument = docxSerializer.serialize(editor?.view?.state?.doc);

  return wordDocument?.documentWrapper?.document?.body;
}

function getHeaderInfoRows(details) {
  const rows = [];
  try {
    for (let key in headFields) {
      let value = details[key] || '';
      if (key === 'Bid due date') value = moment(value).format('DD-MMM-YYYY');

      rows.push(
        new TableRow({
          children: [
            getSectionNameCell(headFields[key], questionCellWidth25),
            getAnswerCell(value.toString(), '', questionCellWidth75)
          ]
        })
      );
    }
  } catch (error) {
    console.log('Error in getHeaderInfoRows');
  }
  return rows;
}
function getHeaderInfoTable(details) {
  return new Table({
    rows: getHeaderInfoRows(details),
    layout: TableLayoutType.FIXED
  });
}

export function shouldInclude(question) {
  return (
    question?.visible &&
    (question?.active || question?.isCustomQuestion) &&
    !question?.notApplicable &&
    !question?.questionApproval
  );
}
function getProposalTeamsRows(questions) {
  const coreTeamQuestions = questions
    .filter(
      question =>
        shouldInclude(question) &&
        question.section.sectionName === PT_SECTION &&
        CORE_TEAM[question.questionHTML]
    )
    .sort((a, b) => a.questionOrder - b.questionOrder);
  const otherTeamQuestions = questions
    .filter(
      question =>
        shouldInclude(question) &&
        question.section.sectionName === PT_SECTION &&
        !CORE_TEAM[question.questionHTML]
    )
    .sort((a, b) => a.questionOrder - b.questionOrder);

  const coreTeamRows = [
    new TableRow({
      children: [
        getSectionNameCell('Core Team Members', questionCellWidth50),
        getSectionNameCell('Name', questionCellWidth50)
      ]
    })
  ];
  const otherTeamRows = [
    new TableRow({
      children: [
        getSectionNameCell('Specialty Team Members', questionCellWidth50),
        getSectionNameCell('Name', questionCellWidth50)
      ]
    })
  ];

  try {
    coreTeamQuestions.forEach(question => {
      let { questionHTML, answers } = question;
      coreTeamRows.push(
        isContainFormattedAnswer(
          question?.answers[question?.answers.length - 1]
        )
          ? new TableRow({
              children: [
                getAnswerCell(questionHTML, '', questionCellWidth50),
                getFormattedTextTable(
                  answers[question?.answers.length - 1].formattedAnswer
                )
              ]
            })
          : new TableRow({
              children: [
                getAnswerCell(questionHTML, '', questionCellWidth50),
                getAnswerCell(getLastAnswer(answers), '', questionCellWidth50)
              ]
            })
      );
    });

    otherTeamQuestions.forEach(question => {
      const { questionHTML, answers } = question;
      otherTeamRows.push(
        isContainFormattedAnswer(answers[answers.length - 1])
          ? new TableRow({
              children: [
                getAnswerCell(questionHTML, '', questionCellWidth50),
                getFormattedTextTable(answers[answers.length - 1])
              ]
            })
          : new TableRow({
              children: [
                getAnswerCell(questionHTML, '', questionCellWidth50),
                getAnswerCell(getLastAnswer(answers), '', questionCellWidth50)
              ]
            })
      );
    });
  } catch (error) {
    console.log('Error in getProposalTeamsRows');
  }
  return [...coreTeamRows, ...otherTeamRows];
}
function getProposalTeamTable(questions) {
  return new Table({
    rows: getProposalTeamsRows(questions),
    layout: TableLayoutType.FIXED
  });
}
function getQuestionToCustomerRows(questions) {
  let questionsToCustomer = questions
    .filter(
      question =>
        shouldInclude(question) && question.section.sectionName === QC_SECTION
    )
    .sort((a, b) => a.questionOrder - b.questionOrder);

  if (!questionsToCustomer.length)
    questionsToCustomer = [
      { questionHTML: 'Question 1' },
      { questionHTML: 'Question 2' },
      { questionHTML: 'Question 3' },
      { questionHTML: 'Question 4' }
    ];

  const qTcRows = [
    new TableRow({
      children: [getSectionNameCell(QC_SECTION, questionCellWidth100)]
    })
  ];
  const qTcParas = [];
  try {
    questionsToCustomer.forEach((question, index) => {
      const { questionHTML } = question;
      qTcParas.push(
        new Paragraph({
          children: [
            new TextRun({
              text: questionHTML,
              font: DEFAULT_FONT
            })
          ],
          bullet: {
            level: 0
          },
          spacing: {
            after: 50,
            before: 50
          }
        })
      );
    });
  } catch (error) {
    console.log('Error in getQuestionToCustomerRows');
  }

  qTcRows.push(
    new TableRow({
      children: [
        new TableCell({
          children: qTcParas,
          width: questionCellWidth100
        })
      ]
    })
  );
  return qTcRows;
}
function getQuestionToCustomerTable(questions) {
  return new Table({
    rows: getQuestionToCustomerRows(questions),
    layout: TableLayoutType.FIXED
  });
}
function getUnityMessage() {
  return new Paragraph({
    children: [
      new TextRun({
        text:
          '† Unity has provided this answer but not validated by user on proposal team. ',
        font: DEFAULT_FONT,
        size: 20,
        color: themeBlue
      })
    ],
    spacing: {
      before: 200
    },
    border: {
      bottom: {
        color: 'EEEEEE',
        size: 10,
        style: BorderStyle.SINGLE
      }
    }
  });
}
function getFooter(details) {
  try {
    return new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `Exported from Unity on ${dateNow()}`,
                      font: DEFAULT_FONT,
                      size: 15,
                      color: '999999'
                    })
                  ],
                  spacing: {
                    before: 200
                  }
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `by ${userName}`,
                      font: DEFAULT_FONT,
                      size: 15,
                      color: '999999'
                    })
                  ]
                })
              ],
              borders: {
                top: { color: 'FFFFFF' },
                left: { color: 'FFFFFF' },
                right: { color: 'FFFFFF' },
                bottom: { color: 'FFFFFF' }
              },
              width: questionCellWidth40
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'View up-to-date Unity record here:',
                      font: DEFAULT_FONT,
                      size: 15,
                      color: '999999'
                    })
                  ],
                  spacing: {
                    before: 200
                  },
                  alignment: AlignmentType.RIGHT
                }),
                new Paragraph({
                  children: [
                    new ExternalHyperlink({
                      children: [
                        new TextRun({
                          text: `${getUnityLink(details)}`,
                          font: DEFAULT_FONT,
                          size: 15,
                          color: themeBlue,
                          style: 'Hyperlink'
                        })
                      ],
                      link: `${getUnityLink(details)}`
                    })
                  ],
                  alignment: AlignmentType.RIGHT
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `Copyright © ${yearNow} IQVIA. All Rights Reserved. Confidential and Proprietary.`,
                      font: DEFAULT_FONT,
                      size: 15,
                      color: '999999'
                    })
                  ],
                  alignment: AlignmentType.RIGHT
                })
              ],
              borders: {
                top: { color: 'FFFFFF' },
                left: { color: 'FFFFFF' },
                right: { color: 'FFFFFF' },
                bottom: { color: 'FFFFFF' }
              },
              width: questionCellWidth60
            })
          ]
        })
      ]
    });
  } catch (error) {
    console.log('Error in getFooter');
  }
}
export function getFilteredQuestion(proposalQuestions, filterState) {
  const {
    answered,
    unanswered,
    myRole,
    interestedParties,
    milestones,
    includesNa
  } = filterState;
  let questions = cloneDeep(proposalQuestions);

  // Answered and Unanswered filter block
  if (answered && unanswered) {
    // Do nothing
  } else if (answered) {
    questions = applyAnsweredFilter(questions);
  } else if (unanswered) {
    questions = applyUnAnsweredFilter(questions);
  } else if (!answered && !unanswered) {
    questions = [];
  }

  if (!includesNa) {
    questions = applyNotApplicableFilter(questions);
  }

  // My user role questions
  if (myRole) questions = applyMyUserRoleFilter(questions);

  if (interestedParties && interestedParties !== 'All')
    questions = applyinterestedPartiesFilter(questions, interestedParties);

  if (milestones && milestones.length && !milestones.includes('All'))
    questions = applyMileStonesFilter(questions, milestones);

  return questions;
}
export function getUnityLink(details) {
  return `${API.AUTH.REDIRECTION_URL}opportunities/${details['CRM #']}`;
}
function getHeader(image) {
  return new Header({
    children: [
      new Paragraph({
        children: [
          new ImageRun({
            data: image,
            transformation: {
              width: 143,
              height: 60
            }
          })
        ],
        alignment: AlignmentType.RIGHT,
        spacing: {
          after: 500
        },
        border: {
          bottom: {
            color: themeBlue,
            size: 10,
            style: BorderStyle.THICK
          }
        }
      })
    ]
  });
}
export function createWord(content) {
  let {
    data: { proposalQuestions, proposalDetails },
    notes,
    filterState,
    image,
    editor
  } = content;
  const filteredQuestions = getFilteredQuestion(proposalQuestions, filterState);

  const SectionList = {
    sections: [
      {
        headers: {
          default: getHeader(image)
        },
        children: [...topHeading(proposalDetails)],
        footers: {
          default: new Footer({
            children: [getUnityMessage(), getFooter(proposalDetails)]
          })
        }
      },
      {
        properties: {
          type: SectionType.CONTINUOUS
        },
        children: [getHeaderInfoTable(proposalDetails)]
      },
      {
        properties: {
          type: SectionType.CONTINUOUS
        },
        children: [getProposalTeamTable(proposalQuestions)]
      },
      {
        properties: {
          type: SectionType.CONTINUOUS
        },
        children: [getQuestionToCustomerTable(proposalQuestions)]
      },
      {
        properties: {
          type: SectionType.CONTINUOUS
        },
        children: [...questionTables(filteredQuestions)]
      }
    ]
  };

  // Adding Note Section in Document
  if (filterState.includesNotes)
    SectionList.sections.push({
      children: [
        new Table({
          rows: [
            new TableRow({
              children: [
                getSectionNameCell('General Notes', questionCellWidth100)
              ]
            })
          ],
          layout: TableLayoutType.FIXED
        }),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [getNoteRows(editor)],
                  margins: cellMargin5P
                })
              ]
            })
          ],
          layout: TableLayoutType.FIXED
        })
      ]
    });

  const document = new Document(SectionList);
  return document;
}
