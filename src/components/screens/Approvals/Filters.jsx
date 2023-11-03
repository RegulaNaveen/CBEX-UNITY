import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'apollo-react/components/Link';
import Grid from 'apollo-react/components/Grid';
import ApolloCheckbox from 'apollo-react/components/Checkbox';
import {
  resetFiltersAction,
  updateFilters
} from '../../../redux/actions/approval-actions';
import RenderFilterLabel from '../../common/RenderFilterLabel';

const Filters = props => {
  const approvalFilters = useSelector(state => state.approvals.filters);
  const dispatch = useDispatch();
  const filterGroups = [...new Set(approvalFilters.map(i => i.group))];

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
              {approvalFilters
                .filter(i => i.group === group && i.group != 'milestone')
                .map(item => (
                  <Grid item xs={3} key={item.name}>
                    <ApolloCheckbox
                      size="small"
                      label={
                        <RenderFilterLabel
                          labelText={item.displayName}
                          showColor={group === 'milestone'}
                          color={item.color}
                        />
                      }
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
