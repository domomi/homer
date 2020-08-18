import React, { Component, Fragment } from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import { withAuth0 } from '@auth0/auth0-react';
import { InputLabel, TextField } from '@material-ui/core';
import Goals from './Components/Goals/Goals'
import StripeAPI from './Components/StripeAPI/InjectedCheckoutForm'

import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js';


const styles = {
    UploadDraggableBox: {
        maxHeight: '90vh',
        width: '95vw',
        color: 'white',
        backgroundColor: 'rgba(44,44,44,0.7)',
        position: 'relative',
        zIndex: '5',
        margin: '0 3vw 0 3vw'


    }
    ,
    ButtonContainer: {
        display: 'inline-flex'
    },
    moreFunctionsBtn: {
        fontSize: '12pt',
        background: 'rgb(200,100,5)',
        color: 'white',
        margin: '15vh 5vw 5vh'
    },

    noticeP: {
        margin: '8vh 15vw 5vh 15vw ',
        fontSize: '8pt'
    },
    closeBtn: {
        fontWeight: '600'
    },

    // Beacon Instructions
    beaconInstructionsBtnDiv: {
        // textAlign: 'center',
        // display: 'flex',
        // flexDirection: 'column'
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    middleButtonsDiv: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'inline-flex',
        flexDirection: 'row'
    },

    // Beacon Setup
    beaconConfigurationDiv: {
        margin: '0 3vw 0 3vw',
        position: 'fixed',
        bottom: '0',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column'
    },

    setupBeaconText: {
        color: 'black',
    },

    radiusModeSpan: {
        color: 'black'
    },

    radiusDescription: {
        color: 'black',
        fontWeight: 500
    },
    descriptionContainer: {
        minWidth: '85%',
        maxWidth: '85%',
        display: 'inline-flex',
        textAlign: 'left'
    },
    radio: {
        float: 'right',
        marginTop: '40px'
    },

    onIt: {
        // background : 'green'
        textAlign: 'center',
        display: 'block',
        width: '100%'
    },
    beaconBtn: {
        textAlign: 'center'
    },

    draggableVideos: {
        zIndex: '5',
        flexDirection: 'row',
        display: 'flex',
        width: '95vw',
        margin: '0',
        maxWidth: '95vw',
        flexWrap: 'wrap'
    }
}

class Profile extends Component {
    render() {
        const { classes } = this.props
        return (
            <div>
                <Typography variant='h5' component='h4'>My Profile</Typography>

                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Name" />
                    <Goals />
                    {/* <TextField id="filled-basic" label="Goals" variant="filled" /> */}
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </form>

                <Fragment>
                    <ElementsConsumer>
                        {({ elements, stripe }) => (
                            <StripeAPI elements={elements} stripe={stripe} />
                        )}
                    </ElementsConsumer>
                </Fragment>
                
            </div>
        )
    }
}
export default withStyles(styles, { withTheme: true })(withAuth0(Profile))