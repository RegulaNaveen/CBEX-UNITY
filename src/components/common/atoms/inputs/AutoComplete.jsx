import React, { useRef, useState, useEffect } from 'react';
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
  let callAccept = false;

  function extractEmails(str) {
    let result = String(str).match(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
    );
    return result ? (result.length ? result[0] : '') : '';
  }

  /**
   * Extracts name from the string format: `Firstname Lastname(name@example.com)`
   */
  function extractName(str) {
    const splirt_array = str.split('(');
    return splirt_array // check null
      ? splirt_array.length > 0
        ? splirt_array[0].trim()
        : ''
      : '';
  }

  useEffect(() => {
    if (Boolean(text.length)) {
      let Val = text.split(',').map(v => {
        let email = extractEmails(v) || v;
        let label = extractName(v) || email;
        return { label, email };
      });
      setValue(Val);
    } else setValue([]);
  }, [text]);

  const getData = searchTerm => {
    if (previousController.current) {
      previousController.current.abort();
    }
    var controller = new AbortController();
    var signal = controller.signal;
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
          if (callAccept === false) return;
          const updatedOptions = myJson.data.map(p => {
            return {
              label: `${p.first_name} ${p.last_name}(${p.email.toLowerCase()})`,
              full_name: `${p.first_name} ${p.last_name}`
            };
          });
          setOptions(updatedOptions);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event, newValue, reason) => {
    setValue(newValue);
    const proposaluser = newValue.map(v => {
      return v.email ? v.label + '(' + v.email + ')' : v.label;
    });
    if (proposaluser.length === 0) props.onChange(' ', text, reason);
    else props.onChange(proposaluser.join(','), text, reason);
  };

  const onInputChange = _.debounce((event, value) => {
    if (value) {
      callAccept = true;
      getData(value);
    } else {
      callAccept = false;
      setOptions([]);
    }
  }, 100);

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
        value={value}
        onChange={handleChange}
        onInputChange={onInputChange}
        noOptionsText="No matches found"
        open={options.length > 0}
        onFocus={e => props.onFocus()}
        onBlur={e => props.onBlur()}
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
