// @flow
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ThumbsUp from 'apollo-react-icons/ThumbsUp';
import CalenderWithNumber from '../svg/CalenderWithNumber';
import House from 'apollo-react-icons/House';
import { Folder } from '../svg';
import { OPPORTUNITY } from '../../routes';
import Favourite from '../common/atoms/Favourite';
import { toggleFavourite } from '../../api/sso-auth';
import CircularProgress from '@mui/material/CircularProgress';
import { updateFavourite } from '../../redux/actions/sso-auth-actions';
import featureFlags from '../../constants/featureFlags';
import { SocketContext } from '../../context/SocketContext';
import { saveRecentOppActivity } from '../../api/proposals';
import Tooltip from 'apollo-react/components/Tooltip';
import CustomTooltip from './customTooltip';
import Minus from 'apollo-react-icons/Minus';

type Props = {
  title: string,
  opportunityName: string,
  opportunityStage: string,
  bidNo: string,
  daysRemain: number | string,
  dueDate: string,
  customer: string,
  protocolNumber: string,
  phase: string,
  therapeuticArea: string,
  verbatimIndication: string,
  proposalId: string,
  approvalsCount: any,
  isApprovalCountPresent: Boolean,
  allFlags: object,
  bidStatus: boolean,
  favourite: boolean,
  bidStopStatus: boolean,
  tabIndex: number
};

