// =====================vvvvv Libraries vvvvv============================
import React, { Fragment, useState } from 'react';
// Render different components for different routes
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { connect } from 'react-redux'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import store from './store';

import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { pink, orange, purple } from '@material-ui/core/colors/'


// Required
import { withRouter } from 'react-router-dom'
// React hide but not unmount:
import NotLiveRoute from 'react-live-route'


// Auth0
import { useAuth0 } from '@auth0/auth0-react';

import { Button } from '@material-ui/core'

import UploadDraggableBox from './components/Create/Listing/UploadDraggableBox'

import ArchivedUploads from './components/Create/Listing/ArchivedUploads'


// =====================^^^^^ Libraries ^^^^============================



// =====================vvvv Page Components vvvv==============================
// This component corresponds to the first page of that in invisionapp

import LoginButton from './components/NoneFunctionalPages/LoginButton'


import ProfilePage from './components/ProfilePage'

import Filter from './components/Filter'

import CreateNavigation from './components/Create/CreateNavigation'

import MapBoxCreateNavigation from './components/Create/MapBoxCreateNavigation'

import BeaconInstruction from './components/Create/BeaconInstruction'

import Listing from './components/Create/Listing'

import BeaconConfiguration from './components/MapContainer/tabs/BeaconConfiguration'

import MapChat from './components/MapContainer/tabs/MapChat'

import ViewPosts from './components/ViewPosts'


import HashTagList from './components/MapContainer/tabs/MapChat/HashTagList'

// import DateTimePickerPage from './components/Calendar/DateTimePicker'

import Calendar from './components/Calendar'

import BottomNavBar from './components/BottomNavBar'

import WebPageAppInstall from './components/WebPageAppInstall'

import MapBox from './components/MapBox'

import HashTagChoices from './components/MapBox/HashTagChoices'

import LandingPage from './components/LandingPage'


// Hide but not unmount routes:
// import LiveRoute from 'react-live-route'
const LiveRoute = withRouter(NotLiveRoute)


const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(255,255,255)',
    },
    secondary: {
      main: 'rgb(187,134,252)',
    },
    tertiary: {
      main: 'rgb(150,150,150)',
    },
    quaternary: {
      main: 'rgb(3,186,252)',
    }
  },
  divider: 'black',

  CreatePage: {
    background: orange,
  }


})
console.log(theme)
function App() {
  const initialState = {
    radius: 0,

  }



  //Auth0 authentication props 
  const {
    // isLoading,
    // error,
    // user,
    // loginWithRedirect,
    // logout,
    isAuthenticated,
  } = useAuth0();



  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>

          <div className="header">
            {/* <Link to="/HomerMap"><Button variant="contained">Home</Button></Link>
            <Link to="/HomerMap/Filter"><Button variant="contained">Filter</Button></Link>
            <Link to="/Profile"> <Button variant="contained">Profile</Button></Link>
            <Link to="/ViewPosts"> <Button variant="contained">ViewPosts</Button></Link>
            <Link to="/Calendar"> <Button variant="contained">Calendar</Button></Link> */}
          </div>





          <div className="container">

            {/* Visit root, and if the user is logged in, then will be sent to the application page. */}
            {/* If the user has not logged in, then we prompt the user to login */}
            <Route exact path='/Login' render={props =>
              <Fragment>
      
                {isAuthenticated && <div>Welcome</div>}
                {!isAuthenticated &&
                  <LoginButton />}

              </Fragment>
            } />

            <Route path='/Profile' component={ProfilePage} />
            <Route path='/MapBox' component={MapBox} />
          </div>


          <div className='tab'>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/LandingPage' component={LandingPage} />

            {/* WebPageAppInstall */}
            <Route exact path='/WebPageAppInstall' component={WebPageAppInstall} />
            <Route exact path='/HomerMap/Filter' component={Filter} />
            {/* <Route exact path='/HomerMap/Create/Navigation' component={CreateNavigation} /> */}
            <Route exact path='/Calendar' component={Calendar} />
            {/* <LiveRoute exact alwaysLive={true}  path='/HomerMap/Create/BeaconInstruction/' component={BeaconInstruction} /> */}
            <LiveRoute alwaysLive={false} exact path='/HomerMap/Create/BeaconInstruction/:steps/:stepID' component={BeaconInstruction} />

            <Route exact path='/HomerMap/BeaconConfiguration' render={props => <BeaconConfiguration />} />
            <Route exact path='/ViewPosts' component={ViewPosts} />
            <Route path='/HomerMap/MapChat' render={props => <MapChat />} />

            {/* Profile Related Pages */}

            <Route exact path='/MyPosts' component={ArchivedUploads} />
            <Route exact path='/PersonalInformation' component={ArchivedUploads} />

            <Route path='/MapBox/Create/Navigation' component={MapBoxCreateNavigation} />

            {/* <Route exact path='/Calendar'  component={Calendar} /> */}

            {/* 'alwaysLive' is the magic! */}
            <LiveRoute path='/MapBox/Create/AddHomeListing' alwaysLive={true} render={props =>
              <Fragment>
                <Listing />

              </Fragment>

            } />




          </div>

          <div id='bottomNavBar'>
            <BottomNavBar />

          </div>


        </Router >
      </Provider>
    </ThemeProvider>

  );
}

export default App;

