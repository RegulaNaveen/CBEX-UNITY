import { createTheme } from '@mui/material/styles';
import ProximaNovaRegular from '../fonts/ProximaNova-Regular.otf';
import ProximaNovaThin from '../fonts/ProximaNova-Thin.otf';

const theme = createTheme({
  typography: {
    fontFamily: `"ProximaNova-Regular"`
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'ProximaNova-Regular';
          src: url(${ProximaNovaRegular}) format('truetype');
        }
        @font-face {
          font-family: 'ProximaNova-Regular';
          src: url(${ProximaNovaThin}) format('truetype');
        }
      `
    }
  }
});

export default theme;
