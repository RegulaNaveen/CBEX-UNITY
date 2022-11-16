// @flow
import React, { useState, useRef } from 'react';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import {
  isObject,
  isEqual,
  isEmpty,
  xor,
  has,
  isString,
  isArray
} from 'lodash';

type Props = {
  answerValue: Array,
  finalOptions: Object,
  disabled(): void,
  onOpen(): void,
  onClose(): void,
  onChange(): void,
  isNotApplicable: any
};

const CheckBoxQuestions = (props: Props) => {
  const {
    answerValue,
    disabled,
    onOpen,
    onClose,
    onChange,
    finalOptions,
    isNotApplicable
  } = props;
  const [changeItem, setChangeItem] = useState(answerValue);
  const [getFocus, setFocus] = useState(false);
  const checkBoxRef = useRef();
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
  const onChangeItem = e => {
    setChangeItem(e.target.value);
  };
  const onBlurCheckBox = () => {
    onClose();
    if (!isEqual(changeItem, answerValue)) {
      onChange(changeItem);
    }
    setFocus(false);
  };

  const onFocusCheckBox = () => {
    setFocus(true);
    onOpen();
  };
  return (
    <div
      tabIndex={0}
      onFocus={() => onFocusCheckBox()}
      onBlur={() => onBlurCheckBox()}
      className="selectSpan"
    >
      <Select
        value={!isEmpty(changeItem) ? changeItem : []}
        finalOptions={finalOptions}
        disabled={disabled || isNotApplicable}
        onChange={e => onChangeItem(e)}
        renderValue={selected => {
          if (isEmpty(selected)) return 'Select';
          return selectedNames.join(', ');
        }}
        placeholder={!isEmpty(changeItem) ? '' : 'Select'}
        fullWidth
        multiple
        ref={checkBoxRef}
      >
        {selectItems}
      </Select>
    </div>
  );
};
export default CheckBoxQuestions;
