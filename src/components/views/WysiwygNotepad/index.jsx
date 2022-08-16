import "./styles.scss";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { connect } from "react-redux";
import React, { useEffect, useState, useContext, useCallback } from "react";
import randomColor from "randomcolor";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/core";

import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Code from "@tiptap/extension-code";
import HighLight from "@tiptap/extension-highlight";

import { v4 as uuidv4 } from "uuid";
import {
  getProposalDetails,
  selectNotes,
  getSelectedBid,
  getUserName,
  getUserEmail,
  getUserRole,
} from "../../../redux/selectors";
import MenuBar from "./Menu/MenuBar";
import { updateNote, fetchNotes } from "../../../redux/actions/notepad-actions";
import { SocketContext } from "../../../context/SocketContext";
// import * as Y from "yjs";
import { debounce } from "lodash";

const WysiwygNotepad = ({
  notes = null,
  selectedBid,
  userName,
  userEmail,
  userRole,
  updateNote,
  fetchNotes,
  proposalDetails,
}) => {
  const { socket } = useContext(SocketContext);

  const emptyTextBlock = {
    type: "doc",
    content: [
      {
        type: "paragraph",
      },
    ],
  };
  // const [status, setStatus] = useState("connecting");
  const [json, setJSON] = useState(emptyTextBlock);
  const [content, setContent] = useState("<p></p>");
  // const [editor, setEditor] = useState(null);
  const [notesId, setNotesId] = useState("");
  const usercolor = randomColor();

  useEffect(() => {
    fetchLatestNotes();
  }, []);

  const fetchLatestNotes = () => {
    const proposalId = selectedBid.get("id", "");
    if (proposalId) fetchNotes(proposalId);
  };
  // const ydoc = new Y.Doc();
  // console.log("YDOC", ydoc);

  useEffect(() => {
    let validNotes, noteId;
    if (_.isEmpty(notes)) {
      validNotes = emptyTextBlock;
      console.log("notes empty");
    } else {
      if (notes.toJS()[0]?.noteText == undefined) {
        validNotes = emptyTextBlock;
        console.log("notes are undefined");
      } else if (typeof notes.toJS()[0].noteText !== "object") {
        console.log("notes type is not an object");
        validNotes = JSON.parse(notes.toJS()[0].noteText);
        noteId = notes.toJS()[0].notesId;
        !!validNotes.blocks ? (validNotes = dataConversion(validNotes)) : null;
      } else {
        console.log("notes type is object");
        validNotes = notes.toJS()[0].noteText;
        noteId = notes.toJS()[0].notesId;
        !!validNotes.blocks ? (validNotes = dataConversion(validNotes)) : null;
      }
      console.log("validNotes", typeof validNotes, validNotes);
    }
    setNotesId(noteId);
    setJSON(validNotes);
  }, [notes]);

  useEffect(() => {
    console.log("json", json);
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
      Link,
      Code,
      HighLight,
    ]);
    setContent(data);
  }, [json, notes]);

  const styleMarks = (blk) => {
    let tempMarks = [];
    blk.inlineStyleRanges.forEach((bstyle) => {
      if (
        bstyle.style.toLowerCase() == "bold" ||
        bstyle.style.toLowerCase() == "italic" ||
        bstyle.style.toLowerCase() == "underline" ||
        bstyle.style.toLowerCase() == "code"
      )
        tempMarks.push({ type: bstyle.style.toLowerCase() });
      else if (bstyle.style.toLowerCase().includes("strike")) {
        tempMarks.push({ type: "strike" });
      } else {
        console.log("undefined");
        tempMarks.push({ type: undefined });
      }
    });
    return tempMarks;
  };

  const simpleData = (block, jdata) => {
    console.log("we have nothing");
    if (_.isEmpty(block.text)) {
      console.log("if nothing");
      jdata.content.push({ type: "paragraph" });
    } else {
      jdata.content.push({
        type: "paragraph",
        content: [
          {
            type: "text",
            text: block.text,
          },
        ],
      });
    }
    return jdata;
  };

  const styleData = (block, jdata) => {
    console.log("only style", block);
    let marks = styleMarks(block);
    jdata.content.push({
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: marks,
          text: block.text,
        },
      ],
    });
    return jdata;
  };

  const typeData = (block, jdata) => {
    console.log("only type", block.type);
    if (block.type.includes("header")) {
      console.log("heading", block.type);
      if (block.type == "header-one") {
        jdata.content.push({
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: block.text }],
        });
      } else if (block.type == "header-two") {
        jdata.content.push({
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: block.text }],
        });
      } else {
        jdata.content.push({
          type: "heading",
          attrs: { level: 3 },
          content: [{ type: "text", text: block.text }],
        });
      }
    } else if (block.type.includes("list-item")) {
      if (block.type.includes("unordered")) {
        jdata.content.push({
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: block.text }],
                },
              ],
            },
          ],
        });
      } else {
        jdata.content.push({
          type: "orderedList",
          attrs: { start: 1 },
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: block.text }],
                },
              ],
            },
          ],
        });
      }
    }
    return jdata;
  };

  const dataConversion = (data) => {
    console.log("conversion called data", data);
    let jdata = {
      type: "doc",
      content: [],
    };
    data.blocks.forEach((block) => {
      if (
        !!block.type &&
        !!block.inlineStyleRanges &&
        block.type !== "unstyled" &&
        block.inlineStyleRanges.length !== 0
      ) {
        console.log("both type and style", block.type, block.inlineStyleRanges);
        if (block.type.includes("header")) {
          console.log("heading", block.type);
          let marks = styleMarks(block);
          if (block.type == "header-one") {
            jdata.content.push({
              type: "heading",
              attrs: { level: 1 },
              content: [
                {
                  type: "text",
                  marks: marks,
                  text: block.text,
                },
              ],
            });
          } else if (block.type == "header-two") {
            jdata.content.push({
              type: "heading",
              attrs: { level: 2 },
              content: [
                {
                  type: "text",
                  marks: marks,
                  text: block.text,
                },
              ],
            });
          } else {
            jdata.content.push({
              type: "heading",
              attrs: { level: 3 },
              content: [
                {
                  type: "text",
                  marks: marks,
                  text: block.text,
                },
              ],
            });
          }
        } else if (block.type.includes("list-item")) {
          let marks = styleMarks(block);
          console.log("list", block.type);
          if (block.type.includes("unordered")) {
            jdata.content.push({
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          marks: marks,
                          text: block.text,
                        },
                      ],
                    },
                  ],
                },
              ],
            });
          } else {
            jdata.content.push({
              type: "orderedList",
              attrs: { start: 1 },
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          marks: marks,
                          text: block.text,
                        },
                      ],
                    },
                  ],
                },
              ],
            });
          }
        }
      } else if (
        !!block.inlineStyleRanges &&
        block.inlineStyleRanges.length !== 0
      ) {
        jdata = styleData(block, jdata);
      } else if (!!block.type && block.type !== "unstyled") {
        jdata = typeData(block, jdata);
      } else {
        jdata = simpleData(block, jdata);
      }
    });
    // console.log("jdata", jdata);
    let finalJSON = JSON.parse(JSON.stringify(jdata));
    console.log("final", finalJSON);
    return finalJSON;
  };

  const editor = useEditor(
    {
      extensions:
        // [StarterKit, Underline, Link],
        // socket
        false
          ? // false
            [
              StarterKit,
              Underline,
              Link,
              Code,
              HighLight,
              Collaboration.configure({
                document: ydoc,
              }),
              CollaborationCursor.configure({
                provider: socket,
                user: {
                  name: userName + " " + "is typing....",
                  color: usercolor,
                },
              }),
            ]
          : [StarterKit, Underline, Link, Code, HighLight],
      content: content || "<p></p>",
      onUpdate: ({ editor }) => {
        const Ejson = editor.getJSON();
        // send the content to an API here
        memoizedSaveDB(Ejson);
      },
    },
    [content]
  );

  const constructNoteV2 = (
    proposalId,
    notesId,
    noteText = emptyTextBlock, // non stringified block data i.e as returned from Editor {block:[], entityMap:{}}
    userEmail = "",
    userName = "",
    userRole = ""
  ) => {
    return {
      proposalId,
      notesId: notesId || uuidv4(),
      noteText: JSON.stringify(noteText),
      createdBy: { userEmail, userName, userRole },
      section: null,
      isNoteV2: true,
      oppNo: proposalDetails["CRM #"],
    };
  };

  const memoizedSaveDB = useCallback(
    debounce((noteText) => {
      console.log("noteText", noteText);
      const proposalId = selectedBid.get("id");
      const noteSaveReqBody = constructNoteV2(
        proposalId,
        notesId,
        noteText,
        userEmail,
        userName,
        userRole
      );
      updateNote(proposalId, noteSaveReqBody);
    }, 100),
    [notes, selectedBid, notesId, userEmail, userName, userRole]
  );

  return (
    <>
      {socket && (
        <div>
          <div>
            <MenuBar editor={editor} />
          </div>
          <EditorContent editor={editor} className="editor-scroll" />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  notes: selectNotes(state),
  selectedBid: getSelectedBid(state),
  userName: getUserName(state),
  userEmail: getUserEmail(state),
  userRole: getUserRole(state),
  proposalDetails: getProposalDetails(state),
});

const mapDispatchToProps = {
  updateNote,
  fetchNotes,
};
export default connect(mapStateToProps, mapDispatchToProps)(WysiwygNotepad);
