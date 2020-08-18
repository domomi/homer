import React, {useEffect} from 'react'
import LoginBtn from './Components/LoginBtn'
import SignUpBtn from './Components/SignUpBtn'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useAuth0 } from '@auth0/auth0-react';
const useStyles = makeStyles((theme) => ({
    LoginBtn: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '15vh'
    },

    root: { textAlign: 'center' },

    SignUpBtn: {
        color: theme.palette.secondary.main,
        backgroundColor : 'red'
    },
    NewHere : {
        marginTop : '15vh'
    },
    Returing : {
        marginTop : '10vh'
    }
}))


export default function LoginPage(props) {
    const classes = useStyles();
    const { user ,isAuthenticated} = useAuth0();
    useEffect(()=>{

        console.log('using Effect')
        console.log(user)
        console.log('isAuthenticated')
        console.log(isAuthenticated)
        console.log(props)
    })
    return (
        <div className={classes.root}>
            <Typography variant='h4' style={{marginTop : '10vh'}}>
                Connect🏘️
            </Typography>

            <div className={classes.Returing}>
                <Typography>
                    Returning?
            </Typography>

                <LoginBtn text='Login' className={classes.LoginBtn} />
            </div>

            <div className={classes.NewHere}>
                <Typography>
                    New Here?
            </Typography>

                <SignUpBtn text='Get Started' className={classes.SignUpBtn} />
            </div>

        </div>
    )
}
