import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import { API } from '../../../../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../../../../SessionHandler';

const { USER_API_URL, API_KEY } = API.PROPOSAL;
const Autocomplete = props => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);
  const text = String(props?.text)
    .trimStart()
    .trimEnd();
  const previousController = useRef();
  const { disabled } = props;

  const getData = searchTerm => {
    if (previousController.current) {
      previousController.current.abort();
    }
    const controller = new AbortController();
    const { signal } = controller;
    previousController.current = controller;
    try {
      fetch(`${USER_API_URL}/${searchTerm}`, {
        signal,
        headers: {
          'x-api-key': API_KEY,
          'x-access-token': getAccessToken()
        }
      })
        .then(response => response.json())
        .then(myJson => {
          const updatedOptions = myJson.data.map(p => {
            return {
              label: `${p.first_name} ${p.last_name} (${p.email})` || '',
              full_name: `${p.first_name} ${p.last_name}` || ''
            };
          });
          setOptions(updatedOptions);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const proposaluser = newValue.map(v => {
      return v.label;
    });
    if (proposaluser.length == 0) props.onChange(' ', text);
    else props.onChange(proposaluser.join(','), text);
  };
  const onInputChange = (event, value) => {
    if (value) {
      getData(value);
    } else {
      setOptions([]);
    }
  };

  return (
    <div className={`${disabled ? 'autocomplete-disabled' : 'autocomplete'}`}>
      <AutocompleteV2
        fullWidth
        multiple
        options={options.length > 0 ? options : []}
        chipColor="white"
        size="small"
        limitChips={50}
        matchFrom="any"
        value={value}
        onChange={handleChange}
        onInputChange={onInputChange}
        noOptionsText="No matches found"
        open={options.length > 0}
        onFocus={e => {
          props.onFocus();
        }}
        onBlur={e => {
          props.onBlur();
        }}
        disabled={disabled || false}
      />
    </div>
  );
};

Autocomplete.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

export default Autocomplete;
