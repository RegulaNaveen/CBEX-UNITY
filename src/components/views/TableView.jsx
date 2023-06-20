// @flow
import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { isEmpty, keysIn, head } from 'lodash';
import classNames from 'classnames';
import { objectToString } from '../../utils/helpers';
import { parseMomentDate } from '../../utils/DateUtils';
import { OPPORTUNITY } from '../../routes';
import { toggleFavourite } from '../../api/sso-auth';
import { updateFavourite } from '../../redux/actions/sso-auth-actions';
import { Loader } from 'apollo-react/components/Loader/Loader';
import Favourite from '../common/atoms/Favourite';
import { useDispatch, useSelector } from 'react-redux';
import featureFlags from '../../constants/featureFlags';
import { SocketContext } from '../../context/SocketContext';

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
  const FAV_COLUMN = 'isFavourite';
  const columns = keysIn(head(data));
  const columnsLength =
    columns.length - SKIP_COLUMNS.length - (hideStatus ? 1 : 0);

  const [favInProgress, setFavInProgress] = useState(
    Array({ length: columns.length }).fill(false)
  );
  const flags = useSelector(state => state.proposal.get('eventflag'));

  const dispatch = useDispatch();
  const { updateFavouriteWrapper } = useContext(SocketContext);

  function updateFavInProgress(val, index) {
    const favInProgressCopy = [...favInProgress];
    favInProgressCopy[index] = val;
    setFavInProgress(favInProgressCopy);
  }

  const renderTableHeaders = (columnsNames: [string]) => (
    <div
      key={uuidv4()}
      className="headers"
      style={{ gridTemplateColumns: `repeat(${columnsLength}, 1fr)` }}
    >
      {columnsNames
        .map(col => {
          if (col === FAV_COLUMN && flags[featureFlags.FAVOURITE_FLAG]) {
            return '';
          }
          return col;
        })
        .map(column => {
          const skip = [...SKIP_COLUMNS];
          if (hideStatus) skip.push(STATUS_COLUMN);
          if (!flags[featureFlags.FAVOURITE_FLAG]) skip.push(FAV_COLUMN);
          return !skip.includes(column) && <h3 key={uuidv4()}>{column}</h3>;
        })}
    </div>
  );

  const renderTableContent = (_data: Array<Object>) => (
    <div key={uuidv4()} className="table-grid">
      {_data.map((rowContent, i) => renderRow(rowContent, i))}
    </div>
  );

  const renderRow = (row, rowIndex) => {
    async function onFavouriteToggle(favourite) {
      try {
        updateFavInProgress(true, rowIndex);
        const toggleFavouriteRes = await toggleFavourite(
          row[LINK_COLUMN],
          favourite
        );
        updateFavouriteWrapper(row[LINK_COLUMN], favourite);
        if (toggleFavouriteRes && toggleFavouriteRes.data) {
          if (toggleFavouriteRes.data.favourite) {
            await dispatch(updateFavourite(row[LINK_COLUMN], favourite));
          } else {
            await dispatch(updateFavourite(row[LINK_COLUMN], favourite));
          }
        }
      } catch (e) {
        console.error(`Error in updating favourite for ${row[LINK_COLUMN]}`, e);
      } finally {
        updateFavInProgress(false, rowIndex);
      }
    }

    let renderCols = columns.filter(col =>
      hideStatus
        ? col !== STATUS_COLUMN && !SKIP_COLUMNS.includes(col)
        : !SKIP_COLUMNS.includes(col)
    );
    if (!flags[featureFlags.FAVOURITE_FLAG]) {
      renderCols = renderCols.filter(col => col !== FAV_COLUMN);
    }

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
            case FAV_COLUMN:
              return (
                <div key={uuidv4()} className="cell">
                  {favInProgress[rowIndex] ? (
                    <div
                      style={{
                        display: 'flex',
                        height: '50px',
                        width: '50px',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <span
                        style={{
                          marginRight: '1.75rem',
                          marginTop: '1.75rem',
                          position: 'relative'
                        }}
                      >
                        <Loader
                          isInner
                          size={20}
                          style={{
                            width: '20px',
                            height: '20px'
                          }}
                        />
                      </span>
                    </div>
                  ) : (
                    <Favourite
                      value={row[col]}
                      onToggle={update => onFavouriteToggle(update)}
                    />
                  )}
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
