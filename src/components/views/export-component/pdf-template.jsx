import { 
    getFilteredQuestion, 
    headFields, 
    PT_SECTION, 
    CORE_TEAM,
    QC_SECTION,
    getLastAnswer,
    themeBlue,
    themeGrey,
    getUnityPredicatedText,
    dateNow,
    userName,
    yearNow,
    getUnityLink
} from "./word-template";
import { pdf, Document, Page, View, StyleSheet, Text, Font, Image} from '@react-pdf/renderer';
import React from "react";
import Html from 'react-pdf-html';
import Logo from '../../../../img/iqvia-main-logo.png';
import FontProximaNova from '../../../../fonts/ProximaNova-Regular.otf';
import { convertFromHTML, convertFromRaw, EditorState } from "draft-js";
import ReactDOMServer from 'react-dom/server';
import RichTextEditor from "../../common/RichTextEditor";

const styles = StyleSheet.create({
    header: {
        width: "83%",
        height: "10vh", //As per your page layout 
        borderBottom: `1px solid #${themeBlue}`,
        marginBottom: "20px",
        marginLeft: "50px",
        marginRight: "50px",
        justifyContent: "flex-end"
    },
    imgLogo: {
        width: "143px",
        height: "60px",
        alignSelf: "flex-end"
    },
    body: {
        width: "100%",
        minHeight: "75vh",
    },
    footer: {
        width: "83%",
        height: "15vh", //As per your page layout
        marginTop: "20px",
        marginLeft: "50px",
        marginRight: "50px",
    },
    footerText: {
        color: `#999`,
        fontSize:`7px`,
    },
    heading : {
        paddingLeft:"60px",
        marginBottom: "-40px"
    },
    headingText: {
        fontSize: "14px",
        color: `#${themeBlue}`,
        fontWeight: "bold"
    }
})

function getStyle(){
 return `<style>
    body{
        padding: 50px;
        font-size: 10px;
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
    .table tr{
        border-bottom: 1px solid #000;
        border-left: 1px solid #000;
        border-right: 1px solid #000;
    }
    .table tr:first-child{
        border-top: 1px solid #000;
    }
    .notesTable tr:nth-child(2){
        border-top: 1px solid #000;
    }
    .table td, .table th{
        padding: 5px;
    }
    .table tr td:nth-child(2){
        border-left: 1px solid #000;
    }
    .proposalTeam tr:first-child, .questionTable tr:first-child, .questionToCustomerTable tr:first-child, .notesTable tr:first-child{
        background: #${themeBlue};
        color:#fff;
    }
    .headerInfo{
        marging-top: "-30px";
        table-layout:fixed;
    }
    .headerInfo tr td:first-child{
        background: #${themeBlue};
        color:#fff;
        width: 150px
    }
    .questionTable tr td:first-child{
        background: #${themeGrey};
    }
    .blueColorText{
        color: #${themeBlue};
    }
    .footerWrapper{
        display:flex;
        justify-content:space-between
    }
    .footerWrapper td {
        color: #${themeGrey},
        font-size:7px,
    }
 </style>`
}
function topHeading(details){
    return `<h1 class="mainTitle"><em>${details['CRM #'] || ''}</em> Opportunity Overview</h1>`
}
function getHeaderInfoRows(details){
    let html = `<table class="table headerInfo">`
    try{
        for (let key in headFields ){
            html += `<tr>`
            html += `<td>${headFields[key]}</td>`
            html += `<td>${(details[key] || '').toString()}</td>`
            html += `<td></td>`
            html += `</tr>`
        }
    }catch(error){
        console.log('Error in getHeaderInfoRows');
    }
    html += `</table>`
    return html;
}
function getProposalTeamsRows(questions){
    const coreTeamQuestions = questions.filter((question) => question.visible === true && question.section.sectionName === PT_SECTION && CORE_TEAM[question.questionText]).sort((a,b)=>a.questionOrder-b.questionOrder);
    const otherTeamQuestions = questions.filter((question) => question.visible === true && question.section.sectionName === PT_SECTION && !CORE_TEAM[question.questionText]).sort((a,b)=>a.questionOrder-b.questionOrder);
    let html = ``;
    try{
        html += `<table class="proposalTeam table marginTop20">`
        html += `<tr>`
        html += `<th> Core Team Members </th>`
        html += `<th> Name</th>`
        html += `</tr>`
        coreTeamQuestions.forEach((question)=>{
            let {questionText, answers} = question;
            html += `<tr>`
            html += `<td>${questionText}</td>`
            html += `<td>${getLastAnswer(answers)} <br><br></td>`
            html += `</tr>`
        });

        html += `</table>`
        html += `<table class="proposalTeam table">`
        html += `<tr>`
        html += `<th> Specialty Team Members </th>`
        html += `<th> Name</th>`
        html += `</tr>`
        otherTeamQuestions.forEach((question)=>{
            let {questionText, answers} = question;
            html += `<tr>`
            html += `<td>${questionText}</td>`
            html += `<td>${getLastAnswer(answers)} <br><br></td>`
            html += `</tr>`
        });
        html += `</table>`
    }catch(error){
        console.log('Error in getProposalTeamsRows');
    }
    return html;
}


