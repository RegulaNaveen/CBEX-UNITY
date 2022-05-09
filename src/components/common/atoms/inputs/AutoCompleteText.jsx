import React, { useState, useEffect } from 'react';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import { connect } from 'react-redux';
import { getLookUpOptionsSelector } from '../../../../redux/selectors';

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
      setValue(val);
    } else setValue( (multiple) ? [] : '' );
  }, []);

  const handleChange = (event, newValue, action) => {
    if(action === 'select-option' || action === 'remove-option' || action === 'input'){
      let answerStringify = ' ';
      setValue(newValue);
      try{ 
        if(multiple)
            answerStringify = (newValue) ? newValue.map((val)=>val.label) :  []
        else
            answerStringify = (newValue) ? newValue.label : ' ';
      }
      catch(error){
          console.log(error)
      }
      props.onChange(answerStringify);
    }
  }

  return (
    <div
      className={`${props.disabled ? 'autocomplete-disabled autocomplete-text' : 'autocomplete autocomplete-text'}`}
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
        placeholder="Click to answer"
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
