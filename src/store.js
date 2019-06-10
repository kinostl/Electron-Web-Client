import { observable, action } from 'mobx'
import PouchDB from 'pouchdb-browser'

const { ipcRenderer } = window.require('electron')

let worlds = new PouchDB('worlds')

let appState = observable({
    selectedConnection: null,
    worlds: new Map(),
    connections: new Map()
})

worlds.allDocs({ include_docs: true }).then((results) => {
    let rows = results['rows']
    for (let row of rows) {
        let doc = row['doc']
        let id = doc['_id']
        appState.worlds.set(id, doc)
    }
})


appState.getAllWorlds = () => {
    return worlds.allDocs({ include_docs: true })
}

appState.addMessage = action((args) => {
    appState.connections.get(args['world_id']).messages.push(args['data'])
})

appState.sendData = action((values, actions) => {
    actions.resetForm()
    ipcRenderer.send('sendData',
        appState.selectedConnection['world']['_id'],
        values['message']
    )
})

appState.editWorld = action((value, actions) => {
    console.log(value)
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

appState.getSelectedMessages = action(() => {
    if (appState.selected_id) {
        return appState.connections[appState.selected_id]['messages']
    }
    return []
})

appState.addConnection = action((world) => {
    let connection = {
        "world": world,
        "messages": []
    }
    appState.connections.set(world['_id'], connection)
    appState.worlds.delete(world['_id'])
})


appState.closeConnection = action((args) => {
    if (args['error']) {
        //Do something more useful than this.
        console.error(args['error'])
    }
    let world = appState.connections.get(args['world_id'])
    appState.worlds.set(world['_id'], world)
    appState.connections.delete(world['_id'])
})

appState.selectConnection = action((connection) => {
    appState.selectedConnection = connection
    console.log("Selected")
})

appState.connectWorld = action((world) => {
    ipcRenderer.send('connectWorld', world)
})

export default appState