import React from "react";
import { connect } from "react-redux";
import { List } from "immutable";
import isEmpty from "lodash-es/isEmpty";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { getLookUpOptionsSelector } from "../../../redux/selectors";

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
  multiple,
}) => {
  const getSFOptions = (sfObject, sfField) =>
    options[`SF#${sfObject}_SF#${sfField}`]
      ? options[`SF#${sfObject}_SF#${sfField}`]
      : [];

  const getOptions = () => {
    let lovOptions;
    // Check if its immutable List
    if (List.isList(lov)) {
      lovOptions = lov?.toJS();
    } else if (Array.isArray(lov)) {
      lovOptions = lov;
    } else {
      lovOptions = [];
    }
    return isEmpty(lovOptions) ? getSFOptions(sfObject, sfField) : lovOptions;
  };

  const getAnswer = () => {
    if (isEmpty(answer)) {
      return multiple ? [] : "";
    }
    return multiple ? answer : answer?.trim();
  };

  const [selectedVal, setSelectedVal] = React.useState(getAnswer());
  const [currentLov, setCurrentLov] = React.useState(getOptions());

  const addAnswerPicklist = (arr) => {
    return arr.map((item) =>
      item.includes("add ")
        ? item.replace('add "', "").replace(/\"/g, "")
        : item
    );
  };

  const addAnswerSingle = (str) => {
    if (str === null) {
      return " ";
    }
    return str.substring(0, 4) === "add "
      ? str.replace('add "', "").replace(/\"/g, "")
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
    setSelectedVal(getAnswer());
    let currentOptions = [...getOptions()];
    let newOptions = currentOptions.filter(
      (el) => selectedVal.indexOf(el) === -1
    );
    setCurrentLov(newOptions);
  }, [answer]);
  const placeHolder = () => {
    const placeholder = "Click to answer";
    if (multiple) return selectedVal && selectedVal.length ? "" : placeholder;
    else return selectedVal ? "" : placeholder;
  };
  let placeholder = placeHolder();

  return (
    <div className="auto-complete-with-add-option">
      <Autocomplete
        filterOptions={(currentLov, params) => {
          const filtered = filter(currentLov, params);
          if (params.inputValue !== "" && !lov.includes(params.inputValue)) {
            filtered.push(`add "${params.inputValue}"`);
          }
          return filtered;
        }}
        size="small"
        disableClearable={!!isEmpty(selectedVal)}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        style={{ resize: "vertical" }}
        options={currentLov}
        multiple={multiple}
        onChange={handleChange}
        freeSolo
        value={selectedVal}
        renderInput={(params) => {
          return (
            <TextField
              placeholder={placeholder}
              {...params}
              variant="outlined"
            />
          );
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  options: getLookUpOptionsSelector(state),
});

export default connect(mapStateToProps)(AutoCompleteWithAddOption);
