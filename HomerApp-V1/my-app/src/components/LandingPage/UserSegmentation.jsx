import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import $ from 'jquery'
import { Typography, Modal, Backdrop, Fade } from '@material-ui/core'
import { connect } from 'react-redux'
import {Route} from 'react-router-dom'
import { updateTemporaryUserInfo } from '../../actions/profileActions'

import RenterEntrance from './RenterEntrance'

import HomeOwnerEntrance from './HomeOwnerEntrance'



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        maxWidth: '80vw',
        textAlign: 'center',
        position: 'fixed',
        top: '3vh',
        marginLeft: '5vw',
        borderStyle: 'solid',
        borderWidth: '1px'
        // left : '15vw'
    },

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "scroll",
        paddingTop: '86vh',
        maxWidth: '95vw',
        marginLeft: '2.5vw'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

    landingPageIcons: {
        margin: 'auto',
        marginLeft: '3vw'
    }


})
);
function UserSegmentation(props) {
    const classes = useStyles();
    // When the page is loaded
    useEffect(() => {
        // Fetch user information
        fetch(`https://geolocation-db.com/json/`)
            .then(res => res.json())
            .then(json => {
                props.updateTemporaryUserInfo(json)
            })

        // .then((json) => {
        //     console.log(json)
        //     let data = {
        //         temporary_username : `${Date.now()} ${json.IPv4}`,
        //         temporary_userinfo : json,
        //         userIP : json.IPv4
        // }


        //     let post = $.ajax({
        //         type: "post",
        //         url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/temporary_user`,
        //         data: data,
        //         dataType: "text",
        //         success: function (response) {
        //             console.log(response)
        //             console.log('response')
        //         },
        //         error : (err) =>{
        //             console.log(err)
        //             console.log('err')
        //         } 
        //     });

        // })
    }, [])


    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    return (
        <div>


            <div className={classes.root}>
                <p>Join Homer Today!</p>
                <Typography variant="body2" component="h5" className={classes.OurMotto}><b>Homer_Progressive_WebApp</b></Typography>

                <div>
                    <button type="button" onClick={handleOpen}>
                        Get Started 
                     </button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            
                            <div className={classes.paper}>
                                <Typography id="transition-modal-title" variant="h5" component="h2" className={classes.OurMotto}><b>What brings you to Homer</b></Typography>

                                <p id="transition-modal-description">Select the option that best describes you!</p>

                                <RenterEntrance />

                                <Typography variant="body1" component="p" className={classes.OurMotto}>I'm a renter, looking to find my perfect home</Typography>
                                <HomeOwnerEntrance />

                                {/* The exact path to the route of */}
                                

                            </div>
                        </Fade>
                    </Modal>
                </div>

            </div>
        </div>
    )
}

export default connect(null, { updateTemporaryUserInfo })(UserSegmentation)
