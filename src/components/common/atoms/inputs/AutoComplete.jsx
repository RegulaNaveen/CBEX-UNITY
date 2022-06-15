import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import Loader from 'apollo-react/components/Loader';
import { API } from '../../../../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../../../../SessionHandler';

const { USER_API_URL, API_KEY } = API.PROPOSAL;
const Autocomplete = props => {
  const [options, setOptions] = useState([]);
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
      } )
        .then(response => response.json())
        .then(myJson => {
          console.log(`search term: ${searchTerm}, results: `, myJson);
          console.log(myJson);
          const updatedOptions = myJson.data.map(p => {
            return { label: `${p.first_name} ${p.last_name} (${p.email})` };
          });
          setOptions(updatedOptions);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const onInputChange = (event, value) => {
    if (value) {
      getData(value)
    } else {
      setOptions([]);
    }
  };

  return (
    <div className={`${disabled ? 'autocomplete-disabled' : 'autocomplete'}`}>
      <AutocompleteV2
        fullWidth
        multiple
        options={options || []}
        chipColor="white"
        size="small"
        limitChips={50}
        matchFrom="any"
        onInputChange={onInputChange}
        noOptionsText="No matches found"
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
