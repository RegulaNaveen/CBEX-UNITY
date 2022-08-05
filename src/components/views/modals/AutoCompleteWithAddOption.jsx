import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
const filter = createFilterOptions();
import "./testmodal.scss";

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
}) => {
  const options = lov?.toJS() || [];
  const [selectedVal, setSelectedVal] = React.useState(answer || []);
  const [currentLov, setCurrentLov] = React.useState(options);

  const handleChange = (event, newValue) => {
    const modifiedAnswer = newValue.map((item) =>
      item.includes("add ")
        ? item.replace('add "', "").replace(/\"/g, "")
        : item
    );

    setSelectedVal(modifiedAnswer);
    onChange(modifiedAnswer);
  };

  React.useEffect(() => {
    setSelectedVal(answer);
    let currentOptions = [...options];
    let xyz = currentOptions.filter((el) => selectedVal.indexOf(el) === -1);
    console.log(xyz);
    setCurrentLov(xyz);
  }, [answer]);

  return (
    <div>
      <Autocomplete
        filterOptions={(currentLov, params) => {
          const filtered = filter(currentLov, params);

          if (params.inputValue !== "" && !lov.includes(params.inputValue)) {
            filtered.push(`add "${params.inputValue}"`);
          }

          return filtered;
        }}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        style={{ resize: "vertical" }}
        options={currentLov}
        multiple={true}
        onChange={handleChange}
        value={selectedVal}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="outlined"
            />
          );
        }}
      />
    </div>
  );
};

export default AutoCompleteWithAddOption;
