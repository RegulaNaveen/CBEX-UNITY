// @flow
import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { isEmpty, keysIn, head } from 'lodash';
import classNames from 'classnames';
import moment from 'moment';
import { objectToString } from '../../utils/helpers';
import { parseMomentDate, parseCorrectDate } from '../../utils/DateUtils';
import { OPPORTUNITY } from '../../routes';
import { toggleFavourite } from '../../api/sso-auth';
import { updateFavourite } from '../../redux/actions/sso-auth-actions';
import { Loader } from 'apollo-react/components/Loader/Loader';
import Favourite from '../common/atoms/Favourite';
import { useDispatch, useSelector } from 'react-redux';
import featureFlags from '../../constants/featureFlags';
import { SocketContext } from '../../context/SocketContext';
import { saveRecentOppActivity } from '../../api/proposals';
import Typography from 'apollo-react/components/Typography';
import Pencil from '../common/atoms/Pencil';
import {
  onEditCustomName,
  toggleEditCustomNameModal
} from '../../redux/actions/proposal-actions';
import Grid from 'apollo-react/components/Grid';
import Paper from 'apollo-react/components/Paper';
import Tooltip from 'apollo-react/components/Tooltip';
import { getNextMilestone } from '../../utils/utils';
import { getBidType } from './ProposalCard';

