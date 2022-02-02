import React from 'react';
import Grid from 'apollo-react/components/Grid';
import Paper from 'apollo-react/components/Paper';
import { Typography } from 'apollo-react/components/Typography/Typography';
import { parseMomentDate, remainingDays } from '../../../../utils/DateUtils';

const styles = {
    padding: 10,
};

const loadSidebar = (props) => {
    const { data, isOpen } = props;
    const {
        'Bid due date': bidDueDate,
        Phase: phase,
        'Product name': productName,
        'Protocol number': protocolNumber,
        'Therapeutic area': therapeuticArea,
        'CRM #': crm,
        'Customer': Customer
    } = data;
    const placeholder = 'No data';
    const date = bidDueDate && parseMomentDate(bidDueDate);
    const daysRemain = remainingDays(date);
    if (isOpen) {
        return (
            <Grid container >
                <Grid container xs={12}>
                    <Paper style={styles} className="duedatedsg open">
                        <Typography variant="body2" className="greytext">Protocol Name</Typography>
                        <Typography variant="body2" className="boldtext">{crm || placeholder}</Typography>
                    </Paper>
                    <Paper style={styles} className="duedatedsg open">
                        <Typography variant="body2" className="greytext">Account</Typography>
                        <Typography variant="body2" className="boldtext">{Customer || placeholder}</Typography>
                    </Paper>
                    <Paper style={styles} className="open">
                        <Typography variant="body2" className="greytext">Phase</Typography>
                        <Typography variant="body2" className="boldtext">{phase ? phase.split(' ')[1] : placeholder}</Typography>
                    </Paper>
                    <Paper style={styles} className="duedatedsg open">
                        <Typography variant="body2" className="greytext">Therapeutic Area</Typography>
                        <Typography variant="body2" className="boldtext">{therapeuticArea || placeholder}</Typography>
                    </Paper>
                    <Paper style={styles} className="duedatedsg open">
                        <Typography variant="body2" className="greytext">Product Name</Typography>
                        <Typography variant="body2" className="boldtext">{productName || placeholder}</Typography>
                    </Paper>
                    <Paper style={styles} className="duedatedsg open">
                        <Typography variant="body2" className="greytext">Due Date</Typography>
                        <Typography variant="body2" className="boldtext">{date || placeholder}</Typography>
                    </Paper>
                    <Paper className="duedatedsg open" style={styles}>
                        <Typography variant="body2" className="greytext lesslineheight">Days until Due</Typography>
                        <p className="boldtext greencolor lesslineheight" >{daysRemain || placeholder}</p>
                    </Paper>
                </Grid>
                
            </Grid>
        )
    }else{
        return (
            <Grid container >
                <Grid container xs={4}>
                    <Grid item xs={5}>
                        <Paper style={styles} className="duedatedsg">
                            <Typography variant="body2" className="greytext">Protocol Name</Typography>
                            <Typography variant="body2" className="boldtext">{crm || placeholder}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper style={styles} className="duedatedsg">
                            <Typography variant="body2" className="greytext">Account</Typography>
                            <Typography variant="body2" className="boldtext">{Customer || placeholder}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper style={styles} >
                            <Typography variant="body2" className="greytext">Phase</Typography>
                            <Typography variant="body2" className="boldtext">{phase ? phase.split(' ')[1] : placeholder}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container xs={3}>
                    <Grid item xs={6}>
                        <Paper style={styles} className="duedatedsg">
                            <Typography variant="body2" className="greytext">Therapeutic Area</Typography>
                            <Typography variant="body2" className="boldtext">{therapeuticArea || placeholder}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={styles} className="duedatedsg">
                            <Typography variant="body2" className="greytext">Product Name</Typography>
                            <Typography variant="body2" className="boldtext">{productName || placeholder}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container xs={5}>
                    <Grid item xs={3}>
                        <Paper style={styles} className="duedatedsg">
                            <Typography variant="body2" className="greytext">Due Date</Typography>
                            <Typography variant="body2" className="boldtext">{date || placeholder}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper className="duedatedsg" style={styles}>
                            <Typography variant="body2" className="greytext lesslineheight">Days until Due</Typography>
                            <p className="boldtext greencolor lesslineheight" >{daysRemain || placeholder}</p>
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