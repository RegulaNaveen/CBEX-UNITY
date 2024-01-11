import { isEmpty } from 'lodash';
import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'apollo-react/components/Loader';

import ClipboardCheck from 'apollo-react-icons/ClipboardCheck';
import Card from 'apollo-react/components/Card';
import {
  fetchAllApprovals,
  fetchApprovalSendEmailFlag,
  resetFiltersAction,
  updateNewFilters
} from '../../../redux/actions/approval-actions';
import {
  getSelectedBid,
  getProposalQuestions,
  selectAreAllSectionsExpanded
} from '../../../redux/selectors/proposal';
import { expandAllSectionsAction } from '../../../redux/actions/proposal-actions';
import Section from './Section';
import BidHistory from '../../common/Bidhistory';
import { DEFAULT } from '../../../constants/app';
import CustomModal from '../../common/CustomModal';
import Filters from './Filters';
import FilterButton from './FilterButton';
import ViewAboveVerticalTabs from '../../views/ViewAboveVerticalTabs';
import { SocketContext } from '../../../context/SocketContext';
import { Add, Refresh } from '../../svg';
import AddQuestionModalComponent from '../../views/modals/AddQuestionModal';
import ApolloCheckbox from 'apollo-react/components/Checkbox';

const Approvals = () => {
  const approvals = useSelector(state => state.approvals.allApprovals);
  const allFlags = useSelector(state => state.proposal.get('eventflag'));
  const approvalSectionTitles = approvals.map(
    item => item.ApprovalSectionTitle
  );
  const panels = approvalSectionTitles;
  const questions = useSelector(getProposalQuestions);
  const [isShowFilters, setIsShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [direction, setDirection] = useState();
  const [warningTitle, setWarningTitle] = useState('');
  const [warningText, setWarningText] = useState('');
  const [expandAll, setExpandAll] = useState(() =>
    Array.from({ length: panels.length }, () => false)
  );

  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const allSectionsExpanded = useSelector(selectAreAllSectionsExpanded);
  const memoizeBid = useMemo(() => selectedBid, [selectedBid?.id]);
  const dispatch = useDispatch();
  const socketContext = useContext(SocketContext);
  const allOpen = expandAll.every(exp => exp);

  const handleExpandAllChange = () => {
    setExpandAll(oldPanels => oldPanels.map(() => !allOpen));
  };

  const handleChange = panelIndex => () => {
    setExpandAll(oldPanels => {
      const newPanels = [...oldPanels];
      newPanels[panelIndex] = !newPanels[panelIndex];
      return newPanels;
    });
  };

  // get email flag status on mount
  useEffect(() => {
    if (allFlags && allFlags.approvalSendMailFlag) {
      dispatch(fetchApprovalSendEmailFlag(allFlags.approvalSendMailFlag));
    }
    setTimeout(() => {
      socketContext.questionLockDetailsWrapper();
    }, 2000);
  }, []);

  useEffect(() => {
    const proposalId = memoizeBid?.id;
    if (!proposalId) return () => {};
    setLoading(true);

    const approvalQuestions = [];
    const questionsMap = questions.reduce((acc, question) => {
      acc[question.questionId] = question;
      return acc;
    }, {});
    let milestones = [];
    const milestoneNames = [];

    (async () => {
      const response = await dispatch(fetchAllApprovals(proposalId, questions));
      if (response.status) {
        response.data.forEach(approval => {
          approval.ApprovalSectionLeftQuestions.forEach(questionId => {
            if (questionsMap[questionId]) {
              approvalQuestions.push(questionsMap[questionId]);
            }
          });
          approval.ApprovalSectionRightQuestions.forEach(questionId => {
            if (questionsMap[questionId]) {
              approvalQuestions.push(questionsMap[questionId]);
            }
          });
        });
      }

      approvalQuestions.forEach(question => {
        question.milestoneNew.forEach(milestone => {
          if (!milestoneNames.includes(milestone.Name)) {
            milestoneNames.push(milestone.Name);
            milestones.push(milestone);
          }
        });
      });
      // remove duplicates
      milestones = [...new Set(milestones)];
      if (milestones.length) {
        dispatch(
          updateNewFilters(
            milestones.map(milestone => ({
              displayName: milestone.Name,
              group: 'milestone',
              name: String(milestone.Name).toLowerCase(),
              color: milestone.Color,
              value: false
            }))
          )
        );
      }

      setLoading(false);
      if (!response.status) {
        setWarningTitle(response.title);
        setWarningText(response.message);
        setWarning(true);
      }
    })();
    return () => {};
  }, [memoizeBid]);

  const onAddQuestion = value => {
    setDirection(value);
    setShowModal(true);
  };
  const onClose = () => {
    if (showModal) setShowModal(false);
  };

  return (
    <div className="approvals-tab">
      <ViewAboveVerticalTabs>
        <BidHistory data-testid="bid-history" />
      </ViewAboveVerticalTabs>

      <div
        className={` ${
          !selectedBid?.isCurrent && !selectedBid?.isEditable
            ? 'add-btn-container'
            : 'filter-container'
        }`}
      >
        <div className="expand-all">
          <div className="tasksList-expand-all-icon">
            <ApolloCheckbox
              label="Expand All"
              checked={expandAll.every(exp => exp)}
              onChange={handleExpandAllChange}
            />
          </div>
        </div>
        <div className="filter-btn">
          {(selectedBid?.isCurrent || selectedBid?.isEditable) && (
            <div
              data-testid="selectedbid-testid"
              title="Add New Question"
              className="tasksList-add-icon-wrapper"
              role="presentation"
              onClick={() => onAddQuestion('left')}
            >
              <Add className="tasksList-add-icon add-icon-btn" />
            </div>
          )}
          <FilterButton setIsShowFilters={setIsShowFilters} />
        </div>
        {isShowFilters && <Filters />}
      </div>

      <div className="all-approvals-container">
        {/* Modal Loading */}
        {loading && <Loader isInner />}

        {!isEmpty(approvals) ? (
          approvals.map((approval, index) => (
            <Section
              keyForward={approval.key}
              sectionId={approval.ApprovalSectionId}
              title={approval.ApprovalSectionTitle}
              isExpandAll={expandAll[index]}
              handleChange={handleChange(index)}
            />
          ))
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
                  padding: '20px'
                }}
              >
                <ClipboardCheck
                  style={{ fontSize: '48px', marginBottom: '10px' }}
                  data-testid="No_approvals"
                />
                No Approval associated with your selected bid
              </Card>
            </div>
          </>
        )}
      </div>

      {/* Warning Modal */}
      {warning && (
        <CustomModal
          open={warning}
          title={warningTitle}
          message={warningText}
          variant="error"
          onClose={() => setWarning(false)}
          buttonProps={[{ className: 'hidden' }, { label: DEFAULT.CLOSE }]}
          className="approvals-warning-modal"
        />
      )}
      <div id="modal-wrapper" />

      {showModal && (
        <AddQuestionModalComponent
          onClose={onClose}
          currentsection={''}
          tabFlag="Approvals"
          direction={direction}
        />
      )}
    </div>
  );
};

export default Approvals;
