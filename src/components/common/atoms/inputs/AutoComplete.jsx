import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import AutocompleteV2 from 'apollo-react/components/Autocomplete';

import { getAccessTokenFromLocalStorage as getAccessToken } from '../../../../SessionHandler';
import { QUESTION_UNLOCK_TIMEOUT } from '../../../../constants/app';
import { API } from '../../../../constants';

const { USER_API_URL, API_KEY } = API.PROPOSAL;
const Autocomplete = props => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [callAccept, setCallAccept] = useState(false);
  const [getNoOptionsText, setNoOptionsText] = useState(1);
  const autocompleteRef = useRef();
  const [unlockTimeout, setUnlockTimeout] = useState(null);
  const text = String(props?.text)
    .trimStart()
    .trimEnd();
  const previousController = useRef();
  const { disabled } = props;
  function filter() {
    value.map(row => {
      let matched = row.email;
      options.map(row2 => {
        let matcharray = row2.mail;
        if (matcharray == matched) {
          const index = options.findIndex(x => x.mail === matched);
          if (index > -1) {
            options.splice(index, 1);
          }
          return options;
        }
      });
    });
  }
  filter();
  function extractEmails(str) {
    let result = String(str).match(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
    );
    return result ? (result.length ? result[0] : '') : '';
  }
  /**
   *
   * @param {*} clear to remove the timer
   * function to set timer for auto unlock and auto save
   */
  const resetUnlockTimer = (clear = false) => {
    clearTimeout(unlockTimeout);
    if (clear) {
      setUnlockTimeout(null);
    } else {
      const timer = setTimeout(() => {
        const inputElem = autocompleteRef.current.getElementsByTagName('input');
        if (inputElem.length > 0) inputElem[0].blur();
      }, QUESTION_UNLOCK_TIMEOUT);
      setUnlockTimeout(timer);
    }
  };

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
  const getData = async searchTerm => {
    if (previousController.current) {
      previousController.current.abort();
    }
    var controller = new AbortController();
    var signal = controller.signal;
    previousController.current = controller;
    let updatedOptions = [];
    try {
      await fetch(`${USER_API_URL}/${searchTerm}`, {
        signal,
        headers: {
          'x-api-key': API_KEY,
          'x-access-token': getAccessToken()
        }
      })
        .then(response => response.json())
        .then(myJson => {
          updatedOptions = myJson.data.map(p => {
            return {
              label: `${p.first_name} ${p.last_name}(${p.email.toLowerCase()})`,
              mail: `${p.email.toLowerCase()}`
            };
          });
          setOptions(updatedOptions);
          updatedOptions.length > 0 ? setNoOptionsText(1) : setNoOptionsText(0);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event, newValue, reason) => {
    const { onChange } = props;
    setValue(newValue);
    const proposaluser = newValue.map(v => {
      return v.email ? v.label + '(' + v.email + ')' : v.label;
    });
    if (proposaluser.length === 0) onChange(' ', text, reason);
    else onChange(proposaluser.join(','), text, reason);
    resetUnlockTimer(true);
  };

  const onInputChange = (event, value) => {
    resetUnlockTimer();
    setInputVal(value);
    const elem = document.querySelectorAll('.a-MuiAutocomplete-popper').item(0);
    if (value) {
      setCallAccept(true);

      getData(value);
      // elem.classList.remove('disable');
    } else {
      setCallAccept(false);

      setOptions([]);
      // elem.className += ' disable';
    }
  };

  const onInputFocus = async () => {
    const elem = document.querySelectorAll('.a-MuiAutocomplete-popper').item(0);
    const { onFocus } = props;
    resetUnlockTimer();
    onFocus();
    if (elem) elem.className += ' disable';
  };
  return (
    <div
      className={`custom-autocomplete ${
        disabled ? 'autocomplete-disabled' : 'autocomplete'
      }`}
    >
      <AutocompleteV2
        ref={autocompleteRef}
        fullWidth
        multiple
        size="small"
        options={options || []}
        chipColor="white"
        limitChips={5}
        disableCloseOnSelect={false}
        value={value}
        onChange={handleChange}
        inputValue={inputVal}
        onInputChange={onInputChange}
        noOptionsText={
          getNoOptionsText === 0 ? 'No Matches Found' : 'Loading...'
        }
        onFocus={onInputFocus}
        onBlur={() => {
          const { onBlur } = props;
          onBlur();
          resetUnlockTimer(true);
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
