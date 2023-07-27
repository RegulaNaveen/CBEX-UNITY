"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultStyles = void 0;
var _colors = require("../../colors");
var colors = [{
  label: 'Black',
  value: _colors.black
}, {
  label: 'Dark Grey',
  value: _colors.neutral6
}, {
  label: 'Light Grey',
  value: _colors.neutral4
}, {
  label: 'Blue',
  value: _colors.primary
}, {
  label: 'Green',
  value: _colors.green
}, {
  label: 'Red',
  value: _colors.red
}, {
  label: 'Purple',
  value: _colors.purple
}, {
  label: 'Orange',
  value: _colors.orange
}, {
  label: 'White',
  value: _colors.white
}];
var defaultStyles = {
  fontFamily: [{
    label: 'Arial',
    value: 'Arial'
  }, {
    label: 'Arial Black',
    value: 'Arial Black'
  }, {
    label: 'Courier New',
    value: 'Courier New'
  }, {
    label: 'Georgia',
    value: 'Georgia'
  }, {
    label: 'Helvetica',
    value: 'Helvetica'
  }, {
    label: 'Impact',
    value: 'Impact'
  }, {
    label: 'Lucida Console',
    value: 'Lucida Console'
  }, {
    label: 'Proxima Nova',
    value: 'Proxima Nova'
  }, {
    label: 'Roboto',
    value: 'Roboto'
  }, {
    label: 'Times New Roman',
    value: 'Times New Roman'
  }],
  color: colors,
  backgroundColor: colors,
  fontSize: [{
    label: 8,
    value: '8pt'
  }, {
    label: 10,
    value: '10pt'
  }, {
    label: 12,
    value: '12pt'
  }, {
    label: 14,
    value: '14pt'
  }, {
    label: 16,
    value: '16pt'
  }, {
    label: 18,
    value: '18pt'
  }, {
    label: 24,
    value: '24pt'
  }, {
    label: 32,
    value: '32pt'
  }, {
    label: 48,
    value: '48pt'
  }]
};
exports.defaultStyles = defaultStyles;