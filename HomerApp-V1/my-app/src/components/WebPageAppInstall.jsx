import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import bellsvg from './WebPageAppInstall/img/bell.svg'
export default function WebPageAppInstall() {

    const theme = useTheme();
    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: theme.palette.background.paper,
            maxWidth: '100vw',
        },

        conciergeDiv: {
            display: 'inline-flex'
        },

        bellIcon: {
            maxWidth: '15px'
        },

        buttonDiv: {
            display: 'grid',
            // flexDirection: 'column',
            // textAlign : 'center',
            justifyItems: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        buttons: {
            minWidth: '50vw',
            marginTop: '1vh',
            maxWidth: '50vw'

        }
    }));
    const classes = useStyles();
    return (
        <Fragment>
            <Route exact path='/WebPageAppInstall'
                render={props =>
                    <Fragment>
                        <h2>Homer</h2>
                        <div className={classes.conciergeDiv}>
                            <img src={bellsvg} className={classes.bellIcon} />
                            <p>Concierge</p>
                        </div>
                        <div>
                            <p>Welcome to Homer!</p>
                            <p>How would you like me to connect you?</p>
                        </div>
                        <div className={classes.buttonDiv}>
                            <Button className={classes.buttons} variant="contained" color="primary">
                                Email
                                </Button>

                            <Button className={classes.buttons} variant="contained" color="primary">
                                Phone Number
                                </Button>

                            <Button className={classes.buttons} variant="contained" color="primary">
                                Google
                                </Button>
                        </div>
                    </Fragment >
                } />

            {/* Install by email */}
            <Route exact path='/AppInstallEmail'
                render={props =>
                    <Fragment>
                        <h2>Homer</h2>
                        <div className={classes.conciergeDiv}>
                            <img src={bellsvg} className={classes.bellIcon} />
                            <p>Concierge</p>
                        </div>
                        <div>
                            <p>Welcome to Homer!</p>
                            <p>How would you like me to connect you?</p>
                        </div>
                        <div className={classes.buttonDiv}>
                            <Button className={classes.buttons} variant="contained" color="primary">
                                EMAIL ME THE APP
                            </Button>
                        </div>
                    </Fragment >
                }
            />

            {/* Install by email */}
            <Route exact path='/AppInstallPhone'
                render={props =>
                    <Fragment>
                        <h2>Homer</h2>
                        <div className={classes.conciergeDiv}>
                            <img src={bellsvg} className={classes.bellIcon} />
                            <p>Concierge</p>
                        </div>
                        <div>
                            <p>Welcome to Homer!</p>
                            <p>How would you like me to connect you?</p>
                        </div>
                        <div className={classes.buttonDiv}>
                            <Button className={classes.buttons} variant="contained" color="primary">
                                Email
                                </Button>

                            <Button className={classes.buttons} variant="contained" color="primary">
                                Phone Number
                                </Button>

                            <Button className={classes.buttons} variant="contained" color="primary">
                                Google
                                </Button>
                        </div>
                    </Fragment >
                }
            />


        </Fragment>
    )

}
