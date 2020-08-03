import React, { Component } from 'react'
import VideoDisplay from './ViewPosts/VideoDisplay'
import { withStyles, withTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Divider from '@material-ui/core/Divider';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';


import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    instructionOverly: {
        fontSize: '22pt',
        color: 'white',
        background: 'rgba(50,50,50,0.8)',
        position: 'fixed',
        top: '100px',
        minHeight: '150vh',

        // width: 'fit-content',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,


        '& svg': {
            margin: theme.spacing(1.5),
        },
        '& hr': {
            margin: theme.spacing(0, 0.5),
        },


    },
    leftHalf: {
        position: 'fixed',
        maxWidth: '50vw',
        float: 'left',
        minWidth: '40vw',
        top: '40%'
    },
    rightHalf: {
        position: 'fixed',
        minWidth: '40vw',
        maxWidth: '50vw',
        left: '50%',
        top: '40%'
    },
    Divider: {
        position: 'fixed',
        left: '50%'
    },

    instructionCard: {
        textAlign: 'center',
        borderStyle: 'groove',
        position: 'fixed',
        left: '2.5vw',
        top: '150px',
        minHeight: '35vh',
        maxWidth: '95vw',
        background: 'rgba(245,245,245,0.95)'
    },
    media: {
        height: 140,
    },
    getStartedBtn: {

    },
    skipBtn: {
        background: 'grey',
        color: 'white'
    },
    instructionCardSavingFavourite : {
        // textAlign: 'center',
        borderStyle: 'groove',
        position: 'fixed',
        left: '2.5vw',
        top: '150px',
        minHeight: '35vh',
        maxWidth: '95vw',
        background: 'rgba(245,245,245,0.95)'
    }
})

class ViewPosts extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        // 
        this.state = {
            showTutorialBool: true,
            instructionStep: 1,
        }
    }

    componentDidMount() {
        // Check if the user needs to watch the tutorial.

    }

    hideInstructionDiv() {
        this.setState({ showTutorialBool: false })
    }

    goBack() {
        if (this.state.instructionStep == 2) {
            this.setState({ instructionStep: 1 })
        }
        else if (this.state.instructionStep == 3) {
            this.setState({ instructionStep: 2 })
        }
        else if (this.state.instructionStep == 4) {
            this.setState({ instructionStep: 3 })
        }
    }
    getStarted() {
        this.setState({ instructionStep: 2 })
    }
    skip() {
        this.setState({ showTutorialBool: false })
    }





    render() {
        const { classes } = this.props;
        return (
            <div>

                <Button variant="outlined" color="tertiary" onClick={() => this.goBack()}> < ArrowBackIosIcon color="tertiary" /> </Button>


                <p>This page is just a functional display other pages that has such a function will be developed later
                </p>
                <p>Let's say we are viewing a display with an ID of</p>
                <span>test111</span>
                <VideoDisplay post_id='test111' />


                {this.state.instructionStep === 1 && this.state.showTutorialBool &&
                    <Card className={classes.instructionCard}>
                        <CardActionArea>

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2"> Learning the Basics </Typography>
                                <Typography variant="body1" color="textSecondary" component="p"> Homer will help find your perfect home! </Typography>
                                <Typography variant="body2" color="textSecondary" component="p"> You can see more details about the home by selecting the preview card, or any home marker you see on the map </Typography>
                            </CardContent>

                        </CardActionArea>
                        <CardActions>
                            <Button variant='contained' size="large" color="secondary" onClick={() => this.getStarted()} className={classes.getStartedBtn}>Get Started!</Button>
                            <Button variant='outlined' size="large" color="secondary" onClick={() => this.skip()} className={classes.skipBtn}><b>Skip</b></Button>
                        </CardActions>
                    </Card>

                }


                {this.state.instructionStep === 2 && this.state.showTutorialBool &&

                    <Grid container alignItems="center" className={classes.instructionOverly} onClick={() => this.setState({instructionStep : 3})}>

                        <div id='leftHalf' className={classes.leftHalf}>
                            <p>Swipe right to see previous video</p>
                            <ArrowForwardIcon />
                        </div>
                        <Divider orientation="vertical" flexItem className={classes.Divider} />
                        <div id='rightHalf' className={classes.rightHalf}>
                            <p>Swipe left to see next video</p>
                            <ArrowBackIcon />
                        </div>


                    </Grid>
                }


                {this.state.instructionStep === 3 && this.state.showTutorialBool &&
                    <Card className={classes.instructionCardSavingFavourite}>
                        <CardActionArea>

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2"> Saving favourite homes </Typography>
                                <Typography variant="body1" color="textSecondary" component="p">
                                    Use the 'favourite' button shaped like a heart to save your favourite homes in your profile
                                  </Typography>
                                  <br />
                                <Typography variant="body1" color="textSecondary" component="p">
                                    Quick-actions make it easy to schedule in-person tours,<br />
                                 sending rental applications and contacting the homeowner.
                                  </Typography>
                                  <br />
                                <Typography variant="body1" color="textSecondary" component="p">
                                    Give it a try!
                                  </Typography>
                            </CardContent>

                        </CardActionArea>
                        <CardActions>
                            <Button variant='contained' size="large" color="secondary" onClick={() => this.setState({instructionStep : 4})} className={classes.continueBtn}>Continue</Button>
                            <Button variant='outlined' size="large" color="secondary" onClick={() => this.skip()} className={classes.skipBtn}><b>Skip</b></Button>
                        </CardActions>
                    </Card>

                }




            </div>
        )
    }
}
export default withStyles(styles, { withTheme: true })(ViewPosts);