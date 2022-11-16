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
import Checkbox from 'apollo-react/components/Checkbox/Checkbox';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';

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
  const [changeItem, setChangeItem] = useState(answerValue || []);
  const [getFocus, setFocus] = useState(false);
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
    getFocus ? onOpen : onClose();
    if (!isEqual(changeItem, answerValue) && getFocus === false) {
      onChange(changeItem);
    }
    setFocus(false);
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
    console.log(getFocus, 'gettingfocus');
  }, [activeElement]);

  useUpdateEffect(() => {
    if (changeItem.length !== answerValue.length) setChangeItem(answerValue);
  }, [answerValue.length]);
  const onFocusCheckBox = () => {
    setFocus(
      !isEmpty(
        activeElement?.className?.match('Mui-focusVisible') ||
          activeElement?.className?.match('MuiListItem-button') ||
          activeElement?.className?.match('MuiInput-input')
      )
    );
    getFocus ? onOpen() : onClose();
  };
  return (
    <div
      tabIndex={0}
      onFocus={() => onFocusCheckBox()}
      onBlur={() => onBlurCheckBox()}
      className="selectSpan"
      ref={checkBoxRef}
    >
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
    </div>
  );
};
export default CheckBoxQuestions;
