import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { GlobalStyle } from './styles'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <Auth0Provider
      domain="dev-j5to76bfzcvu3rqq.us.auth0.com"
      clientId="43UniHhUR59WBmahlW9QVWH4gnwehKHb"
      authorizationParams={{
        redirect_uri: window.location.origin + "/profile",
      }}>
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
