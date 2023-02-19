import Panel from 'apollo-react/components/Panel';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from 'apollo-react/components/Typography';
import Search from 'apollo-react/components/Search';
import PlusIcon from 'apollo-react-icons/Plus';
import Button from 'apollo-react/components/Button';
import { fromJS, Map } from 'immutable';
import moment from 'moment';
import TimelineCalender from './TimelineCalender';
import { v4 as uuidv4 } from 'uuid';
import {
  getProposalDetails,
  isSetQuestionLoading,
  selectSections,
  selectShowAddModal,
  selectTimelineDateRange
} from '../../../redux/selectors';
import TimelineSections from './TimelineSections';
import {
  getBidList,
  getProposalQuestions,
  getSelectedBid
} from '../../../redux/selectors/proposal';
import BidHistory from '../../common/Bidhistory';
import ViewAboveVerticalTabs from '../../views/ViewAboveVerticalTabs';
import AddQuestionModalComponent from '../../views/modals/AddQuestionModal';
import { SocketContext } from '../../../context/SocketContext';
import { getUserEmail, getUserId, getUserName } from '../../../SessionHandler';
import {
  setShowAddModal,
  setTimelineDateRange
} from '../../../redux/actions/timeline-actions';

const Timeline = () => {
  const socketContext = useContext(SocketContext);
  const questions = useSelector(getProposalQuestions);
  // const [showModal, setShowAddModal] = useState(false);
  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const bidList = useSelector(getBidList);
  const [currentBidDetails, setCurrentBidDetails] = useState({});
  const { proposalDate, isCurrent, proposalId } = selectedBid;
  const [timelineEvents, setTimelineEvents] = useState([]);
  const proposalDetail = useSelector(getProposalDetails);
  const [filteredSections, setFilteredSections] = useState(null);
  const [sections, setSections] = useState(Map());
  const [searchKey, setSearchKey] = useState('');
  const isSetQuestionLoadingData = useSelector(isSetQuestionLoading);
  const [draggedQuestionData, setDraggedQuestionData] = useState({});
  const timelineDateRange = useSelector(selectTimelineDateRange);
  const showAddModal = useSelector(selectShowAddModal);
  const dispatch = useDispatch();

  const getUserData = () => ({
    name: getUserName(),
    email: getUserEmail(),
    role: getUserId()
  });

  useEffect(() => {
    if (showAddModal) {
      setTimeout(() => dispatch(setShowAddModal(false)), 1000);
    }
  }, [isSetQuestionLoadingData]);

  const generateSections = (proposalQuestions: Object): Map => {
    try {
      let sections = Map();

      proposalQuestions.forEach(question => {
        const {
          questionId,
          roleNames,
          section: { sectionName, sectionOrder }
        } = question;

        const roles = roleNames || [];

        const createSections = () => {
          let section = Map({});
          let questions = sections.getIn([sectionName, 'questions']) || Map({});

          questions = questions.set(questionId, fromJS(question));
          questions = questions.sortBy(item => item.get('questionOrder'));

          section = section
            .set('sectionOrder', sectionOrder)
            .set('sectionName', sectionName)
            .set('questions', questions);

          sections = sections.set(sectionName, section);
        };

        createSections();
      });

      sections = sections.sortBy(section => section.get('sectionOrder'));

      return sections;
    } catch (error) {
      console.log(error);
    }
  };

  const getFilteredSections = key => {
    const questionsToFilter = [...questions];
    let filteredQuestions;

    if (searchKey.trim()) {
      filteredQuestions = questionsToFilter.filter(
        item =>
          (item.questionText.toLowerCase().includes(key.trim().toLowerCase()) &&
            item.answerConfiguration.type === 'date' &&
            item.visible &&
            item.active) ||
          (item.section.sectionName
            .toLowerCase()
            .includes(key.trim().toLowerCase()) &&
            item.visible &&
            item.active)
      );
    }

    let sectionsMatched = generateSections(filteredQuestions);
    setFilteredSections(sectionsMatched);
  };

  useEffect(() => {
    if (!searchKey) {
      setFilteredSections(null);
      return;
    }
    getFilteredSections(searchKey);
  }, [searchKey]);

  useEffect(() => {
    const activeQuestions = questions.filter(item => {
      if (item.visible && item.active) {
        return true;
      }
    });
    setTimelineEvents([]);
    const sectionsMatched = generateSections(activeQuestions);
    setSections(sectionsMatched);

    activeQuestions.map(question => {
      if (question?.answerConfiguration?.type === 'date') {
        const lastAnswer = question?.answers[question?.answers.length - 1];

        const eventss = {
          id: question.questionId,
          title: question.questionText,
          start: new Date(lastAnswer?.answer),
          end: new Date(lastAnswer?.answer),
          isDraggable: isCurrent,
          color:
            lastAnswer?.user === 'UnityPredictedAnswer' ? '#297DFD' : '#00C221',
          question
        };
        setTimelineEvents(current => [...current, eventss]);
      }
    });
    const matchedBid = bidList.filter(bid => bid.bidId === selectedBid.id);
    setCurrentBidDetails(matchedBid);
    console.log('tapas matched bid ', matchedBid);

    dispatch(
      setTimelineDateRange(
        timelineDateRange.length
          ? timelineDateRange
          : [
              moment(`${matchedBid[0].bidDate}`),
              moment(`${matchedBid[0].bidDueDate}`)
            ]
      )
    );
  }, [questions, proposalDate]);

  useEffect(() => {
    console.log('tapas timeline date range redux ', timelineDateRange);

    // return () => {
    //   second
    // }
  }, [timelineDateRange]);

  const onCloseAddModal = () => {
    dispatch(setShowAddModal(false));
  };

  return (
    <div id="Timeline-main-wrapper">
      {/* <div> */}
      <ViewAboveVerticalTabs>
        <BidHistory />
      </ViewAboveVerticalTabs>

      <div className="timeline-container">
        <Panel width={300}>
          <div className="timeline-question-header">
            <Typography varient="h4" className="title">
              Available Dates
            </Typography>
            <Typography varient="body2" className="subtitle">
              Drag onto calender to add
            </Typography>
          </div>
          <div className="timeline-questions-container">
            <div className="timeline-search-container">
              <Search
                fullWidth={true}
                size="small"
                placeholder="Search"
                value={searchKey}
                onChange={e => setSearchKey(e.target.value)}
              />
            </div>

            {filteredSections
              ? filteredSections.valueSeq().map(section => {
                  return (
                    <TimelineSections
                      sectionName={section.get('sectionName')}
                      sectionOrder={section.get('sectionOrder')}
                      questions={section.get('questions')}
                      draggedQuestionData={draggedQuestionData}
                      setDraggedQuestionData={setDraggedQuestionData}
                    />
                  );
                })
              : sections.valueSeq().map(section => {
                  return (
                    section.get('sectionName') !==
                      'Questions_for_the_Customer_left_panel' && (
                      <TimelineSections
                        sectionName={section.get('sectionName')}
                        sectionOrder={section.get('sectionOrder')}
                        questions={section.get('questions')}
                        draggedQuestionData={draggedQuestionData}
                        setDraggedQuestionData={setDraggedQuestionData}
                      />
                    )
                  );
                })}
          </div>
        </Panel>
        <Panel hideButton className="timeline-calender-container">
          {/* <div className="btn-container">
            <Button
              variant="primary"
              icon={<PlusIcon />}
              size="small"
              style={{ marginRight: 10 }}
              onClick={() => setShowModal(true)}
              disabled={!isCurrent}
            >
              Add New
            </Button>
          </div> */}

          {timelineDateRange.length && (
            <TimelineCalender
              key={uuidv4()}
              timelineEvents={timelineEvents}
              proposalDate={proposalDate}
              socketContext={socketContext}
              userData={getUserData()}
              isCurrent={isCurrent}
              currentBidDetails={currentBidDetails}
              draggedQuestionData={draggedQuestionData}
              setDraggedQuestionData={setDraggedQuestionData}
            />
          )}
        </Panel>
      </div>
      {showAddModal && (
        <AddQuestionModalComponent
          onClose={onCloseAddModal}
          isOnlyDateAnswer={true}
        />
      )}
    </div>
  );
};

export default Timeline;
