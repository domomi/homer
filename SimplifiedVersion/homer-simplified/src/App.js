import React, { useEffect, Fragment } from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import { orange } from '@material-ui/core/colors'
import { Typography } from '@material-ui/core';




import { Provider } from 'react-redux'
import store from './redux/store';

import {
  BrowserRouter as Router,

  Route,

} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';


import LoginPage from './Pages/LoginPage/LoginPage'
import TopNavbar from './Pages/Root/TopNavbar/TopNavbar'
import GetStarted from './Pages/GetStarted/GetStarted'

import UserSegmentation from './Pages/UserSegmentation/UserSegmentation'
// Renter's
import RenterAttributes from './Pages/UserSegmentation/Renter/RenterAttributes/RenterAttributes'
import RenterPreference from './Pages/UserSegmentation/Renter/RenterPreference/RenterPreference'
import RenterMap from './Pages/UserSegmentation/Renter/RenterMap/RenterMap'

// HomeOwner's
import HomeOwnerMap from './Pages/UserSegmentation/HomeOwner/HomeOwnerMap/HomeOwnerMap'
import HomeOwnerPreferences from './Pages/UserSegmentation/HomeOwner/HomeOwnerPreferences/HomeOwnerPreferences'
import HomeOwnerVideoUpload from './Pages/UserSegmentation/HomeOwner/HomeOwnerVideoUpload/HomeOwnerVideoUpload'

import HomeOwnerMapFinal from './Pages/UserSegmentation/HomeOwner/HomeOwnerMapFinal/HomeOwnerMapFinal'
import Listings from './Pages/UserSegmentation/HomeOwner/HomeOwnerListings/HomeOwnerListings'

// The Admin Page
import Admin from './Pages/UserSegmentation/Admin/Admin'
import { ajax } from 'jquery';
import Profile from './Pages/Profile/Profile'


// Stripe API
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import InjectedCheckoutForm from './Pages/Profile/Components/StripeAPI/InjectedCheckoutForm'
const theme = createMuiTheme({
  palette: {
    HomerLite: 'rgb(255, 235, 179)'
  }
});

const useStyles = makeStyles((theme) => ({
  HomerLiteDiv: {
    display: 'flex'
  }
}))



function App() {
  const classes = useStyles();
  useEffect(() => {
    console.log(theme)
    console.log(theme.palette.secondary.main)
  }, [])

  

  return (
    
    <Fragment>
      <Provider store={store}>
      {/* <InjectedCheckoutForm /> */}
      <ThemeProvider theme={theme}>
        
        <Router>

          <div id='top_div'>
            <TopNavbar />
          </div>

          <div id='mid_div'>

            <Route exact path='/' component={LoginPage} />
            <Route exact path='/GetStarted' component={GetStarted} />
            <Route exact path='/UserSegmentation' component={UserSegmentation} />

            {/* Renters */}
            <Route exact path='/RenterMap' component={RenterMap} />
            <Route exact path='/RenterAttributes' component={RenterAttributes} />
            <Route exact path='/RenterPreference' component={RenterPreference} />

            {/* Homer Owners */}
            <Route exact path='/HomeOwnerMap' component={HomeOwnerMap} />
            <Route exact path='/HomeOwnerPreference' component={HomeOwnerPreferences} />
            <Route exact path='/HomeOwnerVideoUpload' component={HomeOwnerVideoUpload} />
            <Route exact path='/HomeOwnerMapFinal' component={HomeOwnerMapFinal} />

            <Route exact path='/Listings' component= {Listings} />                  
            {/* Admin  */}
            <Route exact path='/Admin' component={Admin} />

            <Route exact path='/Profile' component={Profile} />

            {/* <Profile /> */}

            {/* Stripe API test */}

           

            {/* 
          <Route exact path='/StripeTest' render={() => {

          }} /> */}

            {/* <LoginPage /> */}
          </div>

          <div id="bottom_div">

          </div>


        </Router>
      </ThemeProvider>
      </Provider>
    </Fragment>
  
  );
}

export default App;


