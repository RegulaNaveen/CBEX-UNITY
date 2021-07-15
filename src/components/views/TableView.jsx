// @flow
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { isEmpty, keysIn, head, valuesIn } from 'lodash';
import classNames from 'classnames';
import { objectToString } from '../../utils/helpers';
import { parseMomentDate } from '../../utils/DateUtils';
import { PROPOSAL } from '../../routes';

type Props = {
  data: Array<Object>,
  hideStatus?: boolean,
};

const TableView = ({ data, hideStatus }: Props) => {
  const SKIP_COLUMNS = [
    'proposalId',
    'opportunityName',
    'therapeuticArea',
    'usersList',
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
      {columnsNames.map((column) => {
        const skip = SKIP_COLUMNS;
        if (hideStatus) skip.push(STATUS_COLUMN);
        return !skip.includes(column) && <h3 key={uuidv4()}>{column}</h3>;
      })}
    </div>
  );

  const renderRow = (rowContent: Object) => (
    <div
      key={uuidv4()}
      className="row"
      style={{ gridTemplateColumns: `repeat(${columnsLength}, 1fr)` }}
    >
      {valuesIn(rowContent).map((cellContent) => {
        const skipValues = SKIP_COLUMNS.map((column) => rowContent[column]);
        if (hideStatus) skipValues.push(rowContent[STATUS_COLUMN]);

        return (
          !skipValues.includes(cellContent) && (
            <div key={uuidv4()} className="cell">
              {cellContent === rowContent[LINK_COLUMN] ? (
                <Link to={`${PROPOSAL}${rowContent.proposalId}`}>
                  {cellContent}
                </Link>
              ) : (
                <p
                  className={classNames({
                    'no-data-placeholder':
                      objectToString(cellContent) === 'No data',
                  })}
                >
                  {cellContent === rowContent[DATE_COLUMN]
                    ? cellContent && parseMomentDate(cellContent)
                    : objectToString(cellContent)}
                </p>
              )}
            </div>
          )
        );
      })}
    </div>
  );

  const renderTableContent = (_data: Array<Object>) => (
    <div key={uuidv4()} className="table-grid">
      {_data.map((rowContent) => renderRow(rowContent))}
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
