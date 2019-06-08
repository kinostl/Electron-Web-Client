import {observable, action} from 'mobx'
import PouchDB from 'pouchdb-browser'

const {ipcRenderer} = window.require('electron')

let characters = new PouchDB('characters')

let appState= observable({
  messages:[],
  worlds: [],
  connections: []
})

appState.addMessage = action((message)=>{
    appState.messages.push(message)
})

appState.sendMessage = action((values, actions) => {
    actions.resetForm()
    ipcRenderer.send('send-message', values['message'])
})

appState.addWorld = action((values, actions) => {
    let _id = values['name'] + "@" + values['server_url'] + ":" + values['server_port']
    values['_id'] = _id
    characters.put(values).then(function (response) {
        console.log("Character added")
        console.log(response)
        appState.worlds.push(values)
        actions.setSubmitting(false)
    }).catch(function (err) {
        actions.setSubmitting(false)
        actions.setErrors(err)
    })
})

appState.addConnection = action((connection)=>{
    /*
    This isn't appropriate since it should actually
    send a signal to the node-side to start up a new connection
    then do something on here to display stuff
    */

    appState.connections.push(connection)
})

export default appState