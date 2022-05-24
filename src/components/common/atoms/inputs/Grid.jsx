import React from 'react';
import Grid from 'apollo-react/components/Grid';
import Paper from 'apollo-react/components/Paper';
import { Typography } from 'apollo-react/components/Typography/Typography';
import { parseMomentDate, remainingDays } from '../../../../utils/DateUtils';

const styles = {
    padding: 10,
};

const loadSidebar = (props) => {
    const { data, isOpen, bidStatus } = props;
    const {
        'Bid due date': bidDueDate,
        Phase: phase,
        'Product name': productName,
        'Is this IQVIA Biotech': iqviaBiotech,
        'Line of business': lineOfBusiness,
        'Protocol number': protocolNumber,
        'Therapeutic area': therapeuticArea,
        'CRM #': crm,
        'Customer': Customer,
        bidNo
    } = data;
    const placeholder = 'No data';
    const date = bidDueDate && parseMomentDate(bidDueDate);
    const daysRemain = remainingDays(date)
   
    if (isOpen) {
        return (
            <Grid container >
                <Grid container xs={12}>
                    <Paper style={styles} className="sidebarduedatedsg open">
                        <Typography variant="body2" className="greytext sidebaropenfont">Opportunity Number</Typography>
                        <Typography variant="body2" className="boldtext sidebaropenfont">{crm || placeholder}</Typography>
                    </Paper>
                    <Paper style={styles} className="sidebarduedatedsg open">
                        <Typography variant="body2" className="greytext sidebaropenfont">Customer</Typography>
                        <Typography variant="body2" className="boldtext sidebaropenfont">{Customer || placeholder}</Typography>
                    </Paper>
                    <Paper style={styles} className="sidebarduedatedsg open">
                        <Typography variant="body2" className="greytext sidebaropenfont">Line of Business</Typography>
                        <Typography variant="body2" className="boldtext sidebaropenfont">{lineOfBusiness || placeholder}</Typography>
                    </Paper>
                    <Paper style={styles} className="sidebarduedatedsg open">
                        <Typography variant="body2" className="greytext sidebaropenfont">IQVIA Biotech</Typography>
                        <Typography variant="body2" className="boldtext sidebaropenfont">{iqviaBiotech || placeholder}</Typography>
                    </Paper>
                    <Paper style={styles} className="sidebarduedatedsg open">
                        <Typography variant="body2" className="greytext sidebaropenfont">Phase</Typography>
                        <Typography variant="body2" className="boldtext sidebaropenfont">{phase ? phase.split(' ')[1] : placeholder}</Typography>
                    </Paper>
                    <Paper style={styles} className="sidebarduedatedsg open">
                        <Typography variant="body2" className="greytext sidebaropenfont">Therapeutic Area</Typography>
                        <Typography variant="body2" className="boldtext sidebaropenfont">{therapeuticArea || placeholder}</Typography>
                    </Paper>
                    <Paper className="sidebarduedatedsg open" style={styles}>
                        <Typography variant="body2" className="greytext lesslineheight sidebaropenfont">Product Name</Typography>
                        <p className="boldtext sidebaropenfont" >{productName || placeholder}</p>
                    </Paper>
                    <Paper className="sidebarduedatedsg open" style={styles}>
                        <Typography variant="body2" className="greytext lesslineheight sidebaropenfont">Protocol Number</Typography>
                        <p className="boldtext sidebaropenfont" >{protocolNumber || placeholder}</p>
                    </Paper>
                    <Paper className="sidebarduedatedsg open" style={styles}>
                        <Typography variant="body2" className="greytext lesslineheight sidebaropenfont">Bid #</Typography>
                        <p className="boldtext sidebaropenfont" >{bidNo || placeholder}</p>
                    </Paper>
                    <Paper className="sidebarduedatedsg open" style={styles}>
                        <Typography variant="body2" className="greytext lesslineheight sidebaropenfont">Days Until Due</Typography>
                        <p className="boldtext greencolorsidebaropenfont lesslineheight" >{bidStatus ? 'Processing' : daysRemain}</p>
                    </Paper>
                </Grid>
                
            </Grid>
        )
    }else{
        return (
            <Grid container >
                <Grid container xs={4}>
                    <Grid item xs={3}>
                        <Paper style={styles} className="duedatedsg">
                            <Typography variant="body2" className="greytext">Opportunity Number</Typography>
                            <Typography variant="body2" className="boldtext">{crm || placeholder}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper style={styles} className="duedatedsg">
                            <Typography variant="body2" className="greytext">Customer</Typography>
                            <Typography variant="body2" className="boldtext">{Customer || placeholder}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper style={styles} className="phasedsg">
                            <Typography variant="body2" className="greytext leftalign">Line of Business</Typography>
                            <Typography variant="body2" className="boldtext leftalign">{lineOfBusiness || placeholder}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper style={styles} className="duedatedsg">
                            <Typography variant="body2" className="greytext">IQVIA Biotech</Typography>
                            <Typography variant="body2" className="boldtext">{iqviaBiotech || placeholder}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container xs={6}>
                    <Grid item xs={2}>
                        <Paper style={styles} className="duedatedsg" >
                            <Typography variant="body2" className="greytext">Phase</Typography>
                            <Typography variant="body2" className="boldtext">{phase ? phase.split(' ')[1] : placeholder}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper style={styles} className="duedatedsg">
                            <Typography variant="body2" className="greytext">Therapeutic Area</Typography>
                            <Typography variant="body2" className="boldtext">{therapeuticArea || placeholder}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper style={styles} className="duedatedsg">
                            <Typography variant="body2" className="greytext">Product Name</Typography>
                            <Typography variant="body2" className="boldtext">{productName || placeholder}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper style={styles} className="duedatedsg">
                            <Typography variant="body2" className="greytext">Protocol Number</Typography>
                            <Typography variant="body2" className="boldtext">{protocolNumber || placeholder}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper style={styles} className="duedatedsg">
                            <Typography variant="body2" className="greytext">Bid #</Typography>
                            <Typography variant="body2" className="boldtext">{bidNo || placeholder}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container xs={2}>
                    <Grid item xs={12}>
                        <Paper className="duedatedsg" style={styles}>
                            <Typography variant="body2" className="greytext lesslineheight">Days Until Due</Typography>
                            <p className="boldtext greencolor lesslineheight" >{bidStatus ? 'Processing' : daysRemain}</p>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}


const UnityGrid = (props) => {
    return (
        <>
            <>{loadSidebar(props)}</>
        </>
    )
}

export default UnityGrid;