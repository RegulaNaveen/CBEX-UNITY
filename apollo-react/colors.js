"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.white = exports.utilityWarning = exports.utilityPositive = exports.utilityNegative = exports.utilityInfo = exports.transparentLight = exports.transparent = exports.themeGrey = exports.secondaryLight = exports.secondaryDark = exports.secondary = exports.redVeryLight = exports.redLight = exports.redDark = exports.red = exports.purple = exports.primaryLightTransparent = exports.primaryLight2 = exports.primaryLight = exports.primaryHoverTransparent = exports.primaryHoverDark = exports.primaryHover = exports.primaryDivider = exports.primaryDark2 = exports.primaryDark = exports.primary = exports.orange = exports.neutral9 = exports.neutral8 = exports.neutral7 = exports.neutral6 = exports.neutral5 = exports.neutral4 = exports.neutral3 = exports.neutral2 = exports.neutral1 = exports.neptunePrimaryLightTransparent = exports.neptunePrimaryLight = exports.neptunePrimaryDark = exports.neptunePrimary = exports.neptuneGradient = exports.green = exports.gradientStart = exports.gradientHorizontal = exports.fuchsia = exports.dataVizColors = exports.blueDark = exports.blue = exports.black = exports.bannerWarning = exports.bannerSuccess = exports.bannerError = void 0;
// Theme colors
var primary = '#0768fd'; // rgb(7, 104, 253)
exports.primary = primary;
var primaryDark = '#0557d5'; // rgb(5, 87, 213)
exports.primaryDark = primaryDark;
var primaryLight = '#ecf3ff'; // rgb(236, 243, 255)

// New theme color names
exports.primaryLight = primaryLight;
var neptunePrimary = primary;
exports.neptunePrimary = neptunePrimary;
var neptunePrimaryDark = primaryDark;
exports.neptunePrimaryDark = neptunePrimaryDark;
var neptunePrimaryLight = primaryLight;

// Deprecated
exports.neptunePrimaryLight = neptunePrimaryLight;
var primaryHover = primaryLight;
exports.primaryHover = primaryHover;
var primaryHoverTransparent = 'rgba(35, 114, 253, 0.08)';
exports.primaryHoverTransparent = primaryHoverTransparent;
var primaryHoverDark = primaryDark; // rgb(5, 87, 213)

// Transparencies
exports.primaryHoverDark = primaryHoverDark;
var transparentLight = 'rgba(255, 255, 255, 0.16)';
exports.transparentLight = transparentLight;
var transparent = 'rgba(255, 255, 255, 0.24)';
exports.transparent = transparent;
var primaryLightTransparent = primaryHoverTransparent;

// New transparency name
exports.primaryLightTransparent = primaryLightTransparent;
var neptunePrimaryLightTransparent = primaryLightTransparent;

// Background colors
exports.neptunePrimaryLightTransparent = neptunePrimaryLightTransparent;
var white = '#ffffff'; // rgb(255, 255, 255)
exports.white = white;
var neutral1 = '#f8f9fb'; // rgb(248, 249, 251)

// Neutral colors
exports.neutral1 = neutral1;
var neutral2 = '#f2f2f2'; // rgb(242, 242, 242)
exports.neutral2 = neutral2;
var neutral3 = '#e9e9e9'; // rgb(233, 233, 233)
exports.neutral3 = neutral3;
var neutral4 = '#d9d9d9'; // rgb(217, 217, 217)
exports.neutral4 = neutral4;
var neutral5 = '#b5b5b5'; // rgb(181, 181, 181)
exports.neutral5 = neutral5;
var neutral6 = '#999999'; // rgb(153, 153, 153)
exports.neutral6 = neutral6;
var neutral7 = '#595959'; // rgb(89, 89, 89)
exports.neutral7 = neutral7;
var neutral8 = '#444444'; // rgb(68, 68, 68)
exports.neutral8 = neutral8;
var neutral9 = '#393939'; // rgb(57, 57, 57)
exports.neutral9 = neutral9;
var black = '#000000'; // rgb(0, 0, 0)

// Utility colors
exports.black = black;
var green = '#00c221'; // rgb(0, 194, 33)
exports.green = green;
var orange = '#ff9300'; // rgb(255, 147, 0)
exports.orange = orange;
var red = '#e20000'; // rgb(226, 0, 0)

// Data visualization colors
exports.red = red;
var purple = '#9e54b0'; // rgb(158, 84, 176)
exports.purple = purple;
var blue = '#015ff1'; // rgb(1, 95, 241)
exports.blue = blue;
var fuchsia = '#df216d'; // rgb(223, 33, 109)
exports.fuchsia = fuchsia;
var blueDark = '#10558a'; // rgb(16, 85, 138)
exports.blueDark = blueDark;
var dataVizColors = [purple, blue, orange, fuchsia, green, blueDark];

// Variations used in palette
exports.dataVizColors = dataVizColors;
var primaryLight2 = '#83b4fe'; // rgb(131, 180, 254)
exports.primaryLight2 = primaryLight2;
var primaryDark2 = '#0555fc'; // rgb(5, 85, 252)
exports.primaryDark2 = primaryDark2;
var primaryDivider = '#e1edff'; // rgb(225, 237, 255)
exports.primaryDivider = primaryDivider;
var secondary = '#0076ae'; // rgb(0, 118, 174)
exports.secondary = secondary;
var secondaryLight = '#80bbd7'; // rgb(128, 187, 215)
exports.secondaryLight = secondaryLight;
var secondaryDark = '#00639d'; // rgb(0, 99, 157)
exports.secondaryDark = secondaryDark;
var redVeryLight = '#fef3f3'; // rgb(254,243,243)
exports.redVeryLight = redVeryLight;
var redLight = '#f18080'; // rgb(241, 128, 128)
exports.redLight = redLight;
var redDark = '#c50404'; // rgb(197, 4, 4)

// Updated to Apollo 'Neutral' palette
exports.redDark = redDark;
var themeGrey = {
  50: white,
  100: neutral1,
  200: neutral2,
  300: neutral3,
  400: neutral4,
  500: neutral5,
  600: neutral6,
  700: neutral7,
  800: neutral8,
  900: black,
  A100: '#f4f7fd',
  // rgb(244, 247, 253)
  A200: '#dfe3eb',
  // rgb(223, 227, 235)
  A400: '#c8cbd1',
  // rgb(200, 203, 209)
  A700: '#a6aab2',
  // rgb(166, 170, 178)
  contrastDefaultColor: 'light',
  hover: '#dddddd' // rgb(221, 221, 221)
};
exports.themeGrey = themeGrey;
var gradientStart = '#250056'; // rgb(37, 0, 86)
exports.gradientStart = gradientStart;
var gradientHorizontal = "linear-gradient(to right, ".concat(gradientStart, ", ").concat(secondary, ")");

// New gradient name
exports.gradientHorizontal = gradientHorizontal;
var neptuneGradient = gradientHorizontal;

// Color aliases
exports.neptuneGradient = neptuneGradient;
var utilityNegative = red;
exports.utilityNegative = utilityNegative;
var utilityWarning = orange;
exports.utilityWarning = utilityWarning;
var utilityPositive = green;
exports.utilityPositive = utilityPositive;
var utilityInfo = primary;
exports.utilityInfo = utilityInfo;
var bannerSuccess = '#00A21B';
exports.bannerSuccess = bannerSuccess;
var bannerWarning = '#D67B00';
exports.bannerWarning = bannerWarning;
var bannerError = '#BD0000';
exports.bannerError = bannerError;