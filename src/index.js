import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import * as serviceWorker from './serviceWorker'

import appState from './store'

const {ipcRenderer} = window.require('electron')


ipcRenderer.on('dataReceived', async (event, arg) =>{
  await appState.addMessage(arg)
})

ipcRenderer.on('connectionOpened', async (event, arg)=>{
  await appState.addMessage(arg)
})

ipcRenderer.on('connectionClosed', async (event, args)=>{
  await appState.closeConnection(args)
})

ipcRenderer.on('connectionFailed', async (event, args)=>{
  await appState.closeConnection(args)
})


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
