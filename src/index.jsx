import React from 'react';
import ApolloThemeProvider from 'apollo-react/utils/ApolloThemeProvider';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StylesProvider, createGenerateClassName } from '@mui/styles';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
const generateClassName = createGenerateClassName({
  productionPrefix: 'coreJss'
});

root.render(
  <StylesProvider generateClassName={generateClassName}>
    <ApolloThemeProvider>
      <App />
    </ApolloThemeProvider>
  </StylesProvider>
);
