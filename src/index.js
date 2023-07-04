import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VPProvider } from './context/viewProductContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CLIENT_ID } from './utils/paypalConfig';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleClientId } from './utils/loginAPISConfig';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <VPProvider>
        <PayPalScriptProvider 
          options={{
            "client-id": CLIENT_ID
          }}
          
        >
          <GoogleOAuthProvider clientId={googleClientId}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
            <App />
          </GoogleOAuthProvider>
        </PayPalScriptProvider>
      </VPProvider>
    </Provider>
);

