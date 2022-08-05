import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash-es/isEmpty';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';
import './testmodal.scss';
import { getLookUpOptionsSelector } from '../../../redux/selectors';

const filter = createFilterOptions();

const AutoCompleteWithAddOption = ({
  options,
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
  const getOptions = () => {
    const lovToJs = lov?.toJS();
    return lovToJs.length ? lovToJs : options[`SF#${sfObject}_SF#${sfField}`];
  };

  const getAnswer = () => {
    if (isEmpty(answer)) {
      return multiple ? [] : '';
    }
    return multiple ? answer : answer?.trim();
  };

  const [selectedVal, setSelectedVal] = React.useState(getAnswer());
  const [currentLov, setCurrentLov] = React.useState(getOptions());

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
    let currentOptions = [...getOptions()];
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

const mapStateToProps = state => ({
  options: getLookUpOptionsSelector(state)
});

export default connect(mapStateToProps)(AutoCompleteWithAddOption);
