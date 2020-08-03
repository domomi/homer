import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography,Button } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';
import $ from 'jquery'

import {Route, Link } from 'react-router-dom';
import CoralPng from './LandingPage/Coral.png'
import ShellSvg from './LandingPage/Shell.svg'
import StarfishSvg from './LandingPage/Starfish.svg'
import UserSegmentation from './LandingPage/UserSegmentation'


const useStyles = makeStyles((theme) => ({

    coralPic : {
        maxWidth : '33vw',
        borderRadius : '100px',
        maxHeight : '33vw',
    },

    root: {

        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        // padding: theme.spacing(1),
        width: '100vw',
        textAlign: 'center'
    },
    top: {
        color: 'white',
        width: '100vw',
        background: 'rgb(80,202,253)',
        minHeight : '40vh'
    },
    mid: {
        width: '100vw',
        background: 'rgb(245,248,250)'
    },
    bottom: {
        textAlign: 'left',
        background: 'rgb(80,202,253)'
    },
    OurMotto: {
        marginTop : '15vh'
    },
    HomerOSS: {
        textAlign: 'left'
    },
    UserSegmentation : {
        display : 'none'
    }

}));


const theme = createMuiTheme({
    props: {
        MuiTypography: {
            variantMapping: {
                h1: 'h2',
                h2: 'h2',
                h3: 'h2',
                h4: 'h2',
                h5: 'h2',
                h6: 'h2',
                subtitle1: 'h2',
                subtitle2: 'h2',
                body1: 'span',
                body2: 'span',
            },
        },

    },
});

$(document).ready(() => {

})



export default function LandingPage() {
    const classes = useStyles();
    useEffect(() => {
        $('.header').remove()
        $('#bottomNavBar').remove()
        $('body  *').css('max-width', "100vw")
    }, [])
    return (
        <div className={classes.root}>
            <div id='top' className={classes.top}>
            <Typography variant="h5" component="h4" className={classes.HomerOSS}><b>@HomerOSS</b></Typography>
                <Typography variant="h4" component="h4"><b>Homer Open Source</b></Typography>
            </div>

            <div id='segmentationCard'>
                <Link  to='/LandingPage/UserSegmentation' style={{ textDecoration: 'none' }}> <Button  variant="contained" color="primary">Find Homer Entrance</Button> </Link>

                <Route className={classes.UserSegmentation} exact path='/LandingPage/UserSegmentation'  component={UserSegmentation} />
                
            </div>

            <div id='mid' className={classes.mid}>
            <Typography variant="h4" component="h4" className={classes.OurMotto}><b>#OurMotto</b></Typography>
               
                <div>
                    <img src={CoralPng} alt='Coral.png' className={classes.coralPic}/>
                    
                <Typography variant="h5" component="h4"><b>Heat</b></Typography>

                    <div>
                        <Typography variant="body1" component="p">Create require specific elements:</Typography>
                        <p>We create heat by working</p>
                        <p>Contributions, bug fixes, designs, documentation - collaborative work helps our community move forward.</p>
                    </div>
                </div>

                <div>
                <img src={ShellSvg} alt='Shell.png' className={classes.coralPic}/>
                    
                    <Typography variant="h5" component="h4"><b>Light</b></Typography>
                    <div>
                        <Typography variant="body1" component="p">Create require specific elements:</Typography>
                        <p>We create heat by working</p>
                        <p>Contributions, bug fixes, designs, documentation - collaborative work helps our community move forward.</p>
                    </div>
                </div>

                <div>
                <img src={StarfishSvg} alt='Starfish.svg' className={classes.coralPic}/>
                    
                    <Typography variant="h5" component="h4"><b>Love</b></Typography>
                    <div>
                        <Typography variant="body1" component="p">Create require specific elements:</Typography>
                        <p>We create heat by working</p>
                        <p>Contributions, bug fixes, designs, documentation - collaborative work helps our community move forward.</p>
                    </div>
                </div>
                <Typography variant="h4" component="h4"><b>#OurProjects</b></Typography>
                <p>Homer has been built on open source projects ssince our beginning. We welcome all people to explore and contribute!</p>
                <div>


                </div>
            </div>

            <div id='bottom' className={classes.bottom}>
                <p>#Connect</p>
                <p>#Projects</p>
                <p>#Crew</p>
                <p>#Shiplog</p>
            </div>


        </div>
    )
}
