import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import Grid from 'apollo-react/components/Grid';

import { DEFAULT, PROPOSAL } from '../../../constants/app';
import CustomModal from '../../common/CustomModal';

const opportunityList = [
  'Core EMEA NA Ballpark',
  'Core EMEA NA Full RFP',
  'Core APAC Ballpark',
  'Core APAC Full RFP',
  'Core Clinical',
  'Default Type'
];

const SwitchTemplate = ({ opportunityType, ...props }) => {
  // States
  const [selectValue, setSelectValue] = useState(opportunityType);
  const [prevSelectValue, setPrevSelectValue] = useState(opportunityType); // Prev OT

  const isBtnDisabled =
    isEmpty(selectValue) || isEqual(selectValue, prevSelectValue);

  return (
    <CustomModal
      variant="warning"
      title={PROPOSAL.SWITCH_TEMP_MODAL_TITLE}
      className="switch-temp-modal"
      buttonProps={[{}, { label: DEFAULT.CHANGE, disabled: isBtnDisabled }]}
      modalStyle={{ maxWidth: 558 }}
      {...props}
    >
      <Grid container>
        <Grid item xs={12}>
          {PROPOSAL.SWITCH_TEMP_MODAL_DESCRIPTION}
        </Grid>
        <Grid item xs={12} sm={9}>
          <Select
            label={PROPOSAL.OPPORTUNITY_TYPE}
            helperText={DEFAULT.SELECT_OPTION_MSG}
            value={selectValue}
            onChange={e => setSelectValue(e.target.value)}
            placeholder={DEFAULT.SELECT_ITEM}
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
    </CustomModal>
  );
};

SwitchTemplate.defaultProps = {
  opportunityType: ''
};

SwitchTemplate.propTypes = {
  opportunityType: PropTypes.string
};

export default SwitchTemplate;