function questionTables(proposalQuestions){
    // Array<Table of each section>
    let html  = ``;
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
        html += `<table class="questionTable table marginTop20">`
        html += `<tr>`
        html += `<th> ${section} </th>`
        html += `<th> </th>`
        html += `</tr>`
        
        sections[section].sort((a,b)=>a.questionOrder - b.questionOrder).forEach((question)=>{
            const questionText = question.questionText || '';
            html += `<tr>`
            html += `<td> ${questionText} <br><br></td>`
            html += `<td> ${getLastAnswer(question.answers)} <span class="blueColorText">${(getUnityPredicatedText(question.answers)) ? '('+getUnityPredicatedText(question.answers)+')' : ''}</span><br><br></td>`
            html += `</tr>`      
        });
        html += `</table>`
    });
    return html;
}


function getQuestionToCustomerRows(questions){
    let html = ``;
    let questionsToCustomer = questions.filter((question) => question.visible === true && question.section.sectionName === QC_SECTION).sort((a,b)=>a.questionOrder-b.questionOrder);
    
    if(!questionsToCustomer.length)
        questionsToCustomer = [
            { questionText : 'Question 1'},
            { questionText : 'Question 2'},
            { questionText : 'Question 3'},
            { questionText : 'Question 4'}
        ]

    html += `<table class="questionToCustomerTable table marginTop20">`
    html += `<tr>`
    html += `<th> ${QC_SECTION} </th>`
    html += `</tr>`

    try{
        html += `<tr>`
        html += `<td><ul>`
        questionsToCustomer.forEach((question, index)=>{
            let {questionText} = question;
            html += `<li> ${questionText} </li>`       
        });
        html += `</ul></td>`
        html += `</tr>`
    }catch(error){
        console.log('Error in getQuestionToCustomerRows');
    }

    html += `</table>`
    return html;
}


function getNotesRows(notes){
    let html = ``;
    html += `<table class="notesTable table marginTop20">`
    html += `<tr>`
    html += `<th>General Notes </th>`
    html += `</tr>`
    try{
        html += `<tr>`
        html += `<td>`
        notes.forEach((note)=>{
            let {noteText} = note;
            let noteContentState = EditorState.createEmpty();
            try {
                noteContentState = convertFromRaw(JSON.parse(noteText));
            } catch (err) {
                const blocksFromHTML = convertFromHTML(noteText);
                noteContentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
                );
            }
            try{
            let rawHtml = ReactDOMServer.renderToStaticMarkup(
                <RichTextEditor
                    defaultValue={noteContentState}
                    readOnly
                    disabled
                    placeholder=""
                />
            );
            rawHtml = rawHtml.replaceAll('font-family', 'content');
            html += rawHtml;
            }catch(error){
                console.log('Cannot convert rich text content')
            }
        })
        html += `</td>`
        html += `</tr>`
    }catch(error){
        console.log('Error in getNotesRows');
    }

    html += `</table>`
    return html;
}

function getHtml(proposalDetails, questions, filteredQuestions, notes, filterState){
    const html = `
        <html>
        <body>
            ${getStyle()}
            ${getHeaderInfoRows(proposalDetails)}
            ${getProposalTeamsRows(questions)}
            ${getQuestionToCustomerRows(questions)}
            ${questionTables(filteredQuestions)}
            ${filterState.includesNotes ? getNotesRows(notes) : ''}
        </body>
        </html>    
    `;
    return html;
}
const MyDoc = (proposalDetails, questions, filteredQuestions, notes, filterState)=>{
    return (
        <Document>
         <Page wrap>
         <View fixed style={styles.header}>
             <Image src={Logo} style={styles.imgLogo}></Image>
         </View>
         <View style={styles.heading} wrap>
            <Text style={styles.headingText}>
                <Text style={{fontStyle : "italic"}}>{proposalDetails['CRM #'] || ''} </Text>Opportunity Overview
            </Text>
         </View>
         <View style={styles.body} wrap>
            <Html>
                {getHtml(proposalDetails, questions, filteredQuestions, notes, filterState)}
            </Html>
         </View>
          <View fixed style={styles.footer}>
            <Text style={{fontSize: "10px", fontweight: "bold", color: `#${themeBlue}`, marginBottom: 5, borderBottom: "1px solid #CCC"}}>† Unity has provided this answer but not validated by user on proposal team. </Text>  
            <View style={{display: "flex", flexDirection: "row", marginBottom: 5}}>
                <Text style={{flex: 1, fontSize: "8px", color:"#999"}}>Exported from Unity on {dateNow}</Text>
                <Text style={{flex: 1, fontSize: "8px", textAlign: "right", color:"#999"}}>View up-to-date Unity record here:</Text>
            </View>
            <View style={{display: "flex", flexDirection: "row", marginBottom: 5}}>
                <Text style={{flex: 1, fontSize: "8px", color:"#999"}}>by {userName}</Text>
                <Text style={{flex: 1, fontSize: "8px",  textAlign: "right", color:"#999"}}>{getUnityLink(proposalDetails)}</Text>
            </View>
            <View style={{display: "flex", flexDirection: "row", marginBottom: 0}}>
                <Text style={{flex: 1, fontSize: "8px", color:"#999"}}></Text>
                <Text style={{flex: 1, fontSize: "8px",  textAlign: "right", color:"#999"}}>Copyright © ${yearNow} IQVIA. All Rights Reserved. Confidential and Proprietary.</Text>
            </View> 
         </View>
         </Page>
        </Document>
    )
}

export function createPdf(content) {
    
    let {data : {proposalQuestions, proposal : {proposalDetails}}, notes, filterState } = content;
    const filteredQuestions = getFilteredQuestion(proposalQuestions, filterState);
    return pdf(MyDoc(proposalDetails, proposalQuestions, filteredQuestions, notes, filterState)).toBlob();
}