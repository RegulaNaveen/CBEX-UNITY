import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ComposedIcon from '../ComposedIcon';
describe('Composed icon', () => {
  it('render composed icon without crashing', () => {
    const props = {
      iconType: 'match',
      width: 30,
      height: 30
    };
    render(<ComposedIcon {...props} />);
  });
});
