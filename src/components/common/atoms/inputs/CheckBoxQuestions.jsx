// @flow
import React, { useEffect, useState, useRef } from 'react';
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
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import { FormControl } from '@material-ui/core';

type Props = {
  answerValue: Array,
  finalOptions: Object,
  disabled(): void,
  onOpen(): void,
  onClose(): void,
  onChange(): void,
  isNotApplicable: any,
  blurSpan: any,
  focusSpan: any
};

const CheckBoxQuestions = (props: Props) => {
  const {
    answerValue,
    disabled,
    onOpen,
    onClose,
    onChange,
    blurSpan,
    focusSpan,
    finalOptions,
    isNotApplicable
  } = props;

  const [changeItem, setChangeItem] = useState(answerValue || []);
  const [getFocus, setFocus] = useState(false);
  const [checkBoxFocus, setCheckBoxFocus] = useState(false);
  const checkBoxRef = useRef();
  let selectItems = null;
  const selectedNames = [];
  if (!isEmpty(finalOptions)) {
    selectItems = finalOptions.map(item => {
      if (changeItem?.indexOf(item) > -1) {
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
    if (
      !getFocus &&
      blurSpan &&
      !isEqual(changeItem, answerValue) &&
      !isEmpty(answerValue)
    ) {
      onChange(changeItem);
    }
    onClose();
  };
  const useActiveElement = () => {
    const [listenersReady, setListenersReady] = React.useState(
      false
    ); /** Useful when working with autoFocus */
    const [activeElement, setActiveElement] = React.useState(
      document.activeElement
    );

    React.useEffect(() => {
      const onFocus = event => setActiveElement(event.target);

      window.addEventListener('focus', onFocus, true);

      setListenersReady(true);

      return () => {
        window.removeEventListener('focus', onFocus);
      };
    }, []);

    return {
      activeElement,
      listenersReady
    };
  };

  const { activeElement, listenersReady } = useActiveElement();

  React.useEffect(() => {
    setFocus(
      !isEmpty(
        activeElement?.className?.match('Mui-focusVisible') ||
          activeElement?.className?.match('MuiListItem-button') ||
          activeElement?.className?.match('MuiInput-input') ||
          activeElement?.className?.match('PrivateSwitchBase')
      )
    );
    getFocus && checkBoxFocus ? onOpen() : onClose();
    console.log(getFocus, 'getFocus');
  }, [activeElement]);

  useUpdateEffect(() => {
    if (changeItem.length !== answerValue.length) setChangeItem(answerValue);
  }, [answerValue.length]);
  const onFocusCheckBox = () => {
    onOpen();
  };
  return (
    <div
      tabIndex={0}
      onFocus={onFocusCheckBox}
      onBlur={onBlurCheckBox}
      className="selectSpan"
      ref={checkBoxRef}
    >
      <FormControl className="checkboxtype" fullWidth>
        <Select
          key={answerValue.length}
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
        >
          {selectItems}
        </Select>
      </FormControl>
    </div>
  );
};
export default CheckBoxQuestions;
