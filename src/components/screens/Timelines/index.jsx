import Panel from 'apollo-react/components/Panel';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Typography from 'apollo-react/components/Typography';
import Search from 'apollo-react/components/Search';
import PlusIcon from 'apollo-react-icons/Plus';
import Button from 'apollo-react/components/Button';
import TimelineCalender from './TimelineCalender';
import { getProposalDetails, selectSections } from '../../../redux/selectors';
import TimelineSections from './TimelineSections';
import {
  getOpportunityData,
  getProposalQuestions,
  getSelectedBid,
  selectProposal
} from '../../../redux/selectors/proposal';
import BidHistory from '../../common/Bidhistory';
import ViewAboveVerticalTabs from '../../views/ViewAboveVerticalTabs';
import AddQuestionModalComponent from '../../views/modals/AddQuestionModal';

const Timeline = () => {
  const sections = useSelector(selectSections);
  const questions = useSelector(getProposalQuestions);
  const opportunityData = useSelector(getOpportunityData);
  const proposal = useSelector(selectProposal);
  const [showModal, setShowModal] = useState(false);
  const selectedBid = useSelector(getSelectedBid)?.toJS();
  const { proposalDate } = selectedBid;
  console.log('sectionsssssss ', selectedBid);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const proposalDetail = useSelector(getProposalDetails);

  useEffect(() => {
    console.log('questionssss ', questions);
    console.log({ proposalDetail });
    questions.map(question => {
      if (question?.answerConfiguration?.type === 'date') {
        console.log('question ', question);
        const eventss = {
          id: question.questionId,
          title: question.questionText,
          start: new Date(question?.answers[0]?.answer),
          end: new Date(question?.answers[0]?.answer),
          isDraggable: true
        };
        setTimelineEvents(current => [...current, eventss]);
      }
    });
    console.log('timeline eventssss ', timelineEvents);
  }, [questions]);

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
              <Search fullWidth={true} size="small" placeholder="Search" />
            </div>

            {sections.valueSeq().map(section => {
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
            >
              Add New
            </Button>
          </div>

          <TimelineCalender
            timelineEvents={timelineEvents}
            proposalDate={proposalDate}
          />
        </Panel>
        {showModal && (
          <AddQuestionModalComponent
            onClose={onCloseAddModal}
            isOnlyDateAnswer={true}
            // eslint-disable-next-line react/destructuring-assignment
            // currentsection={this.state.currentsection || ''}
          />
        )}
      </div>
    </div>
  );
};

export default Timeline;
