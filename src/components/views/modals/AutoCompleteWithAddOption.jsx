import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';
const filter = createFilterOptions();
import './testmodal.scss';
import isEmpty from 'lodash-es/isEmpty';

const AutoCompleteWithAddOption = ({
  sectionName,
  sfObject,
  lov,
  sfField,
  answer,
  disabled,
  onChange,
  onFocus,
  onBlur,
  multiple
}) => {
  const options = lov?.toJS() || [];

  const getAnswer = () => {
    if (isEmpty(answer)) {
      return multiple ? [] : '';
    }
    return multiple ? answer : answer?.trim();
  };

  const [selectedVal, setSelectedVal] = React.useState(getAnswer());
  const [currentLov, setCurrentLov] = React.useState(options);

  const addAnswerPicklist = arr => {
    return arr.map(item =>
      item.includes('add ')
        ? item.replace('add "', '').replace(/\"/g, '')
        : item
    );
  };

  const addAnswerSingle = str => {
    if (str === null) {
      return ' ';
    }
    return str.substring(0, 4) === 'add '
      ? str.replace('add "', '').replace(/\"/g, '')
      : str;
  };

  const handleChange = (event, newValue) => {
    const modifiedAnswer = multiple
      ? addAnswerPicklist(newValue)
      : addAnswerSingle(newValue);
    setSelectedVal(modifiedAnswer);
    onChange(modifiedAnswer);
  };

  React.useEffect(() => {
    setSelectedVal(answer);
    let currentOptions = [...options];
    let xyz = currentOptions.filter(el => selectedVal.indexOf(el) === -1);
    setCurrentLov(xyz);
  }, [answer]);

  return (
    <div>
      <Autocomplete
        filterOptions={(currentLov, params) => {
          const filtered = filter(currentLov, params);
          if (params.inputValue !== '' && !lov.includes(params.inputValue)) {
            filtered.push(`add "${params.inputValue}"`);
          }
          return filtered;
        }}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        style={{ resize: 'vertical' }}
        options={currentLov}
        multiple={multiple}
        onChange={handleChange}
        value={selectedVal}
        renderInput={params => {
          return <TextField {...params} variant='outlined' />;
        }}
      />
    </div>
  );
};

export default AutoCompleteWithAddOption;
