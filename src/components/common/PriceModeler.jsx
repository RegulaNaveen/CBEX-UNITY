import React, { useEffect, useState } from 'react';
import Loader from 'apollo-react/components/Loader';

const INITIAL_DETAILS = {
  therapeutic: '',
  sites: '',
  indication: '',
  patients: '',
  regions: ''
};

const PriceModeler = () => {
  const [additionalDetails, setAdditionalDetails] = useState(INITIAL_DETAILS);
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
    // Calling fetchData func
    fetchData().then(res => {
      console.log(res);
      setLoading(false);
      setAdditionalDetails(res);
    });
  }, []);

  return (
    <div className="price-modeler task-wrapper">
      {/* Modal Loading */}
      {loading && <Loader isInner />}

      <h2 className="price-modeler__title">Price Modeler Ballpark Estimate</h2>
      <p className="price-modeler__price">
        $3.5M <span className="price-modeler__info">Icon</span>
      </p>
      <div className="price-modeler__details">
        <div className="price-modeler__details-item">
          <h3>Therapeutic Area:</h3>
          <i>{additionalDetails.therapeutic}</i>
        </div>
        <div className="price-modeler__details-item">
          <h3>Total Sites:</h3>
          <i>{additionalDetails.sites}</i>
        </div>
        <div className="price-modeler__details-item">
          <h3>Indication:</h3>
          <i>{additionalDetails.indication}</i>
        </div>
        <div className="price-modeler__details-item">
          <h3>Total Patients:</h3>
          <i>{additionalDetails.patients}</i>
        </div>
        <div className="price-modeler__details-item">
          <h3>Therapeutic Area:</h3>
          <i>{additionalDetails.regions}</i>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PriceModeler);
