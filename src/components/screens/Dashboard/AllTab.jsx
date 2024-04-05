import React, { useState, useEffect, useMemo } from 'react';
import Loader from 'react-loader-spinner';
import { getProposalTypeView } from '../../../redux/selectors';
import Dropdown from '../../common/atoms/inputs/Dropdown';
import { useSelector } from 'react-redux';
import Pagination from '../../common/AllTabPagination';
import TableView from '../../views/TableView';
import GridView from '../../views/GridView';
import {
  selectOpportunitiesItemsPerPage,
  selectOpportunitiesList,
  selectOpportunitiesLoading,
  selectOpportunitiesPage,
  selectOpportunitiesTotal
} from '../../../redux/selectors/opportunities';
import { useDispatch } from 'react-redux';
import {
  updateItemsPerPage,
  updatePage,
  fetchOpportunities
} from '../../../redux/actions/opportunities';

function RenderSelectedView({ viewType, items, allFlags }) {
  if (viewType === 0) return <TableView data={items} />;
  return <GridView data={items} allFlags={allFlags} />;
}

function showCount({ page, maxRows, total }) {
  return `Showing ${page * maxRows - maxRows + 1}-${page *
    maxRows} of ${total}`;
}

function PaginationSummary({ onMaxRowsChange, onPageChange }) {
  const page = useSelector(selectOpportunitiesPage);
  const maxRows = useSelector(selectOpportunitiesItemsPerPage);
  const total = useSelector(selectOpportunitiesTotal);

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
  const rows = useSelector(selectOpportunitiesItemsPerPage);
  const page = useSelector(selectOpportunitiesPage);
  const totalItems = useSelector(selectOpportunitiesTotal);
  const items = useSelector(selectOpportunitiesList);
  const loading = useSelector(selectOpportunitiesLoading);
  const selectedViewType = useSelector(getProposalTypeView);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOpportunities());
  }, []);

  function handleRowsChange(newMaxRows) {
    if (rows !== newMaxRows) dispatch(updateItemsPerPage(newMaxRows));
  }

  function handlePageChange(newPage) {
    if (page !== newPage) dispatch(updatePage(newPage));
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
          onMaxRowsChange={newMaxRows => handleRowsChange(newMaxRows)}
          onPageChange={newPage => handlePageChange(newPage)}
        />
      )}
    </>
  );
}

export default AllTab;
