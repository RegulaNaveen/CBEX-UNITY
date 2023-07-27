"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = require("../../colors");
var _shadows = require("../../shadows");
var styles = {
  paper: {
    paddingTop: 24,
    boxSizing: 'border-box',
    background: _colors.neutral1,
    boxShadow: _shadows.shadowLevel3,
    border: 0,
    overflow: 'visible',
    '$left &': {
      boxShadow: _shadows.shadowLevel3
    },
    '&$hasSubtitle': {
      paddingTop: 12
    },
    '&:not($collapsed)': {
      '& $header': {
        padding: '0 72px 0 32px',
        '$left &': {
          padding: '0 72px 0 24px'
        }
      },
      '& $body': {
        padding: '0 24px 0 32px',
        '$left &': {
          padding: '0 32px 0 24px'
        }
      }
    }
  },
  closeIcon: {
    position: 'absolute',
    top: 24,
    right: 24
  },
  expandPanel: {
    height: '100%',
    width: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    '$left &': {
      left: 'auto',
      right: 0,
      width: 0
    }
  },
  expandPanelCollapsed: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: _colors.primaryLight,
      color: _colors.primary,
      borderColor: _colors.primary,
      outline: "solid 1px ".concat(_colors.primary)
    },
    '&:hover div': {
      backgroundColor: _colors.primaryLight,
      color: _colors.primary,
      borderColor: _colors.primary
    },
    '$left &': {
      width: 24
    }
  },
  expandPanelButton: {
    height: 24,
    width: 24,
    right: 12,
    position: 'absolute',
    border: "1px solid ".concat(_colors.neutral4),
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    background: _colors.white,
    color: _colors.neutral7,
    boxShadow: _shadows.shadowLevel1,
    boxSizing: 'border-box',
    '$left &': {
      right: -12
    },
    '&:hover': {
      backgroundColor: _colors.primaryLight,
      color: _colors.primary,
      borderColor: _colors.primary,
      cursor: 'pointer'
    }
  },
  title: {
    fontSize: 24,
    lineHeight: '32px'
  },
  subtitle: {
    color: _colors.neutral7,
    lineHeight: 1.5,
    marginBottom: -12
  },
  divider: {
    backgroundColor: _colors.neutral3,
    width: '100%',
    marginTop: 24,
    marginBottom: 16
  },
  bladeActions: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: '16px 24px',
    backgroundColor: _colors.white,
    boxSizing: 'border-box',
    borderTop: "1px solid ".concat(_colors.neutral3),
    zIndex: 2,
    '$left &': {
      padding: '16px 32px'
    }
  },
  backdrop: {
    zIndex: 2
  },
  collapsed: {},
  left: {},
  header: {},
  hasSubtitle: {},
  body: {
    overflowY: 'auto'
  },
  icon: {
    fontSize: '16px !important',
    padding: 3
  },
  bodyActions: {
    marginBottom: '73px !important'
  }
};
var _default = styles;
exports.default = _default;