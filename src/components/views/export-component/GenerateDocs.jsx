import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import HighLight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import CharacterCount from '@tiptap/extension-character-count';
import Mention from '@tiptap/extension-mention';
import Collaboration from '@tiptap/extension-collaboration';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import UserInputModal from './UserInputModal';
import { createWord, shouldInclude } from './word-template';
import Logo from '../../../../img/iqvia-main-logo.png';
import {
  selectProposalQuestions,
  getSelectedBid
} from '../../../redux/selectors/proposal';

import {
  selectNotes,
  getRoles,
  getProposalDetails
} from '../../../redux/selectors';
import { createPdf } from './pdf-template';
import { fetchNotes } from '../../../redux/actions/notepad-actions';
import NotesSocketContext from '../../../context/notesSocketContext';

export const docType = {
  pdf: 'PDF',
  doc: 'DOCX'
};
export const defaultOption = 'All';

const GenerateDocs = () => {
  const notesSocket = useContext(NotesSocketContext);
  const notesMap = useSelector(selectNotes);
  const proposalQuestions = useSelector(selectProposalQuestions);
  const proposalDetails = useSelector(getProposalDetails);
  const roleList = useSelector(getRoles) || [];
  const selectedBid = useSelector(getSelectedBid);
  const dispatch = useDispatch();
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        Link,
        HighLight,
        Subscript,
        Superscript,
        CharacterCount,
        TextAlign.configure({
          types: ['heading', 'paragraph']
        }),
        Collaboration.configure({
          document: notesSocket.ydoc
        }),
        Link.configure({
          autolink: true,
          linkOnPaste: false,
          validate: href => /^https?:\/\// || /^www?:\/\//.test(href),
          protocols: ['ftp', 'mailto'],
          HTMLAttributes: {
            class: 'my-custom-class'
          }
        }),
        Mention.configure({
          HTMLAttributes: {
            class: 'mention'
          },
          renderLabel({ options, node }) {
            return `${node.attrs.label ?? node.attrs.id}`;
          },
          suggestion: null
        })
      ]
    },
    [selectedBid.get('id', ''), notesSocket.wsInstance]
  );
  const logo = useRef(null);
  const [filterState, filterStateUpdate] = useState({
    answered: true,
    unanswered: false,
    myRole: false,
    includesNotes: true,
    includesNa: false,
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
      const fileName = `Unity Export_${proposalDetails['CRM #']}_Bid ${proposalDetails['bidNo']}_${proposalDetails['Customer']}`;
      const derivedMileStones = setMileStonesAsPerCurrentQues(
        proposalQuestions || []
      );
      filterStateUpdate({
        ...filterState,
        ...{ fileName },
        ...{ milestoneOptions: derivedMileStones },
        ...{ milestones: [...[defaultOption], ...derivedMileStones] }
      });
    } catch (error) {
      console.log(error);
    }
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
        const currentMileStone =
          isNewMileStone && question?.milestoneNew?.length
            ? question.milestoneNew[0].Name
            : question.milestone;
        if (currentMileStone) tempMileStones.push(currentMileStone);
      } catch (error) {
        console.log(error);
      }
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
      const { fileName, fileType } = filterState;
      let exportBlob = null;
      if (fileType === docType.pdf) {
        exportBlob = createPdf({
          data: getSelectedBidData(),
          notes: getSelectedBidNotes(),
          filterState,
          image: logo.current,
          editor
        });
        exportBlob.then(blob => {
          saveAs(blob, `${fileName}.pdf`);
        });
      } else if (fileType === docType.doc) {
        exportBlob = createWord({
          data: getSelectedBidData(),
          notes: getSelectedBidNotes(),
          filterState,
          image: logo.current,
          editor
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
    />
  );
};

export default GenerateDocs;
