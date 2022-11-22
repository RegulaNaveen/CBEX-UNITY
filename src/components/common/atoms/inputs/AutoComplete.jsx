import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import { isEmpty } from 'lodash';
import { API } from '../../../../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../../../../SessionHandler';
import { QUESTION_UNLOCK_TIMEOUT } from '../../../../constants/app';

const { USER_API_URL, API_KEY } = API.PROPOSAL;
const Autocomplete = props => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);
  const [callAccept, setCallAccept] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [getNoOptionsText, setNoOptionsText] = useState(1);
  const autocompleteRef = useRef();
  const [unlockTimeout, setUnlockTimeout] = useState(null);
  const text = String(props?.text)
    .trimStart()
    .trimEnd();
  const previousController = useRef();
  const { disabled } = props;
  // let callAccept = false;
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
          // if (callAccept === false) return;
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
    setValue(newValue);
    const proposaluser = newValue.map(v => {
      return v.email ? v.label + '(' + v.email + ')' : v.label;
    });
    if (proposaluser.length === 0) props.onChange(' ', text, reason);
    else props.onChange(proposaluser.join(','), text, reason);
    resetUnlockTimer(true);
  };
  const onInputChange = (event, value) => {
    resetUnlockTimer();
    setInputVal(value);
    const elem = document.querySelectorAll('.a-MuiAutocomplete-popper').item(0);
    if (value) {
      setCallAccept(true);
      // setCount(1);
      getData(value);
      elem.classList.remove('disable');
    } else {
      setCallAccept(false);
      // setCount(1);
      setOptions([]);
      elem.className += ' disable';
    }
  };
  const timeout = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const onInputFocus = async () => {
    resetUnlockTimer();
    props.onFocus();
    // await timeout(500);
    const elem = document.querySelectorAll('.a-MuiAutocomplete-popper').item(0);
    elem.className += ' disable';
    // elem.classList.add('disable');
  };
  return (
    <div className={`${disabled ? 'autocomplete-disabled' : 'autocomplete'}`}>
      <AutocompleteV2
        ref={autocompleteRef}
        fullWidth
        multiple
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
        onBlur={e => {
          props.onBlur();
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
