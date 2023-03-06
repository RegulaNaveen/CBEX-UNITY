// @flow
import React, { useEffect, useState, useRef } from 'react';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import { isEqual, isEmpty, isObject, isString, isArray } from 'lodash';
import { FormControl } from '@material-ui/core';
import { connect } from 'react-redux';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import { getLookUpOptionsSelector } from '../../../../redux/selectors';

type Props = {
  answerValue: Array,
  finalOptions: Object,
  disabled(): void,
  onOpen(): void,
  onClose(): void,
  onChange(): void,
  isNotApplicable: any,
  blurSpan: any,
  focusSpan: any,
  sfField: any,
  sfObject: any,
  toggleWatch: Function,
  onCascadeChange: Function,
  forceBlur: Boolean
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
    isNotApplicable,
    options,
    sfObject,
    sfField,
    toggleWatch,
    onCascadeChange,
    forceBlur
  } = props;
  const [changeItem, setChangeItem] = useState(answerValue || []);
  const [getFocus, setFocus] = useState(false);
  const [getSpan, setSpan] = useState(false);
  const checkBoxRef = useRef();
  let lengthOfOptions;
  if (isArray(finalOptions)) {
    lengthOfOptions = finalOptions.length;
  } else if (isObject(finalOptions)) {
    lengthOfOptions = finalOptions.size;
  }
  const finalLov =
    lengthOfOptions > 0
      ? finalOptions
      : options[`SF#${sfObject}_SF#${sfField}`];
  let selectItems = null;
  const selectedNames = [];
  if (!isEmpty(finalLov)) {
    selectItems = finalLov.map(item => {
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

  const useActiveElement = () => {
    const [listenersReady, setListenersReady] = React.useState(
      false
    ); /** Useful when working with autoFocus */
    const [activeElement, setActiveElement] = React.useState(
      document.activeElement
    );

    useEffect(() => {
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

  useEffect(() => {
    setSpan(focusSpan);
  }, [focusSpan]);

  useEffect(() => {
    setFocus(
      !isEmpty(
        activeElement?.className?.match('Mui-focusVisible') ||
          activeElement?.className?.match('MuiListItem-button') ||
          activeElement?.className?.match('PrivateSwitchBase') ||
          activeElement?.className?.match('Mui-selected')
      )
    );
    setFocus(
      activeElement.localName === 'li' || activeElement.localName === 'input'
    );
    if (
      activeElement?.className?.match('task-wrapper') ||
      activeElement?.className?.match('makeStyles-truncate')
    ) {
      setFocus(false);
    }
  }, [activeElement]);

  const onBlurCheckBox = event => {
    if (
      (!getFocus &&
        !isEqual(changeItem, answerValue) &&
        isObject(answerValue)) ||
      (!getFocus && isString(answerValue) && !isEmpty(changeItem))
    ) {
      onChange(changeItem);
      if (onCascadeChange) onCascadeChange();
      setFocus(false);
    }
    if (!getFocus) {
      setFocus(false);
      onClose();
      if (toggleWatch) toggleWatch(false);
    }
  };
  useUpdateEffect(() => {
    if (changeItem.length !== answerValue.length) setChangeItem(answerValue);
  }, [answerValue.length]);
  const onFocusCheckBox = event => {
    if (getFocus || event.target.localName === 'li') {
      onOpen();
      if (toggleWatch) toggleWatch(true);
    }
  };
  const handleKeyDown = event => {
    if (event.key === 'Tab') {
      onClose();
      if (toggleWatch) toggleWatch(false);
    }
  };

  useEffect(() => {
    if (forceBlur) {
      const popovers = document.getElementsByClassName('MuiPopover-root');
      popovers[0].children[0].click();
      onClose();
    }
  }, [forceBlur]);

  return (
    <div tabIndex={0} className="selectSpan" onFocus={onFocusCheckBox}>
      <FormControl
        className="checkboxtype"
        fullWidth
        onBlur={onBlurCheckBox}
        onKeyDown={handleKeyDown}
      >
        <Select
          key={answerValue.length}
          value={!isEmpty(changeItem) ? changeItem : []}
          disabled={disabled || isNotApplicable}
          onChange={e => onChangeItem(e)}
          renderValue={selected => {
            if (isEmpty(selected)) return 'Select';
            return selectedNames.join(', ');
          }}
          placeholder={!isEmpty(changeItem) ? '' : 'Select'}
          fullWidth
          multiple
          SelectProps={{
            ref: checkBoxRef
          }}
        >
          {selectItems}
        </Select>
      </FormControl>
    </div>
  );
};
const mapStateToProps = state => ({
  options: getLookUpOptionsSelector(state)
});
export default connect(mapStateToProps)(CheckBoxQuestions);
