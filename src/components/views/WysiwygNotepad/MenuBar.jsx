import React, { useEffect, useState, useCallback } from "react";
import IconButton from "apollo-react/components/IconButton";
import TextItalics from "apollo-react-icons/TextItalics";
import StrikeThrough from "apollo-react-icons/StrikeThrough";
import ListBullet from "apollo-react-icons/ListBullet";
import ListNumber from "apollo-react-icons/ListNumber";
import ChevronLeft from "apollo-react-icons/ChevronLeft";
import ChevronRight from "apollo-react-icons/ChevronRight";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextUnderline from "apollo-react-icons/TextUnderline";
// import Underline from "@tiptap/extension-underline";
import TextBold from "apollo-react-icons/TextBold";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <TextBold />
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <TextItalics />
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleUnderline()
            .run()
        }
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <TextUnderline />
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <StrikeThrough />
      </IconButton>

      {/* <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .unsetAllMarks()
            .run()
        }
      >
        clear marks
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .clearNodes()
            .run()
        }
      >
        clear nodes
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .setParagraph()
            .run()
        }
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 1 })
            .run()
        }
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 2 })
            .run()
        }
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 3 })
            .run()
        }
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 4 })
            .run()
        }
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </IconButton> */}
      {/* <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 5 })
            .run()
        }
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 6 })
            .run()
        }
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </IconButton> */}
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBulletList()
            .run()
        }
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <ListBullet />
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleOrderedList()
            .run()
        }
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <ListNumber />
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleCodeBlock()
            .run()
        }
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        <ChevronLeft />
      </IconButton>
      {/* <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBlockquote()
            .run()
        }
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .setHorizontalRule()
            .run()
        }
      >
        horizontal rule
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .setHardBreak()
            .run()
        }
      >
        hard break
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        undo
      </IconButton>
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        redo
      </IconButton> */}
    </>
  );
};

export default MenuBar;
