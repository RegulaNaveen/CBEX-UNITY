import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';
import { getLookUpOptionsSelector } from '../../../redux/selectors';

const filter = createFilterOptions();

const AutoCompleteWithAddOption = ({
  options,
  sfObject,
  lov,
  sfField,
  answer,
  disabled,
  onChange,
  onFocus,
  onBlur,
  multiple,
  loading
}) => {
  const getSFOptions = (sfObj, sfFld) =>
    options[`SF#${sfObj}_SF#${sfFld}`]
      ? options[`SF#${sfObj}_SF#${sfFld}`]
      : [];

  const getOptions = () => {
    let lovOptions;
    // Check if its immutable List
    if (List.isList(lov)) {
      lovOptions = lov?.toJS();
    } else if (Array.isArray(lov)) {
      lovOptions = lov;
    } else {
      lovOptions = [];
    }
    return isEmpty(lovOptions) ? getSFOptions(sfObject, sfField) : lovOptions;
  };

  const getAnswer = () => {
    if (isEmpty(answer)) {
      return multiple ? [] : '';
    }
    return multiple ? answer : answer?.trim();
  };

  const [selectedVal, setSelectedVal] = useState(getAnswer());
  const [currentLov, setCurrentLov] = useState(getOptions());
  const [clearable, setClearable] = useState(true);

  const addAnswerPicklist = arr => {
    return arr.map(item =>
      item.includes('add ')
        ? item.replace('add "', '').replace(/\"/g, '')
        : item
    );
  };

  const addAnswerSingle = str => {
    if (str === null) {
      return ' ';
    }
    return str.substring(0, 4) === 'add '
      ? str.replace('add "', '').replace(/\"/g, '')
      : str;
  };

  /**
   * Trigger func on select option
   */
  const handleChange = (event, newValue) => {
    const modifiedAnswer = multiple
      ? addAnswerPicklist(newValue)
      : addAnswerSingle(newValue);

    const newTrimVal = Array.isArray(modifiedAnswer)
      ? modifiedAnswer
      : modifiedAnswer.trim();
    console.log({
      selectedVal,
      newTrimVal,
      isValid: !isEqual(selectedVal, newTrimVal)
    });
    if (isEqual(selectedVal, newTrimVal)) return;

    setSelectedVal(modifiedAnswer);
    onChange(modifiedAnswer);
  };

  /**
   * setCurrentLov onUpdate answer state
   */
  useEffect(() => {
    setSelectedVal(getAnswer());
    if (isEmpty(selectedVal)) {
      setClearable(true);
    }
    const currentOptions = [...getOptions()];
    const newOptions = currentOptions.filter(
      el => selectedVal.indexOf(el) === -1
    );
    setCurrentLov(newOptions);
  }, [answer]);

  /**
   * setClearable onUpdate loading state
   */
  useEffect(() => {
    setClearable(true);
    if (selectedVal && !loading) setClearable(false);
  }, [loading]);

  /**
   * Set Autocomplete Placeholder
   */
  const defaultPlaceholder = 'Click to answer';
  let placeholder = null;
  if (multiple) {
    const placeholderTxt =
      selectedVal && selectedVal.length ? '' : defaultPlaceholder;
    placeholder = disabled ? '' : placeholderTxt;
  } else {
    const placeholderTxt = selectedVal ? '' : defaultPlaceholder;
    placeholder = disabled ? '' : placeholderTxt;
  }

  /**
   * onChange Autocomplete Input Text
   */
  const onTextChange = event => {
    if (event.currentTarget.value) {
      setClearable(false);
      return;
    }
    setClearable(true);
  };

  return (
    <div className="auto-complete-with-add-option">
      <Autocomplete
        filterOptions={(currentList, params) => {
          const filtered = filter(currentList, params);
          const inputVal = params.inputValue.trim();
          if (
            inputVal !== '' &&
            !lov.includes(inputVal) &&
            !selectedVal.includes(inputVal)
          ) {
            filtered.push(`add "${inputVal}"`);
          }
          return filtered;
        }}
        size="small"
        disableClearable={clearable}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        style={{ resize: 'vertical' }}
        options={currentLov}
        multiple={multiple}
        onChange={handleChange}
        freeSolo
        value={selectedVal}
        renderInput={params => {
          return (
            <TextField
              onChange={onTextChange}
              placeholder={placeholder}
              {...params}
              variant="outlined"
            />
          );
        }}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  options: getLookUpOptionsSelector(state)
});

export default connect(mapStateToProps)(AutoCompleteWithAddOption);
