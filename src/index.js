import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import * as reducers from 'store/reducers/reducers'
import App from 'App'
import './index.css'

const middleware = [thunk, logger]

const store = createStore(combineReducers(reducers), applyMiddleware(...middleware))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
