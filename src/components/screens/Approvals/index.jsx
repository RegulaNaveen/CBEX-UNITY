import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, connect } from 'react-redux';
import Button from 'apollo-react/components/Button';
import Filter from 'apollo-react-icons/Filter';
import { withRouter } from 'react-router-dom';
import Link from 'apollo-react/components/Link';
import { compose } from 'redux';
import ApolloCheckbox from 'apollo-react/components/Checkbox';
import ClipboardCheck from 'apollo-react-icons/ClipboardCheck';
import Card from 'apollo-react/components/Card';
import classNames from 'classnames';
import Grid from 'apollo-react/components/Grid';
import {
  getOpportunityData,
  getSelectedBid,
} from '../../../redux/selectors/proposal';
import BidHistory from '../../common/Bidhistory';
import Section from './Section';
import { getQuestionsFilters } from '../../../redux/selectors';
import {
  clearQuestionsFilterAction,
  onApplyQuestionsFilter,
} from '../../../redux/actions/proposal-actions';
import MatomoHOC from '../../HOC/MatomoHOC';

const Approvals = (props) => {
  const [approvals, setApprovals] = useState([]);
  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const memoizeBid = useMemo(() => selectedBid, [selectedBid?.id]);
  const allOppData = useSelector(getOpportunityData)?.toJS();
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const proposalId = memoizeBid?.id;
    const opportunityData = allOppData[proposalId];
    const newApprovals = opportunityData?.proposal?.approvals;
    setApprovals(newApprovals);
  }, [memoizeBid]);

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const handleFilterChange = (filterName, checked, groupName = '') => {
    const { applyQuestionsFilter } = props;
    applyQuestionsFilter(filterName, checked, groupName);
  };

  const renderFilter = () => {
    const { questionsFilters, clearQuestionsFilter } = props;
    if (showFilter) {
      return (
        <div className="questions-filter__container">
          <div className="questions-filter__grid column_style">
            <div className="filtertitle">Filters</div>
            <div>
              <Link
                className="clear-all"
                size="small"
                onClick={() => clearQuestionsFilter()}
              >
                Clear All
              </Link>
            </div>
            {questionsFilters.entrySeq().map(([groupName, group]) => (
              <Grid container spacing={2} key={groupName} className={groupName}>
                {group
                  .entrySeq()
                  .filter((value) => value[0] !== 'logic')
                  .map(([key, filter]) => (
                    <Grid
                      item
                      xs={3}
                      key={key}
                      className={classNames(
                        'questions-filter__item',
                        filter.get('className'),
                        { 'questions-filter__auto': !filter.get('className') }
                      )}
                    >
                      <ApolloCheckbox
                        size="small"
                        label={filter.get('label')}
                        checked={filter.get('checked')}
                        onChange={(e, checked) =>
                          handleFilterChange(key, checked, groupName)
                        }
                      />
                    </Grid>
                  ))}
              </Grid>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div>
        <div>
          <BidHistory />
        </div>
        <div className="approval-filter">
          <Button
            variant="secondary"
            size="small"
            icon={<Filter fontSize="extraSmall" />}
            onClick={handleFilterClick}
          >
            Filter
          </Button>
        </div>
        {renderFilter()}
        {approvals?.length > 0 ? (
          approvals?.map((approval) => {
            return (
              <Section
                key={approval.ApprovalSectionTitle}
                approval={approval}
              />
            );
          })
        ) : (
          <>
            <div className="no-approval-wrapper">
              <Card
                style={{
                  maxWidth: 600,
                  height: 150,
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: '#7f7f7f',
                  padding: '20px',
                }}
              >
                <ClipboardCheck
                  style={{ fontSize: '48px', marginBottom: '10px' }}
                />
                No Approval associated with your selected bid
              </Card>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  questionsFilters: getQuestionsFilters(state),
});
export default compose(
  withRouter,
  connect(mapStateToProps, {
    applyQuestionsFilter: onApplyQuestionsFilter,
    clearQuestionsFilter: clearQuestionsFilterAction,
  })
)(MatomoHOC(Approvals));
