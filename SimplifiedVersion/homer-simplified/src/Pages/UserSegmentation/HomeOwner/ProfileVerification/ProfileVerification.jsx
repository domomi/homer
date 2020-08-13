import React, { Component } from 'react'
import $ from 'jquery'

import { Typography } from '@material-ui/core'

// Auth0
import { useAuth0 } from '@auth0/auth0-react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'



const useStyles = makeStyles((theme) => ({
    LoginBtn: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '15vh'
    },

    root: { textAlign: 'center' },

    instruction: {
        marginTop: '5vh',
        marginBottom: '5vh',
    },
    NewHere: {
        marginTop: '15vh'
    },
    Returing: {
        marginTop: '10vh'
    },
    form: {
        marginTop: '10vh',
        display: 'block'
    }
}))

const currencies = [
    {
        value: 'Renter',
        label: 'Renter',
    },
    {
        value: 'Home Owner',
        label: 'Home Owner',
    },

];

export default function ProfileVerification(props) {
    const {
        // isLoading,
        // error,
        user,
        // loginWithRedirect,
        // logout,
        isAuthenticated,
      } = useAuth0();
    const [currency, setCurrency] = React.useState('EUR');
    const classes = useStyles();
    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const submitForm = (e) => {
        // e.preventDefault()
        console.log(document.getElementById('register_form'))
        let data = new FormData(document.getElementById('register_form'))
        // data.append(user)
        fetch('http://localhost:3002/getStarted', {
            method: 'POST',
            body: user,
            headers: {
                "Content-Type": "application/json"
            }
          });
     
     
      
    }


    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography component='h4' variant='h4' style={{ marginTop: '10vh' }}>Getting Started</Typography>
                <Typography component='h5' className={classes.instruction} variant='h5'>A few blanks to fill </Typography>
            </div>

            <form id='register_form' onSubmit={submitForm} className={classes.form} action='http://localhost:3002/getStarted' method='POST'>

                <TextField name='user_name' required id="standard-required" label="Name" defaultValue="" style={{ marginBottom: '3vh' }} />
                <br />
                <TextField name='user_role'
                    id="filled-select-currency"
                    select
                    required
                    label="Select"
                    value={currency}
                    onChange={handleChange}
                    helperText="Primary Role"
                    variant="filled"
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <br />
                <TextField name='user_city'
                required 
                id="standard-required"
                label="City you are looking in"
                defaultValue=""
                style={{ marginBottom: '3vh' }} />
                <br />
                <input type='submit' onclick="window.location='/my/link/location';"/>
                {/* <Button variant='contained' onClick={(e) => submitForm(e)}>Submit</Button> */}
            </form>
        </div>
    )

}

