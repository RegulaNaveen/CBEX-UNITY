import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RadioQuestion from '../RadioQuestion';

describe('RadioQuestion', () => {
  const items = ['Yes', 'No'];
  const onClick = jest.fn();
  const onFocus = jest.fn();
  const onBlur = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the radio options', () => {
    const { getByLabelText } = render(
      <RadioQuestion
        items={items}
        onClick={onClick}
        value=""
        disabled={false}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
    const yesOption = getByLabelText('Yes');
    const noOption = getByLabelText('No');

    expect(yesOption).toBeInTheDocument();
    expect(noOption).toBeInTheDocument();
  });

  it('should call the onClick handler when an option is selected', () => {
    const { getByLabelText } = render(
      <RadioQuestion
        items={items}
        onClick={onClick}
        value=""
        disabled={false}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
    const yesOption = getByLabelText('Yes');
    fireEvent.click(yesOption);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith('Yes');
  });

  it('should be disabled when disabled prop is true', () => {
    const { getByLabelText } = render(
      <RadioQuestion
        items={items}
        onClick={onClick}
        value=""
        disabled
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
    const yesOption = getByLabelText('Yes');
    const noOption = getByLabelText('No');

    expect(yesOption).toBeDisabled();
    expect(noOption).toBeDisabled();
  });

  it('should call the onFocus and onBlur handlers when the radio group is focused and blurred', () => {
    const { getByRole } = render(
      <RadioQuestion
        items={items}
        onClick={onClick}
        value=""
        disabled={false}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
    const radioGroup = getByRole('radiogroup');

    fireEvent.focus(radioGroup);
    expect(onFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(radioGroup);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
