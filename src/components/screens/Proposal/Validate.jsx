// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { compose } from 'redux';
import { onGetValidatedProposalDetails } from '../../../actions/proposal-actions';
import { getValidatedProposalData } from '../../../selectors';
import ValidateTable from '../../common/ValidateTable';

type Props = {
  validatedData: {
    isLoading: boolean,
    data: Object,
    error: string
  },
  match: Match,
  getValidatedData: (proposalId: string) => void
};

class Validate extends Component<Props> {
  componentDidMount() {
    const { match, getValidatedData } = this.props;
    const { id } = match.params;

    getValidatedData(id);
  }

  renderContent = () => {
    const {
      validatedData: { data, error, isLoading }
    } = this.props;

    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>Something goes wrong</h1>;
    return <ValidateTable data={data} />;
  };

  render() {
    return <div className="validate">{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state: Object) => ({
  validatedData: getValidatedProposalData(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, { getValidatedData: onGetValidatedProposalDetails })
)(Validate);
