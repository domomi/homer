import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

// Material UI styling
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';

import Fab from '@material-ui/core/Fab';

import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import bellIcon from './img/bell.svg'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button'
import ChatIcon from '@material-ui/icons/Chat';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PersonIcon from '@material-ui/icons/Person';

import FavoriteIcon from '@material-ui/icons/Favorite';
import { Typography } from '@material-ui/core'

import dottedBellIcon from './img/bell_with_a_dot.svg'

import $ from 'jquery'

import { connect } from "react-redux";
import store from '../../../../redux/store';
import {fetchLngLat} from '../../../../redux/reducer'
// import
// Style sheet
const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        // maxWidth :'100vw'
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },

    bellIcon: {
        maxWidth: '25px',
        width: '25vw'
    },

    Menu: {
        position: 'fixed',
        top: '0px',
        width: '95vh'
    },

    MenuItem: { width: '50vw', backgroundColor: 'white' },

    creatorBtn: {
        left: '45%',
        position: 'fixed',
        // maxWidth: '55px',
        // zIndex : '3',
        // bottom: '5vh',
        // backgroundColor: 'rgb(200,100,5)',
        borderRadius: '100%'
    },
    AddIcon: {
        borderRadius: '100%',
        backgroundColor: theme.palette.secondary.main,
    },

    AlertMenu: {
        background: 'black',
        fontSize: '40pt'
    }
}));

// 
 function BottomNavBar(props) {
    const classes = useStyles();
    const [triggered, toggleComponent] = React.useState(false)

    const handleAddBtn = () => {
        console.log('handleAddBtn')
        toggleComponent(!triggered)
        console.log('triggered' + triggered)
    }


    const [anchorEl, setAnchorEl] = React.useState(null);

    // Triggers the AlertMenu
    const [anchorAlertMenu, setAnchorAlertMenu] = React.useState(null)

    const open = Boolean(anchorEl);

    const openAlertMenu = Boolean(anchorAlertMenu)

    const [alertEls, updateAlertEls] = React.useState([])

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const visitThePosition = (lnglat) => {
        console.log('visitThePosition()')
        console.log(lnglat)
        props.fetchLngLat(lnglat)
    }

    const handleClose = () => {
        console.log('handleClose')
        setAnchorEl(null);
        // toggleComponent(!triggered)
    };

    const handleAlertMenuClose = () => {
        console.log('handleAlertMenuClose')
        setAnchorAlertMenu(null);
        // toggleComponent(!triggered)
    };

    const handleAlert = (event) => {
        setAnchorAlertMenu(event.currentTarget);

        let data = { user_email: store.getState().user_obj.email };
        $.ajax({
            type: "POST",
            url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/fetchUserAlerts`,
            data: data,
            dataType: "json",
            success: function (alert_arr) {
                // alert array:
                console.log('alert array')
                console.log(alert_arr)
                updateAlertEls(alert_arr)
            }
        });

    
    }

    //Let notice bell button with a red dot show up
    const [notice, switchNotice] = useState(false)

    
    useEffect(() => {

        console.log('use effect')
        //Check if the user has got any notes
        let data = {user_email : store.getState().user_obj.email}
       
        $.when(data).then(
            ()=>{
                console.log(data)
                $.ajax({
                    type: "POST",
                    url: `${process.env.REACT_APP_EXPRESS_ENDPOINT}/fetchUserAlerts`,
                    data: data,
                    dataType: "json",
                    success: function (user_alerts) {
                        console.log('user alerts')
                        console.log(user_alerts)
                        if(user_alerts.length > 0 ){
                            switchNotice(true)
                        }
                        else if(user_alerts.length === 0 ){
                            switchNotice(false)
                        }
                    },
                    error: (e) =>{
                        console.log(e)
                    }
                });
            }
        )

    }, [notice])



    return (
        <React.Fragment>

            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>


                    <IconButton edge="start" color="inherit">
                        {!notice && <img src={bellIcon} className={classes.bellIcon} onClick={handleAlert} />}
                        {notice && <img src={dottedBellIcon} className={classes.bellIcon} onClick={handleAlert} />}


                    </IconButton>




                    <div className={classes.grow} />


                    <IconButton edge="end" color="inherit" aria-label="open drawer">
                        <MenuIcon onClick={handleMenu} />
                    </IconButton>


                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        // keepMounted
                        open={open}
                        onClose={handleClose}
                        classes={classes.Menu}
                        PaperProps={{
                            style: {
                                //   left: '50%',
                                transform: 'translateX(-1%) translateY(-20px)',
                                //   minHeight : ' 80vh',
                                minWidth: ' 55vw',
                                margin: 0,
                                padding: '0'
                            }
                        }}
                    >
                        <Link to="/ViewPosts" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose}><ChatIcon />Inbox</MenuItem></Link>
                        <Link to="/HomerMap" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose} className={classes.MenuItem}><CalendarTodayIcon />Calendar</MenuItem></Link>
                        <Link to="/Listings" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose}><ListAltIcon />Listings</MenuItem></Link>
                        <Link to="/Profile" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose}><EqualizerIcon />Performance</MenuItem></Link>
                    </Menu>


                    <Menu
                        id="alert-menu-appbar"

                        anchorEl={anchorAlertMenu}
                        // keepMounted
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
                        // getContentAnchorEl={null}
                        onClose={handleAlertMenuClose}
                        classes={classes.AlertMenu}
                        open={openAlertMenu}

                        PaperProps={{
                            style: {
                                left: '50%',
                                transform: 'translateX(-0%) translateY(22%)',
                                minWidth: ' 94vw',
                            }
                        }}
                        MenuListProps={{
                            style: {
                                padding: 0,
                                width: ' 96vw',
                                //   background : 'black'
                            },

                        }}
                    >
                        <div>

                           

                            <Typography component='h3'>Quick Actions</Typography>
                            {alertEls.map((item, idx) => {
                                return (<div className={classes.AlertItems}>
                                    <div><p>Time: {item.update_time}</p></div>
                                    <div><p>Event: {item.title}</p></div>
                                    <Button variant='contained' color='secondary' onClick={()=>visitThePosition(item.lnglat)}>Visit The Position</Button>
                                </div>

                                )
                            })}
                            {/* <Link to="" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose}>Inbox</MenuItem></Link>
                            <Link to="" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose} className={classes.MenuItem}>Calendar</MenuItem></Link>
                            <Link to="" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose}>Listings</MenuItem></Link>
                            <Link to="" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose}>Performance</MenuItem></Link>
                            <Link to="" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose}>My Profile</MenuItem></Link> */}
                        </div>
                    </Menu>


                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default connect(null, { fetchLngLat })(BottomNavBar)


























