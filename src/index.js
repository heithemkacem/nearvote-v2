import React from 'react'
import ReactDOM from 'react-dom'
import { initContract } from './utils'
import 'simplebar/src/simplebar.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import {Provider} from 'react-redux'
import store from './_actions_/organization/store'

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
        </BrowserRouter>
    </HelmetProvider>,
    document.querySelector('#root')
    )
  })
  .catch(console.error)
