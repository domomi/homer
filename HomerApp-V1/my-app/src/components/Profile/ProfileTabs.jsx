import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ProfileTabCards from './ProfileTabs/ProfileTabCards'


// 
import personalInfoPic1 from './ProfileTabs/img/man.svg'
import personalInfoPic2 from './ProfileTabs/img/woman.svg'
import myPostsPic1 from './ProfileTabs/img/rent.svg'


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}






export default function FullWidthTabs() {
    const useStyles = makeStyles((theme) => ({
        root: {
           
            
            maxWidth: '100vw',
            
        },
    }));
    const classes = useStyles();
    const theme = useTheme();
    console.log('theme')
    console.log(theme)
    
    console.log(theme.palette.background.paper)
    
    

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Overview" {...a11yProps(0)} />
                    <Tab label="Milestones" {...a11yProps(1)} />
                    <Tab label="Goals" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
               
                <TabPanel value={value} index={0} dir={theme.direction}>
                     {/* Profile Info Card */}
                    <ProfileTabCards link='/PersonalInformation' title='Personal Information' pic1={personalInfoPic1} pic2={personalInfoPic2}/>
                   
                    {/* View Previous Info*/}
                    <ProfileTabCards link='/MyPosts' title='My Posts' pic1={myPostsPic1} />
                </TabPanel>

                <TabPanel value={value} index={1} dir={theme.direction}>
                    Item Two
                </TabPanel>


                <TabPanel value={value} index={2} dir={theme.direction}>
                   <ProfileTabCards  />
                </TabPanel>

            </SwipeableViews>
        </div>
    );
}