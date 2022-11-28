import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'apollo-react/components/Link';
import Grid from 'apollo-react/components/Grid';
import ApolloCheckbox from 'apollo-react/components/Checkbox';
import { updateFilters } from '../../../redux/actions/approval-actions';

const Filters = props => {
  const approvalFilters = useSelector(state => state.approvals.filters);
  const dispatch = useDispatch();
  const filterGroups = [...new Set(approvalFilters.map(i => i.group))];

  const updateFilter = (filterName, checked) => {
    console.log({ filterName, checked });
    dispatch(updateFilters(filterName, checked));
  };
  const clearAllFilters = () => {
    const filterNames = approvalFilters.map(i => i.name);
    filterNames.forEach(name => {
      dispatch(updateFilters(name, false));
    });
  };

  return (
    <div className="questions-filter__container">
      <div className="questions-filter__grid column_style">
        <div className="filtertitle">Filters</div>
        <div>
          <Link
            className="clear-all"
            size="small"
            onClick={() => clearAllFilters()}
          >
            Clear All
          </Link>
        </div>
        {filterGroups.map(group => (
          <Grid container spacing={2}>
            {approvalFilters
              .filter(i => i.group === group)
              .map(item => (
                <Grid item xs={3}>
                  <ApolloCheckbox
                    size="small"
                    label={item.displayName}
                    checked={item.value}
                    onChange={(e, checked) => updateFilter(item.name, checked)}
                  />
                </Grid>
              ))}
          </Grid>
        ))}
      </div>
    </div>
  );
};
export default Filters;
