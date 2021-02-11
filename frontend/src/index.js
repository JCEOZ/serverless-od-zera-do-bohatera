import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; 
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import Amplify from 'aws-amplify'
import config from './config'

// TODO LEKCJA 09-05 Połączenie frontendu i backendu ze sobą
Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    API: {
        endpoints: [
            {
                name: 'products',
                endpoint: config.api.URL,
                region: config.api.REGION
            },
            {
              name: 'signedUrl',
              endpoint: config.api.SIGNED_URL,
              region: config.api.REGION
            }
        ]
    }
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
