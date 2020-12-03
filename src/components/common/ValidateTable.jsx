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
            content="Intake is a system operation that scans RFP documents for Opportunity Details"
            child={<Info />}
          />
        </div>
      </div>
      <div className="rows">
        {data.map(item => {
          const title = item.get('title');
          const intakeValue = item.get('intakeValue');
          const unityValue = item.get('unityValue');
          const status = item.get('status');

          return (
            <div className="row" key={uuidv4()}>
              <p>{title}</p>
              <p>{unityValue}</p>
              <div>
                <ToolTip
                  title="Intake"
                  content={`${title}: ${intakeValue}`}
                  child={<ComposedIcon iconType={status} />}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>

    <div className="legend">
      <h2>Legend</h2>
      <p>
        <ComposedIcon iconType="match" width={20} height={20} /> Current CRM
        Matches Intake Document Scan
      </p>
      <p>
        <ComposedIcon iconType="no match" width={20} height={20} />
        Current CRM does not match Intake Document Scan. Validate information
        and update as required
      </p>
      <p>
        <ComposedIcon iconType="null" width={20} height={20} /> Data not found
        by Intake Document Scan
      </p>
    </div>
  </div>
);

export default ValidateTable;
