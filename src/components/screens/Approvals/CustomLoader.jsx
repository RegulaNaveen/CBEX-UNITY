import React from 'react';
import { useSelector } from 'react-redux';
import Loader from 'apollo-react/components/Loader';
import { getApprovalQuestionLoading } from '../../../redux/selectors/proposal';

const CustomLoader = props => {
  const approvalQuestionLoading = useSelector(
    getApprovalQuestionLoading
  ).toJS();
  console.log(approvalQuestionLoading);
  return (
    <span className="loader-cover">
      {approvalQuestionLoading.questionId === props.questionId &&
      approvalQuestionLoading.value ? (
        <Loader isInner size={20} style={{ width: '20px', height: '20px' }} />
      ) : null}
    </span>
  );
};

export default React.memo(CustomLoader, (prev, next) => {
  return prev.questionId === next.questionId;
});
