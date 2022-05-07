import React, { useState, useEffect } from 'react';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import { connect } from 'react-redux';

const countries = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
];
  
const AutocompleteText = props => {
  const [value, setValue] = useState([]);
  const {text} = props;

  useEffect(() => {
    if (text.length) {
      let val = text.split(',').map(v =>  ({ label: v }));
      console.log(val, text)
      setValue(val);
    } else setValue([]);
  }, [text]);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    // props.onChange()
  };

  return (
    <div
      className={`${props.disabled ? 'autocomplete-disabled' : 'autocomplete'}`}
    >
      <AutocompleteV2
        fullWidth
        multiple
        source={countries}
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
});

export default connect(mapStateToProps)(AutocompleteText);
