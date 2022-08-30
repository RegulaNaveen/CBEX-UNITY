import React, { useState, useRef, useEffect } from 'react';
import Grid from 'apollo-react/components/Grid';
import Paper from 'apollo-react/components/Paper';
import Typography from 'apollo-react/components/Typography';
import Tooltip from 'apollo-react/components/Tooltip';
import { parseMomentDate, remainingDays } from '../../../../utils/DateUtils';
import { SF_HOST_URL } from '../../../../constants/api';

const styles = { padding: 10 };
const containerStyle = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  boxSizing: 'border-box'
};

const loadSidebar = props => {
  const { data, isOpen, windowSize, bidStatus } = props;
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
  if (isBladeOpen) {
    return (
      <Grid container>
        <Grid item xs={12} style={containerStyle}>
          <Paper style={styles} className="sidebarduedatedsg open">
            <Typography variant="body2" className="greytext sidebaropenfont">
              Opportunity Number
            </Typography>
            <Typography
              variant="body2"
              className="boldtext sidebaropenfont"
              style={{ cursor: 'pointer', color: 'Blue' }}
              onClick={redirect}
            >
              {crm || placeholder}
            </Typography>
          </Paper>
          <Paper style={styles} className="sidebarduedatedsg open">
            <Typography variant="body2" className="greytext sidebaropenfont">
              Customer
            </Typography>
            <Tooltip
              variant="dark"
              body={isCustomerTooltipHalfscreen ? Customer : null}
              placement="bottom"
            >
              <Typography
                variant="body2"
                className={
                  isOpen
                    ? windowSize < 641
                      ? 'boldtext halfscreen-header-ellipses-blade'
                      : 'boldtext sidebaropenfont'
                    : 'boldtext halfscreen-header-ellipses'
                }
                ref={customerhalfscreen}
              >
                {Customer || placeholder}
              </Typography>
            </Tooltip>
          </Paper>
          <Paper style={styles} className="sidebarduedatedsg open">
            <Typography variant="body2" className="greytext sidebaropenfont">
              Line of Business
            </Typography>
            <Tooltip
              variant="dark"
              body={isLinebusinessTooltipHalfscreen ? lineOfBusiness : null}
              placement="bottom"
            >
              <Typography
                variant="body2"
                className={
                  isOpen
                    ? windowSize < 641
                      ? 'boldtext halfscreen-header-ellipses-blade'
                      : 'boldtext sidebaropenfont'
                    : 'boldtext halfscreen-header-ellipses'
                }
                ref={linebusinesshalfscreen}
              >
                {lineOfBusiness || placeholder}
              </Typography>
            </Tooltip>
          </Paper>
          <Paper style={styles} className="sidebarduedatedsg open">
            <Typography variant="body2" className="greytext sidebaropenfont">
              IQVIA Biotech
            </Typography>
            <Typography variant="body2" className="boldtext sidebaropenfont">
              {iqviaBiotech || placeholder}
            </Typography>
          </Paper>
          <Paper style={styles} className="sidebarduedatedsg open">
            <Typography variant="body2" className="greytext sidebaropenfont">
              Phase
            </Typography>
            <Typography variant="body2" className="boldtext sidebaropenfont">
              {phase ? phase.split(' ')[1] : placeholder}
            </Typography>
          </Paper>
          <Paper style={styles} className="sidebarduedatedsg open">
            <Typography variant="body2" className="greytext sidebaropenfont">
              Therapeutic Area
            </Typography>
            <Tooltip
              variant="dark"
              body={isTherapeuticTooltipHalfscreen ? therapeuticArea : null}
              placement="bottom"
            >
              <Typography
                variant="body2"
                className={
                  isOpen
                    ? windowSize < 641
                      ? 'boldtext halfscreen-header-ellipses-blade'
                      : 'boldtext sidebaropenfont'
                    : 'boldtext halfscreen-header-ellipses'
                }
                ref={therapeutichalfscreen}
              >
                {therapeuticArea || placeholder}
              </Typography>
            </Tooltip>
          </Paper>
          <Paper className="sidebarduedatedsg open" style={styles}>
            <Typography
              variant="body2"
              className="greytext lesslineheight sidebaropenfont"
            >
              Product Name
            </Typography>
            <Tooltip
              variant="dark"
              body={isProductTooltipHalfscreen ? productName : null}
              placement="bottom"
            >
              <Typography
                variant="body2"
                className={
                  isOpen
                    ? windowSize < 641
                      ? 'boldtext halfscreen-header-ellipses-blade'
                      : 'boldtext sidebaropenfont'
                    : 'boldtext halfscreen-header-ellipses'
                }
                ref={producthalfscreen}
              >
                {productName || placeholder}
              </Typography>
            </Tooltip>
          </Paper>
          <Paper className="sidebarduedatedsg open" style={styles}>
            <Typography
              variant="body2"
              className="greytext lesslineheight sidebaropenfont"
            >
              Protocol Number
            </Typography>
            <Tooltip
              variant="dark"
              body={isProtocolTooltipHalfscreen ? protocolNumber : null}
              placement="bottom"
            >
              <Typography
                variant="body2"
                className={
                  isOpen
                    ? windowSize < 641
                      ? 'boldtext halfscreen-header-ellipses-blade'
                      : 'boldtext sidebaropenfont'
                    : 'boldtext halfscreen-header-ellipses'
                }
                ref={protocolhalfscreen}
              >
                {protocolNumber || placeholder}
              </Typography>
            </Tooltip>
          </Paper>
          <Paper className="sidebarduedatedsg open" style={styles}>
            <Typography
              variant="body2"
              className="greytext lesslineheight sidebaropenfont"
            >
              Bid #
            </Typography>
            <p className="boldtext sidebaropenfont">{bidNo || placeholder}</p>
          </Paper>
          <Paper className="sidebarduedatedsg open" style={styles}>
            <Typography
              variant="body2"
              className="greytext lesslineheight sidebaropenfont"
            >
              Days Until Due
            </Typography>
            <p className="boldtext greencolorsidebaropenfont lesslineheight">
              {bidStatus ? 'Processing' : daysRemain}
            </p>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12} style={containerStyle}>
        <Grid item xs={1}>
          <Paper style={styles} className="duedatedsg">
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
          </Paper>
        </Grid>
        <Grid item xs={3} style={containerStyle}>
          <Grid item xs={5}>
            <Paper style={styles} className="duedatedsg">
              <Typography variant="body2" className="greytext">
                Customer
              </Typography>
              <Tooltip
                variant="dark"
                body={isCustomerTooltip ? Customer : null}
                placement="bottom"
              >
                <Typography
                  variant="body2"
                  className="boldtext header-ellipses"
                  ref={customer}
                >
                  {Customer || placeholder}
                </Typography>
              </Tooltip>
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper style={styles} className="phasedsg duedatedsg">
              <Typography variant="body2" className="greytext">
                Line of Business
              </Typography>
              <Tooltip
                variant="dark"
                body={isLinebusinessTooltip ? lineOfBusiness : null}
                placement="bottom"
              >
                <Typography
                  variant="body2"
                  className="boldtext header-ellipses"
                  ref={linebusiness}
                  sty
                >
                  {lineOfBusiness || placeholder}
                </Typography>
              </Tooltip>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={3} style={containerStyle}>
          <Grid item xs={3}>
            <Paper style={styles} className="duedatedsg">
              <Typography variant="body2" className="greytext">
                IQVIA Biotech
              </Typography>
              <Typography variant="body2" className="boldtext">
                {iqviaBiotech || placeholder}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper style={styles} className="duedatedsg">
              <Typography variant="body2" className="greytext">
                Phase
              </Typography>
              <Typography variant="body2" className="boldtext">
                {phase ? phase.split(' ')[1] : placeholder}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper style={styles} className="duedatedsg">
              <Typography variant="body2" className="greytext">
                Therapeutic Area
              </Typography>
              <Tooltip
                variant="dark"
                body={isTherapeuticTooltip ? therapeuticArea : null}
                placement="bottom"
              >
                <Typography
                  variant="body2"
                  className="boldtext header-ellipses"
                  ref={therapeutic}
                >
                  {therapeuticArea || placeholder}
                </Typography>
              </Tooltip>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={3} style={containerStyle}>
          <Grid item xs={5}>
            <Paper style={styles} className="duedatedsg">
              <Typography variant="body2" className="greytext">
                Product Name
              </Typography>
              <Tooltip
                variant="dark"
                body={isProductTooltip ? productName : null}
                placement="bottom"
              >
                <Typography
                  variant="body2"
                  className="boldtext header-ellipses"
                  ref={product}
                >
                  {productName || placeholder}
                </Typography>
              </Tooltip>
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper style={styles} className="duedatedsg">
              <Typography variant="body2" className="greytext">
                Protocol Number
              </Typography>
              <Tooltip
                variant="dark"
                body={isProtocolTooltip ? protocolNumber : null}
                placement="bottom"
              >
                <Typography
                  variant="body2"
                  className="boldtext header-ellipses"
                  ref={protocol}
                >
                  {protocolNumber || placeholder}
                </Typography>
              </Tooltip>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={2} style={containerStyle}>
          <Grid item xs={4}>
            <Paper style={styles} className="duedatedsg">
              <Typography variant="body2" className="greytext">
                Bid #
              </Typography>
              <Typography variant="body2" className="boldtext">
                {bidNo || placeholder}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className="duedatedsg" style={styles}>
              <Typography variant="body2" className="greytext lesslineheight">
                Days Until Due
              </Typography>
              <p className="boldtext greencolor lesslineheight">
                {bidStatus ? 'Processing' : daysRemain}
              </p>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const UnityGrid = props => {
  return loadSidebar(props);
};

export default UnityGrid;
