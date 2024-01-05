import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ChipView from '../ChipView';

describe('ChipView', () => {
  it('should render correctly', () => {
    const props = {
      label: 'someLabel',
      answer: 'green'
    };

    render(<ChipView {...props} />);
  });
});
