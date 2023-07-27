"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _colors = require("../../colors");
var styles = {
  '@keyframes appear': {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  },
  '@keyframes blink1': {
    '0%': {
      width: 4,
      height: 4
    },
    '11%': {
      width: 16,
      height: 16
    },
    '13%': {
      width: 16,
      height: 16
    },
    '24%': {
      width: 6,
      height: 6
    },
    '32%': {
      width: 4,
      height: 4
    },
    '76%': {
      width: 4,
      height: 4
    },
    '87%': {
      width: 16,
      height: 16
    },
    '89%': {
      width: 16,
      height: 16
    },
    '100%': {
      width: 4,
      height: 4
    }
  },
  '@keyframes blink2': {
    '0%': {
      width: 4,
      height: 4
    },
    '8%': {
      width: 4,
      height: 4
    },
    '19%': {
      width: 16,
      height: 16
    },
    '22%': {
      width: 16,
      height: 16
    },
    '33%': {
      width: 6,
      height: 6
    },
    '41%': {
      width: 4,
      height: 4
    },
    '68%': {
      width: 4,
      height: 4
    },
    '79%': {
      width: 16,
      height: 16
    },
    '81%': {
      width: 16,
      height: 16
    },
    '92%': {
      width: 6,
      height: 6
    },
    '100%': {
      width: 4,
      height: 4
    }
  },
  '@keyframes blink3': {
    '0%': {
      width: 4,
      height: 4
    },
    '18%': {
      width: 4,
      height: 4
    },
    '29%': {
      width: 16,
      height: 16
    },
    '31%': {
      width: 16,
      height: 16
    },
    '42%': {
      width: 6,
      height: 6
    },
    '50%': {
      width: 4,
      height: 4
    },
    '58%': {
      width: 4,
      height: 4
    },
    '69%': {
      width: 16,
      height: 16
    },
    '71%': {
      width: 16,
      height: 16
    },
    '82%': {
      width: 6,
      height: 6
    },
    '90%': {
      width: 4,
      height: 4
    },
    '100%': {
      width: 4,
      height: 4
    }
  },
  '@keyframes blink4': {
    '0%': {
      width: 4,
      height: 4
    },
    '26%': {
      width: 4,
      height: 4
    },
    '37%': {
      width: 16,
      height: 16
    },
    '39%': {
      width: 16,
      height: 16
    },
    '50%': {
      width: 4,
      height: 4
    },
    '61%': {
      width: 16,
      height: 16
    },
    '63%': {
      width: 16,
      height: 16
    },
    '74%': {
      width: 6,
      height: 6
    },
    '82%': {
      width: 4,
      height: 4
    },
    '100%': {
      width: 4,
      height: 4
    }
  },
  apolloProgressContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 64
  },
  root: {
    height: 16,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    '& span': {
      borderRadius: '50%',
      width: 16,
      height: 16,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    '& span span': {
      borderRadius: '50%',
      width: 4,
      height: 4
    },
    '& span:nth-of-type(1) span': {
      animation: '$appear 50ms linear 200ms 1 both, $blink1 1260ms linear 200ms infinite'
    },
    '& span:nth-of-type(2) span': {
      animation: '$appear 50ms linear 300ms 1 both, $blink2 1260ms linear 200ms infinite'
    },
    '& span:nth-of-type(3) span': {
      animation: '$appear 50ms linear 426ms 1 both, $blink3 1260ms linear 200ms infinite'
    },
    '& span:nth-of-type(4) span': {
      animation: '$appear 50ms linear 526ms 1 both, $blink4 1260ms linear 200ms infinite'
    }
  },
  primary: {
    backgroundColor: _colors.primary
  },
  purple: {
    backgroundColor: _colors.purple
  },
  fuchsia: {
    backgroundColor: _colors.fuchsia
  },
  orange: {
    backgroundColor: _colors.orange
  },
  statusText: {
    lineHeight: '24px',
    paddingTop: 8,
    textAlign: 'center'
  },
  textDarkMode: {
    color: _colors.white
  }
};
exports.styles = styles;