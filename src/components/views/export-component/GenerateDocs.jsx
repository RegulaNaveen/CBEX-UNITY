import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserInputModal from './UserInputModal';
import {create} from './word-template';
import { Packer } from "docx";
import { saveAs } from "file-saver";

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
    console.log('start the export');
    const doc = create({
      data : getSelectedBidData(),
      notes : getSelectedBidNotes()
    });
    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, "example-section-wise-new.docx");
      console.log("Document created successfully");
    });
  }
  return (
    <UserInputModal initExport={initExport}></UserInputModal>
  );
};

export default GenerateDocs;