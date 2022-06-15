import React, { useRef, useState, useEffect } from 'react';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import { API } from '../../../../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../../../../../src/SessionHandler'

const {
USER_API_URL,
API_KEY
} = API.PROPOSAL;
const Autocomplete = props => {
  const [options, setOptions] = useState([]);
  const previousController = useRef();

  const getData = (searchTerm) => {
    if (previousController.current) {
      previousController.current.abort();
    }
    const controller = new AbortController();
    const signal = controller.signal;
    previousController.current = controller;
    fetch(`${USER_API_URL}/` + searchTerm, {
      signal,
      headers: {
       'x-api-key': API_KEY, 'x-access-token': getAccessToken() 
      }
    })
    
          .then(function (myJson) {
        console.log(
          "search term: " + searchTerm + ", results: ",
          myJson
          
        );
        console.log(myJson)
        const updatedOptions = myJson.map((p) => {
          return { title: p.first_name };
        });
        setOptions(updatedOptions);
      });
  };

  const onInputChange = (event, value, reason) => {
    if (value) {
      getData(value);
    } else {
      setOptions([]);
    }
  };

  return (
    <div
      className={`${props.disabled ? 'autocomplete-disabled' : 'autocomplete'}`}
    >
      <AutocompleteV2
        fullWidth
        multiple
        options={options || []}
        chipColor="white"
        size="small"
        getOptionLabel={(option) => option.title}
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
        disabled={props.disabled || false}
      />
    </div>
  );
};

export default Autocomplete;
