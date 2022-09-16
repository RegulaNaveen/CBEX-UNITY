import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { connect, useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState, useContext } from 'react';
import randomColor from 'randomcolor';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import HighLight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Mention from '@tiptap/extension-mention';
import { useFlags } from 'launchdarkly-react-client-sdk';

import {
  getProposalDetails,
  selectNotes,
  getSelectedBid,
  getUserName,
  getUserEmail,
  getUserRole,
  selectIsNotesFetched
} from '../../../redux/selectors';
import MenuBar from './MenuBar';
import {
  updateNote,
  fetchNotes,
  resetNotes,
  setEditor,
  updateNoteInStore
} from '../../../redux/actions/notepad-actions';
import NotesSocketContext from '../../../context/notesSocketContext';
import suggestion from './suggestion';

const WysiwygNotepad = ({
  selectedBid,
  userName,
  userEmail,
  userRole,
  updateNote,
  proposalDetails
}) => {
  const notesSocket = useContext(NotesSocketContext);
  const { notesUserTag } = useFlags();

  const dispatch = useDispatch();
  const [proposalIdState, setProposalIdState] = useState(
    selectedBid.get('id', '')
  );

  const isNotesFetched = useSelector(selectIsNotesFetched);
  const usercolor = randomColor({ luminosity: 'light' });

  useEffect(() => {
    return () => {
      console.log('WYSIWYG Unmount');
      dispatch(resetNotes());
    };
  }, []);

  useEffect(() => {
    console.log('proposal id changed to ', selectedBid.get('id'));
    setProposalIdState(selectedBid.get('id'));
  }, [selectedBid]);

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        Link,
        HighLight,
        Subscript,
        Superscript,
        TextAlign.configure({
          types: ['heading', 'paragraph']
        }),
        Collaboration.configure({
          document: notesSocket.ydoc
        }),
        CollaborationCursor.configure({
          provider: notesSocket.wsInstance,
          user: {
            name: `${userName} is typing....`,
            color: usercolor
          }
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
          suggestion: notesUserTag ? suggestion : null
        })
      ],
      onUpdate: ({ editor }) => {
        // const Ejson = editor.getJSON();
      }
    },
    [proposalIdState, notesSocket.wsInstance]
  );
  dispatch(setEditor(editor));
  return (
    <>
      {notesSocket.wsInstance && (
        <div className='editor-notepad' key={proposalIdState}>
          <div>
            <MenuBar key={proposalIdState} editor={editor} />
          </div>
          <EditorContent
            key={proposalIdState}
            editor={editor}
            className='editor-scroll'
          />
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  selectedBid: getSelectedBid(state),
  userName: getUserName(state),
  userEmail: getUserEmail(state),
  userRole: getUserRole(state),
  proposalDetails: getProposalDetails(state)
});

const mapDispatchToProps = {
  updateNote,
  fetchNotes,
  updateNoteInStore
};
export default connect(mapStateToProps, mapDispatchToProps)(WysiwygNotepad);
