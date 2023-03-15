import React, { useEffect, useState } from 'react';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { connect, useSelector, useDispatch } from 'react-redux';
import randomColor from 'randomcolor';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import HighLight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import CharacterCount from '@tiptap/extension-character-count';
import Mention from '@tiptap/extension-mention';
import moment from 'moment';
import OpportunityLinker from './OpportunityLinker';
import RemoveLinkers from './RemoveLinkers';
import suggestion from './suggestion';
import { saveDataInMatomo, createMatomoObj } from '../../../utils/utils';
import {
  getProposalDetails,
  getUserName,
  getUserEmail,
  getUserRole
} from '../../../redux/selectors';
import MenuBar from './MenuBar';
import {
  fetchNotes,
  resetNotes,
  setEditor,
  updateNoteInStore
} from '../../../redux/actions/notepad-actions';
import {
  selectCurrentSearchResult,
  selectQuery
} from '../../../redux/selectors/search';
import { NOTEPAD_UI_ID } from '../../../constants/app';
import { SearchHighlight } from './SearchHighlightExtension';

const matamoObj = {};
const WysiwygNotepad = ({
  userName,
  userEmail,
  userRole,
  proposalDetails,
  trackEvent,
  wsInstance,
  ydoc,
  proposalId
}) => {
  const dispatch = useDispatch();
  const [notesUserTag, setNotesUserTag] = useState(false);
  const [editorloadingcount, seteditorloadingcount] = useState(0);
  const [pressedKey, getPressedKey] = useState('');
  const allFlags = useSelector(state => state.proposal.get('eventflag'));
  const query = useSelector(selectQuery);
  const currentSearchResult = useSelector(selectCurrentSearchResult);
  const usercolor = randomColor({ luminosity: 'light' });
  useEffect(() => {
    const ldApiCall = async () => {
      setNotesUserTag(allFlags.notesUserTag || false);
    };
    ldApiCall();
    return () => {
      dispatch(resetNotes());
    };
  }, []);
  useEffect(() => {
    if (document.querySelector('.notepad-classoverride')) {
      document
        .querySelector('.notepad-classoverride')
        .addEventListener('click', () => {
          if (!localStorage.getItem('notepadStartDuration')) {
            localStorage.setItem(
              'notepadStartDuration',
              moment()
                .utc()
                .format('MMMM Do YYYY, h:mm:ss a')
            );
          }
        });
    }
  }, []);
  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          // The Collaboration extension comes with its own history handling
          history: false
        }),
        Underline,
        HighLight.configure({
          multicolor: true
        }),
        Subscript,
        Superscript,
        CharacterCount,
        TextAlign.configure({
          types: ['heading', 'paragraph']
        }),
        Collaboration.configure({
          document: ydoc
        }),
        CollaborationCursor.configure({
          provider: wsInstance,
          user: {
            name: `${userName} is typing....`,
            color: usercolor
          }
        }),
        Link.configure({
          autolink: true,
          linkOnPaste: true,
          validate: href =>
            /^https?:\/\// ||
            /^www?:\/\//.test(href) ||
            /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9./]+$/gim,
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
        }),
        SearchHighlight.configure({
          enable: query !== null && query.length >= 3
        }),
        allFlags?.notepadLinker ? OpportunityLinker : RemoveLinkers
      ],
      onUpdate: ({ editor }) => {
        // const Ejson = editor.getJSON();
        dispatch(setEditor(editor));
      },
      onCreate: ({ editor }) => {
        seteditorloadingcount(editorloadingcount + 1);
        let timeout = setTimeout(() => {
          const editorTextLen = editor.storage.characterCount.characters();
          if (editorloadingcount == 1) {
            matamoObj.category = `Proposal Detail (CRM#:${proposalDetails['CRM #']})`;
            matamoObj.action = `Event: Notepad ${proposalDetails['CRM #']}`;
            matamoObj.name = `Notepad: char count ${editorTextLen}`;
            matamoObj.customDimensions = [
              JSON.stringify(proposalDetails),
              { user: userEmail },
              { role: userRole }
            ];
            saveDataInMatomo(trackEvent, matamoObj);
          }
          clearTimeout(timeout);
        }, 3000);
      },
      onFocus: ({ editor }) => {
        const editorTextLen = editor.storage.characterCount.characters();
        matamoObj.category = `Proposal Detail (CRM#:${proposalDetails['CRM #']})`;
        matamoObj.action = `Event: Notepad ${proposalDetails['CRM #']}`;
        matamoObj.name = `Notepad: char count ${editorTextLen}`;
        matamoObj.customDimensions = [
          JSON.stringify(proposalDetails),
          { user: userEmail },
          { role: userRole }
        ];
        saveDataInMatomo(trackEvent, matamoObj);
      },
      onBlur: ({ editor }) => {
        if (localStorage.getItem('notepadStartDuration')) {
          matamoObj.category = `Proposal Detail (CRM#:${proposalDetails['CRM #']})`;
          matamoObj.action = `Event: Notepad ${proposalDetails['CRM #']}`;
          matamoObj.name = `Notepad: Duration ${localStorage.getItem(
            'notepadStartDuration'
          )} - ${moment()
            .utc()
            .format('MMMM Do YYYY, h:mm:ss a')}`;
          matamoObj.customDimensions = [
            JSON.stringify(proposalDetails),
            { user: userEmail },
            { role: userRole }
          ];
          saveDataInMatomo(trackEvent, matamoObj);
          localStorage.removeItem('notepadStartDuration');
        }
        const editorTextLen = editor.storage.characterCount.characters();
        matamoObj.category = `Proposal Detail (CRM#:${proposalDetails['CRM #']})`;
        matamoObj.action = `Event: Notepad ${proposalDetails['CRM #']}`;
        matamoObj.name = `Notepad: char count ${editorTextLen}`;
        matamoObj.customDimensions = [
          JSON.stringify(proposalDetails),
          { user: userEmail },
          { role: userRole }
        ];
        saveDataInMatomo(trackEvent, matamoObj);
      },
      onTransaction: ({ editor }) => {
        const text = editor.state.doc.textBetween(
          editor.state.selection.from,
          editor.state.selection.to,
          ' '
        );
        if (text) {
          document.onkeydown = event => {
            // bold
            if (
              (event.ctrlKey && event.code == 'KeyB') ||
              (event.key == 'Meta' && event.code == 'KeyB')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'bold event'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // italic
            if (
              (event.ctrlKey && event.code == 'KeyI') ||
              (event.key == 'Meta' && event.code == 'KeyI')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'Italic'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // underline
            if (
              (event.ctrlKey && event.code == 'KeyU') ||
              (event.key == 'Meta' && event.code == 'KeyU')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'underline'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // Strikethrough
            if (
              (event.ctrlKey && event.shiftKey && event.code == 'KeyX') ||
              (event.key == 'Meta' && event.shiftKey && event.code == 'KeyX')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'Strike'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // Highlight
            if (
              (event.ctrlKey && event.shiftKey && event.code == 'KeyH') ||
              (event.key == 'Meta' && event.shiftKey && event.code == 'KeyH')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'Highlight'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // align-center
            if (
              (event.ctrlKey && event.shiftKey && event.code == 'KeyE') ||
              (event.key == 'Meta' && event.shiftKey && event.code == 'KeyE')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'align-center'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // align-left
            if (
              (event.ctrlKey && event.shiftKey && event.code == 'KeyL') ||
              (event.key == 'Meta' && event.shiftKey && event.code == 'KeyL')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'align-left'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // align-right
            if (
              (event.ctrlKey && event.shiftKey && event.code == 'KeyR') ||
              (event.key == 'Meta' && event.shiftKey && event.code == 'KeyR')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'align-right'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // subscript
            if (
              (event.ctrlKey && event.code == 'Comma') ||
              (event.key == 'Meta' && event.code == 'Comma')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'subscript'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // Superscript
            if (
              (event.ctrlKey && event.code == 'Period') ||
              (event.key == 'Meta' && event.code == 'Period')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'superscript'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // Heading 1
            if (
              (event.ctrlKey && event.altKey && event.code == 'Digit1') ||
              (event.key == 'Meta' && event.altKey && event.code == 'Digit1')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'Heading 1'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // Heading 2
            if (
              (event.ctrlKey && event.altKey && event.code == 'Digit2') ||
              (event.key == 'Meta' && event.altKey && event.code == 'Digit2')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'Heading 2'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // Paragraph
            if (
              (event.ctrlKey && event.altKey && event.code == 'Digit0') ||
              (event.key == 'Meta' && event.altKey && event.code == 'Digit0')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'paragraph'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // Bullet List
            if (
              (event.ctrlKey && event.shiftKey && event.code == 'Digit8') ||
              (event.key == 'Meta' && event.shiftKey && event.code == 'Digit8')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'Bullet List'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // Ordered List
            if (
              (event.ctrlKey && event.shiftKey && event.code == 'Digit7') ||
              (event.key == 'Meta' && event.shiftKey && event.code == 'Digit7')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'Ordered List'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // Hard Break
            if (
              (event.shiftKey && event.code == 'Enter') ||
              (event.key == 'Meta' && event.code == 'Enter')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'text-wrap'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // Undo
            if (
              (event.ctrlKey && event.code == 'KeyZ') ||
              (event.key == 'Meta' && event.code == 'KeyZ')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'Undo'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
            // Redo
            if (
              (event.ctrlKey && event.code == 'KeyY') ||
              (event.key == 'Meta' && event.code == 'KeyY')
            ) {
              const matamoObj = createMatomoObj(
                proposalDetails,
                userEmail,
                userRole,
                'Redo'
              );
              saveDataInMatomo(trackEvent, matamoObj);
            }
          };
        }
      }
    },
    [proposalId, wsInstance, notesUserTag, query]
  );
  let dataSynced = wsInstance.synced;
  let view,
    state = '';
  if (editor) {
    view = editor.view;
    state = editor.state;
  }
  const from = view?.state.selection?.from;
  const to = view?.state.selection?.to;
  const linkerRegex = /(?:^|\s*)^([A-Z]{3}[0-9]{5})$/;
  useEffect(() => {
    document.onkeydown = event => {
      getPressedKey(event.code);
    };
    const typeLink = view?.state?.selection?.$head?.marks()[0]?.type?.name;
    const urlOpp = view?.state?.selection?.$head?.marks()[0]?.attrs?.href;
    const parentName =
      view?.state?.selection?.$head?.parent?.content?.content[0]?.text;

    if (urlOpp) {
      if (urlOpp && typeLink === 'opportunityLinker') {
        if (pressedKey === 'Backspace' || pressedKey === 'Delete') {
          editor.commands.unsetLink();
        }
      }
    }
    console.log(from, to, 'fr, to');
    if (parentName && typeLink === 'opportunityLinker') {
      if (!parentName?.match(linkerRegex)) {
        editor.commands.unsetLink();
      }
    }
  }, [from]);
  useEffect(() => {
    if (
      editor &&
      currentSearchResult &&
      currentSearchResult.searchIndex === NOTEPAD_UI_ID
    ) {
      if (query !== null && query.length >= 3 && dataSynced) {
        !editor.isDestroyed &&
          editor.commands.search(
            query !== null ? query : '',
            currentSearchResult.matchIndex
          );
      }
    } else if (
      editor &&
      currentSearchResult &&
      currentSearchResult.searchIndex !== NOTEPAD_UI_ID
    ) {
      !editor.isDestroyed && editor.commands.reset();
    }
  }, [query, currentSearchResult, editor, dataSynced]);
  return (
    <>
      {wsInstance && (
        <div className="editor-notepad" key={proposalId}>
          <div>
            <MenuBar
              key={proposalId}
              proposalDetails={proposalDetails}
              userRole={userRole}
              userEmail={userEmail}
              editor={editor}
              trackEvent={trackEvent}
            />
          </div>
          <EditorContent
            key={proposalId}
            editor={editor}
            className="editor-scroll"
          />
        </div>
      )}
    </>
  );
};
const mapStateToProps = state => ({
  userName: getUserName(state),
  userEmail: getUserEmail(state),
  userRole: getUserRole(state),
  proposalDetails: getProposalDetails(state)
});
const mapDispatchToProps = {
  fetchNotes,
  updateNoteInStore
};
export default connect(mapStateToProps, mapDispatchToProps)(WysiwygNotepad);
