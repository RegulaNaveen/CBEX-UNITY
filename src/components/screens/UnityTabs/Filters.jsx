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
  const allTab = useSelector(state => state.unitytab.allTabs);
  const dispatch = useDispatch();
  const filterGroups = [...new Set(unityTabFilters.map(i => i.group))];
  const [filtergroup, setfiltergroup] = useState(filterGroups);
  const [tabfilter, settabfilter] = useState(unityTabFilters);

  useEffect(() => {
    let arr = [];
    for (const [key, value] of Object.entries(allTab)) {
      const ques = value.map(v => v.UnityTabSectionQuestions);
      arr.push(...ques);
    }
    arr = arr.flat(1);
    const allquestion = props?.allQuestion;
    let result = arr
      .map(v => {
        const res = allquestion.filter(
          c => c.questionId === v && c?.milestone && c?.milestoneNew?.length > 0
        );
        if (res?.length) {
          return {
            displayName: res[0]?.milestone
          };
        }
      })
      .filter(v => v && typeof v === 'object' && Object.keys(v)?.length > 0);
    result = [...new Set(result.map(i => i.displayName))];
    if (result && result.length) {
      const resp = [];
      for (let index = 0; index < result.length; index += 1) {
        const element = result[index];
        const obj = {
          displayName: element,
          group: 'milestone',
          name: String(element).toLowerCase(),
          value: false
        };
        resp.push(obj);
      }
      // const finaltabfilter = [...tabfilter, ...resp];
      const finalfiltergroup = [...filtergroup, 'milestone'];
      // settabfilter(finaltabfilter);
      setfiltergroup(finalfiltergroup);
      dispatch(updateNewFilters(resp));
    }
  }, [tabfilter]);

  const updateFilter = (filterName, checked) => {
    dispatch(updateFilters(filterName, checked));
  };
  const clearAllFilters = () => {
    dispatch(resetFiltersAction());
  };
  // console.log('filterGroups :>> ', filtergroup);
  // console.log('unityTabFilters :>> ', tabfilter);

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
        {filtergroup.map((group, index) => (
          <div key={group}>
            <Grid container spacing={2}>
              {tabfilter
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
            {index !== filtergroup.length - 1 ? (
              <hr className="filter-horizontal" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Filters;
