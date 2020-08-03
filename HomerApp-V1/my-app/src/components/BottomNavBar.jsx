import React from 'react';
import { Link } from 'react-router-dom';

// Material UI styling
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';

import Fab from '@material-ui/core/Fab';

import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import bellIcon from './BottomNavBar/bell.svg'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


import FavoriteIcon from '@material-ui/icons/Favorite';
import { Typography } from '@material-ui/core'


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

    MenuItem: { width: '100vw', backgroundColor: 'white' },

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
export default function BottomNavBar() {
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

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

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
    }

    return (
        <React.Fragment>

            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>


                    <IconButton edge="start" color="inherit">
                        <img src={bellIcon} className={classes.bellIcon} onClick={handleAlert} />
                    </IconButton>



                    <Fab color="secondary" aria-label="add" className={classes.fabButton} >

                        {/* This state hook allows the button to have different functions when pressed the first and second time */}
                        {/* If it has not been triggered, pressing it goes to the Navigation Page*/}
                        {!triggered &&

                            <Link onClick={handleAddBtn} to='/MapBox/Create/Navigation' style={{ color: 'inherit', textDecoration: 'inherit' }}>

                                <AddIcon />
                            </Link>
                        }
                        {/* If it has been triggered, then pressing it goes back to the Map page */}
                        {triggered &&

                            <Link to='/MapBox/' onClick={handleAddBtn} style={{ color: 'inherit', textDecoration: 'inherit', fontSize: 'inherit' }} >
                                <div>
                                    Close
                                    <img className={classes.AddIcon} />
                                </div>

                            </Link>
                        }




                    </Fab>
                    <div className={classes.grow} />


                    <IconButton edge="end" color="inherit" aria-label="open drawer">
                        <MenuIcon onClick={handleMenu} />
                    </IconButton>


                    <Menu
                        id="menu-appbar"
                        // anchorEl={anchorEl}
                        // keepMounted
                        open={open}
                        onClose={handleClose}
                        classes={classes.Menu}
                        PaperProps={{
                            style: {
                            //   left: '50%',
                              transform: 'translateX(-1%) translateY(0%)',
                              minHeight : ' 80vh',
                              minWidth : ' 95vw',
                              margin : 0,
                              padding : '0'
                            }
                          }}
                    >
                        <Link to="/ViewPosts" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose}>Explore Homes</MenuItem></Link>
                        <Link to="/HomerMap" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose} className={classes.MenuItem}>HomerMap</MenuItem></Link>
                        <Link to="/HomerMap/Filter" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose}>Filter</MenuItem></Link>
                        <Link to="/Profile" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
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
                              minWidth : ' 94vw',
                            }
                          }}
                          MenuListProps={{
                            style: {
                              padding: 0,
                              width : ' 96vw',
                            //   background : 'black'
                            },
                         
                          }}
                    >
                        <div>

                            <Typography component='h3'>Quick Actions</Typography>
                            
                            <Link to="" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose}><FavoriteIcon /> Explore Homes</MenuItem></Link>
                            <Link to="" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose}  className={classes.MenuItem}><FavoriteIcon />HomerMap</MenuItem></Link>
                            <Link to="" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose}><FavoriteIcon /> Filter</MenuItem></Link>
                            <Link to="" style={{ color: 'inherit', textDecoration: 'inherit' }}><MenuItem onClick={handleClose}><FavoriteIcon /> Profile</MenuItem></Link>
                        </div>
                    </Menu>


                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}




























