/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'apollo-react/components/Link';
import Grid from 'apollo-react/components/Grid';
import ApolloCheckbox from 'apollo-react/components/Checkbox';
import {
  resetFiltersAction,
  updateFilters,
  updateNewFilters
} from '../../../redux/actions/unitytab-action';

const Filters = props => {
  const unityTabFilters = useSelector(state => state.unitytab.filters);
  const dispatch = useDispatch();
  const filterGroups = [...new Set(unityTabFilters.map(i => i.group))];

  const updateFilter = (filterName, checked) => {
    dispatch(updateFilters(filterName, checked));
  };
  const clearAllFilters = () => {
    dispatch(resetFiltersAction());
  };
  return (
    <div className="questions-filter__container">
      <div className="questions-filter__grid column_style">
        <div className="filtertitle">Filters</div>

        <div>
          <Link
            className="clear-all"
            data-testid="clear-all-btn"
            size="small"
            onClick={() => clearAllFilters()}
          >
            Clear All
          </Link>
        </div>
        {filterGroups.map((group, index) => (
          <div key={group}>
            <Grid container spacing={2}>
              {unityTabFilters
                .filter(i => i.group === group)
                .map(item => (
                  <Grid item xs={3} key={item.name}>
                    <ApolloCheckbox
                      size="small"
                      label={item.displayName}
                      checked={item.value}
                      onChange={(e, checked) => {
                        updateFilter(item.name, checked);
                      }}
                      data-testid="filter-checkbox"
                    />
                  </Grid>
                ))}
            </Grid>
            {index !== filterGroups.length - 1 ? (
              <hr className="filter-horizontal" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Filters;
