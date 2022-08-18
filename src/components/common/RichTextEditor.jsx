import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Map, OrderedMap } from "immutable"; // NOSONAR
import { v4 as uuidv4 } from "uuid";
import Grid from "apollo-react/components/Grid";
import ListNumber from "apollo-react-icons/ListNumber";
import ListBullet from "apollo-react-icons/ListBullet";
import IndentDecrease from "apollo-react-icons/IndentDecrease";
import IndentIncrease from "apollo-react-icons/IndentIncrease";
import TextBold from "apollo-react-icons/TextBold";
import TextItalics from "apollo-react-icons/TextItalics";
import TextUnderline from "apollo-react-icons/TextUnderline";
import StrikeThrough from "apollo-react-icons/StrikeThrough";

import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  DefaultDraftBlockRenderMap,
} from "draft-js";
import "draft-js/dist/Draft.css";
import Typography from "apollo-react/components/Typography";

function getInitialEditorState(defaultValue) {
  return defaultValue
    ? EditorState.createWithContent(defaultValue)
    : EditorState.createEmpty();
}

const LEFT_INDENT = "left-indent";
const RIGHT_INDENT = "right-indent";

export const CONTROL_COMMANDS = {
  bold: "BOLD",
  italics: "ITALIC",
  underline: "UNDERLINE",
  strikethrough: "STRIKETHROUGH",
  uppercase: "UPPERCASE",
  lowercase: "LOWERCASE",
  orderedList: "ordered-list-item",
  unorderedList: "unordered-list-item",
  indentDecrease: LEFT_INDENT,
  indentIncrease: RIGHT_INDENT,
};

const blockRenderMap = Map({
  IndentBlock1: {
    element: "div",
  },
  IndentBlock2: {
    element: "div",
  },
  IndentBlock3: {
    element: "div",
  },
  IndentBlock4: {
    element: "div",
  },
  IndentBlock5: {
    element: "div",
  },
  IndentBlock6: {
    element: "div",
  },
  IndentBlock7: {
    element: "div",
  },
  IndentBlock8: {
    element: "div",
  },
  IndentBlock9: {
    element: "div",
  },
  IndentBlock10: {
    element: "div",
  },
});

export const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
  blockRenderMap
);

export const cssStyles = {
  UPPERCASE: {
    textTransform: "uppercase",
  },
  LOWERCASE: {
    textTransform: "lowercase",
  },
};

export function getBlockStyle(block) {
  const blockTypes = {
    IndentBlock1: "DraftEditor-indent-1",
    IndentBlock2: "DraftEditor-indent-2",
    IndentBlock3: "DraftEditor-indent-3",
    IndentBlock4: "DraftEditor-indent-4",
    IndentBlock5: "DraftEditor-indent-5",
    IndentBlock6: "DraftEditor-indent-6",
    IndentBlock7: "DraftEditor-indent-7",
    IndentBlock8: "DraftEditor-indent-8",
    IndentBlock9: "DraftEditor-indent-9",
    IndentBlock10: "DraftEditor-indent-10",
  };
  return blockTypes[block.getType()];
}

function getCssStyles(customStyles = {}) {
  return { ...cssStyles, ...customStyles };
}

function changeBlockDepth(block, editorstate, indentation) {
  const blockKey = block.getKey();
  const depth = block.getDepth();
  let newDepth = 0;

  if (indentation === LEFT_INDENT && depth > 0) {
    newDepth = depth - 1;
  } else if (indentation === RIGHT_INDENT && depth < 4) {
    newDepth = depth + 1;
  } else {
    newDepth = depth;
  }

  const newBlock = block.set("depth", newDepth);
  const contentState = editorstate.getCurrentContent();
  const blockMap = contentState.getBlockMap();
  const newBlockMap = blockMap.set(blockKey, newBlock);
  return EditorState.push(
    editorstate,
    contentState.merge({
      blockMap: newBlockMap,
    }),
    "adjust-depth"
  );
}

function Lowercase(props) {
  const { className } = props;
  return (
    <div {...props} className={`${className} text`}>
      aa
    </div>
  );
}