const ProposalCard = ({
  title,
  opportunityName,
  daysRemain,
  dueDate,
  customer,
  protocolNumber,
  opportunityStage,
  bidNo,
  phase,
  therapeuticArea,
  verbatimIndication,
  proposalId,
  approvalsCount,
  isApprovalCountPresent,
  allFlags,
  favourite,
  bidStopStatus,
  tabIndex
}: Props) => {
  const proposalDetails = { tabIndex };
  const [favInProgress, setFavInProgress] = useState(false);
  const flags = useSelector(state => state.proposal.get('eventflag'));

  const dispatch = useDispatch();
  const { updateFavouriteWrapper } = useContext(SocketContext);

  function setProposalTypeView({
    currentTarget
  }: SyntheticEvent<HTMLButtonElement>) {
    const { id } = currentTarget;
    localStorage.setItem('proposalTypeView', id);
  }
  const NO_DATA = 'No data';
  const NO_DATA_PLACEHOLDER = 'no-data-placeholder';
  const CLASS_SECTION_DATA = 'section-data';

  const checkNoDataClass = (keyToCheck: string) =>
    keyToCheck === NO_DATA ? NO_DATA_PLACEHOLDER : undefined;

  async function onFavouriteToggle(favourite) {
    try {
      setFavInProgress(true);
      const toggleFavouriteRes = await toggleFavourite(title, favourite);
      updateFavouriteWrapper(title, favourite, {...proposalDetails});
      const obj = {
        url: `${window.location.origin}/opportunities/${title}`,
        oppNo: title,
        type: 'opportunity page'
      };
      saveRecentOppActivity(obj);
      if (toggleFavouriteRes && toggleFavouriteRes.data) {
        if (toggleFavouriteRes.data.favourite) {
          await dispatch(updateFavourite(title, favourite));
        } else {
          await dispatch(updateFavourite(title, favourite));
        }
      }
    } catch (e) {
      console.error(`Error in updating favourite for ${title}`, e);
    } finally {
      setFavInProgress(false);
    }
  }

  return (
    <div className="card">
      <div className="header-section">
        <div>
          <p className={checkNoDataClass(title)}>{title}</p>
          <p className={checkNoDataClass(opportunityName)}>{opportunityName}</p>
        </div>
        {flags[featureFlags.FAVOURITE_FLAG] ? (
          <div className="favourite-container">
            {favInProgress ? (
              <span
                style={{
                  display: 'flex',
                  height: '2.5rem',
                  width: '2.5rem',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <CircularProgress size={24} color="primary" />
              </span>
            ) : (
              <Favourite
                value={favourite}
                onToggle={update => onFavouriteToggle(update)}
              />
            )}
          </div>
        ) : null}
      </div>

      <div className="info-section">
        <div className={CLASS_SECTION_DATA}>
          <span>
            <b>Customer:</b>{' '}
          </span>
          <span className={checkNoDataClass(customer)}>{customer}</span>
        </div>
        <div className={CLASS_SECTION_DATA}>
          <span>
            <b>Current Bid:</b>
          </span>
          <span className={checkNoDataClass(bidNo)}>{bidNo}</span>
        </div>
        <div className={CLASS_SECTION_DATA}>
          <span>
            <b>Bid Due Date:</b>
          </span>
          <span className={checkNoDataClass(dueDate)}>{dueDate}</span>
        </div>
        <div className={CLASS_SECTION_DATA}>
          <span>
            <b>Next Milestone:</b>
          </span>
          {/* <span className={checkNoDataClass(dueDate)}>{dueDate}</span> */}
        </div>
        <div className={CLASS_SECTION_DATA}>
          <span>
            <b>Protocol Number:</b>
          </span>
          <span className={checkNoDataClass(protocolNumber)}>
            {protocolNumber}
          </span>
        </div>
        {/* <div className={CLASS_SECTION_DATA}>
          <span>
            <b>Phase:</b>
          </span>
          <span className={checkNoDataClass(phase)}>{phase}</span>
        </div> */}
        {/* <div className={CLASS_SECTION_DATA}>
          <span>
            <b>Therapeutic Area:</b>
          </span>
          <span className={checkNoDataClass(therapeuticArea)}>
            {therapeuticArea}
          </span>
        </div> */}
        <div className={CLASS_SECTION_DATA}>
          <span>
            <b>Verbatim Indication:</b>
          </span>
          <span className={checkNoDataClass(verbatimIndication)}>
            {verbatimIndication}
          </span>
        </div>
        <div className={CLASS_SECTION_DATA}>
          <span>
            <b>Opportunity Stage:</b>
          </span>
          <span className={checkNoDataClass(opportunityStage)}>
            {opportunityStage &&
              opportunityStage
                .split('.')
                .pop()
                .trim()}
          </span>
        </div>
      </div>

      <div className="buttons-section">
        <div
          className="button"
          id="questions"
          role="presentation"
          onClick={setProposalTypeView}
        >
          <Link to={`${OPPORTUNITY}${title}`}>
            <Tooltip
              variant="dark"
              title="Strategy Development"
              placement="top"
            >
              <House fontSize="large" background-color="#9E54B0" />
            </Tooltip>
          </Link>
        </div>
        {allFlags?.showTimelineFlag && (
          <div
            className="button"
            id="timelines"
            role="presentation"
            onClick={setProposalTypeView}
          >
            <Link to={`${OPPORTUNITY}${title}?viewType=timelines`}>
              <CustomTooltip title="Timeline">
                <CalenderWithNumber
                  fontSize="large"
                  style={{ height: '36px' }}
                />
              </CustomTooltip>
            </Link>
          </div>
        )}

        <div
          className="button"
          id="approvals"
          role="presentation"
          onClick={setProposalTypeView}
          disabled={!isApprovalCountPresent}
        >
          {!isApprovalCountPresent ? (
            <Tooltip variant="dark" title="Approvals" placement="top">
              <ThumbsUp
                fontSize="large"
                htmlColor={!isApprovalCountPresent ? '#7f7f7f' : '#1faa00'}
                style={{ transform: 'scaleX(-1)', height: '41px' }}
              />
            </Tooltip>
          ) : (
            <Link to={`${OPPORTUNITY}${title}?viewType=approvals`}>
              <Tooltip variant="dark" title="Approvals" placement="top">
                <ThumbsUp
                  fontSize="large"
                  htmlColor={!isApprovalCountPresent ? '#7f7f7f' : '#1faa00'}
                  style={{ transform: 'scaleX(-1)', height: '36px' }}
                />
              </Tooltip>
            </Link>
          )}
        </div>

        <div
          className="button"
          id="documents"
          role="presentation"
          onClick={setProposalTypeView}
        >
          <Link to={`${OPPORTUNITY}${title}?viewType=documents`}>
            <CustomTooltip title="Documents">
              <Folder />
            </CustomTooltip>
          </Link>
        </div>

        <div
          className="button"
          id="documents"
          role="presentation"
          onClick={setProposalTypeView}
        >
          <div>
            <Tooltip variant="dark" title="Days until Bid Due" placement="top">
              <p>
                {daysRemain <= 0 || bidStopStatus ? (
                  <Minus value="medium" style={{ color: '#df216d' }} />
                ) : (
                  daysRemain
                )}
              </p>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;
