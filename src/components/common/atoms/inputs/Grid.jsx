import React, { useState, useRef, useEffect, useContext } from 'react';
import Grid from 'apollo-react/components/Grid';
import Paper from 'apollo-react/components/Paper';
import Typography from 'apollo-react/components/Typography';
import Tooltip from 'apollo-react/components/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { parseMomentDate, remainingDays } from '../../../../utils/DateUtils';
import { SF_HOST_URL } from '../../../../constants/api';
import { getProposalQuestions } from '../../../../redux/selectors/proposal';
import Favourite from '../Favourite';
import Pencil from '../Pencil';
import { toggleFavourite } from '../../../../api/sso-auth';
import { updateFavourite } from '../../../../redux/actions/sso-auth-actions';
import CircularProgress from '@mui/material/CircularProgress';
import featureFlags from '../../../../constants/featureFlags';
import { SocketContext } from '../../../../context/SocketContext';
import { saveRecentOppActivity } from '../../../../api/proposals';

const styles = { padding: 10 };
const containerStyle = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  boxSizing: 'border-box'
};

const loadSidebar = props => {
  const {
    data,
    isOpen,
    windowSize,
    bidStatus,
    favourite,
    customName,
    nextMilestone,
    handleEditCustomName
  } = props;
  const questions = useSelector(getProposalQuestions);
  const [
    detailsForBackendSectionData,
    setDetailsForBackendSectionData
  ] = useState({});
  // Setup a ref
  const protocol = useRef();
  const product = useRef();
  const therapeutic = useRef();
  const linebusiness = useRef();
  const customer = useRef();
  const protocolhalfscreen = useRef();
  const producthalfscreen = useRef();
  const therapeutichalfscreen = useRef();
  const linebusinesshalfscreen = useRef();
  const customerhalfscreen = useRef();
  // State for tracking if ellipsis is active
  const [isProductTooltip, setisProductTooltip] = useState(false);
  const [isCustomerTooltip, setisCustomerTooltip] = useState(false);
  const [isProtocolTooltip, setisProtocolTooltip] = useState(false);
  const [isTherapeuticTooltip, setisTherapeuticTooltip] = useState(false);
  const [isLinebusinessTooltip, setisLinebusinessTooltip] = useState(false);
  const [isProductTooltipHalfscreen, setisProductTooltipHalfscreen] = useState(
    false
  );
  const [
    isCustomerTooltipHalfscreen,
    setisCustomerTooltipHalfscreen
  ] = useState(false);
  const [
    isProtocolTooltipHalfscreen,
    setisProtocolTooltipHalfscreen
  ] = useState(false);
  const [
    isTherapeuticTooltipHalfscreen,
    setisTherapeuticTooltipHalfscreen
  ] = useState(false);
  const [
    isLinebusinessTooltipHalfscreen,
    setisLinebusinessTooltipHalfscreen
  ] = useState(false);
  const [favInProgress, setFavInProgress] = useState(false);

  const flags = useSelector(state => state.proposal.get('eventflag'));
  const dispatch = useDispatch();
  const { updateFavouriteWrapper } = useContext(SocketContext);

  const {
    'Bid due date': bidDueDate,
    Phase: phase,
    'Product name': productName,
    'Is this IQVIA Biotech': iqviaBiotech,
    'Line of business': lineOfBusiness,
    'Protocol number': protocolNumber,
    'Therapeutic area': therapeuticArea,
    'CRM #': crm,
    Customer,
    bidNo,
    opportunityId
  } = data;
  const placeholder = 'No data';
  const date = bidDueDate && parseMomentDate(bidDueDate);
  const daysRemain = remainingDays(date);
  const redirect = () => {
    window.open(`${SF_HOST_URL}lightning/r/Opportunity/${opportunityId}/view`);
  };
  let isBladeOpen = isOpen;
  if (windowSize <= 1200) {
    isBladeOpen = true;
  }

  useEffect(() => {
    if (product?.current?.clientWidth < product?.current?.scrollWidth)
      setisProductTooltip(true);
    else setisProductTooltip(false);
    if (protocol?.current?.clientWidth < protocol?.current?.scrollWidth)
      setisProtocolTooltip(true);
    else setisProtocolTooltip(false);
    if (customer?.current?.clientWidth < customer?.current?.scrollWidth)
      setisCustomerTooltip(true);
    else setisProtocolTooltip(false);
    if (linebusiness?.current?.clientWidth < linebusiness?.current?.scrollWidth)
      setisLinebusinessTooltip(true);
    else setisLinebusinessTooltip(false);
    if (therapeutic?.current?.clientWidth < therapeutic?.current?.scrollWidth)
      setisTherapeuticTooltip(true);
    else setisTherapeuticTooltip(false);
    if (
      producthalfscreen?.current?.clientWidth <
      producthalfscreen?.current?.scrollWidth
    )
      setisProductTooltipHalfscreen(true);
    else setisProductTooltipHalfscreen(false);
    if (
      protocolhalfscreen?.current?.clientWidth <
      protocolhalfscreen?.current?.scrollWidth
    )
      setisProtocolTooltipHalfscreen(true);
    else setisProtocolTooltipHalfscreen(false);
    if (
      customerhalfscreen?.current?.clientWidth <
      customerhalfscreen?.current?.scrollWidth
    )
      setisCustomerTooltipHalfscreen(true);
    else setisCustomerTooltipHalfscreen(false);
    if (
      linebusinesshalfscreen?.current?.clientWidth <
      linebusinesshalfscreen?.current?.scrollWidth
    )
      setisLinebusinessTooltipHalfscreen(true);
    else setisLinebusinessTooltipHalfscreen(false);
    if (
      therapeutichalfscreen?.current?.clientWidth <
      therapeutichalfscreen?.current?.scrollWidth
    )
      setisTherapeuticTooltipHalfscreen(true);
    else setisTherapeuticTooltipHalfscreen(false);
  }, [
    therapeutic?.current?.scrollWidth,
    customer?.current?.scrollWidth,
    protocol?.current?.scrollWidth,
    product?.current?.scrollWidth,
    linebusiness?.current?.scrollWidth,
    therapeutichalfscreen?.current?.scrollWidth,
    customerhalfscreen?.current?.scrollWidth,
    protocolhalfscreen?.current?.scrollWidth,
    producthalfscreen?.current?.scrollWidth,
    linebusinesshalfscreen?.current?.scrollWidth,
    windowSize,
    isOpen
  ]);

  const setDetailsForBackendAnswers = proposalQuestions => {
    try {
      const detailsForBackendData = {};
      proposalQuestions.forEach(question => {
        if (
          question.sfField === 'Therapy_Area__c' &&
          question.sfObject === 'Opportunity'
        ) {
          detailsForBackendData.therapeuticArea = question?.answers[
            question?.answers?.length - 1
          ]?.answer?.toString();
        }
        if (
          question.sfField === 'Phase_P__c' &&
          question.sfObject === 'Opportunity'
        ) {
          detailsForBackendData.phase = question?.answers[
            question?.answers?.length - 1
          ]?.answer?.toString();
        }
        if (
          question.sfField === 'Drug_Product_Name__c' &&
          question.sfObject === 'Opportunity'
        ) {
          detailsForBackendData.productName = question?.answers[
            question?.answers?.length - 1
          ]?.answer?.toString();
        }
        if (
          question.sfField === 'Protocol_Number__c' &&
          question.sfObject === 'Opportunity'
        ) {
          detailsForBackendData.protocolNumber = question?.answers[
            question?.answers?.length - 1
          ]?.answer?.toString();
        }
        if (
          question.sfField === 'Line_of_Business__c' &&
          question.sfObject === 'Opportunity'
        ) {
          detailsForBackendData.lineOfBusiness = question?.answers[
            question?.answers?.length - 1
          ]?.answer?.toString();
        }
        if (
          question.sfField === 'Is_this_IQVIA_Biotech__c' &&
          question.sfObject === 'Opportunity'
        ) {
          detailsForBackendData.IsIqviaBiotech = question?.answers[
            question?.answers?.length - 1
          ]?.answer?.toString();
        }
        if (
          question.sfField === 'Bid_Due_Date__c' &&
          question.sfObject === 'Bid_History__c'
        ) {
          detailsForBackendData.bidDueDate = remainingDays(
            new Date(
              question?.answers[
                question?.answers?.length - 1
              ]?.answer?.toString()
            )
          );
        }
        if (question.sfField === 'Name' && question.sfObject === 'Account') {
          detailsForBackendData.customer = question?.answers[
            question?.answers?.length - 1
          ]?.answer?.toString();
        }
      });
      setDetailsForBackendSectionData(detailsForBackendData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDetailsForBackendAnswers(questions);
  }, [questions]);

  async function onFavouriteToggle(favourite) {
    try {
      setFavInProgress(true);
      const toggleFavouriteRes = await toggleFavourite(crm, favourite);
      updateFavouriteWrapper(crm, favourite);
      if (window && window.location && window.location.href) {
        const obj = {
          url: window.location.href,
          oppNo: crm,
          type: 'opportunity page'
        };
        saveRecentOppActivity(obj);
      }
      if (toggleFavouriteRes && toggleFavouriteRes.data) {
        if (toggleFavouriteRes.data.favourite) {
          await dispatch(updateFavourite(crm, favourite));
        } else {
          await dispatch(updateFavourite(crm, favourite));
        }
      }
    } catch (e) {
      console.error(`Error in updating favourite for ${crm}`, e);
    } finally {
      setFavInProgress(false);
    }
  }

  const renderProcessingTxt = (
    <span className="processing-txt">Processing</span>
  );

  const smallHeaderClass =
    windowSize < 641
      ? 'boldtext halfscreen-header-ellipses-blade'
      : 'boldtext sidebaropenfont';

  const headerClassName = isOpen
    ? smallHeaderClass
    : 'boldtext halfscreen-header-ellipses';

  return (
    <div className="proposal-info-container">
      <Paper
        style={{
          ...styles
        }}
        className="duedatedsg"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            textAlign: 'left'
          }}
        >
          <div>
            <Typography variant="body2" className="greytext">
              Opportunity Number
            </Typography>
            <Typography
              variant="body2"
              className="boldtext"
              style={{ cursor: 'pointer', color: 'Blue' }}
              onClick={redirect}
            >
              {crm || placeholder}
            </Typography>
          </div>
          {flags[featureFlags.FAVOURITE_FLAG] ? (
            <>
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
            </>
          ) : null}
        </div>
      </Paper>
      {flags['customOpportunityNameFlag'] ? (
        <div className="custom-opp-name-container">
          <Paper style={styles} className="duedatedsg">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                textAlign: 'left'
              }}
            >
              <div style={{ maxWidth: 'calc(100% - 2rem)' }}>
                <Typography variant="body2" className="greytext">
                  Custom Name
                </Typography>
                <Typography
                  variant="body2"
                  className={customName ? 'boldtext' : 'greytext'}
                  noWrap
                  title={customName || ''}
                >
                  {customName || 'Add Custom Name'}
                </Typography>
              </div>
              <Pencil onClick={handleEditCustomName} />
            </div>
          </Paper>
        </div>
      ) : null}
      <div>
        <Paper style={styles} className="duedatedsg">
          <Typography variant="body2" className="greytext">
            Customer
          </Typography>
          <Tooltip
            variant="dark"
            body={
              isCustomerTooltip
                ? detailsForBackendSectionData?.customer || Customer
                : null
            }
            placement="bottom"
          >
            <Typography
              variant="body2"
              className="boldtext header-ellipses"
              ref={customer}
            >
              {detailsForBackendSectionData?.customer ||
                Customer ||
                placeholder}
            </Typography>
          </Tooltip>
        </Paper>
      </div>
      <div>
        <Paper style={styles} className="phasedsg duedatedsg">
          <Typography variant="body2" className="greytext">
            Line of Business
          </Typography>
          <Tooltip
            variant="dark"
            body={
              isLinebusinessTooltip
                ? detailsForBackendSectionData?.lineOfBusiness || lineOfBusiness
                : null
            }
            placement="bottom"
          >
            <Typography
              variant="body2"
              className="boldtext header-ellipses"
              ref={linebusiness}
            >
              {detailsForBackendSectionData?.lineOfBusiness ||
                lineOfBusiness ||
                placeholder}
            </Typography>
          </Tooltip>
        </Paper>
      </div>
      <div>
        <Paper style={styles} className="duedatedsg">
          <Typography variant="body2" className="greytext">
            IQVIA Biotech
          </Typography>
          <Typography variant="body2" className="boldtext">
            {detailsForBackendSectionData.IsIqviaBiotech ||
              iqviaBiotech ||
              placeholder}
          </Typography>
        </Paper>
      </div>
      <div>
        <Paper style={styles} className="duedatedsg">
          <Typography variant="body2" className="greytext">
            Phase
          </Typography>
          <Typography variant="body2" className="boldtext">
            {phase
              ? detailsForBackendSectionData?.phase?.split(' ')[1] ||
                detailsForBackendSectionData?.phase ||
                phase?.split(' ')[1] ||
                phase
              : placeholder}
          </Typography>
        </Paper>
      </div>
      <div>
        <Paper style={styles} className="duedatedsg">
          <Typography variant="body2" className="greytext">
            Next Milestone
          </Typography>
          <Typography variant="body2" className="boldtext">
            {nextMilestone || '-'}
          </Typography>
        </Paper>
      </div>
      <div>
        <Paper style={styles} className="duedatedsg">
          <Typography variant="body2" className="greytext">
            Therapeutic Area
          </Typography>
          <Tooltip
            variant="dark"
            body={
              isTherapeuticTooltip
                ? detailsForBackendSectionData?.therapeuticArea ||
                  therapeuticArea
                : null
            }
            placement="bottom"
          >
            <Typography
              variant="body2"
              className="boldtext header-ellipses"
              ref={therapeutic}
            >
              {detailsForBackendSectionData?.therapeuticArea ||
                therapeuticArea ||
                placeholder}
            </Typography>
          </Tooltip>
        </Paper>
      </div>
      <div>
        <Paper style={styles} className="duedatedsg">
          <Typography variant="body2" className="greytext">
            Product Name
          </Typography>
          <Tooltip
            variant="dark"
            body={
              isProductTooltip
                ? detailsForBackendSectionData?.productName || productName
                : null
            }
            placement="bottom"
          >
            <Typography
              variant="body2"
              className="boldtext header-ellipses"
              ref={product}
            >
              {detailsForBackendSectionData?.productName ||
                productName ||
                placeholder}
            </Typography>
          </Tooltip>
        </Paper>
      </div>
      <div>
        <Paper style={styles} className="duedatedsg">
          <Typography variant="body2" className="greytext">
            Protocol Number
          </Typography>
          <Tooltip
            variant="dark"
            body={
              isProtocolTooltip
                ? detailsForBackendSectionData?.protocolNumber || protocolNumber
                : null
            }
            placement="bottom"
          >
            <Typography
              variant="body2"
              className="boldtext header-ellipses"
              ref={protocol}
            >
              {detailsForBackendSectionData?.protocolNumber ||
                protocolNumber ||
                placeholder}
            </Typography>
          </Tooltip>
        </Paper>
      </div>
      <div>
        <Paper style={styles} className="duedatedsg">
          <Typography variant="body2" className="greytext">
            Bid #
          </Typography>
          <Typography variant="body2" className="boldtext">
            {bidNo || placeholder}
          </Typography>
        </Paper>
      </div>
      <div>
        <Paper className="duedatedsg" style={styles}>
          <Typography variant="body2" className="greytext lesslineheight">
            Days Until Due
          </Typography>
          <p className="boldtext greencolor lesslineheight">
            {bidStatus
              ? renderProcessingTxt
              : detailsForBackendSectionData?.bidDueDate || daysRemain}
          </p>
        </Paper>
      </div>
    </div>
  );
};

const UnityGrid = props => {
  return loadSidebar(props);
};

export default UnityGrid;
