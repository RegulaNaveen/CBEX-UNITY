// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { compose } from 'redux';
import type { Match } from 'react-router-dom';
import { onGetProposalBoxId } from '../../../redux/actions/proposal-actions';
import {
  getProposalBoxId,
  getProposalBoxIdError,
  getProposalBoxIdIsLoading,
} from '../../../redux/selectors';

type Props = {
  match: Match,
  getBoxId: (proposalId: string) => void,
  isGettingBoxId: boolean,
  onGettingBoxIdError: Object,
  boxId: string,
};

class Documents extends Component<Props> {
  componentDidMount() {
    const { getBoxId, match } = this.props;
    const { id: proposalId } = match.params;

    getBoxId(proposalId);
  }

  renderContent = () => {
    const { isGettingBoxId, onGettingBoxIdError, boxId } = this.props;

    if (isGettingBoxId)
      return (
        <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
      );

    if (!boxId || onGettingBoxIdError)
      return <p>No documents available for this proposal</p>;

    return (
      <iframe
        src={`https://app.box.com/embed/folder/${boxId}?sortColumn=date&view=list`}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        webkitallowfullscreen="true"
        msallowfullscreen="true"
        title="Box Documents"
      />
    );
  };

  render() {
    return <div className="documents">{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state) => ({
  isGettingBoxId: getProposalBoxIdIsLoading(state),
  onGettingBoxIdError: getProposalBoxIdError(state),
  boxId: getProposalBoxId(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps, { getBoxId: onGetProposalBoxId })
)(Documents);
