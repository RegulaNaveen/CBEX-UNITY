import React, { useEffect, useState, useMemo } from 'react';
import Loader from 'apollo-react/components/Loader';
import map from 'lodash/map';
import IconButton from 'apollo-react/components/IconButton';
import InfoIcon from 'apollo-react-icons/Info';
import Tooltip from 'apollo-react/components/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedBid } from '../../redux/selectors/proposal';
import { getPriceModelerData } from '../../redux/actions/proposal-actions';
import CustomModal from './CustomModal';
import { DEFAULT } from '../../constants/app';
import { convertToInternationalCurrency } from '../../utils/helpers';

const INITIAL_LIST_TITLE = {
  therapeutic: 'Therapeutic Area',
  sites: 'Total Sites',
  phase: 'Phase',
  patients: 'Total Patients',
  regions: 'Regions'
};

const INITIAL_LIST_VAL = {
  cost: '',
  therapeutic: '',
  sites: '',
  phase: '',
  patients: '',
  regions: ''
};

const PriceModeler = () => {
  const [additionalDetails, setAdditionalDetails] = useState(INITIAL_LIST_VAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();
  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const memoizeBid = useMemo(() => selectedBid, [selectedBid?.id]);
  const proposalID = memoizeBid?.id;

  /**
   * Trigger Price Modeler Api on Bid change
   */
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await dispatch(getPriceModelerData(proposalID));
      setLoading(false);
      // console.log({ response });
      if (response.status) {
        const {
          Cost: cost,
          TherapyArea__c: therapeutic,
          Number_of_Sites__c: sites,
          Phase_P__c: phase,
          Patients_Enrolled__c: patients,
          Potential_Regions__c: regions
        } = response.data.latestDetails;

        setAdditionalDetails({
          cost,
          therapeutic,
          sites,
          phase,
          patients,
          regions
        });
      } else {
        setError(true);
        setErrorMsg(response.msg);
      }
    })();
  }, [memoizeBid]);

  // Price Modeler Tooltip
  const infoIconWithTooltip = (
    <Tooltip
      variant="light"
      tabIndex={-1}
      title="Excludes investigator grants, vendor costs and other expenses"
      placement="top"
    >
      <IconButton
        color="primary"
        size="small"
        className="question-tooltip-icon"
      >
        <InfoIcon className="info-icon" />
      </IconButton>
    </Tooltip>
  );

  return (
    <div className="price-modeler task-wrapper">
      {/* Modal Loading */}
      {loading && (
        <div className="price-modeler__loader">
          <Loader isInner />
        </div>
      )}

      <h2 className="price-modeler__title">Price Modeler Ballpark Estimate</h2>
      <p className="price-modeler__price">
        {`$${
          additionalDetails.cost
            ? convertToInternationalCurrency(additionalDetails.cost)
            : '0.0M'
        }`}{' '}
        <span className="price-modeler__info">{infoIconWithTooltip}</span>
      </p>
      <div className="price-modeler__details">
        {map(additionalDetails, (item, key) => {
          if (key === 'cost') return null;
          return (
            <div className="price-modeler__details-item" key={key}>
              <h3>{INITIAL_LIST_TITLE[key]}:</h3>
              <i>{item || 'N/A'}</i>
            </div>
          );
        })}
      </div>

      {/* Warning Modal */}
      {error && (
        <CustomModal
          open={error}
          title={DEFAULT.ALERT}
          message={errorMsg}
          variant="error"
          onClose={() => setError(false)}
          buttonProps={[
            { className: 'display-none' },
            { label: DEFAULT.CLOSE }
          ]}
          modalStyle={{ maxWidth: 342 }}
        />
      )}
    </div>
  );
};

export default PriceModeler;