function Uppercase(props) {
  const { className } = props;
  return (
    <div {...props} className={`${className} text`}>
      AA
    </div>
  );
}

function RichTextEditor({
  label,
  defaultValue,
  onChange,
  placeholder,
  readOnly,
  disabled,
  hideControls,
  customStyles,
}) {
  const [editorState, setEditorState] = useState(
    getInitialEditorState(defaultValue)
  );
  const editorRef = useRef(null);

  function focusEditor() {
    if (editorRef && editorRef.current) editorRef.current.focus();
  }

  function handleChange(newState) {
    setEditorState(newState);
    const html =
      editorRef &&
      editorRef.current &&
      editorRef.current.editor &&
      editorRef.current.editor.innerHTML;
    onChange(convertToRaw(newState.getCurrentContent()), html);
  }

  function handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleChange(newState);
      return true;
    }
    return false;
  }

  function toggleBlockType(e, command) {
    e.preventDefault();
    focusEditor();

    const newState = RichUtils.toggleBlockType(editorState, command);
    if (newState) {
      handleChange(newState);
      return true;
    }
    return false;
  }

  function getNextIndentation(indentation, blockType) {
    let indentStyle = null;
    if (
      blockType === null || blockType === undefined
        ? undefined
        : blockType.includes("IndentBlock")
    ) {
      const indentIndex = parseInt(blockType.replace("IndentBlock", ""), 10);

      if (indentation === RIGHT_INDENT && indentIndex < 10) {
        indentStyle = `IndentBlock${indentIndex + 1}`;
      } else if (indentation === LEFT_INDENT && indentIndex > 1) {
        indentStyle = `IndentBlock${indentIndex - 1}`;
      }
    } else {
      indentStyle = "IndentBlock1";
    }
    return indentStyle;
  }

  function handleIndentation(e, indentation) {
    e.preventDefault();
    focusEditor();

    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const blockType = currentContentBlock.getType();
    let newEditorState = null;
    if (
      blockType === "unordered-list-item" ||
      blockType === "ordered-list-item"
    ) {
      newEditorState = changeBlockDepth(
        currentContentBlock,
        editorState,
        indentation
      );
    } else if (
      !(
        (blockType === "unstyled" || blockType === null) &&
        indentation === LEFT_INDENT
      )
    ) {
      const indentStyle = getNextIndentation(indentation, blockType);

      if (indentStyle === null && indentation === RIGHT_INDENT) {
        return;
      }

      newEditorState = RichUtils.toggleBlockType(editorState, indentStyle);
    }
    if (newEditorState) {
      handleChange(newEditorState);
    }
  }

  function toggleInlineStyle(e, command) {
    e.preventDefault();
    focusEditor();

    const newState = RichUtils.toggleInlineStyle(editorState, command);
    if (newState) {
      handleChange(newState);
      if (command === "UPPERCASE") {
        if (newState.getCurrentInlineStyle().has("LOWERCASE")) {
          handleChange(RichUtils.toggleInlineStyle(newState, "LOWERCASE"));
        }
      } else if (command === "LOWERCASE") {
        if (newState.getCurrentInlineStyle().has("UPPERCASE")) {
          handleChange(RichUtils.toggleInlineStyle(newState, "UPPERCASE"));
        }
      }
      return true;
    }
    return false;
  }

  // control groups
  const BLOCK_CONTROLGROUP = OrderedMap({
    [CONTROL_COMMANDS.orderedList]: {
      onToggle: toggleBlockType,
      Icon: ListNumber,
    },
    [CONTROL_COMMANDS.unorderedList]: {
      onToggle: toggleBlockType,
      Icon: ListBullet,
    },
    [CONTROL_COMMANDS.indentDecrease]: {
      onToggle: handleIndentation,
      Icon: IndentDecrease,
    },
    [CONTROL_COMMANDS.indentIncrease]: {
      onToggle: handleIndentation,
      Icon: IndentIncrease,
    },
  });

  const INLINE_CONTROLGROUP = OrderedMap({
    [CONTROL_COMMANDS.bold]: {
      onToggle: toggleInlineStyle,
      Icon: TextBold,
    },
    [CONTROL_COMMANDS.italics]: {
      onToggle: toggleInlineStyle,
      Icon: TextItalics,
    },
    [CONTROL_COMMANDS.underline]: {
      onToggle: toggleInlineStyle,
      Icon: TextUnderline,
    },
    [CONTROL_COMMANDS.strikethrough]: {
      onToggle: toggleInlineStyle,
      Icon: StrikeThrough,
    },
    [CONTROL_COMMANDS.uppercase]: {
      onToggle: toggleInlineStyle,
      Icon: Uppercase,
    },
    [CONTROL_COMMANDS.lowercase]: {
      onToggle: toggleInlineStyle,
      Icon: Lowercase,
    },
  });

  function LabelWithControls({ showControls }) {
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getStartKey())
      .getType();
    const currentInlineStyle = editorState.getCurrentInlineStyle();

    const BLOCK_CONTROLS_TO_RENDER = BLOCK_CONTROLGROUP.filter(
      (control, controlKey) => !hideControls.includes(controlKey)
    );
    const INLINE_CONTROLS_TO_RENDER = INLINE_CONTROLGROUP.filter(
      (control, controlKey) => !hideControls.includes(controlKey)
    );

    return (
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <Typography component="span" className="label">
            {label}
          </Typography>
        </Grid>
        <Grid item xs={9} style={{ textAlign: "end" }}>
          {showControls ? (
            <div className="controls-container">
              {BLOCK_CONTROLS_TO_RENDER.size > 0 ? (
                <div className="style-button-group">
                  {BLOCK_CONTROLS_TO_RENDER.entrySeq().map(([key, value]) => {
                    const { Icon } = value;
                    const isActive =
                      currentInlineStyle.has(key) || key === blockType;
                    const { onToggle } = value;
                    return (
                      <Icon
                        key={uuidv4()}
                        className={classNames({
                          "icon-button": true,
                          active: isActive,
                        })}
                        onMouseDown={(e) => onToggle(e, key)}
                      />
                    );
                  })}
                </div>
              ) : null}
              {INLINE_CONTROLS_TO_RENDER.size > 0 ? (
                <div className="style-button-group">
                  {INLINE_CONTROLS_TO_RENDER.entrySeq().map(([key, value]) => {
                    const { Icon } = value;
                    const isActive =
                      currentInlineStyle.has(key) || key === blockType;
                    const { onToggle } = value;
                    return (
                      <Icon
                        key={uuidv4()}
                        className={classNames({
                          "icon-button": true,
                          active: isActive,
                        })}
                        onMouseDown={(e) => onToggle(e, key)}
                      />
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
        </Grid>
      </Grid>
    );
  }

  LabelWithControls.propTypes = {
    showControls: PropTypes.bool.isRequired,
  };

  const contentState = editorState.getCurrentContent();

  return (
    <div
      className={classNames({
        "MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth": true,
        "RichEditor-hidePlaceholder":
          !contentState.hasText() &&
          contentState
            .getBlockMap()
            .first()
            .getType() !== "unstyled",
      })}
    >
      <LabelWithControls showControls={!(readOnly || disabled)} />
      <Editor
        customStyleMap={getCssStyles(customStyles)}
        editorState={editorState}
        onChange={handleChange}
        handleKeyCommand={handleKeyCommand}
        blockRenderMap={extendedBlockRenderMap}
        blockStyleFn={getBlockStyle}
        placeholder={placeholder}
        ref={editorRef}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
}

RichTextEditor.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.object,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  hideControls: PropTypes.arrayOf(PropTypes.string),
  customStyles: PropTypes.object,
};

RichTextEditor.defaultProps = {
  label: "",
  defaultValue: null,
  placeholder: "",
  readOnly: false,
  disabled: false,
  hideControls: [],
  customStyles: {},
  onChange: () => {},
};

Lowercase.propTypes = {
  className: PropTypes.string,
};

Uppercase.propTypes = {
  className: PropTypes.string,
};

Lowercase.defaultProps = {
  className: "",
};

Uppercase.defaultProps = {
  className: "",
};

export default RichTextEditor;
