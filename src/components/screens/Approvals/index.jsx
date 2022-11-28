import { isEmpty } from 'lodash';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'apollo-react/components/Loader';

import {
  fetchAllApprovals,
  setQuestionHashAction
} from '../../../redux/actions/approval-actions';
import { getSelectedBid } from '../../../redux/selectors/proposal';
import Section from './Section';
import BidHistory from '../../common/Bidhistory';
import { selectProposalQuestions } from '../../../redux/selectors';
import { generateQuestionsHash } from './utils';
import { DEFAULT } from '../../../constants/app';
import CustomModal from '../../common/CustomModal';
import { SecondaryButton } from '../../common/atoms/Buttons';
import { Filter } from '../../svg';
import Filters from './Filters';

const Approvals = () => {
  const approvals = useSelector(state => state.approvals.allApprovals);
  const filters = useSelector(state => state.approvals.filters);
  const proposalQuestions = useSelector(selectProposalQuestions);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningTitle, setWarningTitle] = useState('');
  const [warningText, setWarningText] = useState('');
  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const memoizeBid = useMemo(() => selectedBid, [selectedBid?.id]);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const proposalId = memoizeBid?.id;
    console.log('Bid Change Triggered - (useEffect)');

    (async () => {
      const response = await dispatch(fetchAllApprovals(proposalId));
      setLoading(false);
      if (!response.status) {
        setWarningTitle(response.title);
        setWarningText(response.message);
        setWarning(true);
      }
    })();
  }, [memoizeBid]);

  useEffect(() => {
    const quesHashData = generateQuestionsHash(proposalQuestions, filters);
    dispatch(setQuestionHashAction(quesHashData));
  }, [proposalQuestions, filters]);

  return (
    <div className="approvals-tab">
      {/* Modal Loading */}
      {loading && <Loader isInner />}

      <BidHistory />

      <div
        style={{ display: 'flex', justifyContent: 'end', paddingBottom: '5px' }}
      >
        <SecondaryButton>
          <Filter className="filter-icon" />
          Filter
        </SecondaryButton>
      </div>
      <Filters />

      {!isEmpty(approvals) ? (
        approvals.map(approval => (
          <Section
            key={approval.ApprovalSectionId}
            sectionId={approval.ApprovalSectionId}
          />
        ))
      ) : (
        <p className="no-approval">No Approval Questions</p>
      )}

      {/* Warning Modal */}
      {warning && (
        <CustomModal
          open={warning}
          title={warningTitle}
          message={warningText}
          variant="error"
          handleClose={() => setWarning(false)}
          buttonProps={[{ className: 'hidden' }, { label: DEFAULT.CLOSE }]}
          modalStyle={{ maxWidth: 342 }}
        />
      )}
    </div>
  );
};

export default Approvals;
