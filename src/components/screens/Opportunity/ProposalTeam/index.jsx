import React, { useEffect, useState } from 'react';
import Typography from 'apollo-react/components/Typography';
import AnswerInput from './AnswerInput';
import AddQuestionModalComponent from '../../../views/modals/AddQuestionModal';
import { isSetQuestionLoading } from '../../../../redux/selectors';
import { useSelector } from 'react-redux';
import Link from 'apollo-react/components/Link';
import Plus from 'apollo-react-icons/Plus';

function ProposalTeam() {
  const [showModal, setShowModal] = useState(false);
  const isSetQuestionLoadingData = useSelector(isSetQuestionLoading);
  useEffect(() => {
    if (showModal) {
      setTimeout(() => setShowModal(false), 1000);
    }
  }, [isSetQuestionLoadingData]);
  const onCloseAddModal = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div id="proposal-team-left-section">
      <Typography
        style={{
          margin: '16px',
          fontSize: '20px',
          color: '#000000',
          fontWeight: 600,
          lineHeight: 1.04
        }}
      >
        Team
      </Typography>
      <hr className="divider-hr-proposal-team" />
      <AnswerInput />
      <div>
        <Link
          style={{ borderBottom: 'none' }}
          onClick={() => setShowModal(true)}
          size="small"
        >
          <Plus fontSize="extraSmall" />
          <span style={{ verticalAlign: 'top' }}> Add New Question</span>
        </Link>
      </div>

      {showModal && <AddQuestionModalComponent onClose={onCloseAddModal} />}
    </div>
  );
}

export default ProposalTeam;
