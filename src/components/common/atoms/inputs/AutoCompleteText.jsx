import React, { useState, useEffect, useMemo } from 'react';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import { connect } from 'react-redux';
import { getLookUpOptionsSelector } from '../../../../redux/selectors';
import _ from 'lodash';

const AutocompleteText = props => {
  const {options, sfField, sfObject, multiple} = props;
  const text = (multiple) ? props.text : props.text.trim();

  const [value, setValue] = useState(()=>{
    return (multiple) ? [] : '';
  });
  

  useEffect(() => {
    if (text) {
      let val = (multiple) ? 
        text.map(v =>  ({ label: v })) :
        {label: text}

      console.log(multiple, sfField, sfObject, val, text)
      setValue(val);
    } else setValue( (multiple) ? [] : '' );
  }, []);

  const handleChange = _.debounce((event, newValue) => {
    let answerStringify = ' ';
    setValue(newValue);
    try{ 
        if(multiple)
            answerStringify = newValue.map((val)=>val.label) || []
        else
            answerStringify = newValue.label || ' ';
    }
    catch(error){
        console.log(error)
    }
    console.log(newValue, answerStringify);
    props.onChange(answerStringify);
  }, 50);

  return (
    <div
      className={`${props.disabled ? 'autocomplete-disabled' : 'autocomplete'}`}
    >
      <AutocompleteV2
        fullWidth
        multiple={multiple}
        source={options[`SF#${sfObject}_SF#${sfField}`] || []}
        value={value}
        chipColor="white"
        size="small"
        limitChips={5}
        matchFrom="any"
        onChange={handleChange}
        noOptionsText="No matches found"
        onFocus={e => {
          props.onFocus();
        }}
        onBlur={e => {
          props.onBlur();
        }}
        disabled={props.disabled || false}
      />
    </div>
  );
};
const mapStateToProps = state => ({
    options : getLookUpOptionsSelector(state)
});

export default connect(mapStateToProps)(AutocompleteText);
