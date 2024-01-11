import React, {
  useEffect,
  useState,
  useMemo,
  createContext,
  useRef,
  Suspense
} from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import Grid from 'apollo-react/components/Grid';
import SwitchItem from './SwitchItem';
import { getSelectedBid } from '../../../redux/selectors';
import Link from 'apollo-react/components/Link';
import Plus from 'apollo-react-icons/Plus';
import AddQuestionModalComponent from '../../views/modals/AddQuestionModal';
import { selectSections } from '../../../redux/selectors';

const SectionActive = ({
  UnityTabSectionTitle = '',
  UnityTabSectionQuestions = [],
  setIsAllActiveDisplayed,
  tabId
}) => {
  const allTab = useSelector(state => state.unitytab.allTabs);
  let tab = allTab[tabId];
  const { isCurrent, isEditable } = useSelector(getSelectedBid)?.toJS();

  const selectedBidIsCurrent = !!isCurrent || !!isEditable;
  const [questionVisibility, setQuestionVisibility] = useState({});
  const [currentsection, setCurrentSection] = useState('');
  const [showModal, setShowModal] = useState(false);
  const questionsRef = useRef(null);

  const isAllQuestionsVisible = useMemo(() => {
    const valuesArr = Object.values(questionVisibility) || [];
    if (valuesArr.length > 0 && valuesArr.every(i => i === false)) {
      return false;
    }
    return true;
  }, [questionVisibility]);

  const onClose = () => {
    if (showModal) setShowModal(false);
  };

  useEffect(() => {
    setIsAllActiveDisplayed(isAllQuestionsVisible);
  }, [isAllQuestionsVisible]);

  const onAddQuestion = value => {
    setShowModal(true);
  };

  return (
    <Grid container className="approval-ques">
      <Grid item xs={12} className="approval-sec-title">
        {UnityTabSectionTitle}
      </Grid>
      <Grid item xs={12} className="approval-ques-left">
        {!isEmpty(UnityTabSectionQuestions) &&
          UnityTabSectionQuestions.map(item => (
            <SwitchItem
              questionId={item}
              UnityTabSectionTitle={UnityTabSectionTitle}
              key={item}
              disabled={!selectedBidIsCurrent}
              tabId={tabId}
            />
          ))}

        {selectedBidIsCurrent && (
          <>
            <div className="add-question">
              <Link
                style={{ borderBottom: 'none' }}
                //onClick={() => onAddQuestion(title)}
                size="small"
                onClick={onAddQuestion}
              >
                <Plus
                  className="plus-icon-add-new-question"
                  fontSize="extraSmall"
                />
                <span style={{ verticalAlign: 'top' }}> Add New Question</span>
              </Link>
            </div>
          </>
        )}

        {showModal && (
          <AddQuestionModalComponent
            onClose={onClose}
            currentsection={UnityTabSectionTitle}
            tabFlag="customTab"
            tabId={tabId}
          />
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: Map) => ({
  sections: selectSections(state)
});

SectionActive.propTypes = {
  UnityTabSectionTitle: PropTypes.string.isRequired,
  UnityTabSectionQuestions: PropTypes.array.isRequired
};

export default SectionActive;
