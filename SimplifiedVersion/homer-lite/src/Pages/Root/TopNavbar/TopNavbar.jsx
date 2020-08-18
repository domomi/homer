import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import starfishSVG from './img/starfish.svg'
import Menu from '@material-ui/core/Menu';
import LogoutBtn from '../../Root/TopNavbar/Components/LogoutBtn'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  HomerLite : {
    color : theme.palette.HomerLite,
    fontFamily : "'Chewy', cursive",
    fontSize : '25pt'
  },
  starfishSVG : {
    maxWidth : '50px' 
  }
}));

export default function TopNavbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    console.log('handleClose')
    setAnchorEl(null);
    // toggleComponent(!triggered)
}

const handleMenu = (event) => {
  setAnchorEl(event.currentTarget);
};

const open = Boolean(anchorEl);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={starfishSVG} className={classes.starfishSVG}/>
          <div className={classes.title}>
          <Typography align='left' className={classes.HomerLite} component='h4' variant='h4'>Homer</Typography>
          <Typography component='h5' className={classes.HomerLite} variant='h5'>Lite</Typography>
         
          </div>
          <p id='user_role_display'></p>
          <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={handleMenu}/>
            
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
                      <LogoutBtn />

                    </Menu>

        </Toolbar>
      </AppBar>
    </div>
  );
}