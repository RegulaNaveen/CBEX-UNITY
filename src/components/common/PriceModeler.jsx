import React, { useEffect, useState, useMemo } from 'react';
import Loader from 'apollo-react/components/Loader';
import map from 'lodash/map';
import IconButton from 'apollo-react/components/IconButton';
import InfoIcon from 'apollo-react-icons/Info';
import Tooltip from 'apollo-react/components/Tooltip';
import CircularProgress from 'apollo-react/components/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSelectedBid,
  getPriceModuler,
  selectIsPriceModelerEstimateRecalculating,
} from '../../redux/selectors/proposal';
import { getPriceModelerData } from '../../redux/actions/proposal-actions';
import CustomModal from './CustomModal';
import { DEFAULT } from '../../constants/app';
import { convertToInternationalCurrency } from '../../utils/helpers';

const INITIAL_LIST_TITLE = {
  therapeutic: 'Therapeutic Area',
  sites: 'Total Sites',
  phase: 'Phase',
  patients: 'Total Patients',
  regions: 'Regions',
};

export const INITIAL_LIST_VAL = {
  cost: '',
  therapeutic: '',
  sites: '',
  phase: '',
  patients: '',
  regions: '',
};

// TODO
// Fixed in a hurry, Need to add a loader on price modeler data load
const PriceModeler = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();
  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const priceModeler = useSelector(getPriceModuler)?.toJS();
  const isPriceModelerRecalculating = useSelector(
    selectIsPriceModelerEstimateRecalculating
  );
  const memoizeBid = useMemo(() => selectedBid, [selectedBid?.id]);
  const proposalID = memoizeBid?.id;

  /**
   * Trigger Price Modeler Api on Bid change
   */
  useEffect(() => {
    dispatch(getPriceModelerData(proposalID));
  }, [memoizeBid]);

  // Price Modeler Tooltip
  const infoIconWithTooltip = (
    <Tooltip
      variant="light"
      tabIndex={-1}
      title="The fields listed below are required for an estimate to be displayed. Excludes investigator grants, vendor costs, and other expenses"
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

      <h2 className="price-modeler__title">Price Modeler Estimate</h2>
      <p className="price-modeler__price">
        {`$${
          priceModeler.cost && priceModeler.cost !== '0'
            ? convertToInternationalCurrency(priceModeler.cost)
            : '--'
        }`}{' '}
        <span className="price-modeler__info">{infoIconWithTooltip}</span>
        {isPriceModelerRecalculating ? (
          <span className="price-modeler__recalculating">
            <Tooltip
              variant="light"
              tabIndex={-1}
              title="Recalculating"
              placement="top"
              data-testid="price-modeler-recalc-tooltip"
            >
              <CircularProgress
                variant="indeterminate"
                size={20}
                style={{
                  color: 'rgb(255, 147, 0)',
                  width: '20px',
                  height: '20px',
                }}
                data-testid="price-modeler-recalc-loader"
              />
            </Tooltip>
          </span>
        ) : null}
      </p>
      <div className="price-modeler__details">
        {map(priceModeler, (item, key) => {
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
            { label: DEFAULT.CLOSE },
          ]}
          modalStyle={{ maxWidth: 342 }}
        />
      )}
    </div>
  );
};

export default PriceModeler;
