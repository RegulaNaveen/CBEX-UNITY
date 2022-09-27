import React, { useEffect, useState } from 'react';
import Loader from 'apollo-react/components/Loader';
import map from 'lodash/map';
import IconButton from 'apollo-react/components/IconButton';
import InfoIcon from 'apollo-react-icons/Info';
import Tooltip from 'apollo-react/components/Tooltip';

const INITIAL_LIST_TITLE = {
  therapeutic: 'Therapeutic Area',
  sites: 'Total Sites',
  indication: 'Indication',
  patients: 'Total Patients',
  regions: 'Therapeutic Area'
};

const INITIAL_LIST_VAL = {
  therapeutic: '',
  sites: '',
  indication: '',
  patients: '',
  regions: ''
};

const PriceModeler = () => {
  const [additionalDetails, setAdditionalDetails] = useState(INITIAL_LIST_VAL);
  const [loading, setLoading] = useState(false);

  /**
   * Fetch Price Modeler Data from Api
   */
  const fetchData = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const apiResponse = {
      therapeutic: 'Cardiovascular',
      sites: '12',
      indication: 'Arrhythmia',
      patients: '250',
      regions: 'United States, Canada, Mexico'
    };
    return apiResponse;
  };

  useEffect(() => {
    setLoading(true);
    // Calling function
    fetchData().then(res => {
      console.log(res);
      setLoading(false);
      setAdditionalDetails(res);
    });
  }, []);

  const infoIconWithTooltip = (
    <Tooltip variant="light" tabIndex={-1} title="Hint Text" placement="top">
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
        $3.5M <span className="price-modeler__info">{infoIconWithTooltip}</span>
      </p>
      <div className="price-modeler__details">
        {map(additionalDetails, (item, key) => (
          <div className="price-modeler__details-item" key={key}>
            <h3>{INITIAL_LIST_TITLE[key]}:</h3>
            <i>{item || '-'}</i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceModeler;
