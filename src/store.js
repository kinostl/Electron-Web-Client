import { observable, action, decorate, flow } from 'mobx'
import PouchDB from 'pouchdb-browser'
import shortid from 'shortid'

const { ipcRenderer } = window.require('electron')
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+-')

class AppState {
    selectedWorld
    worldDb
    messages

    constructor () {
        this.selectedWorld = null
        this.messages = new Map()
        this.worldDb = new PouchDB('worlds')

        this.worlds = new Map()

        this.addWorld = this.addWorld.bind(this)
        this.editWorld = this.editWorld.bind(this)
    }

    async addMessage(args) {
        let world_id = args['world_id']
        if(!this.messages.has(world_id)){
            this.messages.set(world_id,[])
        }
        this.messages.get(world_id).unshift(args['data'])
    }

    world = flow(function * (world_id){
        let world = yield this.worldDb.get(world_id)
        return world
    })

    updateWorlds = flow(function * () {
        let rows = yield this.worldDb.allDocs({"include_docs":true})
        let worlds = new Map()
        for(let row of rows['rows']){
            let world = row['doc']
            let new_world = null
            if(this.worlds.has(world['_id'])){
                new_world = this.worlds.get(world['_id'])
                new_world['world']=world
            }else{
                new_world = {
                    "messages":[],
                    "connected":false,
                    "world":world
                }
            }
            worlds.set(world['_id'],new_world)
        }

        this.worlds = worlds
    })

    sendData(values, actions) {
        actions.resetForm()
        ipcRenderer.send('sendData',
            this.selectedConnection['world']['_id'],
            values['message']
        )
    }

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

    addWorld = flow(function * (values, actions){
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

    async closeConnection(args) {
        let world = await this.worldDb.get(args['world_id'])
        if (args['error']) {
            world.messages.unshift(args['error'])
        }
        world.connected = false
    }

    async selectWorld(world_id) {
        this.selectedWorld = await this.worldDb.get(world_id)
        if(!this.selectedWorld.connected){
            ipcRenderer.send('connectWorld', this.selectedWorld)
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