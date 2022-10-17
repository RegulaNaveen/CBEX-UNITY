// @flow
import React from 'react';
import Radio from 'apollo-react/components/Radio';
import RadioGroup from 'apollo-react/components/RadioGroup';

type Props = {
  items: string[],
  onClick(): void,
  value: string | number,
  disabled: boolean,
  onFocus(): void,
  onBlur(): void
};
const RadioQuestion = (props: Props) => {
  const { items, onClick, value, disabled, onFocus, onBlur } = props;
  const handleChange = e => {
    onClick(e.target.value);
  };
  return (
    <RadioGroup
      value={value}
      onChange={handleChange}
      disabled={disabled}
      onFocus={() => onFocus()}
      onBlur={() => onBlur()}
    >
      {items.map(item => (
        <Radio value={item} label={item} />
      ))}
    </RadioGroup>
  );
};
export default RadioQuestion;
