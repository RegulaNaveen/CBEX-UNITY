/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Autocomplete from 'apollo-react/components/Autocomplete';
import { connect } from 'react-redux';
import { getLookUpOptionsSelector } from '../../../../redux/selectors';

const AutocompleteText = props => {
  const {
    options,
    sfField,
    sfObject,
    multiple,
    lov,
    disabled,
    onFocus,
    onBlur
  } = props;
  let text;
  let listOptions = [];

  if (props.text) text = multiple ? props.text : props.text.trim();
  else text = multiple ? [] : '';

  const currentAnswerString = text ? text.toString() : '';

  let finalLov = [];
  try {
    finalLov = lov
      ? lov
          .valueSeq()
          .toArray()
          .map(v => ({ label: v }))
      : [];
  } catch (error) {
    console.log(error);
  }

  listOptions = finalLov.length
    ? finalLov
    : options[`SF#${sfObject}_SF#${sfField}`];

  const [value, setValue] = useState(() => {
    return multiple ? [] : '';
  });
  useEffect(() => {
    if (text) {
      const val = multiple ? text.map(v => ({ label: v })) : { label: text };
      setValue(val);
    } else setValue(multiple ? [] : '');
  }, [currentAnswerString]);

  const handleChange = (event, nV, action) => {
    if (
      action === 'select-option' ||
      action === 'remove-option' ||
      action === 'input'
    ) {
      const newValue = nV === null ? '' : nV;
      let answerStringify = ' ';
      setValue(newValue);
      try {
        if (multiple)
          answerStringify = newValue ? newValue.map(val => val.label) : [];
        else answerStringify = newValue ? newValue.label : ' ';
      } catch (error) {
        console.log('Error in handle change');
      }
      if (newValue != currentAnswerString) props.onChange(answerStringify);
    }
  };

  const placeHolder = () => {
    const placeholder = 'Click to answer';
    if (multiple) return value && value.length ? '' : placeholder;
    else return value ? '' : placeholder;
  };
  let placeholder = placeHolder();

  return (
    <div
      className={`${
        disabled
          ? 'autocomplete-disabled autocomplete-text'
          : 'autocomplete autocomplete-text'
      }`}
    >
      <Autocomplete
        fullWidth
        multiple={multiple}
        source={listOptions || []}
        value={value}
        chipColor="white"
        size="small"
        limitChips={5}
        matchFrom="any"
        onChange={handleChange}
        placeholder={placeholder}
        noOptionsText="No matches found"
        onFocus={() => {
          onFocus();
        }}
        onBlur={() => {
          onBlur();
        }}
        disabled={disabled || false}
      />
    </div>
  );
};
const mapStateToProps = state => ({
  options: getLookUpOptionsSelector(state)
});

export default connect(mapStateToProps)(AutocompleteText);
