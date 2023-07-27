"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNextIndentation = exports.getBlockStyle = exports.extendedBlockRenderMap = exports.blockTypes = void 0;
var _draftJs = require("draft-js");
var _immutable = require("immutable");
var blockRenderMap = (0, _immutable.Map)({
  LeftAlignedBlock: {
    element: 'div'
  },
  RightAlignedBlock: {
    element: 'div'
  },
  CenterAlignedBlock: {
    element: 'div'
  },
  JustifiedBlock: {
    element: 'div'
  },
  IndentBlock1: {
    element: 'div'
  },
  IndentBlock2: {
    element: 'div'
  },
  IndentBlock3: {
    element: 'div'
  },
  IndentBlock4: {
    element: 'div'
  },
  IndentBlock5: {
    element: 'div'
  },
  IndentBlock6: {
    element: 'div'
  },
  IndentBlock7: {
    element: 'div'
  },
  IndentBlock8: {
    element: 'div'
  },
  IndentBlock9: {
    element: 'div'
  },
  IndentBlock10: {
    element: 'div'
  }
});
var extendedBlockRenderMap = _draftJs.DefaultDraftBlockRenderMap.merge(blockRenderMap);
exports.extendedBlockRenderMap = extendedBlockRenderMap;
var blockTypes = {
  blockquote: 'RichEditor-blockquote',
  LeftAlignedBlock: 'DraftEditor-alignLeft',
  RightAlignedBlock: 'DraftEditor-alignRight',
  CenterAlignedBlock: 'DraftEditor-alignCenter',
  JustifiedBlock: 'DraftEditor-alignJustified',
  IndentBlock1: 'DraftEditor-indent-1',
  IndentBlock2: 'DraftEditor-indent-2',
  IndentBlock3: 'DraftEditor-indent-3',
  IndentBlock4: 'DraftEditor-indent-4',
  IndentBlock5: 'DraftEditor-indent-5',
  IndentBlock6: 'DraftEditor-indent-6',
  IndentBlock7: 'DraftEditor-indent-7',
  IndentBlock8: 'DraftEditor-indent-8',
  IndentBlock9: 'DraftEditor-indent-9',
  IndentBlock10: 'DraftEditor-indent-10'
};
exports.blockTypes = blockTypes;
var getBlockStyle = function getBlockStyle(block) {
  return blockTypes[block.getType()];
};
exports.getBlockStyle = getBlockStyle;
var getNextIndentation = function getNextIndentation(indentation, blockType) {
  if (blockType !== null && blockType !== void 0 && blockType.includes('IndentBlock')) {
    var indentIndex = parseInt(blockType.replace('IndentBlock', ''), 10);
    if (indentation === 'right-indent' && indentIndex < 10) {
      return 'IndentBlock' + (indentIndex + 1);
    } else if (indentation === 'left-indent' && indentIndex > 1) {
      return 'IndentBlock' + (indentIndex - 1);
    } else {
      return null;
    }
  } else {
    return 'IndentBlock1';
  }
};
exports.getNextIndentation = getNextIndentation;