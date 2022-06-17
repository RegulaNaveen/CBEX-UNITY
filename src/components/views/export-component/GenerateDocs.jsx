import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import UserInputModal from './UserInputModal';
import {createWord} from './word-template';
import { Packer } from "docx";
import { saveAs } from "file-saver";
import Logo from '../../../../img/iqvia-main-logo.png';
import {
  selectProposalQuestions
} from '../../../redux/selectors/proposal';

import {
  selectNotes,
  getRoles,
  getProposalDetails
} from '../../../redux/selectors';
import { createPdf } from './pdf-template';

export let docType = {
  pdf : 'PDF',
  doc : 'DOCX'
}
export const defaultOption = 'All';
const GenerateDocs = () => {
  let notesMap =  useSelector(selectNotes);
  let proposalQuestions = useSelector(selectProposalQuestions);
  let proposalDetails = useSelector(getProposalDetails);
  let roleList = useSelector(getRoles) || []
  let logo = useRef(null);

  let [filterState, filterStateUpdate] = useState({
    answered: true,
    unanswered: false,
    myRole: false,
    includesNotes: true,
    milestones: [defaultOption],
    interestedParties: defaultOption,
    fileName: 'Unity Export',
    fileType: docType.pdf,
    milestoneOptions: []
  });

  useEffect(()=>{
    try{
      fetch(Logo).then((res)=>{
        return res.blob()
      }).then((blob)=>{
        logo.current = blob
      })
      let fileName = `Unity Export_${proposalDetails['CRM #']}_Bid ${proposalDetails['bidNo']}_${proposalDetails['Customer']}`;
      let derivedMileStones = setMileStonesAsPerCurrentQues(proposalQuestions || []);
      filterStateUpdate({
        ...filterState,
        ...{fileName},
        ...{milestoneOptions: derivedMileStones},
        ...{milestones: [...[defaultOption], ...derivedMileStones]}
      })
    }catch(error){
    }
  }, [proposalDetails, proposalQuestions])

  const setMileStonesAsPerCurrentQues = (questions)=>{
    const isNewMileStone = questions.some((question)=>
    question.milestoneNew &&
      Array.isArray(question.milestoneNew) &&
      question.milestoneNew.length
    );
    const tempMileStones = [];
    questions.forEach(question => {
      try{
        const currentMileStone = (isNewMileStone)? question.milestoneNew[0].Name : question.milestone;
        if(currentMileStone)
          tempMileStones.push(currentMileStone)
      }catch(error){}
    });
    return [...new Set(tempMileStones)];  
  }

  const getSelectedBidData = () => {
    try{
      return {
        proposalDetails,
        proposalQuestions
      }
    }catch(error){
      return {}
    }
  }

  const getSelectedBidNotes = () => {
    try{
      const notes = notesMap.toJS();
      return notes || [];
    }catch(error){
      return []
    }
  }

  const initExport = ()=> {
    try{
      let {fileName, fileType} = filterState;
        if(fileType === docType.pdf){ 
          let exportBlob = createPdf({
            data : getSelectedBidData(),
            notes : getSelectedBidNotes(),
            filterState,
            image: logo.current
          })
          exportBlob.then((blob)=>{
            saveAs(blob, `${fileName}.pdf`);
          })
        }else if(fileType === docType.doc){
          let exportBlob = createWord({
            data : getSelectedBidData(),
            notes : getSelectedBidNotes(),
            filterState,
            image: logo.current
          });
          Packer.toBlob(exportBlob).then(blob => {
            saveAs(blob, `${fileName}.docx`);
          });
        }
      }catch(error){
        console.log('Cannot export! something went wrong.', error)
      } 
  }

  return (
    <UserInputModal 
    filterState={filterState} 
    initExport={initExport} 
    filterStateUpdate={filterStateUpdate}
    roleList={roleList}
    ></UserInputModal>
  );
};

export default GenerateDocs;