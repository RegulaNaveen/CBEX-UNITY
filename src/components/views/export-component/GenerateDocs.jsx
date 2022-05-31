import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import UserInputModal from './UserInputModal';
import {createWord} from './word-template';
import { Packer } from "docx";
import { saveAs } from "file-saver";
import Logo from '../../../../img/iqvia-main-logo.png';
import {
  getSelectedBid,
  getOpportunityData
} from '../../../redux/selectors/proposal';

import {
  selectNotes,
  getRoles
} from '../../../redux/selectors';
import { createPdf } from './pdf-template';

export let docType = {
  pdf : 'PDF',
  doc : 'DOCX'
}

const GenerateDocs = () => {
  let opportunityData = useSelector(getOpportunityData);
  let selectedBid = useSelector(getSelectedBid);
  let notesMap =  useSelector(selectNotes);
  let roleList = useSelector(getRoles) || []
  let logo = useRef(null);

  let [filterState, filterStateUpdate] = useState({
    answered: true,
    unanswered: false,
    myRole: false,
    includesNotes: true,
    milestones: 'All',
    interestedParties: 'All',
    fileName: 'Unity Export',
    fileType: docType.pdf
  });
  
  useEffect(()=>{
    try{
      fetch(Logo).then((res)=>{
        return res.blob()
      }).then((blob)=>{
        logo.current = blob
      })
      const selectedBid = getSelectedBidData();
      const {proposal : {proposalDetails}} = selectedBid
      let fileName = `Unity Export_${proposalDetails['CRM #']}_Bid ${proposalDetails['bidNo']}_${proposalDetails['Customer']}`;
      filterStateUpdate({
        ...filterState,
        ...{fileName}
      })
    }catch(error){
    }
  }, [selectedBid])


  const getSelectedBidData = () => {
    try{
      const proposalId = selectedBid.get('id') || '';
      const opportunityDataJs = opportunityData.toJS();
      return opportunityDataJs[proposalId] || {};
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