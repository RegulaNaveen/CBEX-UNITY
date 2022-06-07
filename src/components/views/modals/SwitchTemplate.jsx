import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from 'apollo-react/components/Modal';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import Grid from 'apollo-react/components/Grid';

import { DEFAULT, PROPOSAL as CONSTANTS } from '../../../constants/app';

const opportunityList = [
  'Core EMEA NA Ballpark',
  'Core EMEA NA Full RFP',
  'Core APAC Ballpark',
  'Core APAC Full RFP',
  'Core Clinical',
  'Default Type'
];

const SwitchTemplate = ({ opportunityType, className, ...props }) => {
  const styles = { modal: { maxWidth: 558 } };
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // States
  const [selectValue, setSelectValue] = useState(opportunityType);
  const [prevSelectValue, setPrevSelectValue] = useState(opportunityType); // Prev OT

  const isBtnDisabled =
    isEmpty(selectValue) || isEqual(selectValue, prevSelectValue);

  return (
    <Modal
      variant="warning"
      title={CONSTANTS.SWITCH_TEMP_MODAL_TITLE}
      className={`${classes.modal} ${className}`}
      buttonProps={[{}, { label: DEFAULT.CHANGE, disabled: isBtnDisabled }]}
      {...props}
    >
      <Grid container>
        <Grid item xs={12}>
          {CONSTANTS.SWITCH_TEMP_MODAL_DESCRIPTION}
        </Grid>
        <Grid item xs={12} sm={9}>
          <Select
            label={CONSTANTS.OPPORTUNITY_TYPE}
            helperText="You can select one option"
            value={selectValue}
            onChange={e => setSelectValue(e.target.value)}
            placeholder="Select item..."
            fullWidth
          >
            {!isEmpty(opportunityList)
              ? opportunityList.map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))
              : null}
          </Select>
        </Grid>
      </Grid>
    </Modal>
  );
};

SwitchTemplate.defaultProps = {
  opportunityType: '',
  className: 'popup-modal'
};

SwitchTemplate.propTypes = {
  opportunityType: PropTypes.string,
  className: PropTypes.string
};

export default SwitchTemplate;
