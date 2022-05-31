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
  } from "docx";  
import { cloneDeep } from "lodash";
import moment from "moment";
import { API } from "../../../constants";
import { applyAnsweredFilter, applyinterestedPartiesFilter, applyMyUserRoleFilter, applyUnAnsweredFilter } from "./filter-util";


export const themeBlue = '00A3E0';
export const themeGrey = 'EEEEEE';
export const DEFAULT_FONT = 'Arial';
export const PT_SECTION = 'Proposal Team';
export const QC_SECTION = 'Questions for the Customer';
const questionCellWidth50 = { size: convertInchesToTwip(3.1) , type: WidthType.DXA};
const questionCellWidth100 = { size: convertInchesToTwip(6.2) , type: WidthType.DXA};
const questionCellWidth25 = { size: convertInchesToTwip(1.55) , type: WidthType.DXA};
const questionCellWidth75 = { size: convertInchesToTwip(4.65) , type: WidthType.DXA};
const questionCellWidth40 = { size: convertInchesToTwip(2.48) , type: WidthType.DXA};
const questionCellWidth60 = { size: convertInchesToTwip(3.72) , type: WidthType.DXA};
export const userName = (localStorage) ? localStorage.getItem('userName') : '';
export const dateNow =  moment().format('DD-MMM-YYYY');
export const yearNow =  moment().format('YYYY');


export const headFields = {
    'Customer' : 'Customer',
    'Protocol number' : 'Protocol Title',
    'Verbatim indication' : 'Indication',
    'Phase' : 'Phase',
    'bidNo' : 'Bid Number',
    'Bid due date': 'Due Date',
}
export const CORE_TEAM = {
    'Proposal Developer' : 'PD',
    'Business Developer' : 'BD',
    'TSL' : 'TSL',
    'Medical Advisor' : 'Medical Advisor',
    'Project Lead' : 'Project Leadership',
    'Clinical' : 'Clinical DS&B',
    'Analytics Strategy Lead' : 'Analytics Strategy Lead'
}
const cellMargin5P = {
    left: convertInchesToTwip(0.1),
    right: convertInchesToTwip(0.05),
    top: convertInchesToTwip(0.05),
    bottom : convertInchesToTwip(0.05)
}

