import React, { Component, useEffect, useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'

import { connect } from "react-redux";
import { Typography } from '@material-ui/core'

// Auth0
import { useAuth0 } from '@auth0/auth0-react';

import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'

// redux
// import { fetchUserObj } from '../../redux/reducers/reducer'
import {getStarted} from '../../actions/profileActions'

import store from '../../redux/store';


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
    },
    usePreviousQuestionDiv : {
        position : 'relative',
        top : '30vh',
        textAlign : 'center'

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

function GetStarted(props) {
    const {
        // isLoading,
        // error,
        user,
        // loginWithRedirect,
        // logout,
        isAuthenticated,
    } = useAuth0();

    const [returningUserBool, setReturning] = useState(false)

    const [newSettingsBool, setNewSettings] = useState(true)

    const [firstTimeBool, setFirstTime] = useState(true)

    useEffect(() => {

        // If user does not exist,
        // redirects to the login page

        setNewSettings(true)

        console.log('user obj')
        console.log(user)

        console.log('isAuthenticated?')
        console.log(isAuthenticated)

        let data = { user: user }

        console.log(data)
        $.when(user).then(() => {
            
            $.ajax({
                type: "POST",
                url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/getUserWholeProfile`,
                data: data,
                // processData: false,
                dataType: 'json',
                success: function (response) {
                    console.log(response)
                    // props.fetchUserObj(response)

                    if (response) {
                        console.log('the user exists in the database')
                        if (response.user_role) {
                            setReturning(true)
                            setNewSettings(false)
                        }

                    }
                },
                error: (e) => {
                    console.log(e)

                    setReturning(false)
                }
            })

        })


    }, [user])

    // 
    const [redirectToLoginBool, setRedirect] = useState(false)

    // Redirect to profile page.
    const [redirectToProfileBool, setRedirectToProfile] = useState(false)

    const [role, setRole] = React.useState('EUR');

    const [user_role, setUserRole] = useState('which role?');




    const classes = useStyles();

    const onLoadAction = () => {

    }

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const submitForm = (e) => {
        console.log('submitted getStarted')
        console.log('the user is submitting the files')
        

        e.preventDefault()

        console.log((document.getElementById('register_form')))
        let formData = new FormData(document.getElementById('register_form'))
        // JSON.stringify(Object.fromEntries(data));

        formData.append('name', user.name)
        formData.append('email', user.email)
        formData.append('email_verified', user.email_verified)
        formData.append('picture', user.picture)
        formData.append('sub', user.sub)
        formData.append('updated_at', user.updated_at)
        let data = Object.fromEntries(formData)

        let user_city = $('#user_city_input').val()
        let user_role = $('#filled_select_role').html()
        
        console.log('user_role')
        console.log(user_role)

        props.getStarted(user.name,user_role,user_city)

        $.ajax({
            type: "POST",
            url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/getStarted`,
            data: data,
            // processData: false,
            dataType: 'text',
            success: function (response) {
                // props.fetchUserObj(user)
                if (response == 'Renter') {
                    setUserRole('Renter')
                }
                else if (response == 'Home Owner') {
                    setUserRole('Home Owner')
                }

            },
            error: (e) => {
                console.log(e)
            }
        });


    }


    const handleUsePreviousSettings = () => {
        console.log('Previous()')
        // fetch previous settings from the database 
        // GO back to the Profile Page

        setRedirectToProfile(true)

    }

    const handleUseNewSettings = () => {
        console.log('handleUseNewSettings')
        setReturning(false)
        setNewSettings(true)
        setFirstTime(true)
    }

    return (
        <div className={classes.root}>

            {/* Use previous settings? */}
            {returningUserBool &&
                <Fragment>
                    <div className={classes.usePreviousQuestionDiv}>
                        <Typography variant='h5' component='h4'>Welcome back,</Typography>
                        <Typography variant='body1' component='p'>Do you want to use previous Settings?</Typography>
                        
                        <Button vairant='contained' color='secondary' onClick={handleUsePreviousSettings}>Yes</Button>
                        <Button variant='outlined' color='primary' onClick={handleUseNewSettings}>No</Button>
                    
                    </div>
                </Fragment>

            }

            {redirectToProfileBool && <Redirect to='/Profile' />}

            {
                (newSettingsBool) &&
                <Fragment>
                    <div className={classes.title}>
                        <Typography component='h4' variant='h4' style={{ marginTop: '10vh' }}>Getting Started</Typography>
                        <Typography component='h5' className={classes.instruction} variant='h5'>A few blanks to fill </Typography>
                    </div>



                    <form id='register_form' onSubmit={submitForm} className={classes.form}
                    //  action='http://localhost:3002/getStarted' method='POST'
                    >

                        <TextField name='user_name' required id="standard-required" label="Name" defaultValue="" style={{ marginBottom: '3vh' }} />
                        <br />
                        <TextField name='user_role'
                            id="filled_select_role"
                            select
                            required
                            label="Select"
                            value={role}
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
                            id="user_city_input"
                            label="City you are looking in"
                            defaultValue=""
                            style={{ marginBottom: '3vh' }} />
                        <br />
                        <input type='submit' onclick="window.location='/my/link/location';" />
                        {/* <Button variant='contained' onClick={(e) => submitForm(e)}>Submit</Button> */}
                    </form>

                    {user_role === 'Renter' && <Redirect to='/RenterAttributes' />}
                    {user_role === 'Home Owner' && <Redirect to='/HomeOwnerPreference' />}
                    {/* {!isAuthenticated && <Redirect to='/'/>} */}
                </Fragment>
            }
        </div>
    )

}

export default connect(null, { getStarted })(GetStarted)
