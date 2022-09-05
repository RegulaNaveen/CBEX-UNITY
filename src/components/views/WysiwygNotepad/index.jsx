import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { connect } from 'react-redux';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import randomColor from 'randomcolor';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { generateHTML } from '@tiptap/core';

import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Heading from '@tiptap/extension-heading';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Link from '@tiptap/extension-link';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import HardBreak from '@tiptap/extension-hard-break';
import HighLight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';

import { v4 as uuidv4 } from 'uuid';
import {
  getProposalDetails,
  selectNotes,
  getSelectedBid,
  getUserName,
  getUserEmail,
  getUserRole,
  selectIsNotesFetched,
  selectIsNotesWebSocketExists
} from '../../../redux/selectors';
import MenuBar from './MenuBar';
import {
  updateNote,
  fetchNotes,
  resetNotes,
  setEditor
} from '../../../redux/actions/notepad-actions';
// import { SocketContext } from '../../../context/SocketContext';
// import * as Y from "yjs";
import NotesSocketContext from '../../../context/notesSocketContext';
import Loader from 'react-loader-spinner';

const WysiwygNotepad = ({
  notes = null,
  selectedBid,
  userName,
  userEmail,
  userRole,
  updateNote,
  proposalDetails
}) => {
  const notesSocket = useContext(NotesSocketContext);

  const emptyTextBlock = {
    type: 'doc',
    content: [
      {
        type: 'paragraph'
      }
    ]
  };
  const dispatch = useDispatch();
  const [json, setJSON] = useState(emptyTextBlock);
  const [content, setContent] = useState('<p></p>');
  const [notesId, setNotesId] = useState('');
  const isNotesFetched = useSelector(selectIsNotesFetched);
  const isNotesWebSocketExists = useSelector(selectIsNotesWebSocketExists);
  const usercolor = randomColor({ luminosity: 'light' });
  const proposalId = selectedBid.get('id', '');

  const fetchLatestNotes = useCallback(() => {
    if (proposalId) dispatch(fetchNotes(proposalId));
  }, [proposalId]);

  useEffect(() => {
    if (!isNotesWebSocketExists) fetchLatestNotes();
    return () => {
      console.log('WYSIWYG Unmount');
      dispatch(resetNotes());
    };
  }, []);
  // const ydoc = new Y.Doc();
  // console.log("YDOC", ydoc);

  useEffect(() => {
    let validNotes, noteId;
    if (_.isEmpty(notes)) {
      validNotes = emptyTextBlock;
      console.log('notes empty');
    } else {
      if (notes.toJS()[0]?.noteText == undefined) {
        validNotes = emptyTextBlock;
        console.log('notes are undefined');
      } else if (typeof notes.toJS()[0].noteText !== 'object') {
        console.log('notes type is not an object');
        validNotes = JSON.parse(notes.toJS()[0].noteText);
        noteId = notes.toJS()[0].notesId;
        !!validNotes.blocks ? (validNotes = dataConversion(validNotes)) : null;
      } else {
        console.log('notes type is object');
        validNotes = notes.toJS()[0].noteText;
        noteId = notes.toJS()[0].notesId;
        !!validNotes.blocks ? (validNotes = dataConversion(validNotes)) : null;
      }
      console.log('validNotes', typeof validNotes, validNotes);
    }
    setNotesId(noteId);
    setJSON(validNotes);
  }, [notes]);

  useEffect(() => {
    console.log('json', json);
    const data = generateHTML(json, [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Strike,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Heading,
      HorizontalRule,
      Link,
      Code,
      CodeBlock,
      HighLight,
      HardBreak,
      Subscript,
      Superscript
    ]);
    setContent(data);
  }, [json, notes]);

  const styleMarks = (blk, map) => {
    console.log('calling styleeeeeeee', blk.entityRanges);
    let tempMarks = [];
    blk.inlineStyleRanges.forEach(bstyle => {
      if (
        bstyle.style.toLowerCase() == 'bold' ||
        bstyle.style.toLowerCase() == 'italic' ||
        bstyle.style.toLowerCase() == 'underline' ||
        bstyle.style.toLowerCase() == 'code'
      )
        tempMarks.push({ type: bstyle.style.toLowerCase() });
      if (bstyle.style.toLowerCase().includes('strike')) {
        tempMarks.push({ type: 'strike' });
      }
    });
    if (blk.entityRanges.length !== 0) {
      console.log('call style marks', blk.entityRanges, map, blk.text);
      blk.entityRanges.forEach(entity => {
        console.log('call en', entity.key, map[entity.key]);
        tempMarks.push({
          type: 'link',
          attrs: {
            class: null,
            href: map[entity.key].data.href,
            target: '_blank'
          }
        });
      });
    }
    return tempMarks;
  };

  const simpleData = (block, jdata, map) => {
    let marks = [];
    if (block.entityRanges.length !== 0) {
      console.log('call simple style marks', block.entityRanges);
      marks = styleMarks(block, map);
    }
    console.log('we have nothing');
    if (_.isEmpty(block.text)) {
      console.log('if nothing');
      jdata.content.push({ type: 'paragraph' });
    } else {
      jdata.content.push({
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: _.isEmpty(marks) ? undefined : marks,
            text: block.text
          }
        ]
      });
    }
    return jdata;
  };

  const styleData = (block, jdata, map) => {
    console.log('only style', block, block.entityRanges);
    let marks = styleMarks(block, map);

    jdata.content.push({
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: _.isEmpty(marks) ? undefined : marks,
          text: block.text
        }
      ]
    });
    return jdata;
  };

  const typeData = (block, jdata, map) => {
    let marks = [];
    if (block.entityRanges.length !== 0) {
      console.log('call type style marks', block.entityRanges);
      marks = styleMarks(block, map);
    }
    console.log('only type', block.type);
    if (block.type.includes('header')) {
      console.log('heading', block.type);
      if (block.type == 'header-one') {
        jdata.content.push({
          type: 'heading',
          attrs: { level: 1 },
          content: [
            {
              type: 'text',
              marks: _.isEmpty(marks) ? undefined : marks,
              text: block.text
            }
          ]
        });
      } else if (block.type == 'header-two') {
        jdata.content.push({
          type: 'heading',
          attrs: { level: 2 },
          content: [
            {
              type: 'text',
              marks: _.isEmpty(marks) ? undefined : marks,
              text: block.text
            }
          ]
        });
      } else {
        jdata.content.push({
          type: 'heading',
          attrs: { level: 3 },
          content: [
            {
              type: 'text',
              marks: _.isEmpty(marks) ? undefined : marks,
              text: block.text
            }
          ]
        });
      }
    } else if (block.type.includes('list-item')) {
      if (block.type.includes('unordered')) {
        jdata.content.push({
          type: 'bulletList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      marks: _.isEmpty(marks) ? undefined : marks,
                      text: block.text
                    }
                  ]
                }
              ]
            }
          ]
        });
      } else {
        jdata.content.push({
          type: 'orderedList',
          attrs: { start: 1 },
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      marks: _.isEmpty(marks) ? undefined : marks,
                      text: block.text
                    }
                  ]
                }
              ]
            }
          ]
        });
      }
    }
    return jdata;
  };

  const dataConversion = data => {
    console.log('conversion called data', data);
    let jdata = {
      type: 'doc',
      content: []
    };
    data.blocks.forEach(block => {
      if (
        !!block.type &&
        !!block.inlineStyleRanges &&
        block.type !== 'unstyled' &&
        block.inlineStyleRanges.length !== 0
      ) {
        if (block.entityRanges.length !== 0) {
          console.log('inside link', block);
        }
        console.log('both type and style', block.type, block.inlineStyleRanges);
        if (block.type.includes('header')) {
          console.log('heading', block.type);
          let marks = styleMarks(block, data.entityMap);

          if (block.type == 'header-one') {
            jdata.content.push({
              type: 'heading',
              attrs: { level: 1 },
              content: [
                {
                  type: 'text',
                  marks: _.isEmpty(marks) ? undefined : marks,
                  text: block.text
                }
              ]
            });
          } else if (block.type == 'header-two') {
            jdata.content.push({
              type: 'heading',
              attrs: { level: 2 },
              content: [
                {
                  type: 'text',
                  marks: _.isEmpty(marks) ? undefined : marks,
                  text: block.text
                }
              ]
            });
          } else {
            jdata.content.push({
              type: 'heading',
              attrs: { level: 3 },
              content: [
                {
                  type: 'text',
                  marks: _.isEmpty(marks) ? undefined : marks,
                  text: block.text
                }
              ]
            });
          }
        } else if (block.type.includes('list-item')) {
          let marks = styleMarks(block, data.entityMap);
          console.log('list', block.type);
          if (block.type.includes('unordered')) {
            jdata.content.push({
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          marks: _.isEmpty(marks) ? undefined : marks,
                          text: block.text
                        }
                      ]
                    }
                  ]
                }
              ]
            });
          } else {
            jdata.content.push({
              type: 'orderedList',
              attrs: { start: 1 },
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          marks: _.isEmpty(marks) ? undefined : marks,
                          text: block.text
                        }
                      ]
                    }
                  ]
                }
              ]
            });
          }
        }
      } else if (
        !!block.inlineStyleRanges &&
        block.inlineStyleRanges.length !== 0
      ) {
        jdata = styleData(block, jdata, data.entityMap);
      } else if (!!block.type && block.type !== 'unstyled') {
        jdata = typeData(block, jdata, data.entityMap);
      } else {
        jdata = simpleData(block, jdata, data.entityMap);
      }
    });
    let finalJSON = JSON.parse(JSON.stringify(jdata));
    console.log('final', finalJSON);
    return finalJSON;
  };

  const editor = useEditor(
    {
      extensions: notesSocket.wsInstance
        ? [
            StarterKit,
            Underline,
            Code,
            CodeBlock,
            HardBreak,
            HighLight,
            HorizontalRule,
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
                name: userName + ' ' + 'is typing....',
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
            })
          ]
        : [
            StarterKit,
            Underline,
            Link,
            Code,
            HighLight,
            HardBreak,
            HorizontalRule,
            CodeBlock
          ],
      content: content,
      onUpdate: ({ editor }) => {
        const Ejson = editor.getJSON();
        // send the content to an API here
        memoizedSaveDB(Ejson);
      }
    },
    [content, isNotesFetched]
  );

  dispatch(setEditor(editor));

  const constructNoteV2 = (
    proposalId,
    notesId,
    noteText = {}, // non stringified block data i.e as returned from Editor {block:[], entityMap:{}}
    userEmail = '',
    userName = '',
    userRole = ''
  ) => {
    return {
      proposalId,
      notesId: notesId || uuidv4(),
      noteText: JSON.stringify(noteText),
      createdBy: { userEmail, userName, userRole },
      section: null,
      isNoteV2: true,
      oppNo: proposalDetails['CRM #']
    };
  };

  const memoizedSaveDB = useCallback(
    noteText => {
      console.log('memoizedSaveDB', noteText);
      const proposalId = selectedBid.get('id');
      const noteSaveReqBody = constructNoteV2(
        proposalId,
        notesId,
        noteText,
        userEmail,
        userName,
        userRole
      );
      if (isNotesFetched && noteText?.content?.length >= 2) {
        updateNote(proposalId, noteSaveReqBody);
      }
      if (noteText?.content?.length < 2) {
        if (
          isNotesFetched &&
          noteText?.content[0] &&
          noteText?.content[0]?.content[0] &&
          noteText?.content[0]?.content[0]?.hasOwnProperty('text')
        ) {
          updateNote(proposalId, noteSaveReqBody);
        }
        if (
          isNotesFetched &&
          noteText?.content[0] &&
          noteText?.content[0]?.hasOwnProperty('text')
        ) {
          updateNote(proposalId, noteSaveReqBody);
        }
      }
    },
    [notes, selectedBid, notesId, userEmail, userName, userRole]
  );

  return (
    <>
      {notesSocket.wsInstance && (
        <div className="editor-notepad">
          <div>
            <MenuBar editor={editor} />
          </div>
          {isNotesFetched ? (
            <EditorContent editor={editor} className="editor-scroll" />
          ) : (
            <Loader
              type="TailSpin"
              color="#297DFD"
              width={30}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  notes: selectNotes(state),
  selectedBid: getSelectedBid(state),
  userName: getUserName(state),
  userEmail: getUserEmail(state),
  userRole: getUserRole(state),
  proposalDetails: getProposalDetails(state)
});

const mapDispatchToProps = {
  updateNote,
  fetchNotes
};
export default connect(mapStateToProps, mapDispatchToProps)(WysiwygNotepad);
