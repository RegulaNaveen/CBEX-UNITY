import React from 'react';
import { useSelector } from 'react-redux';
import Loader from 'apollo-react/components/Loader';
import { getUnityTabQuestionLoading } from '../../../redux/selectors/proposal';

const CustomLoader = props => {
  const unityTabQuestionLoading = useSelector(
    getUnityTabQuestionLoading
  ).toJS();
  return (
    <span className="loader-cover">
      {unityTabQuestionLoading.questionId === props?.questionId &&
      unityTabQuestionLoading.value ? (
        <Loader isInner size={20} style={{ width: '20px', height: '20px' }} />
      ) : null}
    </span>
  );
};

export default React.memo(CustomLoader, (prev, next) => {
  return prev.questionId === next.questionId;
});
