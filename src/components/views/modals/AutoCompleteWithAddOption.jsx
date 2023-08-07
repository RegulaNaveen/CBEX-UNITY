import React, { useEffect, useState, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/lab/Autocomplete';
import { createFilterOptions } from '@mui/base/';

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
  loading,
  toggleWatch,
  onCascadeChange,
  forceBlur,
  multilineFlag
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
    if (multiple) {
      return answer.filter(ans => !isEmpty(ans) && ans !== ' ');
    }
    return answer?.trim();
  };

  const [selectedVal, setSelectedVal] = useState(getAnswer());
  const [modAnswer, setModAnswer] = useState(getAnswer());
  const [currentLov, setCurrentLov] = useState(getOptions());
  const [clearable, setClearable] = useState(true);
  const [openState, setOpenState] = useState(false);
  const [answerCommaSeparated, setAnswerCommaSeparated] = useState('');

  const autoCompleteRef = useRef(null);

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
    if (event.type === 'click') autoCompleteRef.current.focus();
    const modifiedAnswer = multiple
      ? addAnswerPicklist(newValue)
      : addAnswerSingle(newValue);

    const newTrimVal = Array.isArray(modifiedAnswer)
      ? modifiedAnswer
      : modifiedAnswer.trim();
    if (isEqual(selectedVal, newTrimVal)) return;

    setSelectedVal(modifiedAnswer);
    setModAnswer(modifiedAnswer);
    if (!multiple) {
      setOpenState(false);
      if (toggleWatch) toggleWatch(false);
      if (autoCompleteRef.current) {
        autoCompleteRef.current.blur();
      }
      setOpenState(false);
      onChange(modifiedAnswer);
    } else {
      if (onCascadeChange) onCascadeChange();
    }
  };

  /**
   * setCurrentLov onUpdate answer state
   */
  useEffect(() => {
    let newSelectedValue = getAnswer();
    if (multiple) {
      setAnswerCommaSeparated(newSelectedValue.join(';;'));
    } else {
      setSelectedVal(newSelectedValue);
      setModAnswer(newSelectedValue);
      if (isEmpty(newSelectedValue)) {
        setClearable(true);
      }
    }
    const currentOptions = [...getOptions()];
    const newOptions = currentOptions.filter(
      el => newSelectedValue.indexOf(el) === -1
    );
    setCurrentLov(newOptions);
  }, [answer]);

  useEffect(() => {
    if (multiple) {
      const answers = answerCommaSeparated
        .split(';;')
        .filter(answer => answer.length > 0);
      if (answers.length > 0) {
        setSelectedVal(answers);
        setModAnswer(answers);
      } else {
        setSelectedVal([]);
        setModAnswer([]);
      }
    }
  }, [answerCommaSeparated]);

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
    if (onCascadeChange) onCascadeChange();
    if (event.currentTarget.value) {
      setClearable(false);
      return;
    }
    setClearable(true);
  };

  const handleFocus = useCallback(() => {
    setOpenState(true);
    if (toggleWatch) toggleWatch(true);
    onFocus();
  }, []);

  const handleBlur = useCallback(() => {
    if (toggleWatch) toggleWatch(false);
    onBlur();
  }, []);

  useEffect(() => {
    if (forceBlur === true) {
      if (autoCompleteRef.current) {
        autoCompleteRef.current.blur();
        // setTimeout(() => {
        //   autoCompleteRef.current.value = '';
        // }, 100);
      }
    }
  }, [forceBlur]);

  return (
    <div className="auto-complete-with-add-option">
      <Autocomplete
        open={openState}
        data-testid="autocomplete-test"
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
        onBlur={() => {
          if (answer) {
            if (
              multiple &&
              // eslint-disable-next-line react/prop-types
              (answer?.length !== modAnswer.length ||
                !isEqual(answer, modAnswer))
            )
              onChange(modAnswer, autoCompleteRef);
          } else if (
            multiple &&
            modAnswer?.length &&
            // eslint-disable-next-line react/prop-types
            answer?.length !== modAnswer.length
          )
            onChange(modAnswer, autoCompleteRef);
          handleBlur();
          setOpenState(false);
        }}
        onFocus={handleFocus}
        disabled={disabled}
        style={{ resize: 'vertical' }}
        options={currentLov}
        multiple={multiple}
        onChange={handleChange}
        freeSolo
        disableCloseOnSelect={multiple}
        value={selectedVal}
        renderTags={(value, getTagProps) => (
          <div className="autocomplete-multiline-chip">
            {value.map((option, index) => (
              <div className="autocomplete-chip">
                <Chip
                  label={
                    <Typography style={{ whiteSpace: 'normal' }}>
                      {option}
                    </Typography>
                  }
                  {...getTagProps({ index })}
                  style={{ height: '100%' }}
                />
              </div>
            ))}
          </div>
        )}
        renderInput={params => {
          return (
            <TextField
              multiline={multilineFlag}
              onChange={onTextChange}
              placeholder={placeholder}
              {...params}
              variant="outlined"
              inputRef={autoCompleteRef}
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
