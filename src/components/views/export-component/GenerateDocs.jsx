import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInputModal from './UserInputModal';
import { createWord, shouldInclude } from './word-template';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import Logo from '../../../../img/iqvia-main-logo.png';
import {
  selectProposalQuestions,
  getSelectedBid
} from '../../../redux/selectors/proposal';

import {
  selectNotes,
  getRoles,
  getProposalDetails,
  selectEditor
} from '../../../redux/selectors';
import { createPdf } from './pdf-template';
import fetchNotes from '../../../redux/actions/notepad-actions';

export let docType = {
  pdf: 'PDF',
  doc: 'DOCX'
};
export const defaultOption = 'All';
const GenerateDocs = () => {
  const notesMap = useSelector(selectNotes);
  const proposalQuestions = useSelector(selectProposalQuestions);
  const proposalDetails = useSelector(getProposalDetails);
  const roleList = useSelector(getRoles) || [];
  const selectedBid = useSelector(getSelectedBid);
  const dispatch = useDispatch();
  const editor = useSelector(selectEditor);
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

  useEffect(() => {
    try {
      fetch(Logo)
        .then(res => {
          return res.blob();
        })
        .then(blob => {
          logo.current = blob;
        });
      let fileName = `Unity Export_${proposalDetails['CRM #']}_Bid ${proposalDetails['bidNo']}_${proposalDetails['Customer']}`;
      let derivedMileStones = setMileStonesAsPerCurrentQues(
        proposalQuestions || []
      );
      filterStateUpdate({
        ...filterState,
        ...{ fileName },
        ...{ milestoneOptions: derivedMileStones },
        ...{ milestones: [...[defaultOption], ...derivedMileStones] }
      });
    } catch (error) {}
  }, [proposalDetails, proposalQuestions]);

  const fetchLatestNotes = () => {
    const proposalId = selectedBid.get('id', '');
    if (proposalId) dispatch(fetchNotes(proposalId));
  };

  const setMileStonesAsPerCurrentQues = questions => {
    const filteredQuestions = questions.filter(q => shouldInclude(q));
    const isNewMileStone = filteredQuestions.some(
      question =>
        question.milestoneNew &&
        Array.isArray(question.milestoneNew) &&
        question.milestoneNew.length
    );
    const tempMileStones = [];
    filteredQuestions.forEach(question => {
      try {
        const currentMileStone = isNewMileStone
          ? question.milestoneNew[0].Name
          : question.milestone;
        if (currentMileStone) tempMileStones.push(currentMileStone);
      } catch (error) {}
    });
    return [...new Set(tempMileStones)];
  };

  const getSelectedBidData = () => {
    try {
      return {
        proposalDetails,
        proposalQuestions
      };
    } catch (error) {
      return {};
    }
  };

  const getSelectedBidNotes = () => {
    try {
      const notes = notesMap.toJS();
      return notes || [];
    } catch (error) {
      return [];
    }
  };

  const initExport = () => {
    try {
      let { fileName, fileType } = filterState;
      if (fileType === docType.pdf) {
        let exportBlob = createPdf({
          data: getSelectedBidData(),
          notes: getSelectedBidNotes(),
          filterState,
          image: logo.current
        });
        exportBlob.then(blob => {
          saveAs(blob, `${fileName}.pdf`);
        });
      } else if (fileType === docType.doc) {
        let exportBlob = createWord({
          data: getSelectedBidData(),
          notes: getSelectedBidNotes(),
          filterState,
          image: logo.current,
          editor: editor
        });
        Packer.toBlob(exportBlob).then(blob => {
          saveAs(blob, `${fileName}.docx`);
        });
      }
    } catch (error) {
      console.log('Cannot export! something went wrong.', error);
    }
  };

  return (
    <UserInputModal
      filterState={filterState}
      initExport={initExport}
      filterStateUpdate={filterStateUpdate}
      roleList={roleList}
      fetchLatestNotes={fetchLatestNotes}
    ></UserInputModal>
  );
};

export default GenerateDocs;
