// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Loader from 'react-loader-spinner';
import type { Match } from 'react-router-dom';
import classNames from 'classnames';
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

    if (isLoading)
      return (
        <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
      );
    if (error) return <p>Something went wrong</p>;
    return <ValidateTable data={data} />;
  };

  render() {
    const {
      validatedData: { isLoading, error }
    } = this.props;

    return (
      <div
        className={classNames('validate', {
          'is-centered': isLoading || error
        })}
      >
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  validatedData: getValidatedProposalData(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, { getValidatedData: onGetValidatedProposalDetails })
)(Validate);
