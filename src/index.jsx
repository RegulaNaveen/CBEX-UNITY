import React from 'react';
import ApolloThemeProvider from 'apollo-react/utils/ApolloThemeProvider';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <ApolloThemeProvider>
    <App />
  </ApolloThemeProvider>
);
