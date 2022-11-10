// @flow
import React, { useEffect, useRef } from 'react';
import MenuItem from 'apollo-react/components/MenuItem';
import Checkbox from 'apollo-react/components/Checkbox';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { ListItemText } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { isObject, isEqual, isEmpty, xor, has, isString } from 'lodash';

type Props = {
  answerValue: Array,
  finalOptions: Object,
  disabled(): void,
  onOpen(): void,
  onClose(): void,
  onChange(): void
};

const RadioQuestion = (props: Props) => {
  const {
    answerValue,
    disabled,
    onOpen,
    onClose,
    onChange,
    finalOptions
  } = props;
  const ref = useRef(null);
  if (document.activeElement === ref.current) {
    console.log('element has focus');
  } else {
    console.log('element does NOT have focus');
  }

  let selectItems = null;
  const selectedNames = [];
  let checkBox = false;
  if (!isEmpty(finalOptions)) {
    selectItems = finalOptions.map(item => {
      if (answerValue?.indexOf(item) > -1) {
        selectedNames.push(item);
        checkBox = true;
      }
      return (
        <MenuItem key={item} value={item}>
          <Checkbox
            className="select-checkbox"
            checked={answerValue?.indexOf(item) > -1}
          />
          <ListItemText primary={item} />
        </MenuItem>
      );
    });
  }
  return (
    <ClickAwayListener onClickAway={console.log('I closed')}>
      <Select
        value={!isEmpty(answerValue) ? answerValue : []}
        finalOptions={finalOptions}
        disabled={disabled}
        onOpen={console.log('I opened')}
        onChange={onChange}
        renderValue={selected => {
          if (isEmpty(selected)) return 'Select';
          return selectedNames.join(', ');
        }}
        input={<OutlinedInput />}
        ref={ref}
        placeholder="Select"
        fullWidth
        multiple
      >
        {selectItems}
      </Select>
    </ClickAwayListener>
  );
};
export default RadioQuestion;
