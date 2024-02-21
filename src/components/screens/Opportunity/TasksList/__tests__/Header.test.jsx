import React from 'react';
import { render } from '@testing-library/react';
import Header from '../Header';

describe('TasksList Header Unit Tests', () => {
  test('should Task list header component', async () => {
    const { getByText } = render(<Header />);
    expect(getByText('Task List')).toBeTruthy();
  });
});
