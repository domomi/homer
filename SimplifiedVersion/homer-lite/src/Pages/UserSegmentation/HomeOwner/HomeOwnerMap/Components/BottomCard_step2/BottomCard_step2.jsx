import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ConfigurationModal_step2 from './ConfigurationModal_step2/ConfigurationModal_step2'
const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: '100vw',
        width: '100vw',
        textAlign: 'center'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    buttonContainer : {
        textAlign : 'center',
        width : '100vw'
    }
});

export default function OutlinedCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent >

                <Typography variant="h5" component="h2">
                    Congradulations! <br /> 
                 </Typography>

                 <Typography variant="body1" component="p">
                   Your listing is live, <br />
                   renters can now <br /> 
                   contact you. 
                 </Typography>

            </CardContent>
            <CardActions >
                <div className={classes.buttonContainer} >
                     <ConfigurationModal_step2 />
                </div>
                
            </CardActions>
        </Card>
    );
}