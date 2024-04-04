import React, { useState, useEffect, useMemo } from 'react';
import Loader from 'react-loader-spinner';
import { getProposalTypeView } from '../../../redux/selectors';
import Dropdown from '../../common/atoms/inputs/Dropdown';
import { useSelector } from 'react-redux';
import Pagination from '../../common/AllTabPagination';
import TableView from '../../views/TableView';
import GridView from '../../views/GridView';
import OpportunitiesApi from '../../../api/opportunity';
import {
  selectCustomNameMap,
  selectFavourites
} from '../../../redux/selectors/sso-auth';
import {
  formatProposal,
  getDateRangeFormatted,
  getUserMail
} from '../../../redux/actions/proposals-actions';
import { selectDashbordFilters } from '../../../redux/selectors/proposals';

function RenderSelectedView({ viewType, items, allFlags }) {
  if (viewType === 0) return <TableView data={items} />;
  return <GridView data={items} allFlags={allFlags} />;
}

function showCount({ page, maxRows, total }) {
  return `Showing ${page * maxRows - maxRows + 1}-${page *
    maxRows} of ${total}`;
}

function PaginationSummary({
  page,
  maxRows,
  total,
  onMaxRowsChange,
  onPageChange
}) {
  return (
    <div className="cmplx" data-testid="complex-pagination">
      <div className="cmplx__rows">
        <p>Show</p>
        <div className="cmplx__dd__container">
          <Dropdown
            value={maxRows}
            onClick={onMaxRowsChange}
            items={[15, 30, 45]}
          />
        </div>
        <span style={{ paddingLeft: 5 }}>Opportunities per page</span>
      </div>
      <p className="cmplx__items">
        {showCount({
          page,
          maxRows,
          total
        })}
      </p>
      <Pagination
        page={page}
        maxRows={maxRows}
        totalItems={total}
        getCurrentPage={newPage => onPageChange(newPage)}
      />
    </div>
  );
}

function AllTab({ allFlags }) {
  const [rows, setRows] = useState(15);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedViewType = useSelector(getProposalTypeView);
  const favourites = useSelector(selectFavourites).toJS();
  const customNameMap = useSelector(selectCustomNameMap).toJS();
  const dashboardFilters = useSelector(selectDashbordFilters);

  const favouritesMap = useMemo(
    () =>
      favourites.reduce((favMap, fav) => {
        favMap[fav] = true;
        return favMap;
      }, {}),
    [favourites]
  );

  async function fetchOpportunities(reset = false) {
    try {
      setLoading(true);
      const sanitizedFilters = Object.entries(dashboardFilters).reduce(
        (acc, [key, value]) => {
          if (value && value.length !== 0) {
            switch (key) {
              case 'opportunity number':
                acc.opportunityNumber = value;
                break;
              case 'opportunityName':
                acc.opportunityName = value;
                break;
              case 'customer':
                acc.customer = value;
                break;
              case 'protocol number':
                acc.protocolNumber = value;
                break;
              case 'product':
                acc.product = value;
                break;
              case 'verbatim indication':
                acc.verbatimIndication = value;
                break;
              case 'phase':
                acc.phase = value;
                break;
              case 'therapeuticArea':
                acc.therapeuticArea = value;
                break;
              case 'opportunity status':
                acc.opportunityStatus = value;
                break;
              case 'bid due date': {
                const bidDueDate = getDateRangeFormatted(value);
                if (bidDueDate) {
                  acc.bidDueDate = bidDueDate;
                }
                break;
              }
              case 'teamMember': {
                const userMail = getUserMail(value);
                if (userMail) {
                  acc.teamMember = userMail;
                }
                break;
              }
              case 'Customized opportunity name': {
                acc.opportunityCustomname = value;
                break;
              }
              default:
                break;
            }
          }
          return acc;
        },
        {}
      );
      const response = await OpportunitiesApi.getOpportunities(
        reset ? 0 : page * rows - rows,
        rows,
        sanitizedFilters
      );
      if (response.status === 200) {
        setTotalItems(response.data.count);
        setItems(
          response.data.data.map(opportunity =>
            formatProposal(
              opportunity.latestProposal,
              favouritesMap,
              customNameMap
            )
          )
        );
      } else {
        setTotalItems(0);
        setItems([]);
      }
    } catch (error) {
      console.error('Error fetching opportunities', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // fetch all opportunities
    fetchOpportunities();
  }, [rows, page]);

  useEffect(() => {
    const sanitizedFilters = Object.entries(dashboardFilters).reduce(
      (acc, [key, value]) => {
        if (value && value.length !== 0) {
          switch (key) {
            case 'opportunity number':
              acc.opportunityNumber = value;
              break;
            case 'opportunityName':
              acc.opportunityName = value;
              break;
            case 'customer':
              acc.customer = value;
              break;
            case 'protocol number':
              acc.protocolNumber = value;
              break;
            case 'product':
              acc.product = value;
              break;
            case 'verbatim indication':
              acc.verbatimIndication = value;
              break;
            case 'phase':
              acc.phase = value;
              break;
            case 'therapeuticArea':
              acc.therapeuticArea = value;
              break;
            case 'opportunity status':
              acc.opportunityStatus = value;
              break;
            case 'bid due date': {
              const bidDueDate = getDateRangeFormatted(value);
              if (bidDueDate) {
                acc.bidDueDate = bidDueDate;
              }
              break;
            }
            case 'teamMember': {
              const userMail = getUserMail(value);
              if (userMail) {
                acc.teamMember = userMail;
              }
              break;
            }
            case 'Customized opportunity name': {
              acc.opportunityCustomname = value;
              break;
            }
            default:
              break;
          }
        }
        return acc;
      },
      {}
    );

    fetchOpportunities(true);
    setPage(1);
  }, [dashboardFilters]);

  function handleRowsChange(newMaxRows) {
    if (rows !== newMaxRows) setRows(newMaxRows);
  }

  function handlePageChange(newPage) {
    if (page !== newPage) setPage(newPage);
  }

  return (
    <>
      <section id="all-tab" className="tab-content">
        {loading ? (
          <Loader
            type="TailSpin"
            color="#297DFD"
            height={100}
            width={100}
            className="loading"
          />
        ) : (
          <RenderSelectedView
            viewType={selectedViewType}
            items={items}
            allFlags={allFlags}
          />
        )}
      </section>
      {totalItems > 15 && (
        <PaginationSummary
          page={page}
          maxRows={rows}
          total={totalItems}
          onMaxRowsChange={newMaxRows => handleRowsChange(newMaxRows)}
          onPageChange={newPage => handlePageChange(newPage)}
        />
      )}
    </>
  );
}

export default AllTab;
