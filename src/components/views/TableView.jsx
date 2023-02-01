// @flow
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { isEmpty, keysIn, head } from 'lodash';
import classNames from 'classnames';
import { objectToString } from '../../utils/helpers';
import { parseMomentDate } from '../../utils/DateUtils';
import { OPPORTUNITY } from '../../routes';

type Props = {
  data: Array<Object>,
  hideStatus?: boolean
};

const TableView = ({ data, hideStatus }: Props) => {
  const SKIP_COLUMNS = [
    'proposalId',
    'opportunityName',
    'therapeuticArea',
    'usersList',
    'approvalsCount',
    'isApprovalCountPresent'
  ];
  const DATE_COLUMN = 'bid due date';
  const LINK_COLUMN = 'opportunity number';
  const STATUS_COLUMN = 'opportunity status';
  const columns = keysIn(head(data));
  const columnsLength =
    columns.length - SKIP_COLUMNS.length - (hideStatus ? 1 : 0);

  const renderTableHeaders = (columnsNames: [string]) => (
    <div
      key={uuidv4()}
      className="headers"
      style={{ gridTemplateColumns: `repeat(${columnsLength}, 1fr)` }}
    >
      {columnsNames.map(column => {
        const skip = SKIP_COLUMNS;
        if (hideStatus) skip.push(STATUS_COLUMN);
        return !skip.includes(column) && <h3 key={uuidv4()}>{column}</h3>;
      })}
    </div>
  );

  const renderRow = row => {
    const renderCols = columns.filter(col =>
      hideStatus
        ? col !== STATUS_COLUMN && !SKIP_COLUMNS.includes(col)
        : !SKIP_COLUMNS.includes(col)
    );

    return (
      <div
        key={uuidv4()}
        className="row"
        style={{ gridTemplateColumns: `repeat(${columnsLength}, 1fr)` }}
      >
        {renderCols.map(col => {
          switch (col) {
            case LINK_COLUMN:
              return (
                <div key={uuidv4()} className="cell">
                  <Link to={`${OPPORTUNITY}${row[col]}`}>{row[col]}</Link>
                </div>
              );
            case DATE_COLUMN:
              return (
                <div key={uuidv4()} className="cell">
                  <p
                    className={classNames({
                      'no-data-placeholder':
                        objectToString(row[DATE_COLUMN]) === 'No data'
                    })}
                  >
                    {row[DATE_COLUMN] && parseMomentDate(row[DATE_COLUMN])}
                  </p>
                </div>
              );
            default:
              return (
                <div key={uuidv4()} className="cell">
                  <p
                    className={classNames({
                      'no-data-placeholder':
                        objectToString(row[col]) === 'No data'
                    })}
                  >
                    {objectToString(row[col])}
                  </p>
                </div>
              );
          }
        })}
      </div>
    );
  };

  const renderTableContent = (_data: Array<Object>) => (
    <div key={uuidv4()} className="table-grid">
      {_data.map(rowContent => renderRow(rowContent))}
    </div>
  );

  const renderContent = () => {
    if (isEmpty(data))
      return (
        <div className="no-info">
          <p>No data to show</p>
        </div>
      );

    const tableColumns = renderTableHeaders(columns);
    const tableContent = renderTableContent(data);

    return [tableColumns, tableContent];
  };

  return <div id="table-view">{renderContent()}</div>;
};

TableView.defaultProps = { hideStatus: false };
export default TableView;
