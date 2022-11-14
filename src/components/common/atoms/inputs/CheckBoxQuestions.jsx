// @flow
import React, { useEffect, useRef } from 'react';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import { isObject, isEqual, isEmpty, xor, has, isString } from 'lodash';

type Props = {
  answerValue: Array,
  finalOptions: Object,
  disabled(): void,
  onOpen(): void,
  onClose(): void,
  onChange(): void
};

const CheckBoxQuestions = (props: Props) => {
  const {
    answerValue,
    disabled,
    onOpen,
    onClose,
    onChange,
    finalOptions
  } = props;
  let selectItems = null;
  const selectedNames = [];
  if (!isEmpty(finalOptions)) {
    selectItems = finalOptions.map(item => {
      if (answerValue?.indexOf(item) > -1) {
        selectedNames.push(item);
      }
      return (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      );
    });
  }
  return (
    <Select
      value={!isEmpty(answerValue) ? answerValue : []}
      finalOptions={finalOptions}
      disabled={disabled}
      onChange={onChange}
      renderValue={selected => {
        if (isEmpty(selected)) return 'Select';
        return selectedNames.join(', ');
      }}
      placeholder="Select"
      fullWidth
      multiple
    >
      {selectItems}
    </Select>
  );
};
export default CheckBoxQuestions;
