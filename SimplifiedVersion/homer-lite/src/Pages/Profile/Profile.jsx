import React, { Fragment, useState } from 'react'

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import { useAuth0 } from '@auth0/auth0-react';
import { InputLabel, TextField, Button } from '@material-ui/core';

import { Redirect } from 'react-router-dom'


// My Components
import StripeAPI from './Components/StripeAPI/InjectedCheckoutForm'
import Goals from './Components/Goals/Goals'

import $ from 'jquery'

// Stripe API
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// import store from '../../redux/store';



const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');


const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    },
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
    },
    StripeAPI: {
        position: 'absolute',
        bottom: '50px',
        // fontSize : '1px'
        width: '100vw',
        height: '10vh'

    }
})

export default function Profile() {
    const classes = useStyles()
    const { user } = useAuth0()
    const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

    const [redirectMapRole, setRedirectToMap] = useState('which role?')

    const redirectToMap = () => {
        let data = {user_email : user.email}
        $.ajax({
            type: "POST",
            url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/getUserWholeProfile`,
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.user_role === 'Renter') {
                    setRedirectToMap('Renter')
                }
                else if (response.user_role === 'Home Owner') {
                    setRedirectToMap('Home Owner')
                }        
            }
        });
     

    }

    return (

        <div className={classes.root}>

            <Typography variant='h5' component='h4'>My Profile</Typography>

            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Name" />
                <Goals />

            </form>


            <div className={classes.StripeAPI}>
                <Elements stripe={stripePromise}>
                    <StripeAPI />
                </Elements>
            </div>

            <button style={{ background: 'blue', color: 'white' }} onClick={redirectToMap}>Go to Homer Map</button>

            {redirectMapRole === 'Renter' && <Redirect to='/RenterMap' />}
            {redirectMapRole === 'Home Owner' && <Redirect to='/HomeOwnerMap' />}


        </div>
    )
}
