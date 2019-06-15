import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import * as serviceWorker from './serviceWorker'

import appState from './store'

const {ipcRenderer} = window.require('electron')


ipcRenderer.on('dataReceived', (event, arg) =>{
  appState.addMessage(arg)
})

ipcRenderer.on('connectionOpened', (event, arg)=>{
  appState.addMessage(arg)
})

ipcRenderer.on('connectionClosed', (event, args)=>{
  appState.closeConnection(args)
})

ipcRenderer.on('connectionFailed', (event, args)=>{
  appState.closeConnection(args)
})


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
