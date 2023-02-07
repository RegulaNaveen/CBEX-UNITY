import Panel from 'apollo-react/components/Panel';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Typography from 'apollo-react/components/Typography';
import Search from 'apollo-react/components/Search';
import PlusIcon from 'apollo-react-icons/Plus';
import Button from 'apollo-react/components/Button';
import { fromJS, Map } from 'immutable';
import TimelineCalender from './TimelineCalender';
import { getProposalDetails, selectSections } from '../../../redux/selectors';
import TimelineSections from './TimelineSections';
import {
  getProposalQuestions,
  getSelectedBid
} from '../../../redux/selectors/proposal';
import BidHistory from '../../common/Bidhistory';
import ViewAboveVerticalTabs from '../../views/ViewAboveVerticalTabs';
import AddQuestionModalComponent from '../../views/modals/AddQuestionModal';
import { SocketContext } from '../../../context/SocketContext';
import { getUserEmail, getUserId, getUserName } from '../../../SessionHandler';

const Timeline = () => {
  const sections = useSelector(selectSections);
  const socketContext = useContext(SocketContext);
  const questions = useSelector(getProposalQuestions);
  const [showModal, setShowModal] = useState(false);
  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const { proposalDate, isCurrent, proposalId } = selectedBid;
  const [timelineEvents, setTimelineEvents] = useState([]);
  const proposalDetail = useSelector(getProposalDetails);
  const [filteredSections, setFilteredSections] = useState(null);
  const [searchKey, setSearchKey] = useState('');

  const getUserData = () => ({
    name: getUserName(),
    email: getUserEmail(),
    role: getUserId()
  });

  useEffect(() => {
    // console.log('questionssss ', questions);
    // console.log({ proposalDetail });
    setTimelineEvents([]);
    questions.map(question => {
      if (question?.answerConfiguration?.type === 'date') {
        // console.log('question ', question);
        const lastAnswer = question?.answers[question?.answers.length - 1];
        // console.log({ lastAnswer });
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
        // console.log('timeline eventssss ', eventss);
      }
    });
  }, [questions]);

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
      console.log({ sections });
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
          item.questionText.toLowerCase().includes(key.trim().toLowerCase()) &&
          item.answerConfiguration.type === 'date'
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

  const onCloseAddModal = () => {
    setShowModal(prev => !prev);
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
                    />
                  );
                })
              : sections.valueSeq().map(section => {
                  return (
                    <TimelineSections
                      sectionName={section.get('sectionName')}
                      sectionOrder={section.get('sectionOrder')}
                      questions={section.get('questions')}
                    />
                  );
                })}
          </div>
        </Panel>
        <Panel hideButton className="timeline-calender-container">
          <div className="btn-container">
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
          </div>

          <TimelineCalender
            timelineEvents={timelineEvents}
            proposalDate={proposalDate}
            socketContext={socketContext}
            userData={getUserData()}
          />
        </Panel>
      </div>
      {showModal && (
        <AddQuestionModalComponent
          onClose={onCloseAddModal}
          isOnlyDateAnswer={true}
          // eslint-disable-next-line react/destructuring-assignment
          // currentsection={this.state.currentsection || ''}
        />
      )}
    </div>
  );
};

export default Timeline;
