import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Header from '../Header';
import { EMAIL_TEMPLATES } from '../../../../../constants/app';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with a name', () => {
  act(() => {
    render(<Header />, container);
  });
  expect(container.textContent).toBe(EMAIL_TEMPLATES.EMAIL_TEMPLATES_TITLE);
});