function topHeading(details){
    return [new Paragraph({
        children : [
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
        spacing: { after : 500 }
    })];
}
export function getLastAnswer(answers){
    try{
       const lastAnswer =  answers[answers.length-1];
       return lastAnswer.answer.toString();
    }catch(error){
        return '';
    }
}
export function getUnityPredicatedText(answers){
    try{
       return (answers[answers.length-1].userName === 'UnityPredictedAnswer')
       ? '†'
       : ''
    }catch(error){
        return '';
    }
}
function getQuestionTextCell(questionText){
    return new TableCell({
            children: [new Paragraph({
                children : [
                    new TextRun({
                        text : questionText,
                        font: DEFAULT_FONT
                    })
                ]
            })],
            width : questionCellWidth50,
            shading: {
                fill: themeGrey,
                type: ShadingType.CLEAR,
                color: "auto",
            },
            margins: cellMargin5P
        }) 
}
function getAnswerCell(answer, unityPredicted='', width=null){
    let upText = (unityPredicted) ? ` (${unityPredicted})` : '';
    return  new TableCell({
        children: [new Paragraph({
            children : [
                new TextRun({
                    text : answer,
                    font: DEFAULT_FONT
                }),
                new TextRun({
                    text : upText,
                    font: DEFAULT_FONT,
                    color: themeBlue,
                    size: 15
                })
            ]
        })],
        width : width || questionCellWidth50,
        margins: cellMargin5P
    })
}
function getSectionNameCell(section, width=null){
    return new TableCell({
        children: [new Paragraph({
            children : [
                new TextRun({
                    text: section,
                    bold: true,
                    color: 'FFFFFF',
                    font: DEFAULT_FONT
                })
            ]
        })],
        shading: {
            fill: themeBlue,
            type: ShadingType.CLEAR,
            color: "auto",
        },
        width: width || questionCellWidth50,
        margins: cellMargin5P
    }) 
}
function emptyCell(){
    return new TableCell({
        children: [new Paragraph('')],
        shading: {
            fill: themeBlue,
            type: ShadingType.CLEAR,
            color: "auto",
        },
        width : questionCellWidth50,
        borders: {
            left : {
                color: themeBlue,
                style: BorderStyle.NONE,
                size: 0
            } 
        }
    }) 
}
function questionTables(proposalQuestions){
    // Array<Table of each section>
    const tables = [];
    // Remove not visible questions
    let questions = proposalQuestions
    .filter((question)=>{
       return question.visible === true && question.section.sectionName !== PT_SECTION && question.section.sectionName !== QC_SECTION
    }).sort((a,b)=>{ return a.section.sectionOrder - b.section.sectionOrder });
    // Section map
    const sections = {}

    // Populate the section map
    questions.forEach(question => {
        try{
            let section = question.section.sectionName || '';
            if(sections[section])
                sections[section].push(question)
            else
                sections[section] = [question];
        }catch(error){
            console.log('Error while mapping Sections')
        }
    });

    Object.keys(sections).forEach((section)=>{
        const rows = [];
        rows.push(
            new TableRow({
                children: [
                    getSectionNameCell(section),
                    emptyCell()
                ]
            })
        );
        
        sections[section].sort((a,b)=>a.questionOrder - b.questionOrder).forEach((question)=>{
            const questionText = question.questionText || '';
            rows.push(
                new TableRow({
                    children: [
                        getQuestionTextCell(questionText),
                        getAnswerCell(getLastAnswer(question.answers), getUnityPredicatedText(question.answers))
                    ]
                })
            )        
        });

        tables.push(
            new Table({
             rows,
             layout: TableLayoutType.FIXED
            })
        );
        tables.push(
            new Paragraph({
                text : '',
                spacing: { after : 100 }
            })
        );
    });
    return tables;
}
function getStyle(styleMap, index){
 
    let styleId = '';
    let styles = {
        bold: false,
        italics: false,
        strike: false,
        font: DEFAULT_FONT
    }
    try{
        for(let key in styleMap){
            let {start, end} = styleMap[key];
            if(start <= index && index <= end){
                if(key === 'BOLD'){
                    styles.bold = true;
                    styleId += '(b)'
                }else if (key === 'ITALIC'){
                    styles.italics = true;
                    styleId += '(i)'
                }else if (key === 'STRIKETHROUGH'){
                    styles.strike = true;
                    styleId += '(s)'
                }else if (key === 'UNDERLINE'){
                    styles.underline = {};
                    styleId += '(u)'
                }else if ( key.includes('color')){
                    styles.color = key.slice(key.length-6, key.length);
                    styleId += '(fc)'
                }else if ( key.includes('backgroundColor')){
                    styles.shading = {
                        fill: key.slice(key.length-6, key.length),
                        type: ShadingType.CLEAR,
                        color: "auto",
                    }
                    styleId += '(bc)'
                }else if ( key.includes('fontSize')){
                    styles.size = key.slice(s.length-4, s.length-2)
                    styleId += '(fs)'
                }
            }
        }
    }catch(errror){
        console.log('Error while Setting style object')
    }
   
    return {styles, styleId}
}
function getNotesCell(paras){
    return  new TableCell({
        children: [...paras],
        width : questionCellWidth100,
        margins: cellMargin5P
    })
}
function getNoteRows(notes){
    let paras = [];
    let rows = [new TableRow({
        children: [
            getSectionNameCell('General Notes', questionCellWidth100)
        ]
    })];
    try{
        notes.forEach((note)=>{
            let {noteText} = note;
            noteText = JSON.parse(noteText);
            let {blocks} = noteText;
            blocks.forEach((block)=>{
                let texts = [];
                let {text, inlineStyleRanges, type, depth} = block;
                let listType = (type.includes('list-item')) ? { bullet: { level: depth}} : {};
                let styleMap = {}
                inlineStyleRanges.forEach((range)=>{
                    let {style, offset, length} = range;
                    styleMap[style] = {start : offset, end: offset + length}
                });
                
                let lastStyle = '';
                let lastText = ''
                for(let i=0; i<text.length; i++){
                    let {styles, styleId} = getStyle(styleMap, i);
                    if(styleId === lastStyle){
                        lastText += text[i]
                    }else{
                        texts.push(new TextRun({
                            ... { text: lastText},
                            ... styles
                        }))
                        lastText = text[i] 
                    }
                    lastStyle = styleId;

                    if(text.length-1 === i)
                        texts.push(new TextRun({
                            ... { text: lastText},
                            ... styles
                        }))
                }    
                
                paras.push(new Paragraph({...{
                    children: texts
                }, ...listType}))
            })

        })

        rows.push(
            new TableRow({
            children: [
                getNotesCell(paras)
            ],
            cantSplit: false
        }))

     return rows;
    }catch(error){
        console.log('Error while formatting the notes');
        return rows;
    }
}
function getNotesTable(notes){
    return new Table({
         rows : getNoteRows(notes),
         layout: TableLayoutType.FIXED
        }
    )
}
function getHeaderInfoRows(details){
    const rows = [];
    try{
        for (let key in headFields){
            rows.push(new TableRow({
                children: [
                    getSectionNameCell(headFields[key], questionCellWidth25),
                    getAnswerCell((details[key] || '').toString(), '', questionCellWidth75)
                ]
            }))
        }
    }catch(error){
        console.log('Error in getHeaderInfoRows');
    }
    return rows;
}
function getHeaderInfoTable(details){
    return new Table({
         rows : getHeaderInfoRows(details),
         layout: TableLayoutType.FIXED
        }
    )
}
function getProposalTeamsRows(questions){
    const coreTeamQuestions = questions.filter((question) => question.visible === true && question.section.sectionName === PT_SECTION && CORE_TEAM[question.questionText]).sort((a,b)=>a.questionOrder-b.questionOrder);
    const otherTeamQuestions = questions.filter((question) => question.visible === true && question.section.sectionName === PT_SECTION && !CORE_TEAM[question.questionText]).sort((a,b)=>a.questionOrder-b.questionOrder);

    const coreTeamRows = [new TableRow({
        children: [
            getSectionNameCell('Core Team Members',  questionCellWidth50),
            getSectionNameCell('Name', questionCellWidth50)
        ]
    })];
    const otherTeamRows = [new TableRow({
        children: [
            getSectionNameCell('Specialty Team Members', questionCellWidth50),
            getSectionNameCell('Name', questionCellWidth50)
        ]
    })];

    try{
        coreTeamQuestions.forEach((question)=>{
            let {questionText, answers} = question;
            coreTeamRows.push(new TableRow({
                children: [
                    getAnswerCell(questionText, '', questionCellWidth50),
                    getAnswerCell(getLastAnswer(answers), '', questionCellWidth50)
                ]
            }))
        });

        otherTeamQuestions.forEach((question)=>{
            let {questionText, answers} = question;
            otherTeamRows.push(new TableRow({
                children: [
                    getAnswerCell(questionText, '', questionCellWidth50),
                    getAnswerCell(getLastAnswer(answers), '', questionCellWidth50)
                ]
            }))
        });
    }catch(error){
        console.log('Error in getProposalTeamsRows');
    }
    return [
        ...coreTeamRows,
        ...otherTeamRows
    ];
}
function getProposalTeamTable(questions){
    return new Table({
         rows : getProposalTeamsRows(questions),
         layout: TableLayoutType.FIXED
        }
    )
}
function getQuestionToCustomerRows(questions){
    let questionsToCustomer = questions.filter((question) => question.visible === true && question.section.sectionName === QC_SECTION).sort((a,b)=>a.questionOrder-b.questionOrder);
    
    if(!questionsToCustomer.length)
        questionsToCustomer = [
            { questionText : 'Question 1'},
            { questionText : 'Question 2'},
            { questionText : 'Question 3'},
            { questionText : 'Question 4'}
        ]

    const qTcRows = [new TableRow({
        children: [
            getSectionNameCell(QC_SECTION,  questionCellWidth100),
        ]
    })];
    const qTcParas = [];
    try{
        questionsToCustomer.forEach((question, index)=>{
            let {questionText} = question;
            qTcParas.push(new Paragraph({
                text : questionText,
                bullet: {
                    level: 0,
                },
                spacing : {
                    after : 50,
                    before : 50
                }
            }))
        });
    }catch(error){
        console.log('Error in getQuestionToCustomerRows');
    }

    qTcRows.push(new TableRow({
        children: [new TableCell({
            children : qTcParas,
            width : questionCellWidth100,
            
        })]
    }))
    return qTcRows;
}
function getQuestionToCustomerTable(questions){
    return new Table({
         rows : getQuestionToCustomerRows(questions),
         layout: TableLayoutType.FIXED
        }
    )
}
function getUnityMessage(){
    return new Paragraph({  
            children: [
                new TextRun({
                    text : '† Unity has provided this answer but not validated by user on proposal team. ',
                    font: DEFAULT_FONT,
                    size: 20,
                    color: themeBlue
                })
            ],
            spacing : {
                before : 200
            },
            border: {
                bottom : {
                    color: 'EEEEEE',
                    size: 10,
                    style: BorderStyle.SINGLE
                }
            }
    })   
}
function getFooter(details){
    try{
        return new Table({
            rows : [
                new TableRow({
                    children: [
                        new TableCell({
                            children : [
                                new Paragraph({  
                                    children: [new TextRun({
                                        text : `Exported from Unity on ${dateNow}`,
                                        font: DEFAULT_FONT,
                                        size: 15,
                                        color: '999999'
                                    })],
                                    spacing : {
                                        before : 200
                                    }
                                }),
                                new Paragraph({
                                    children: [new TextRun({
                                        text : `by ${userName}`,
                                        font: DEFAULT_FONT,
                                        size: 15,
                                        color: '999999'
                                    })]
                                })
                            ],
                            borders:{
                                top : {color : 'FFFFFF'},
                                left : {color : 'FFFFFF'},
                                right : {color : 'FFFFFF'},
                                bottom : {color : 'FFFFFF'}
                            },
                            width: questionCellWidth50
                        }),
                        new TableCell({
                            children : [
                                new Paragraph({
                                    children: [new TextRun({
                                        text : 'View up-to-date Unity record here:',
                                        font: DEFAULT_FONT,
                                        size: 15,
                                        color: '999999'
                                    })],
                                    spacing : {
                                        before : 200
                                    },
                                    alignment :AlignmentType.RIGHT
                                }),
                                new Paragraph({
                                    children: [
                                        new ExternalHyperlink({
                                            children :[
                                                new TextRun({
                                                    text: `${getUnityLink(details)}`,
                                                    font: DEFAULT_FONT,
                                                    size: 15,
                                                    color: themeBlue,
                                                    style: "Hyperlink",
                                                })
                                            ],
                                            link: `${getUnityLink(details)}`,
                                        })
                                   ],
                                    alignment :AlignmentType.RIGHT
                                }),
                                new Paragraph({
                                    children: [new TextRun({
                                        text: `Copyright © ${yearNow} IQVIA. All Rights Reserved. Confidential and Proprietary.`,
                                        font: DEFAULT_FONT,
                                        size: 15,
                                        color: '999999'
                                    })],
                                    alignment :AlignmentType.RIGHT
                                })
                            ],
                            borders:{
                                top : {color : 'FFFFFF'},
                                left : {color : 'FFFFFF'},
                                right : {color : 'FFFFFF'},
                                bottom : {color : 'FFFFFF'}
                            },
                            width: questionCellWidth50
                        }),
                    ]
                })
            ]
        })
    }catch(error){
        console.log('Error in getFooter');
    }
   
}
export function getFilteredQuestion(proposalQuestions, filterState){
    const  {answered, unanswered, myRole, interestedParties} = filterState;
    let questions = cloneDeep(proposalQuestions);

    // Answered and Unanswered filter block
    if(answered && unanswered){
        // Do nothing
    }else if(answered){
        questions = applyAnsweredFilter(questions);
    }else if(unanswered){
        questions = applyUnAnsweredFilter(questions);
    }

    // My user role questions
    if(myRole)
     questions = applyMyUserRoleFilter(questions);
 
    if(interestedParties && interestedParties !== 'All')
     questions = applyinterestedPartiesFilter(questions, interestedParties);   

    return questions;
}
export function getUnityLink(details){
    return `${API.AUTH.REDIRECTION_URL}/opportunities/${details['CRM #']}`
}
function getHeader(image){
    return new Header({
        children: [ new Paragraph({
            children : [
                new ImageRun({
                    data : image,
                    transformation : {
                        width : 143,
                        height: 60
                    }
                })
            ],
            alignment: AlignmentType.RIGHT,
            spacing : {
                after: 500
            },
            border: {
                bottom : {
                    color: themeBlue,
                    size: 10,
                    style: BorderStyle.THICK
                }
            }
            
        }
        )],
    })
}
export function createWord(content) {
    let {data : {proposalQuestions, proposal : {proposalDetails}}, notes, filterState, image } = content;
    const filteredQuestions = getFilteredQuestion(proposalQuestions, filterState);

    const SectionList = {
        sections: [
          {
              headers: {
                default: getHeader(image),
              },   
              children: [
                  ...topHeading(proposalDetails)
              ],
              footers: {
                default: new Footer({
                    children: [
                        getUnityMessage(),
                        getFooter(proposalDetails)
                    ],
                }),
              }
          },
          {
              properties: {
                  type: SectionType.CONTINUOUS,
              },
              children: [
                  getHeaderInfoTable(proposalDetails)
              ]
          },
          {
              properties: {
                  type: SectionType.CONTINUOUS,
              },
              children: [
                  getProposalTeamTable(proposalQuestions)
              ]
          },
          {
              properties: {
                  type: SectionType.CONTINUOUS,
              },
              children: [
                  getQuestionToCustomerTable(proposalQuestions)
              ]
          },
          {
              properties: {
                  type: SectionType.CONTINUOUS,
              },
              children: [
                  ...questionTables(filteredQuestions)
              ]
          },  
        ]
      };

    // Adding Note Section in Document
    if(filterState.includesNotes)
        SectionList.sections.push({
            properties: {
                type: SectionType.CONTINUOUS,
            },
            children: [
                getNotesTable(notes)
            ]
        })

    const document = new Document(SectionList);
    return document;
}