type Props = {
  data: Array<Object>,
  hideStatus?: boolean,
  tabIndex: number
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
  const BIDNUM_COLUMN = 'bidNo';
  const NEXT_MILESTONE_COLUMN = 'nextMilestone';

  const columns = [...keysIn(head(data)), NEXT_MILESTONE_COLUMN]; // nextMilestone is optional value
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

  const renderTableHeaders = (columnsNames: [string]) => {
    const orderedColumns = [
      'opportunity number',
      'customer',
      'bidNo',
      'bid due date',
      'nextMilestone',
      'protocol number',
      'verbatim indication',
      'opportunity status',
      'isFavourite'
    ];

    const filteredColumns = orderedColumns.filter(col =>
      columnsNames.includes(col)
    );

    const skip = [...SKIP_COLUMNS];
    if (hideStatus) skip.push(STATUS_COLUMN);

    return (
      <div
        key={uuidv4()}
        className="headers"
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateRows: 'auto',
          gridAutoRows: 'auto',
          padding: '10px',
          gridTemplateColumns: flags['customOpportunityNameFlag']
            ? `minmax(150px, 1fr) repeat(${filteredColumns.length -
                2}, minmax(100px, 1fr)) ${
                flags[featureFlags.FAVOURITE_FLAG] ? '4rem' : ''
              }`
            : `repeat(${filteredColumns.length - 1}, minmax(100px, 1fr)) ${
                flags[featureFlags.FAVOURITE_FLAG] ? '4rem' : ''
              }`
        }}
      >
        {filteredColumns.map(column => {
          if (column === 'bidNo') {
            return <h3 key={uuidv4()}>Current Bid</h3>; // Change the header text to "Current Bid"
          }

          if (column === 'opportunity status') {
            return <h3 key={uuidv4()}>Opportunity Stage</h3>; // Change the header text to "Opportunity Stage"
          }
          if (column === 'opportunity number') {
            return <h3 key={uuidv4()}>Opportunity Name</h3>; // Change the header text to "Opportunity Stage"
          }

          if (column === 'nextMilestone') {
            return <h3 key={uuidv4()}>Next Milestone</h3>;
          }

          if (column === 'isFavourite') {
            return <h3></h3>;
          }

          if (!skip.includes(column)) {
            return <h3 key={uuidv4()}>{column}</h3>;
          }

          return null;
        })}
      </div>
    );
  };

  const renderTableContent = (_data: Array<Object>) => (
    <Grid container spacing={2}>
      {_data.map((rowContent, i) => (
        <Grid item xs={12} key={uuidv4()}>
          <Paper className="table-wrapper">{renderRow(rowContent, i)}</Paper>
        </Grid>
      ))}
    </Grid>
  );

  const renderRow = (row, rowIndex) => {
    const orderedColumns = [
      'opportunity number',

      'customer',
      'bidNo',
      'bid due date',
      'nextMilestone',
      'protocol number',
      'verbatim indication',
      'opportunity status',
      'isFavourite'
    ];
    const filteredColumns = orderedColumns.filter(col => columns.includes(col));
    async function onFavouriteToggle(favourite) {
      try {
        updateFavInProgress(true, rowIndex);
        const favouriteUpdatedDate = moment().format();
        const toggleFavouriteRes = await toggleFavourite(
          row[LINK_COLUMN],
          favourite
        );
        updateFavouriteWrapper(
          row[LINK_COLUMN],
          favourite,
          favouriteUpdatedDate,
          row
        );
        const obj = {
          url: `${window.location.origin}/opportunities/${row[LINK_COLUMN]}`,
          oppNo: row[LINK_COLUMN],
          type: 'opportunity page'
        };
        saveRecentOppActivity(obj);
        if (toggleFavouriteRes && toggleFavouriteRes.data) {
          await dispatch(
            updateFavourite(
              row[LINK_COLUMN],
              favourite,
              favouriteUpdatedDate,
              row
            )
          );
        }
      } catch (e) {
        console.error(`Error in updating favourite for ${row[LINK_COLUMN]}`, e);
      } finally {
        updateFavInProgress(false, rowIndex);
      }
    }

    function handleEditCustomName(oppNo, customName) {
      dispatch(onEditCustomName(oppNo, customName));
      dispatch(toggleEditCustomNameModal(true));
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
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateRows: 'auto',
          gridAutoRows: 'auto',
          padding: '10px',
          height: '3rem',
          gridTemplateColumns: flags['customOpportunityNameFlag']
            ? `minmax(150px, 1fr) repeat(${filteredColumns.length -
                2}, minmax(100px, 1fr)) ${
                flags[featureFlags.FAVOURITE_FLAG] ? '4rem' : ''
              }`
            : `repeat(${filteredColumns.length - 1}, minmax(100px, 1fr)) ${
                flags[featureFlags.FAVOURITE_FLAG] ? '4rem' : ''
              }`,

          alignItems: 'center'
        }}
      >
        {orderedColumns.map(col => {
          if (col === 'isFavourite' && !flags[featureFlags.FAVOURITE_FLAG]) {
            return null;
          }
          switch (col) {
            case 'opportunity number':
              return (
                <div
                  key={uuidv4()}
                  className="cell"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    columnGap: '0.25rem',
                    alignItems: 'center'
                  }}
                >
                  <Link to={`${OPPORTUNITY}${row[col]}`}>{row[col]}</Link>
                  {flags['customOpportunityNameFlag'] ? (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        alignItems: 'center'
                      }}
                    >
                      <Tooltip
                        title={row['customName'] || ''}
                        placement="top"
                        style={{ marginLeft: 48 }}
                      >
                        <Typography
                          variant="caption"
                          className={classNames({
                            greytext: true,
                            'font-weight-very-light': !row['customName']
                          })}
                          style={{ paddingRight: '.5rem' }}
                          noWrap
                          title={row['customName'] || ''}
                        >
                          {row['customName'] || 'New Custom Name'}
                        </Typography>
                      </Tooltip>

                      <Pencil
                        onClick={() =>
                          handleEditCustomName(
                            row['opportunity number'],
                            row['customName']
                          )
                        }
                        size={10}
                      />
                    </div>
                  ) : null}
                </div>
              );

            case 'customer':
              return (
                <div key={uuidv4()} className="cell">
                  <Tooltip title={row[col]} placement="top">
                    <p>{row[col]}</p>
                  </Tooltip>
                </div>
              );
            case 'bidNo':
              const bidNumber = row[BIDNUM_COLUMN];
              const bidContent = `${getBidType(row.bidType)} ${bidNumber}`;
              return (
                <div key={uuidv4()} className="cell">
                  <Tooltip title={bidContent} placement="top">
                    <p>{bidContent}</p>
                  </Tooltip>
                </div>
              );

            case 'bid due date':
              console.log('row[col]', row[col]);
              const bidDueDate = row[col];
              const tooltipData = bidDueDate
                ? parseMomentDate(parseCorrectDate(bidDueDate))
                : 'No data';

              return (
                <div key={uuidv4()} className="cell">
                  <Tooltip title={tooltipData} placement="top">
                    <p
                      className={classNames({
                        'no-data-placeholder': !bidDueDate
                      })}
                    >
                      {bidDueDate
                        ? parseMomentDate(parseCorrectDate(bidDueDate))
                        : 'No data'}
                    </p>
                  </Tooltip>
                </div>
              );

            case 'protocol number':
              const protocolNumber = row[col];
              const tooltipContent = protocolNumber
                ? protocolNumber
                : 'No data';

              return (
                <div key={uuidv4()} className="cell">
                  <Tooltip title={tooltipContent} placement="top">
                    <p
                      className={classNames({
                        'no-data-placeholder': !protocolNumber
                      })}
                    >
                      {protocolNumber || 'No data'}
                    </p>
                  </Tooltip>
                </div>
              );

            case 'verbatim indication':
              return (
                <div key={uuidv4()} className="cell">
                  <Tooltip title={row[col]} placement="top">
                    <p>{row[col]}</p>
                  </Tooltip>
                </div>
              );
            case 'nextMilestone':
              return (
                <div key={uuidv4()} className="cell">
                  {row[NEXT_MILESTONE_COLUMN] &&
                    row[NEXT_MILESTONE_COLUMN].length > 0 && (
                      <Tooltip
                        title={row[NEXT_MILESTONE_COLUMN][0].name} // Accessing the name property
                        placement="top"
                      >
                        <p
                          className={classNames({
                            'no-data-placeholder':
                              objectToString(row[NEXT_MILESTONE_COLUMN]) ===
                              'No data'
                          })}
                        >
                          {getNextMilestone(row[NEXT_MILESTONE_COLUMN])}
                        </p>
                      </Tooltip>
                    )}
                </div>
              );

            case 'opportunity status':
              const statusText = row[col];

              return (
                <Tooltip title={statusText} placement="top">
                  <div key={uuidv4()} className="cell">
                    <p
                      className={classNames({
                        'no-data-placeholder':
                          objectToString(row[STATUS_COLUMN]) === 'No data'
                      })}
                    >
                      {statusText || objectToString(row[STATUS_COLUMN])}
                    </p>
                  </div>
                </Tooltip>
              );
            case 'isFavourite':
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
                    flags[featureFlags.FAVOURITE_FLAG] && (
                      <Favourite
                        value={row[col]}
                        onToggle={update => onFavouriteToggle(update)}
                      />
                    )
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

  return (
    <div id="table-view" className="table-view-container">
      {renderContent()}
    </div>
  );
};

TableView.defaultProps = { hideStatus: false };
export default TableView;
