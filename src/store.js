import { observable, action, decorate, flow } from 'mobx'
import PouchDB from 'pouchdb-browser'
import shortid from 'shortid'

const { ipcRenderer } = window.require('electron')
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+-')

class AppState {
    selectedWorld
    worldDb
    messages

    constructor() {
        this.selectedWorld = null
        this.messages = new Map()
        this.worldDb = new PouchDB('worlds')

        this.worlds = new Map()

        this.addWorld = this.addWorld.bind(this)
        this.editWorld = this.editWorld.bind(this)
        this.sendData = this.sendData.bind(this)
    }

    addMessage(args) {
        let world_id = args['world_id']
        if (this.worlds.has(world_id)) {
            console.log("message received")
            this.worlds.get(world_id).connected = true
            this.worlds.get(world_id).messages.unshift(args['data'])
            console.log(this.worlds.get(world_id).messages)
        }
    }

    updateWorlds = flow(function* () {
        let rows = yield this.worldDb.allDocs({ "include_docs": true })
        let worlds = new Map()
        for (let row of rows['rows']) {
            let world = row['doc']
            let new_world = null
            if (this.worlds.has(world['_id'])) {
                new_world = this.worlds.get(world['_id'])
                new_world['world'] = world
            } else {
                new_world = {
                    "messages": [],
                    "connected": false,
                    "world": world
                }
            }
            worlds.set(world['_id'], new_world)
        }

        this.worlds = worlds
    })

    editWorld = flow(function* (values, actions) {
        try {
            let world_id = values['_id']
            let new_world = values
            let world = yield this.worldDb.get(world_id)
            new_world['_rev'] = world._rev
            yield this.worldDb.put(new_world)
            yield this.updateWorlds()
        } catch (err) {
            actions.setErrors(err)
        }
        actions.setSubmitting(false)
    })

    addWorld = flow(function* (values, actions) {
        try {
            values['_id'] = shortid.generate()
            yield this.worldDb.put(values)
            yield this.updateWorlds()
        } catch (err) {
            console.log(err)
            actions.setErrors(err)
        }
        actions.selectConnection(false)
    })

    sendData(values, actions) {
        actions.resetForm()
        if (this.selectedWorld) {
            ipcRenderer.send('sendData',
                this.selectedWorld['world']['_id'],
                values['message']
            )
        }
    }

    closeConnection(args) {
        let world = this.worlds.get(args['world_id'])
        if (world) {
            if (args['error']) {
                world.messages.unshift(args['error'])
            }
            world.connected = false
        }
    }

    selectWorld(world_id) {
        this.selectedWorld = this.worlds.get(world_id)
        if (this.selectedWorld) {
            if (!this.selectedWorld.connected) {
                console.log("selectedWorld", this.selectedWorld['world'])
                ipcRenderer.send('connectWorld', this.selectedWorld['world'])
            }
        }
    }
}

decorate(AppState, {
    selectedWorld: observable,
    worlds: observable,
    worldDb: observable.ref,
    addMessage: action,
    addWorld: action,
    closeConnection: action,
    editWorld: action,
    selectWorld: action,
    sendData: action
})

let appState = new AppState()

export default appState