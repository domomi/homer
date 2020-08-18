import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "@auth0/auth0-react";
import './Fonts/Chewy-Regular/Chewy-Regular.ttf'
import { useHistory } from "react-router-dom";

import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import Auth0ProviderWithHistory from './Auth0ProviderWithHistory'

//  const onRedirectCallback = (appState) => {
//     history.push(appState?.returnTo || window.location.pathname);
//   };

ReactDOM.render(
  
<Fragment>
<Auth0ProviderWithHistory>
{/* <Auth0Provider
      domain="homescouter.us.auth0.com"
      clientId="VIXIbdsJOsSN6XsrzinngVfCsJRmo90f"
      redirectUri={window.location.origin + '/getStarted'}
      // onRedirectCallback={onRedirectCallback}
    // redirectUri='http://localhost:3000/UserSegmentation'
    // redirectUri='http://localhost:3000/getStarted'
    > */}

      <React.StrictMode>
        <App />
      </React.StrictMode>
    {/* </Auth0Provider> */}
    </Auth0ProviderWithHistory>
</Fragment>
,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
