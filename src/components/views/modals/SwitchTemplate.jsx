import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import Grid from 'apollo-react/components/Grid';
import Loader from 'apollo-react/components/Loader';
import ExclamationTriangle from '../../svg/ExclamationTriangle';
import { useDispatch } from 'react-redux';

import { DEFAULT, PROPOSAL } from '../../../constants/app';
import CustomModal from '../../common/CustomModal';
import { changeOpportunityType } from '../../../redux/actions/proposal-actions';

const SwitchTemplate = ({
  selectedBidId,
  opportunityType,
  setOpenModal,
  isBtnDisabledRefresh,
  otList,
  ...props
}) => {
  // States
  const [selectValue, setSelectValue] = useState(opportunityType);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Change btn enable/disable logic
  const isBtnDisabled =
    isEmpty(selectValue) || isEqual(selectValue, opportunityType);

  /**
   * Switch Template Button Handler
   */
  const switchTempBtnClickHandler = () => {
    setLoading(true);
    dispatch(
      changeOpportunityType({
        proposalId: selectedBidId,
        opportunityType: selectValue
      })
    ).then(res => {
      setLoading(false);
      if (res.status) {
        setOpenModal(false);
      } else {
        setError(true);
        setErrorMsg(res.msg);
      }
    });
  };
  console.log('otlist is', otList);
  return (
    <>
      <CustomModal
        variant="warning"
        title={PROPOSAL.SWITCH_TEMP_MODAL_TITLE}
        className="switch-temp-modal"
        onClose={() => setOpenModal(prev => !prev)}
        buttonProps={[
          {
            style: { color: '#0768fd', border: '1px solid #cdcdcd' }
          },
          {
            style: { color: '#0768fd', border: '1px solid #cdcdcd' },
            label: DEFAULT.REFRESH,
            disabled: isBtnDisabledRefresh || !isBtnDisabled,
            onClick: switchTempBtnClickHandler
          },
          {
            label: DEFAULT.CHANGE,
            disabled: isBtnDisabled,
            onClick: switchTempBtnClickHandler
          }
        ]}
        {...props}
      >
        {/* Modal Loading */}
        {loading && <Loader isInner />}

        <Grid container>
          <Grid item xs={12} className="switch-temp-description">
            {PROPOSAL.SWITCH_TEMP_MODAL_DESCRIPTION}
          </Grid>
          <Grid item xs={12} sm={9}>
            <Select
              label={PROPOSAL.OPPORTUNITY_TYPE}
              helperText={
                isBtnDisabledRefresh || !isBtnDisabled ? (
                  DEFAULT.SELECT_OPTION_MSG
                ) : (
                  <>
                    <ExclamationTriangle />
                    <>
                      {DEFAULT.SELECT_OPTION_REFRESH_MSG}{' '}
                      {DEFAULT.SELECT_OPTION_MSG}
                    </>
                  </>
                )
              }
              value={!isEmpty(otList) ? selectValue : ''}
              onChange={e => setSelectValue(e.target.value)}
              placeholder={DEFAULT.SELECT_ITEM}
              fullWidth
            >
              {otList && !isEmpty(otList)
                ? otList.map(item => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
};

SwitchTemplate.defaultProps = {
  selectedBidId: '',
  opportunityType: '',
  setOpenModal: () => {}
};

SwitchTemplate.propTypes = {
  selectedBidId: PropTypes.any,
  opportunityType: PropTypes.string,
  setOpenModal: PropTypes.func
};

export default SwitchTemplate;
