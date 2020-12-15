// @flow
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { List } from 'immutable';
import { Info } from '../svg';
import ToolTip from './ToolTip';
import ComposedIcon from './ComposedIcon';

type Props = {
  data: List
};

const Legend = () => (
  <div className="legend">
    <p>
      Intake is a system operation that scans RFP documents for Opportunity
      Details
    </p>
    <p>
      <ComposedIcon iconType="match" width={20} height={20} /> Current CRM
      Matches Intake Document Scan
    </p>
    <p>
      <ComposedIcon iconType="no match" width={20} height={20} />
      Current CRM does not match Intake Document Scan. Validate information and
      update as required
    </p>
    <p>
      <ComposedIcon iconType="null" width={20} height={20} /> Data not found by
      Intake Document Scan
    </p>
  </div>
);

const UnityAndIntakeData = ({
  intakeData,
  unityData
}: {
  intakeData: string,
  unityData: string
}) => (
  <div className="crm-intake-data">
    <div className="crm">
      <h5>CRM Data</h5>
      <p>{unityData || 'No Data Found'}</p>
    </div>

    <div className="intake">
      <h5>Intake Document Scan</h5>
      <p>{intakeData || 'No Data Found'}</p>
    </div>
  </div>
);

const ValidateTable = ({ data }: Props) => (
  <div className="validate-table">
    <div className="table">
      <div className="headers">
        <p className="header">Opportunity Details</p>
        <p className="header">Current CRM Data</p>
        <div className="header">
          <p>Intake Document Scan</p>
          <ToolTip
            title="Intake"
            content={<Legend />}
            width="380px"
            child={<Info className="info-icon" />}
            backgroundColor="#fff"
            color="#444444"
          />
        </div>
      </div>
      <div className="rows">
        {data.map(item => {
          const title = item.get('title');
          const intakeData = item.get('intakeData');
          const unityData = item.get('unityData');
          const status = item.get('status');

          return (
            <div className="row" key={uuidv4()}>
              <p>{title}</p>
              <p>{unityData}</p>
              <div>
                <ToolTip
                  title={title}
                  content={
                    <UnityAndIntakeData
                      intakeData={intakeData}
                      unityData={unityData}
                    />
                  }
                  child={<ComposedIcon iconType={status} />}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default ValidateTable;
