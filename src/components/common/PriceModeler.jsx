import React, { useState } from 'react';
import Loader from 'apollo-react/components/Loader';
import map from 'lodash/map';
import IconButton from 'apollo-react/components/IconButton';
import InfoIcon from 'apollo-react-icons/Info';
import Tooltip from 'apollo-react/components/Tooltip';
import CircularProgress from 'apollo-react/components/CircularProgress';
import { useSelector } from 'react-redux';
import {
  getPriceModuler,
  selectIsPriceModelerEstimateRecalculating
} from '../../redux/selectors/proposal';
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

export const INITIAL_LIST_VAL = {
  cost: '',
  therapeutic: '',
  sites: '',
  phase: '',
  patients: '',
  regions: ''
};

// TODO
// Fixed in a hurry, Need to add a loader on price modeler data load
const PriceModeler = () => {
  const [loading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg] = useState('');

  const priceModeler = useSelector(getPriceModuler)?.toJS();
  const isPriceModelerRecalculating = useSelector(
    selectIsPriceModelerEstimateRecalculating
  );
  // /**
  //  * Trigger Price Modeler Api on Bid change
  //  */

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
          <span
            className="price-modeler__recalculating"
            data-testid="price-modeler-recalc-loader"
          >
            <Tooltip
              variant="light"
              tabIndex={-1}
              title="Recalculating"
              placement="top"
            >
              <CircularProgress
                variant="indeterminate"
                size={20}
                style={{
                  color: 'rgb(255, 147, 0)',
                  width: '20px',
                  height: '20px'
                }}
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
              <i>{item === '' || item === ' ' ? 'N/A' : item || 'N/A'}</i>
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
