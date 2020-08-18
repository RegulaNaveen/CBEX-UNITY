// @flow
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { isEmpty, keysIn, head, valuesIn } from 'lodash';
import objectToString from '../../utils/helpers';
import { PROPOSAL } from '../../routes';

type Props = {
  data: [Object]
};

const TableView = ({ data }: Props) => {
  const columns = keysIn(head(data));
  const columnsLenght = columns.length;

  const renderTableHeaders = (columnsNames: [string]) => {
    return (
      <div
        key={uuidv4()}
        className="headers"
        style={{ gridTemplateColumns: `repeat(${columnsLenght}, 1fr)` }}
      >
        {columnsNames.map(column => (
          <h3 key={uuidv4()}>{column}</h3>
        ))}
      </div>
    );
  };

  const renderRow = (rowContent: Object) => {
    // TODO: Delete static proposalId const once we start using real data
    const proposalId = 'e2a6c32a-d081-4f82-9d8b-07e4f7cdf8c8';

    return (
      <div
        key={uuidv4()}
        className="row"
        style={{ gridTemplateColumns: `repeat(${columnsLenght}, 1fr)` }}
      >
        {valuesIn(rowContent).map(cellContent => {
          return (
            <div key={uuidv4()} className="cell">
              {cellContent === rowContent.id ? (
                <Link to={`${PROPOSAL}${proposalId}`}>{rowContent.id}</Link>
              ) : (
                <p>{objectToString(cellContent)}</p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderTableContent = (_data: [Object]) => {
    return (
      <div key={uuidv4()} className="table-grid">
        {_data.map(rowContent => {
          return renderRow(rowContent);
        })}
      </div>
    );
  };

  const renderContent = () => {
    if (isEmpty(data)) return 'No Data..';

    const tableColumns = renderTableHeaders(columns);
    const tableContent = renderTableContent(data);

    return [tableColumns, tableContent];
  };

  return <div id="table-view">{renderContent()}</div>;
};

export default TableView;
