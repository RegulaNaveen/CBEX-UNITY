import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import UserInputModal from './UserInputModal';
import {create} from './word-template';
import { Packer } from "docx";
import { saveAs } from "file-saver";
import Logo from '../../../../img/iqvia-main-logo.png';
import {
  getSelectedBid,
  getOpportunityData
} from '../../../redux/selectors/proposal';

import {
  selectNotes
} from '../../../redux/selectors';


const GenerateDocs = () => {
  console.log('rendering')
  let opportunityData = useSelector(getOpportunityData);
  let selectedBid = useSelector(getSelectedBid);
  let notesMap =  useSelector(selectNotes);
  let logo = useRef(null);

  let [filterState, filterStateUpdate] = useState({
    answered: true,
    unanswered: false,
    myRole: false,
    includesNotes: true,
    milestones: 'All',
    interestedParties: 'All',
    fileName: 'Unity Export'
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
      let fileName = `Unity Export__Bid ${proposalDetails['bidNo']}_${proposalDetails['Customer']}`;
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
    let {fileName} = filterState;
    const doc = create({
      data : getSelectedBidData(),
      notes : getSelectedBidNotes(),
      filterState,
      image: logo.current
    });
    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `${fileName}.docx`);
    });
  }

  return (
    <UserInputModal 
    filterState={filterState} 
    initExport={initExport} 
    filterStateUpdate={filterStateUpdate}
    ></UserInputModal>
  );
};

export default GenerateDocs;