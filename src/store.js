import {observable, action} from 'mobx'
import PouchDB from 'pouchdb-browser'

const {ipcRenderer} = window.require('electron')

let worlds = new PouchDB('worlds')

let appState= observable({
  worlds: new Map(),
  connections: new Map(),
  messages: ["Hello!"]
})

worlds.allDocs({include_docs:true}).then((results)=>{
    let rows = results['rows']
    for(let row of rows){
        let doc = row['doc']
        let id=doc['_id']
        appState.worlds.set(id, doc)
    }
 })


appState.addMessage = action((args)=>{
    appState.connections.get(args['world_id']).messages.push(args['data'])
})

appState.sendData = action((values, actions) => {
    actions.resetForm()
    ipcRenderer.send('sendData', values['message'])
})

appState.addWorld = action((values, actions) => {
    let _id = values['label'] + "@" + values['server_address'] + ":" + values['server_port']
    values['_id'] = _id
    worlds.put(values).then(function () {
        appState.worlds.set(_id, values)
        actions.setSubmitting(false)
    }).catch(function (err) {
        actions.setSubmitting(false)
        actions.setErrors(err)
    })
})

appState.addConnection = action((world)=>{
    let connection = {
        "world": world,
        "messages": []
    }
    appState.connections.set(world['_id'],connection)
    appState.worlds.delete(world['_id'])
})

appState.connectWorld = action((world)=>{
    ipcRenderer.send('connectWorld', world)
})

export default appState