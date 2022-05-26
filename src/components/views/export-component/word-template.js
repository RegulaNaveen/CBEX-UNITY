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
    UnderlineType
  } from "docx";  

const themeBlue = '00A3E0';
const themeGrey = 'EEEEEE';
const PT_SECTION = 'Proposal Team';
const QC_SECTION = 'Questions for the Customer';
const headFields = {
    'Customer' : 'Customer',
    'Protocol number' : 'Protocol Title',
    'Verbatim indication' : 'Indication',
    'Phase' : 'Phase',
    'bidNo' : 'Bid Number',
    'Bid due date': 'Due Date',
}
const CORE_TEAM = {
    'Proposal Developer' : 'PD',
    'Business Developer' : 'BD',
    'TSL' : 'TSL',
    'Medical Advisor' : 'Medical Advisor',
    'Project Leadership' : 'Project Leadership',
    'Clinical DS&B' : 'Clinical DS&B',
    'Analytics Strategy Lead' : 'Analytics Strategy Lead'
}

const cellMargin5P = {
    left: convertInchesToTwip(0.1),
    right: convertInchesToTwip(0.05),
    top: convertInchesToTwip(0.05),
    bottom : convertInchesToTwip(0.05)
}

const questionCellWidth50 = { size: convertInchesToTwip(3.1) , type: WidthType.DXA};
const questionCellWidth100 = { size: convertInchesToTwip(6.2) , type: WidthType.DXA};
const questionCellWidth30 = { size: convertInchesToTwip(1.86) , type: WidthType.DXA};
const questionCellWidth70 = { size: convertInchesToTwip(4.34) , type: WidthType.DXA};
const questionCellWidth40 = { size: convertInchesToTwip(2.48) , type: WidthType.DXA};
const questionCellWidth60 = { size: convertInchesToTwip(3.72) , type: WidthType.DXA};

function topHeading(){
    return [new Paragraph({
        children : [
            new TextRun({
                text: '[XYZ12345] Opportunity Overview',
                color: themeBlue,
                size: 28,
                bold: true
            })
        ],
        spacing: { after : 500 }
    })];
}
function getLastAnswer(answers){
    try{
       const lastAnswer =  answers[answers.length-1];
       return lastAnswer.answer.toString();
    }catch(error){
        return '';
    }
}

function getQuestionTextCell(questionText){
    return new TableCell({
            children: [new Paragraph(questionText)],
            width : questionCellWidth50,
            shading: {
                fill: themeGrey,
                type: ShadingType.CLEAR,
                color: "auto",
            },
            margins: cellMargin5P
        }) 
}

function getAnswerCell(answer, width=null){
    return  new TableCell({
        children: [new Paragraph(answer)],
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
                    color: 'FFFFFF'
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
    });
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
        }catch(error){}
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
        
        sections[section].forEach((question)=>{
            const questionText = question.questionText || '';
            rows.push(
                new TableRow({
                    children: [
                        getQuestionTextCell(questionText),
                        getAnswerCell(getLastAnswer(question.answers))
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
    let underlineStyle = {
        type: UnderlineType.SINGLE,
        color: "990011",
    };
    let styleId = '';

    let styles = {
        bold: false,
        italics: false,
        strike: false
    }
    for(let key in styleMap){
        let {start, end} = styleMap[key];
        if(start <= index && index <= end){
            if(key === 'BOLD'){
                styles.bold = true;
                styleId += 'b'
            }else if (key === 'ITALIC'){
                styles.italics = true;
                styleId += 'i'
            }else if (key === 'STRIKETHROUGH'){
                styles.strike = true;
                styleId += 's'
            }else if (key === 'UNDERLINE'){
                styles.underline = {};
                styleId += 'u'
            }        
        }
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
    let rows = [new TableRow({
        children: [
            getSectionNameCell('General Notes', questionCellWidth100)
        ]
    })];
    try{
        notes.forEach((note)=>{
            let paras = [];
            let {noteText} = note;
            noteText = JSON.parse(noteText);
            let {blocks} = noteText;
            
            blocks.forEach((block)=>{
                let texts = [];
                let {text, inlineStyleRanges, type} = block;
                let listType = (type.includes('list-item')) ? '- ' : '';
                let styleMap = {}

                inlineStyleRanges.forEach((range)=>{
                    let {style, offset, length} = range;
                    styleMap[style] = {start : offset, end: offset + length}
                });

                texts.push(new TextRun({
                    text: listType
                }))
                
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
                
                paras.push(new Paragraph({
                    children: texts
                }))
            })

            rows.push(
                new TableRow({
                children: [
                    getNotesCell(paras)
                ]
            }))
        })
     return rows;
    }catch(error){
        console.log(error);
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
                    getSectionNameCell(headFields[key], questionCellWidth30),
                    getAnswerCell((details[key] || '').toString(), questionCellWidth70)
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
    const coreTeamQuestions = questions.filter((question) => question.visible === true && question.section.sectionName === PT_SECTION && CORE_TEAM[question.questionText]);
    const otherTeamQuestions = questions.filter((question) => question.visible === true && question.section.sectionName === PT_SECTION && !CORE_TEAM[question.questionText]);

    const coreTeamRows = [new TableRow({
        children: [
            getSectionNameCell('Core Team Members',  questionCellWidth40),
            getSectionNameCell('Name', questionCellWidth60)
        ]
    })];
    const otherTeamRows = [new TableRow({
        children: [
            getSectionNameCell('Specialty Team Members', questionCellWidth40),
            getSectionNameCell('Name', questionCellWidth60)
        ]
    })];

    try{
        coreTeamQuestions.forEach((question)=>{
            let {questionText, answers} = question;
            coreTeamRows.push(new TableRow({
                children: [
                    getAnswerCell(questionText, questionCellWidth40),
                    getAnswerCell(getLastAnswer(answers), questionCellWidth60)
                ]
            }))
        });

        otherTeamQuestions.forEach((question)=>{
            let {questionText, answers} = question;
            otherTeamRows.push(new TableRow({
                children: [
                    getAnswerCell(questionText, questionCellWidth40),
                    getAnswerCell(getLastAnswer(answers), questionCellWidth60)
                ]
            }))
        });
    }catch(error){
        console.log('Error in getProposalTeamsRows', error);
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
export function create(content) {
    let {data : {proposalQuestions, proposal : {proposalDetails}}, notes } = content;
    const document = new Document({
      sections: [
        {
            children: [
                ...topHeading()
            ]
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
                ...questionTables(proposalQuestions)
            ]
        },
        {
            properties: {
                type: SectionType.CONTINUOUS,
            },
            children: [
                getNotesTable(notes)
            ]
        },  
      ]
    });
    return document;
}