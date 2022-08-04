import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
const filter = createFilterOptions();
import "./testmodal.scss";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { element } from "prop-types";
const useStyles = makeStyles((theme) => ({
  input: {
    height: 40,
    alignItems: "center",
    display: "flex",
  },
}));
const TestModal = ({
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
  const classes = useStyles();
  console.log({
    sectionName,
    sfObject,
    lov: lov.toJS(),
    sfField,
    answer,
    disabled,
  });

  // Our sample dropdown options
  const options = lov?.toJS() || [];
  const [selectedVal, setSelectedVal] = React.useState(answer || []);

  const handleChange = (event, newValue) => {
    console.log({ event, newValue });
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
  }, [answer]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log(event.target.value);
      console.log("enter press here! ");
    }
  };

  // console.log({enterVal});
  // console.log({selectedVal});
  return (
    <div>
      <Autocomplete
        className="testmodal"
        // className={classes.input}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "" && !lov.includes(params.inputValue)) {
            filtered.push(`add "${params.inputValue}"`);
          }

          return filtered;
        }}
        // className={className}
        // placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        style={{ resize: "vertical" }}
        options={options}
        // getOptionLabel={(option) => option.title}
        multiple={true}
        onChange={handleChange}
        value={selectedVal}
        // values={enterVal}
        renderInput={(params) => {
          // console.log({params})
          return (
            <TextField
              // className={classes.input}
              {...params}
              label=""
              onKeyDown={handleKeyPress}
              variant="outlined"
            />
          );
        }}
      />
    </div>
  );
};

export default TestModal;
